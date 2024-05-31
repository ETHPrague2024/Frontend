import type { NextApiRequest, NextApiResponse } from "next";

const fetchAssetDetails = async (chainId: number, tokenAddress: string, tokenIndex?: number) => {
    if (!chainId || !tokenAddress || tokenAddress === "0x0000000000000000000000000000000000000000") {
        return null;
    }

    let url;
    if (tokenIndex !== undefined) {
        url = `https://api-staging.pwn.xyz/api/v1/asset/asset/${chainId}/${tokenAddress}/${tokenIndex}`;
    } else {
        url = `https://api-staging.pwn.xyz/api/v1/asset/asset/${chainId}/${tokenAddress}`;
    }

    const response = await fetch(url);
    if (!response.ok) {
        console.error(`Failed to fetch asset details from ${url}`);
        return null;
    }
    return response.json();
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getLoanEvents`);
        const loansData = await response.json();

        if (!response.ok) {
            throw new Error("Failed to fetch loans");
        }

        // Process the loans data
        const processedLoans = await Promise.all(
            loansData.map(async (loan: any) => {
                const convertBigNumberFields = (loan: any) => {
                    const convertedLoan: any = {};
                    for (const key in loan) {
                        if (loan[key]?.type === "BigNumber") {
                            const hexValue = loan[key].hex;
                            if (key === "tokenCollateralIndex") {
                                if (hexValue === "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff") {
                                    convertedLoan[key] = null;
                                    convertedLoan["collateralType"] = "erc-20";
                                } else {
                                    convertedLoan[key] = parseInt(hexValue, 16);
                                    convertedLoan["collateralType"] = "nft";
                                }
                            } else if (key === "tokenLoanIndex") {
                                if (hexValue === "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff") {
                                    convertedLoan[key] = null;
                                    convertedLoan["loanType"] = "erc-20";
                                } else {
                                    convertedLoan[key] = parseInt(hexValue, 16);
                                    convertedLoan["loanType"] = "nft";
                                }
                            } else {
                                convertedLoan[key] = parseInt(hexValue, 16);
                            }
                        } else {
                            convertedLoan[key] = loan[key];
                        }
                    }
                    return convertedLoan;
                };

                const convertedLoan = convertBigNumberFields(loan);

                if (convertedLoan.collateralType === "erc-20") {
                    convertedLoan.collateralDetails = await fetchAssetDetails(convertedLoan.chainId, convertedLoan.tokenCollateralAddress);
                } else {
                    convertedLoan.collateralDetails = await fetchAssetDetails(convertedLoan.chainId, convertedLoan.tokenCollateralAddress, convertedLoan.tokenCollateralIndex);
                }

                if (convertedLoan.loanType === "erc-20") {
                    convertedLoan.loanDetails = await fetchAssetDetails(convertedLoan.chainId, convertedLoan.tokenLoanAddress);
                } else {
                    convertedLoan.loanDetails = await fetchAssetDetails(convertedLoan.chainId, convertedLoan.tokenLoanAddress, convertedLoan.tokenLoanIndex);
                }

                return convertedLoan;
            })
        );

        res.status(200).json(processedLoans);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to process loans" });
    }
};

export default handler;
