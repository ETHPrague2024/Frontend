import { Flex, Text, Image, Table, Thead, Tbody, Tr, Th, Td, Button } from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import Link from "next/link";
import { requestedLoans, RequestedSortConfig } from "@/types/loans";

const mockLoans = [
    {
        id: "1",
        collateralImage: "https://api.pwn.xyz/static/erc20_coin_svg_icons/usdc.svg",
        collateralName: "BCD",
        collateralAmount: 4500,
        appraisal: 4700,
        borrowName: "ETH",
        borrowAmount: 1.7,
        apr: 1.5,
        ltv: 80,
        duration: 30,
        network: "Ethereum",
        loanCreated: "30/05/2024",
        borrower: "0x1234567890abcdef1234567890abcdef12345678",
    },
    {
        id: "2",
        collateralImage: "https://api.pwn.xyz/static/erc20_coin_svg_icons/usdc.svg",
        collateralName: "USDC",
        collateralAmount: 5000,
        appraisal: 5200,
        borrowName: "ETH",
        borrowAmount: 2,
        apr: 2.5,
        ltv: 70,
        duration: 30,
        network: "Ethereum",
        loanCreated: "30/05/2024",
        borrower: "0xd0CdA22aa822C5ee4C3cE4586e72ea54B33F9eF1",
    },
    {
        id: "3",
        collateralImage: "https://api.pwn.xyz/static/erc20_coin_svg_icons/usdc.svg",
        collateralName: "ABCD",
        collateralAmount: 1234,
        appraisal: 1250,
        borrowName: "WETH",
        borrowAmount: 0.7,
        apr: 2.5,
        ltv: 15,
        duration: 60,
        network: "Sepolia",
        loanCreated: "01/06/2024",
        borrower: "0x1234567890abcdef1234567890abcdef12345678",
    },
];

interface RequestedLoansComponentProps {
    address?: string;
}

export const RequestedLoansComponent: NextPage<RequestedLoansComponentProps> = ({ address }) => {
    const [loans, setLoans] = useState<requestedLoans[]>([]);
    const [sortConfig, setSortConfig] = useState<RequestedSortConfig>({ key: "id", direction: "descending" });

    useEffect(() => {
        let filteredLoans = mockLoans;
        if (address) {
            filteredLoans = mockLoans.filter((loan) => loan.borrower.toLowerCase() === address.toLowerCase());
        }
        const sortedLoans = filteredLoans.sort((a, b) => {
            return sortConfig.direction === "ascending" ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id);
        });
        setLoans(sortedLoans);
    }, [address, sortConfig]);

    const sortLoans = (key: keyof requestedLoans): void => {
        const direction = sortConfig.key === key && sortConfig.direction === "ascending" ? "descending" : "ascending";
        setSortConfig({ key, direction });
    };

    const headers: { name: string; key: keyof requestedLoans }[] = [
        { name: "Loan", key: "id" },
        { name: "Collateral", key: "collateralName" },
        { name: "Appraisal", key: "appraisal" },
        { name: "Borrow", key: "borrowAmount" },
        { name: "APR", key: "apr" },
        { name: "LTV", key: "ltv" },
        { name: "Duration", key: "duration" },
        { name: "Network", key: "network" },
    ];

    return (
        <Table variant="simple" colorScheme="teal" size="lg" fontSize="lg">
            <Thead>
                <Tr>
                    {headers.map(({ name, key }) => (
                        <Th key={name} px={4} py={3} onClick={() => sortLoans(key)} cursor="pointer">
                            {name} {sortConfig.key === key ? (sortConfig.direction === "ascending" ? "↓" : "↑") : ""}
                        </Th>
                    ))}
                    <Th px={4} py={3}></Th>
                </Tr>
            </Thead>
            <Tbody>
                {loans.map((loan) => (
                    <Tr key={loan.id}>
                        <Td>
                            <Text>{loan.id}</Text>
                            <Text fontSize="sm" color="gray.500">
                                {loan.loanCreated}
                            </Text>
                        </Td>
                        <Td>
                            <Flex align="center">
                                <Image boxSize="60px" src={loan.collateralImage} alt="Collateral" mr={3} />
                                {loan.collateralName} <br />({loan.collateralAmount})
                            </Flex>
                        </Td>
                        <Td>{loan.appraisal} $</Td>
                        <Td>
                            {loan.borrowAmount} {loan.borrowName}
                        </Td>
                        <Td>{loan.apr}%</Td>
                        <Td>{loan.ltv}%</Td>
                        <Td>{loan.duration} days</Td>
                        <Td>{loan.network}</Td>
                        <Td isNumeric>
                            <Link href={`/fundLoan/${loan.id}`}>
                                <Button colorScheme="teal" size="md">
                                    Details
                                </Button>
                            </Link>
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
};
