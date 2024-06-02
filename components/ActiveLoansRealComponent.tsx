import { useEffect, useState } from "react";
import { Box, Table, Tbody, Td, Th, Thead, Tr, Flex, Text, Link, Button, Image } from "@chakra-ui/react";
import { getDateFromBlockNumber } from "@/utilities/getDateFromBlockNumber";
import { getNetworkName } from "@/utilities/getNetworkName";
import { formatDate } from "@/utilities/formatDate";

interface LoanDisplay {
    loanID: number;
    creationDate: string;
    collateralImage: string;
    collateralName: string;
    collateralSymbol: string;
    collateralAmount: number;
    appraisal: number;
    borrowAmount: number;
    borrowLoanName: string;
    borrowLoanSymbol: string;
    ltv: number;
    duration: number;
    network: string;
    borrower: string;
}

type SortConfig = {
    key: keyof LoanDisplay;
    direction: "ascending" | "descending";
};

interface ActiveLoansRealComponentProps {
    address?: string;
}

export const ActiveLoansRealComponent = ({ address }: ActiveLoansRealComponentProps) => {
    const [loans, setLoans] = useState<LoanDisplay[]>([]);
    const [sortConfig, setSortConfig] = useState<SortConfig>({ key: "loanID", direction: "ascending" });

    useEffect(() => {
        const fetchLoans = async () => {
            try {
                const loansResponse = await fetch("/api/existedLoans");
                const loansData = await loansResponse.json();

                console.log("Fetched loans data:", loansData);

                if (!loansData.loanCreateds || !Array.isArray(loansData.loanCreateds)) {
                    throw new Error("Unexpected response format, expected an array of loanCreateds");
                }

                const mappedData = await Promise.all(
                    loansData.loanCreateds.map(async (loan: any) => {
                        if (!loan.moreInfo) return null;
                        const collateralAmount = loan.terms_collateral_amount / Math.pow(10, loan.moreInfo.collateral?.decimals ?? 18);
                        const borrowAmount = loan.terms_asset_amount / Math.pow(10, loan.moreInfo.desired_asset?.decimals ?? 18);
                        const appraisal = Math.random() * 1000 + collateralAmount;
                        const duration = loan.moreInfo.desired_duration / 86400;

                        const ltv = ((borrowAmount / appraisal) * 100).toFixed(2);

                        return {
                            loanID: loan.loanId ?? 0,
                            collateralImage: loan.moreInfo.collateral?.collection?.thumbnail_url ?? "https://api.pwn.xyz/static/default_asset_images/default_erc20_asset_image.svg",
                            collateralName: loan.moreInfo.collateral?.name ?? "Unknown",
                            collateralSymbol: loan.moreInfo.collateral?.collection?.symbol ?? "Unknown",
                            collateralAmount: collateralAmount,
                            appraisal: appraisal,
                            borrowAmount: borrowAmount,
                            borrowLoanName: loan.moreInfo.desired_asset?.name ?? "Unknown",
                            borrowLoanSymbol: loan.moreInfo.desired_asset?.symbol ?? "Unknown",
                            ltv: parseFloat(ltv),
                            duration: parseFloat(duration.toFixed(2)),
                            borrower: loan.moreInfo.borrower_address ?? "",
                        };
                    })
                );

                const filteredLoans = address ? mappedData.filter((loan) => loan && loan.borrower.toLowerCase() === address.toLowerCase()) : mappedData;
                setLoans(filteredLoans.filter(Boolean));
            } catch (error) {
                console.error("Error fetching loans:", error);
            }
        };

        fetchLoans();
    }, [address]);

    const sortLoans = (key: keyof LoanDisplay) => {
        const direction: "ascending" | "descending" = sortConfig.key === key && sortConfig.direction === "ascending" ? "descending" : "ascending";

        setSortConfig({ key, direction });

        const sortedLoans = [...loans].sort((a, b) => {
            if (a[key] < b[key]) {
                return direction === "ascending" ? -1 : 1;
            }
            if (a[key] > b[key]) {
                return direction === "ascending" ? 1 : -1;
            }
            return 0;
        });

        setLoans(sortedLoans);
    };

    return (
        <Box width="full" overflowX="auto">
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th cursor="pointer" onClick={() => sortLoans("loanID")}>
                            Loan {sortConfig.key === "loanID" ? (sortConfig.direction === "ascending" ? "↓" : "↑") : ""}
                        </Th>
                        <Th cursor="pointer" onClick={() => sortLoans("collateralSymbol")}>
                            Collateral {sortConfig.key === "collateralSymbol" ? (sortConfig.direction === "ascending" ? "↓" : "↑") : ""}
                        </Th>
                        <Th cursor="pointer" onClick={() => sortLoans("appraisal")}>
                            Appraisal {sortConfig.key === "appraisal" ? (sortConfig.direction === "ascending" ? "↓" : "↑") : ""}
                        </Th>
                        <Th cursor="pointer" onClick={() => sortLoans("borrowAmount")}>
                            Borrow {sortConfig.key === "borrowAmount" ? (sortConfig.direction === "ascending" ? "↓" : "↑") : ""}
                        </Th>
                        <Th cursor="pointer" onClick={() => sortLoans("ltv")}>
                            LTV {sortConfig.key === "ltv" ? (sortConfig.direction === "ascending" ? "↓" : "↑") : ""}
                        </Th>
                        <Th cursor="pointer" onClick={() => sortLoans("duration")}>
                            Duration {sortConfig.key === "duration" ? (sortConfig.direction === "ascending" ? "↓" : "↑") : ""}
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {loans.map((loan) => (
                        <Tr key={loan.loanID}>
                            <Td>
                                <Text>{loan.loanID}</Text>
                            </Td>
                            <Td>
                                <Flex align="center">
                                    <Image boxSize="60px" src={loan.collateralImage} alt="Collateral" mr={3} />
                                    {loan.collateralSymbol} <br />({loan.collateralAmount.toFixed(2)})
                                </Flex>
                            </Td>
                            <Td>{loan.appraisal.toFixed(2)} $</Td>
                            <Td>
                                {loan.borrowAmount.toFixed(2)} {loan.borrowLoanSymbol}
                            </Td>
                            <Td>{loan.ltv}%</Td>
                            <Td>{loan.duration} days</Td>
                            {/* <Td isNumeric>
                                <Link href={`/fundLoan/${loan.loanID}`}>
                                    <Button colorScheme="teal" size="md">
                                        Loan Details
                                    </Button>
                                </Link>
                            </Td> */}
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
};
