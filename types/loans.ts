export interface EventBase {
    type: string;
}

export interface NewLoanAdvertisedEvent extends EventBase {
    type: "NewLoanAdvertised";
    borrowerAddress: string;
    loanID: number;
    chainIdLoan: number;
    tokenCollateralAddress: string;
    tokenCollateralAmount: number;
    tokenCollateralIndex: number;
    tokenLoanAddress: string;
    tokenLoanAmount: number;
    tokenLoanIndex: number;
    tokenLoanRepaymentAmount: number;
    durationOfLoanSeconds: number;
    blockNumber: number;
}

export interface LoanFilledEvent extends EventBase {
    type: "LoanFilled";
    loanId: number;
}

export interface LoanOfferRevokedEvent extends EventBase {
    type: "LoanOfferRevoked";
    loanId: number;
}

export type LoanEvent = NewLoanAdvertisedEvent | LoanFilledEvent | LoanOfferRevokedEvent;

export interface requestedLoans {
    id: string;
    collateralImage: string;
    collateralName: string;
    collateralAmount: number;
    appraisal: number;
    borrowName: string;
    borrowAmount: number;
    apr: number;
    ltv: number;
    duration: number;
    network: string;
    loanCreated: string;
}

export interface activeLoans {
    id: string;
    collateralImage: string;
    collateralName: string;
    collateralAmount: number;
    appraisal: number;
    borrowName: string;
    borrowAmount: number;
    apr: number;
    ltv: number;
    endsOn: string;
    network: string;
    loanCreated: string;
}

export interface RequestedSortConfig {
    key: keyof requestedLoans | null;
    direction: "ascending" | "descending";
}

export interface ActiveSortConfig {
    key: keyof activeLoans | null;
    direction: "ascending" | "descending";
}

export interface Loan {
    type: string;
    loanID: number;
    tokenCollateralAddress: string;
    tokenCollateralAmount: number;
    collateralType: string;
    tokenLoanAddress: string;
    tokenLoanAmount: number;
    loanType: string;
    durationOfLoanSeconds: number;
}
