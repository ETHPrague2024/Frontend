import { useEffect, useState } from "react";
import { Box, Image, Table, Tbody, Td, Th, Thead, Tr, Flex, Text, Link, Button } from "@chakra-ui/react";
import { getDateFromBlockNumber } from "@/utilities/getDateFromBlockNumber";
import { formatDate } from "@/utilities/formatDate";
import { getNetworkName } from "@/utilities/getNetworkName";

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
    apr: number;
    ltv: number;
    duration: number;
    network: string;
    borrower: string; // Added borrower field
}

type SortConfig = {
    key: keyof LoanDisplay;
    direction: "ascending" | "descending";
};

interface LoansComponentProps {
    address?: string; // Added address prop
}

export const LoansComponent = ({ address }: LoansComponentProps) => {
    const [loans, setLoans] = useState<LoanDisplay[]>([]);
    const [sortConfig, setSortConfig] = useState<SortConfig>({ key: "loanID", direction: "ascending" });

    useEffect(() => {
        const fetchLoans = async () => {
            const response = await fetch("api/processLoans");
            const data = await response.json();

            const filteredData = data.filter((loan: any) => loan.type === "NewLoanAdvertised");

            const mappedData = filteredData.map(async (loan: any) => {
                const dateFromBlock = await getDateFromBlockNumber(loan.blockNumber);
                const networkName = await getNetworkName(loan.chainIdLoan.toString());
                return {
                    loanID: loan.loanID,
                    creationDate: formatDate(dateFromBlock as Date),
                    collateralImage: loan.collateralDetails.thumbnail_url,
                    collateralName: loan.collateralDetails.name,
                    collateralSymbol: loan.collateralDetails.symbol,
                    collateralAmount: loan.tokenCollateralAmount / Math.pow(10, loan.collateralDetails.decimals),
                    appraisal: Math.random() * 1000 + loan.tokenCollateralAmount / Math.pow(10, loan.collateralDetails.decimals), // Random appraisal
                    borrowAmount: loan.tokenLoanAmount / Math.pow(10, loan.collateralDetails.decimals),
                    borrowLoanName: loan.loanDetails.name,
                    borrowLoanSymbol: loan.loanDetails.symbol,
                    apr: 5, // Placeholder APR
                    ltv: 70, // Placeholder LTV
                    duration: loan.durationOfLoanSeconds / 86400,
                    network: networkName,
                    borrower: loan.borrower, // Added borrower field
                };
            });

            const loansData = await Promise.all(mappedData);

            // Apply address filter if address prop is provided
            const filteredLoans = address ? loansData.filter((loan) => loan.borrower.toLowerCase() === address.toLowerCase()) : loansData;
            setLoans(filteredLoans);
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
                        <Th onClick={() => sortLoans("apr")}>APR {sortConfig.key === "apr" ? (sortConfig.direction === "ascending" ? "↓" : "↑") : ""}</Th>
                        <Th onClick={() => sortLoans("ltv")}>LTV {sortConfig.key === "ltv" ? (sortConfig.direction === "ascending" ? "↓" : "↑") : ""}</Th>
                        <Th onClick={() => sortLoans("duration")}>Duration {sortConfig.key === "duration" ? (sortConfig.direction === "ascending" ? "↓" : "↑") : ""}</Th>
                        <Th onClick={() => sortLoans("network")}>Network {sortConfig.key === "network" ? (sortConfig.direction === "ascending" ? "↓" : "↑") : ""}</Th>
                        <Th></Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {loans.map((loan) => (
                        <Tr key={loan.loanID}>
                            <Td>
                                <Text>{loan.loanID}</Text>
                                <Text fontSize="sm" color="gray.500">
                                    {loan.creationDate}
                                </Text>
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
                            <Td>{loan.apr}%</Td>
                            <Td>{loan.ltv}%</Td>
                            <Td>{loan.duration} days</Td>
                            <Td>{loan.network}</Td>
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
