import { useEffect, useState } from "react";
import { Box, Table, Tbody, Td, Th, Thead, Tr, Flex, Text, Link, Button } from "@chakra-ui/react";

interface LoanDisplay {
    loanID: number;
    collateralSymbol: string;
    appraisal: number;
    borrowAmount: number;
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

                const mappedData = loansData.loanCreateds.map((loan: any) => ({
                    loanID: loan.loanId,
                    collateralSymbol: loan.terms_collateral_assetAddress,
                    appraisal: parseFloat(loan.terms_collateral_amount),
                    borrowAmount: parseFloat(loan.terms_asset_amount)
                }));

                const filteredLoans = address ? mappedData.filter((loan) => loan.borrower?.toLowerCase() === address.toLowerCase()) : mappedData;
                setLoans(filteredLoans);
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
                        <Th onClick={() => sortLoans("loanID")}>Loan {sortConfig.key === "loanID" ? (sortConfig.direction === "ascending" ? "↓" : "↑") : ""}</Th>
                        <Th onClick={() => sortLoans("collateralSymbol")}>Collateral {sortConfig.key === "collateralSymbol" ? (sortConfig.direction === "ascending" ? "↓" : "↑") : ""}</Th>
                        <Th onClick={() => sortLoans("appraisal")}>Appraisal {sortConfig.key === "appraisal" ? (sortConfig.direction === "ascending" ? "↓" : "↑") : ""}</Th>
                        <Th onClick={() => sortLoans("borrowAmount")}>Borrow {sortConfig.key === "borrowAmount" ? (sortConfig.direction === "ascending" ? "↓" : "↑") : ""}</Th>
                        <Th></Th>
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
                                    <Text>{loan.collateralSymbol}</Text>
                                </Flex>
                            </Td>
                            <Td>{loan.appraisal.toFixed(2)} $</Td>
                            <Td>{loan.borrowAmount.toFixed(2)}</Td>
                            <Td isNumeric>
                                <Link href={`/fundLoan/${loan.loanID}`}>
                                    <Button colorScheme="teal" size="md">
                                        Loan Details
                                    </Button>
                                </Link>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
};
