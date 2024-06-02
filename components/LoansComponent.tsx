import { useEffect, useState } from "react";
import { Box, Image, Table, Tbody, Td, Th, Thead, Tr, Flex, Text, Button } from "@chakra-ui/react";
import { getDateFromBlockNumber } from "@/utilities/getDateFromBlockNumber";
import { formatDate } from "@/utilities/formatDate";
import { getNetworkName } from "@/utilities/getNetworkName";
import Link from "next/link";

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
    borrower: string;
    pd: number;
}

type SortConfig = {
    key: keyof LoanDisplay;
    direction: "ascending" | "descending";
};

interface LoansComponentProps {
    address?: string;
}

export const LoansComponent: React.FC<LoansComponentProps> = ({ address }) => {
    const [loans, setLoans] = useState<LoanDisplay[]>([]);
    const [sortConfig, setSortConfig] = useState<SortConfig>({ key: "loanID", direction: "ascending" });

    useEffect(() => {
        const fetchLoans = async () => {
            const [loansResponse, pdResponse] = await Promise.all([fetch("/api/processLoans"), fetch("/api/calculatedPD")]);
            const loansData = await loansResponse.json();
            const pdData = await pdResponse.json();

            const pdMap: { [key: number]: number } = pdData.reduce((map: { [key: number]: number }, pdItem: { loanID: number; pd: number }) => {
                map[pdItem.loanID] = pdItem.pd;
                return map;
            }, {});

            const filteredData = loansData.filter((loan: any) => loan.type === "NewLoanAdvertised");

            const mappedData = await Promise.all(
                filteredData.map(async (loan: any) => {
                    const dateFromBlock = await getDateFromBlockNumber(loan.blockNumber);
                    const networkName = await getNetworkName(loan.chainIdLoan.toString());
                    const collateralAmount = loan.tokenCollateralAmount / Math.pow(10, loan.collateralDetails?.decimals || 18);
                    const borrowAmount = loan.tokenLoanAmount / Math.pow(10, loan.collateralDetails?.decimals || 18);
                    const appraisal = Math.random() * 1000 + collateralAmount;
                    const duration = loan.durationOfLoanSeconds / 86400;

                    const apr = ((Math.pow(borrowAmount / collateralAmount, 365 / duration) - 1) * 100).toFixed(2);
                    const ltv = ((borrowAmount / appraisal) * 100).toFixed(2);

                    return {
                        loanID: loan.loanID,
                        creationDate: formatDate(dateFromBlock as Date),
                        collateralImage: loan.collateralDetails?.thumbnail_url || "",
                        collateralName: loan.collateralDetails?.name || "Unknown",
                        collateralSymbol: loan.collateralDetails?.symbol || "Unknown",
                        collateralAmount: collateralAmount,
                        appraisal: appraisal,
                        borrowAmount: borrowAmount,
                        borrowLoanName: loan.loanDetails?.name || "Unknown",
                        borrowLoanSymbol: loan.loanDetails?.symbol || "Unknown",
                        apr: parseFloat(apr),
                        ltv: parseFloat(ltv),
                        duration: duration.toFixed(),
                        network: networkName,
                        borrower: loan.borrowerAddress,
                        pd: pdMap[loan.loanID] || 0,
                    };
                })
            );

            const filteredLoans = address ? mappedData.filter((loan) => loan.borrower.toLowerCase() === address.toLowerCase()) : mappedData;
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
                        {/* <Th cursor="pointer" onClick={() => sortLoans("apr")}>
                            APR {sortConfig.key === "apr" ? (sortConfig.direction === "ascending" ? "↓" : "↑") : ""}
                        </Th> */}
                        <Th cursor="pointer" onClick={() => sortLoans("ltv")}>
                            LTV {sortConfig.key === "ltv" ? (sortConfig.direction === "ascending" ? "↓" : "↑") : ""}
                        </Th>
                        <Th cursor="pointer" onClick={() => sortLoans("pd")}>
                            PD {sortConfig.key === "pd" ? (sortConfig.direction === "ascending" ? "↓" : "↑") : ""}
                        </Th>
                        <Th cursor="pointer" onClick={() => sortLoans("duration")}>
                            Duration {sortConfig.key === "duration" ? (sortConfig.direction === "ascending" ? "↓" : "↑") : ""}
                        </Th>
                        <Th cursor="pointer" onClick={() => sortLoans("network")}>
                            Network {sortConfig.key === "network" ? (sortConfig.direction === "ascending" ? "↓" : "↑") : ""}
                        </Th>
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
                            {/* <Td>{loan.apr}%</Td> */}
                            <Td>{loan.ltv}%</Td>
                            <Td>{loan.pd.toFixed(2)}%</Td>
                            <Td>{loan.duration} days</Td>
                            <Td>{loan.network.charAt(0).toUpperCase() + loan.network.slice(1)}</Td>
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
