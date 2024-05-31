import { Box, Flex, Stack } from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import { ConnectButton } from "./ConnectButton";

export const Navbar = () => {
    return (
        <Box px={4}>
            <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
                <Box>Logo</Box>

                <Stack direction={"row"} alignItems={"center"} spacing={4}>
                    <Link href="/">Link 1</Link>
                    <Link href="/">Link 2</Link>
                    <ConnectButton />
                </Stack>
            </Flex>
        </Box>
    );
};
