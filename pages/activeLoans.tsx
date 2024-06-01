import { Flex, Text, Image, Table, Thead, Tbody, Tr, Th, Td, Button } from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import Link from "next/link";
import { activeLoans, ActiveSortConfig } from "@/types/loans";

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
        endsOn: "14/06/2024",
        network: "Ethereum",
        loanCreated: "30/05/2024",
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
        endsOn: "14/06/2024",
        network: "Ethereum",
        loanCreated: "30/05/2024",
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
        endsOn: "14/06/2024",
        network: "Sepolia",
        loanCreated: "01/06/2024",
    },
];

const ActiveList: NextPage = () => {
    const [loans, setLoans] = useState<activeLoans[]>([]);
    const [sortConfig, setSortConfig] = useState<ActiveSortConfig>({ key: "id", direction: "descending" });

    useEffect(() => {
        const sortedLoans = mockLoans.sort((a, b) => {
            return sortConfig.direction === "ascending" ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id);
        });
        setLoans(sortedLoans);
    }, [loans, sortConfig.direction]);

    const sortLoans = (key: keyof activeLoans): void => {
        const direction = sortConfig.key === key && sortConfig.direction === "ascending" ? "descending" : "ascending";
        const sortedLoans = [...loans].sort((a, b) => {
            if (typeof a[key] === "string" && typeof b[key] === "string") {
                return direction === "ascending" ? a[key].localeCompare(b[key]) : b[key].localeCompare(a[key]);
            } else if (typeof a[key] === "number" && typeof b[key] === "number") {
                return direction === "ascending" ? a[key] - b[key] : b[key] - a[key];
            }
            return 0;
        });
        setLoans(sortedLoans);
        setSortConfig({ key, direction });
    };

    const headers: { name: string; key: keyof activeLoans }[] = [
        { name: "Loan", key: "id" },
        { name: "Collateral", key: "collateralName" },
        { name: "Appraisal", key: "appraisal" },
        { name: "Borrow", key: "borrowAmount" },
        { name: "APR", key: "apr" },
        { name: "LTV", key: "ltv" },
        { name: "Ends On", key: "endsOn" },
        { name: "Network", key: "network" },
    ];

    return (
        <>
            <Head>
                <title>ETH Prague 2024 - Requested Loans</title>
                <meta name="description" content="Overview of all requested loans" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Flex bg="gray.900" color="white" minH="100vh" align="start" justify="center" p={10}>
                <Flex direction="column" w="full" maxW="7xl">
                    <Text fontSize="5xl" fontWeight="bold" mb={6} color="teal.200">
                        Active Loans [MainNet]
                    </Text>
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
                                    <Td>{loan.endsOn}</Td>
                                    <Td>{loan.network}</Td>
                                    <Td isNumeric>
                                        <Link href={`/loan/${loan.id}`}>
                                            <Button colorScheme="teal" size="md">
                                                Details
                                            </Button>
                                        </Link>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </Flex>
            </Flex>
        </>
    );
};

export default ActiveList;
