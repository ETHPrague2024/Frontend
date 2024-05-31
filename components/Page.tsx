import React from "react";
import { Navbar } from "@/components/Navbar";
import { Container } from "@chakra-ui/react";
import { fonts } from "@/config/fonts";

export const Page: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <main className={fonts.rubik.className}>
            <Navbar />
            <Container maxWidth="8xl">{children}</Container>
        </main>
    );
};
