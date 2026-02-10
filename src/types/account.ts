export default interface Account{
    balance: number,
    clientId: string,
    type: AccountType,
    createdAt: Date,
    transactions: Array<Transaction>
    _id?: string
}

export interface Transaction{
    from : string,
    to: string,
    amount: number,
    _id: string
}

export enum AccountType{
    credit,
    debit
}