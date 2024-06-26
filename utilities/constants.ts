export const PWNLoanABI = [
    {
        inputs: [],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "loanId",
                type: "uint256",
            },
        ],
        name: "LoanClaimed",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "loanId",
                type: "uint256",
            },
        ],
        name: "LoanFilled",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "loanId",
                type: "uint256",
            },
        ],
        name: "LoanOfferRevoked",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "borrowerAddress",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "loanID",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "chainIdLoan",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "address",
                name: "tokenCollateralAddress",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "tokenCollateralAmount",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "tokenCollateralIndex",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "address",
                name: "tokenLoanAddress",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "tokenLoanAmount",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "tokenLoanIndex",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "tokenLoanRepaymentAmount",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "durationOfLoanSeconds",
                type: "uint256",
            },
        ],
        name: "NewLoanAdvertised",
        type: "event",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "tokenCollateralAddress",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenCollateralAmount",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "tokenCollateralIndex",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "tokenLoanAddress",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenLoanAmount",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "tokenLoanIndex",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "tokenLoanRepaymentAmount",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "durationOfLoanSeconds",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "chainIdLoan",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "loanId",
                type: "uint256",
            },
            {
                internalType: "enum IPWNSimpleLoanSimpleRequest.Category",
                name: "tokenCollateralCategory",
                type: "uint8",
            },
            {
                internalType: "uint256",
                name: "tokenCollateralId",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "loanYield",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "expiration",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "borrower",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "nonce",
                type: "uint256",
            },
            {
                internalType: "bytes",
                name: "signature",
                type: "bytes",
            },
        ],
        name: "advertiseNewLoan",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "chainIdCollateral",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "chainIdLoan",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "loanId",
                type: "uint256",
            },
        ],
        name: "claimLoan",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "chainIdCollateral",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "chainIdLoan",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "loanId",
                type: "uint256",
            },
        ],
        name: "fulfillLoan",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "chainId",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "loanId",
                type: "uint256",
            },
        ],
        name: "getLoan",
        outputs: [
            {
                components: [
                    {
                        internalType: "address",
                        name: "tokenCollateralAddress",
                        type: "address",
                    },
                    {
                        internalType: "uint256",
                        name: "tokenCollateralAmount",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "tokenCollateralIndex",
                        type: "uint256",
                    },
                    {
                        internalType: "enum IPWNSimpleLoanSimpleRequest.Category",
                        name: "tokenCollateralCategory",
                        type: "uint8",
                    },
                    {
                        internalType: "uint256",
                        name: "tokenCollateralId",
                        type: "uint256",
                    },
                    {
                        internalType: "address",
                        name: "tokenLoanAddress",
                        type: "address",
                    },
                    {
                        internalType: "uint256",
                        name: "tokenLoanAmount",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "tokenLoanIndex",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "tokenLoanRepaymentAmount",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "loanYield",
                        type: "uint256",
                    },
                    {
                        internalType: "uint32",
                        name: "durationOfLoanSeconds",
                        type: "uint32",
                    },
                    {
                        internalType: "uint40",
                        name: "expiration",
                        type: "uint40",
                    },
                    {
                        internalType: "address",
                        name: "borrower",
                        type: "address",
                    },
                    {
                        internalType: "address",
                        name: "advertiser",
                        type: "address",
                    },
                    {
                        internalType: "address",
                        name: "filler",
                        type: "address",
                    },
                    {
                        internalType: "bytes",
                        name: "signature",
                        type: "bytes",
                    },
                    {
                        internalType: "uint256",
                        name: "nonce",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "chainIdLoan",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "loanId",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "onchainLoadId",
                        type: "uint256",
                    },
                    {
                        internalType: "enum PWNLoan.LoanState",
                        name: "state",
                        type: "uint8",
                    },
                ],
                internalType: "struct PWNLoan.Loan",
                name: "",
                type: "tuple",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "loanNFT",
        outputs: [
            {
                internalType: "contract IPWNLOAN",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        name: "loans",
        outputs: [
            {
                internalType: "address",
                name: "tokenCollateralAddress",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenCollateralAmount",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "tokenCollateralIndex",
                type: "uint256",
            },
            {
                internalType: "enum IPWNSimpleLoanSimpleRequest.Category",
                name: "tokenCollateralCategory",
                type: "uint8",
            },
            {
                internalType: "uint256",
                name: "tokenCollateralId",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "tokenLoanAddress",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenLoanAmount",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "tokenLoanIndex",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "tokenLoanRepaymentAmount",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "loanYield",
                type: "uint256",
            },
            {
                internalType: "uint32",
                name: "durationOfLoanSeconds",
                type: "uint32",
            },
            {
                internalType: "uint40",
                name: "expiration",
                type: "uint40",
            },
            {
                internalType: "address",
                name: "borrower",
                type: "address",
            },
            {
                internalType: "address",
                name: "advertiser",
                type: "address",
            },
            {
                internalType: "address",
                name: "filler",
                type: "address",
            },
            {
                internalType: "bytes",
                name: "signature",
                type: "bytes",
            },
            {
                internalType: "uint256",
                name: "nonce",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "chainIdLoan",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "loanId",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "onchainLoadId",
                type: "uint256",
            },
            {
                internalType: "enum PWNLoan.LoanState",
                name: "state",
                type: "uint8",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "operator",
                type: "address",
            },
            {
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
            {
                internalType: "bytes",
                name: "data",
                type: "bytes",
            },
        ],
        name: "onERC721Received",
        outputs: [
            {
                internalType: "bytes4",
                name: "",
                type: "bytes4",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "pwnSimpleLoan",
        outputs: [
            {
                internalType: "contract IPWNSimpleLoan",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "pwnSimpleLoanSimpleRequest",
        outputs: [
            {
                internalType: "contract IPWNSimpleLoanSimpleRequest",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "chainIdCollateral",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "loanId",
                type: "uint256",
            },
        ],
        name: "revokeLoanOffer",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];

export const PWNLoanContract = "0x7152807c576F3464DC43E5ac2136DE1B7bD2dE97";
