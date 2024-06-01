import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Flex, Text } from "@chakra-ui/react";
import { useAccount, useEnsName } from "wagmi";
import { ethers } from "ethers";
import { ActiveLoansComponent } from "@/components/ActiveLoansComponent";
import { RequestedLoansComponent } from "@/components/RequestedLoansComponent";
import { formatAddress } from "@/utilities/formatAddress";
import { LoansComponent } from "@/components/LoansComponent";

const LoanDetails: NextPage = () => {
    const router = useRouter();
    const { wallet } = router.query;
    const { address } = useAccount();
    const { data: ensName, isLoading } = useEnsName({ address });

    const displayAddress = ensName || formatAddress(address);

    if (!wallet || !ethers.utils.isAddress(wallet as string)) {
        console.error("Invalid or missing wallet address.");
        return <p>Invalid or missing wallet address.</p>;
    }

    if (address !== wallet) {
        console.error("Unauthorized access to loan details.");
        return <p>Unauthorized access to loan details.</p>;
    }

    return (
        <>
            <Head>
                <title>ETH Prague 2024 - Loan Details</title>
                <meta name="description" content={`Profile page of ${address}`} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                {/* <Flex bg="gray.900" color="white" align="start" justify="center" p={10}>
                    <Flex direction="column" w="full" maxW="7xl">
                        <Text fontSize="5xl" fontWeight="bold" mb={6} color="teal.200">
                            My Active Loans
                        </Text>
                        <ActiveLoansComponent address={address} />
                    </Flex>
                </Flex> */}
                <Flex bg="gray.900" color="white" minH="100vh" align="start" justify="center" p={10}>
                    <Flex direction="column" w="full" maxW="7xl">
                        <Text fontSize="5xl" fontWeight="bold" mb={6} color="teal.200">
                            My Requested Loans
                        </Text>
                        <LoansComponent address={address} />
                    </Flex>
                </Flex>
            </main>
        </>
    );
};

export default LoanDetails;
