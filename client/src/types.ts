export interface IRate {
    id: number;
    value: number;
    baseCurrency: string;
    targetCurrency: string;
    amount?: number;
    result?: number;
    createdAt: Date;
    
}