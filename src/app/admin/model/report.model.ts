export interface ChartData {
    labels: string[];
    datasets: { label: string; data: number[]; backgroundColor?: string[]; borderColor?: string; fill?: boolean }[];
}

export interface Transaction {
    id: string;
    property: string;
    buyer: string;
    amount: number;
    date: Date;
    status: string;
}

export interface ReportData {
    salesData: ChartData;
    propertyTypeData: ChartData;
    topAgents: { name: string; sales: number; revenue: number; image: string }[];
    recentTransactions: Transaction[];
}
