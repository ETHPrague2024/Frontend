export const PWNLoanABI = [
    { anonymous: false, inputs: [{ indexed: false, internalType: "uint256", name: "loanId", type: "uint256" }], name: "LoanFilled", type: "event" },
    { anonymous: false, inputs: [{ indexed: false, internalType: "uint256", name: "loanId", type: "uint256" }], name: "LoanOfferRevoked", type: "event" },
    {
        anonymous: false,
        inputs: [
            { indexed: false, internalType: "uint256", name: "loanID", type: "uint256" },
            { indexed: false, internalType: "uint256", name: "chainId", type: "uint256" },
            { indexed: false, internalType: "address", name: "tokenCollateralAddress", type: "address" },
            { indexed: false, internalType: "uint256", name: "tokenCollateralAmount", type: "uint256" },
            { indexed: false, internalType: "uint256", name: "tokenCollateralIndex", type: "uint256" },
            { indexed: false, internalType: "address", name: "tokenLoanAddress", type: "address" },
            { indexed: false, internalType: "uint256", name: "tokenLoanAmount", type: "uint256" },
            { indexed: false, internalType: "uint256", name: "tokenLoanIndex", type: "uint256" },
            { indexed: false, internalType: "uint256", name: "durationOfLoanSeconds", type: "uint256" },
        ],
        name: "NewLoanAdvertised",
        type: "event",
    },
    {
        inputs: [
            { internalType: "address", name: "tokenCollateralAddress", type: "address" },
            { internalType: "uint256", name: "tokenCollateralAmount", type: "uint256" },
            { internalType: "uint256", name: "tokenCollateralIndex", type: "uint256" },
            { internalType: "address", name: "tokenLoanAddress", type: "address" },
            { internalType: "uint256", name: "tokenLoanAmount", type: "uint256" },
            { internalType: "uint256", name: "tokenLoanIndex", type: "uint256" },
            { internalType: "uint256", name: "durationOfLoanSeconds", type: "uint256" },
            { internalType: "uint256", name: "chainId", type: "uint256" },
            { internalType: "uint256", name: "loanId", type: "uint256" },
        ],
        name: "advertiseNewLoan",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            { internalType: "uint256", name: "chainId", type: "uint256" },
            { internalType: "uint256", name: "loanId", type: "uint256" },
        ],
        name: "fulfillLoan",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
        name: "loans",
        outputs: [
            { internalType: "address", name: "tokenCollateralAddress", type: "address" },
            { internalType: "uint256", name: "tokenCollateralAmount", type: "uint256" },
            { internalType: "uint256", name: "tokenCollateralIndex", type: "uint256" },
            { internalType: "address", name: "tokenLoanAddress", type: "address" },
            { internalType: "uint256", name: "tokenLoanAmount", type: "uint256" },
            { internalType: "uint256", name: "tokenLoanIndex", type: "uint256" },
            { internalType: "uint256", name: "durationOfLoanSeconds", type: "uint256" },
            { internalType: "address", name: "advertiser", type: "address" },
            { internalType: "uint256", name: "chainId", type: "uint256" },
            { internalType: "uint256", name: "loanId", type: "uint256" },
            { internalType: "enum PWNLoan.LoanState", name: "state", type: "uint8" },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            { internalType: "uint256", name: "chainId", type: "uint256" },
            { internalType: "uint256", name: "loanId", type: "uint256" },
        ],
        name: "revokeLoanOffer",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];

export const PWNLoanContract = "0x2b40c96d55e32B94cD5DcD112eE07FAbd4D1419F";