import { Box, Flex, Stack } from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import { ConnectButton } from "./ConnectButton";
import Image from "next/image";
import { useAccount } from "wagmi";

export const Navbar = () => {
    const { address } = useAccount();
    if (!address) return;
    return (
        <Box bg="brand.900" px={4}>
            <Flex h={20} alignItems={"center"} justifyContent={"space-between"}>
                <Stack direction={"row"} alignItems={"center"} spacing={4}>
                    <Link href="/" color="white" fontSize="2xl" _hover={{ color: "teal.500", textDecoration: "underline" }}>
                        <Image src="/logo.png" alt="Logo" width={200} height={70} />
                    </Link>
                </Stack>
                <Stack direction={"row"} alignItems={"center"} spacing={4}>
                    <Link href="/" color="white" fontSize="2xl" _hover={{ color: "teal.500", textDecoration: "underline" }}>
                        Requested Loans
                    </Link>
                    <Link href="/activeLoans" color="white" fontSize="2xl" _hover={{ color: "teal.500", textDecoration: "underline" }}>
                        Active Loans
                    </Link>
                    <Link href={`/profile/${address}`} color="white" fontSize="2xl" _hover={{ color: "teal.500", textDecoration: "underline" }}>
                        Profile
                    </Link>
                </Stack>
                <ConnectButton />
            </Flex>
        </Box>
    );
};
