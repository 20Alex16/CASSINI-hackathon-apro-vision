import axios from "axios";

import { Company, CompanyReport } from "@/types";

const backend_api =
    process.env.REACT_APP_API_BACKEND || "http://127.0.0.1:8000/api/v1";

const companiesAPI = axios.create({
    baseURL: backend_api,
});

type BackendSupplier = {
    id: string;
    name: string;
    country: string;
    sector: string;
};

type BackendLocation = {
    id: string;
    supplier_id: string;
    name: string;
    lat: number;
    lng: number;
};

type BackendChartPoint = {
    date: string;
    pollution_index: number;
    ndwi_mean: number | null;
    risk_level: "LOW" | "MEDIUM" | "HIGH";
};

type BackendLatestEvaluation = {
    pollution_index: number;
    risk_level: "LOW" | "MEDIUM" | "HIGH";
};

export async function getCompanies(): Promise<Company[]> {
    const response = await companiesAPI.get<BackendSupplier[]>("/suppliers");

    const suppliers = response.data;

    const companies = await Promise.all(
        suppliers.map(async (supplier, index) => {
            let risk_score = 0;
            let risk_level: "LOW" | "MEDIUM" | "HIGH" | undefined = undefined;
            let location = supplier.country;

            try {
                const locationsResponse = await companiesAPI.get<BackendLocation[]>(
                    `/suppliers/${supplier.id}/locations`
                );

                const firstLocation = locationsResponse.data[0];

                if (firstLocation) {
                    location = firstLocation.name;

                    const latestResponse =
                        await companiesAPI.get<BackendLatestEvaluation>(
                            `/suppliers/${supplier.id}/locations/${firstLocation.id}/evaluations/latest`
                        );

                    risk_score = latestResponse.data.pollution_index;
                    risk_level = latestResponse.data.risk_level;
                }
            } catch {
                risk_score = 0;
            }

            return {
                id: index + 1,
                risk_score,
                name: supplier.name,
                location,
                risk_level,
            };
        })
    );

    return companies;
}

export async function getReport(
    company_id: string | undefined
): Promise<CompanyReport> {
    if (company_id === undefined) {
        throw new Error("Undefined received when receiving report");
    }

    const suppliersResponse = await companiesAPI.get<BackendSupplier[]>("/suppliers");

    const supplier =
        suppliersResponse.data.find((_, index) => String(index + 1) === company_id) ||
        suppliersResponse.data.find((supplier) => supplier.id === company_id);

    if (!supplier) {
        throw new Error("Supplier not found");
    }

    const locationsResponse = await companiesAPI.get<BackendLocation[]>(
        `/suppliers/${supplier.id}/locations`
    );

    const firstLocation = locationsResponse.data[0];

    if (!firstLocation) {
        return {
            id: supplier.id,
            pollution_index: 0,
            data: [],
        };
    }

    const chartResponse = await companiesAPI.get<BackendChartPoint[]>(
        `/suppliers/${supplier.id}/locations/${firstLocation.id}/evaluations/chart`
    );

    const data = chartResponse.data.map((point) => ({
        date: point.date,
        value: point.pollution_index,
    }));

    const latestPollutionIndex =
        chartResponse.data.length > 0
            ? chartResponse.data[chartResponse.data.length - 1].pollution_index
            : 0;

    return {
        id: supplier.id,
        pollution_index: latestPollutionIndex,
        data,
    };
}