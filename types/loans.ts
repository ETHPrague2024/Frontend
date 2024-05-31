export interface EventBase {
    type: string;
}

export interface NewLoanAdvertisedEvent extends EventBase {
    type: "NewLoanAdvertised";
    loanID: number;
    chainId: number;
    tokenCollateralAddress: string;
    tokenCollateralAmount: number;
    tokenCollateralIndex: number;
    tokenLoanAddress: string;
    tokenLoanAmount: number;
    tokenLoanIndex: number;
    durationOfLoanSeconds: number;
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
