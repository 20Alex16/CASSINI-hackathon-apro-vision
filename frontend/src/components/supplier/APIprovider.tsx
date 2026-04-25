import { getCompanies, getReport } from "@/services/api"
import { assignRisk } from "@/theme/theme"
import { Company, CompanyReport } from "@/types"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { createContext, ReactNode, useContext, useState } from "react"

const APIContext = createContext<{
    getCompany: (id: string) => Company | undefined,
    getCompanyReport: (id: string) => Promise<CompanyReport>,
    companies: Company[]
} | undefined>(undefined)

export function useAPI() {
    const context = useContext(APIContext)
    if (context === undefined) {
        throw new Error("useAPI must be used within a APIContext")
    }

    return context
}

export function APIprovider({ children }: { children: ReactNode }) {
    const [companies, setCompanies] = useState<Company[] | undefined>([])
    const queryClient = useQueryClient()

    const { error: error1, isError: isError1, isLoading: isLoading1 } = useQuery({
        queryKey: ['companies'],
        queryFn: () => getCompanies().then(comp => {
            setCompanies(comp);
            return comp;
        }),
    })

    if (isError1) {
        return <h2>{error1.message}</h2>
    }

    if (companies === undefined) {
        return <h2>Cannot retrieve companies</h2>
    }

    const getCompany = (id: string) => {
        const comp = companies.findLast(a => a.id.toString() == id!)
        if (comp === undefined)
            return undefined

        return assignRisk(comp)
    }

    const getCompanyReport = async (id: string): Promise<CompanyReport> =>
        queryClient.fetchQuery({
            queryKey: ['company', "report", id],
            queryFn: () => getReport(id)
        })

    return <APIContext.Provider value={{
        getCompany,
        getCompanyReport,
        companies
    }}>
        {children}
    </APIContext.Provider>
}