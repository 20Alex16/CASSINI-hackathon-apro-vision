import ee

from app.core.config import GEE_PROJECT_ID, MAX_CLOUD_PERCENTAGE


class SatelliteEvaluationService:
    def __init__(self):
        self.project_id = GEE_PROJECT_ID
        self.initialized = False
        self.max_cloud_percentage = MAX_CLOUD_PERCENTAGE

    def _initialize_ee(self):
        if not self.initialized:
            ee.Initialize(project=self.project_id)
            self.initialized = True

    def evaluate_location(
        self,
        lat: float,
        lng: float,
        start_date: str,
        end_date: str,
        buffer_meters: int = 500
    ) -> dict:
        self._initialize_ee()

        center = ee.Geometry.Point([lng, lat])
        aoi = center.buffer(buffer_meters).bounds()

        collection = (
            ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED")
            .filterBounds(aoi)
            .filterDate(start_date, end_date)
            .filter(
                ee.Filter.lt(
                    "CLOUDY_PIXEL_PERCENTAGE",
                    self.max_cloud_percentage
                )
            )
            .sort("CLOUDY_PIXEL_PERCENTAGE")
        )

        size = collection.size().getInfo()

        if size == 0:
            return {
                "valid": False,
                "ndwi_mean": None,
                "water_detected": False,
                "pollution_index": None,
                "risk_level": "NO_DATA",
                "thumbnail_url": None,
                "message": "No valid Sentinel-2 image found for this interval."
            }

        image = collection.first()

        ndwi = image.normalizedDifference(["B3", "B8"]).rename("NDWI")

        ndwi_mean = (
            ndwi.reduceRegion(
                reducer=ee.Reducer.mean(),
                geometry=aoi,
                scale=10,
                maxPixels=1e9
            )
            .get("NDWI")
            .getInfo()
        )

        if ndwi_mean is None:
            return {
                "valid": False,
                "ndwi_mean": None,
                "water_detected": False,
                "pollution_index": None,
                "risk_level": "NO_DATA",
                "thumbnail_url": None,
                "message": "NDWI could not be computed for this interval."
            }

        water_mask = ndwi.gt(0).rename("water")
        water_clean = water_mask.focal_min(1).focal_max(1)
        water_only = image.updateMask(water_clean)

        water_pixels = (
            water_clean.reduceRegion(
                reducer=ee.Reducer.sum(),
                geometry=aoi,
                scale=10,
                maxPixels=1e9
            )
            .get("water")
            .getInfo()
        )

        water_detected = water_pixels is not None and water_pixels > 0

        pollution_index, risk_level = self._compute_risk(
            ndwi_mean=ndwi_mean,
            water_detected=water_detected
        )

        thumbnail_url = water_only.getThumbURL({
            "region": aoi,
            "dimensions": 2048,
            "format": "jpg",
            "bands": ["B4", "B3", "B2"],
            "min": 0,
            "max": 3000
        })

        return {
            "valid": True,
            "ndwi_mean": ndwi_mean,
            "water_detected": water_detected,
            "pollution_index": pollution_index,
            "risk_level": risk_level,
            "thumbnail_url": thumbnail_url,
            "message": "Satellite-based environmental risk indicators were computed successfully."
        }

    def _compute_risk(self, ndwi_mean: float, water_detected: bool):
        if water_detected and ndwi_mean < 0:
            return 80, "HIGH"

        if ndwi_mean < -0.25:
            return 80, "HIGH"

        if ndwi_mean < 0.15:
            return 55, "MEDIUM"

        return 25, "LOW"