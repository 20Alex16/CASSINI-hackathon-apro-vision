import axios from "axios"

import { Company, CompanyReport } from '@/types'

const backend_api = process.env.REACT_APP_API_BACKEND || "api not defined";

function replaceLOCATION(str: string | undefined | null) {
    if (str == null || str == undefined) return undefined

    return str.replace("LOCATION", window.location.host)
}

const companiesAPI = axios.create({ baseURL: backend_api })

export async function getCompanies(): Promise<Company[]> {
    const response = await companiesAPI.get<Company[]>("/companies");
    return response.data;
}

export async function getReport(company_id: string | undefined): Promise<CompanyReport> {
    if (company_id === undefined){
        throw new Error("Undefined received when receiving report")
    }
    const response = await companiesAPI.get<CompanyReport>("/reports", { params: { id: company_id } });
    return response.data
}


