import ee
import requests
import os

from dotenv import load_dotenv
load_dotenv()
project_key = os.getenv("ee_project_key")

def pollution_analysis(coord, loc_name = "NONAME"):
    

    print("\n=== ANALYSIS START ===")
    print("Initializing")
    ee.Authenticate()
    ee.Initialize(project=project_key)

    print("done\n")

    # ---------------------------
    # 1. Define Area of Interest (1 km²)
    # ---------------------------
    # Center point (example: change coordinates as needed)
    # [27.658181, 44.204142] Donau River
    center = ee.Geometry.Point(coord)  # Donau River

    # Create ~1 km² buffer (1000m radius ≈ 1 km² area)
    aoi = center.buffer(1000).bounds()

    # ---------------------------
    # 2. Load Sentinel-2 Image
    # ---------------------------

    # only images taken around noon
    start_hour = 8   # UTC
    end_hour   = 17  # UTC

    def filter_by_hour(image):
        date = ee.Date(image.get('system:time_start'))
        hour = date.get('hour')
        return ee.Algorithms.If(
            ee.Number(hour).gte(start_hour).And(ee.Number(hour).lte(end_hour)),
            image,
            None
        )

    collection = (
        ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
        .filterBounds(aoi)
        .filterDate('2024-01-01', '2024-12-31')
        .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10))
        #.map(lambda img: ee.Image(filter_by_hour(img)))
        #.filter(ee.Filter.notNull(['system:time_start']))
    )

    # Select least cloudy image
    image = collection.sort('CLOUDY_PIXEL_PERCENTAGE').first()

    # ---------------------------
    # 3. Compute NDWI (Sentinel-2)
    # ---------------------------
    # NDWI = (Green - NIR) / (Green + NIR)
    ndwi = image.normalizedDifference(['B3', 'B8']).rename('NDWI')

    # ---------------------------
    # 4. Threshold NDWI to get water mask
    # ---------------------------
    # Typical threshold: 0.1–0.3 (adjust if needed)
    water_mask = ndwi.gt(0.1)

    # ---------------------------
    # 5. Morphological Filtering
    # ---------------------------
    # Define 1-pixel kernel
    kernel = ee.Kernel.square(1)

    # 1 × erosion (remove small noise)
    water_mask = water_mask.focal_min(kernel=kernel, iterations=1)

    # 1 × dilation (fill gaps and expand water)
    #water_mask = water_mask.focal_max(kernel=kernel, iterations=1)

    # ---------------------------
    # 6. Apply Water Mask to Sentinel-2 Image
    # ---------------------------
    water_only_image = image.updateMask(water_mask)

    # ---------------------------
    # 7. Nechad NIR Turbidity (B8A — 865 nm)
    # ---------------------------
    # Nechad 2016 coefficients for Sentinel-2 MSI B8A
    A_865 = 3030.3
    C_865 = 0.2115

    # Convert DN → water-leaving reflectance Rw (S2 SR stores values scaled ×10000)
    Rw_865 = water_only_image.select('B8A').divide(10000)

    # Valid pixel mask: 0 < Rw < C (denominator must stay positive)
    valid_mask = Rw_865.gt(0).And(Rw_865.lt(C_865))

    # Apply Nechad formula: T = (A × Rw) / (1 − Rw / C)
    turbidity = (
        Rw_865.multiply(A_865)
        .divide(
            ee.Image(1).subtract(Rw_865.divide(C_865))
        )
        .updateMask(valid_mask)
        .rename('turbidity_FNU')
    )

    # Quick stats over the AOI (for sanity check)
    stats = turbidity.reduceRegion(
        reducer=ee.Reducer.mean().combine(
            ee.Reducer.minMax(), sharedInputs=True
        ),
        geometry=aoi,
        scale=20,          # B8A native resolution
        maxPixels=1e9
    )

    # ---------------------------
    # 8. (Optional) Visualization
    # ---------------------------
    vis_params = {
        'bands': ['B4', 'B3', 'B2'],  # RGB
        'min': 0,
        'max': 3000,
        'gamma': 1.3
    }

    # ---------------------------
    # 9. Export or Display (example export)
    # ---------------------------

    if loc_name != "NONAME":
        location_name = loc_name
        
    else:
        location_name = "LAST_RUN"


    url = water_only_image.getThumbURL({
        'region': aoi,
        'dimensions': 512,
        'format': 'png',
        'min': 0,
        'max': 3000,
        'bands': ['B4', 'B3', 'B2']
    })

    print("Water-only image URL:", url)

    # Download and save locally
    response = requests.get(url)
    with open(loc_name + '_only.jpg', 'wb') as f:
        f.write(response.content)

    url1 = image.getThumbURL({
        'region': aoi,
        'dimensions': 512,
        'format': 'png',
        'min': 0,
        'max': 3000,
        'bands': ['B4', 'B3', 'B2']
    })

    print("Full image URL:", url)

    # Download and save locally
    response = requests.get(url1)
    with open(loc_name + '.jpg', 'wb') as f:
        f.write(response.content)


    print("\n--- Turbidity Stats ---")
    print("Turbidity stats (FNU):", stats.getInfo())
    print("\n")

    pollution_risk = 0

    stats_dict = stats.getInfo()
    mean_val = stats_dict["turbidity_FNU_mean"]

    if mean_val is None:
        pollution_risk = 0

    elif mean_val <= 10:
        max(0, pollution_risk = 3 * mean_val)

    elif mean_val <= 50:
        pollution_risk = 0.49 * mean_val + 25.61
        
    elif mean_val <= 200:
        pollution_risk = 0.16 * mean_val + 42.84

    else:
        pollution_risk = min(0.03 * mean_val + 70, 100)

    pollution_risk = round(pollution_risk)

    print("--- Processing done ---")
    print("Pollution risk: ", pollution_risk, "\n")

    return pollution_risk


# Canal Somesul Mic
Somes_coord = [23.54912, 46.764343]
pollution_analysis(Somes_coord, "Somesul_mic")