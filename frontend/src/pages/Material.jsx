import { Box, Container, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import SubjectCard from "../components/cards/MaterialCard";
import Navbar from "../components/navbar/Navbar";

export default function Material() {
    return (
        <>
            <Navbar />
            <Box as="section">
                <Container maxW="container.xl" height="100vh">
                    <Stack direction="row" height="full" align="center" justify="space-between" spacing={8}>
                        <Box>
                            <Heading as="h1" fontSize="6x1">
                                Choose your interest!
                            </Heading>
                            <Text fontSize="3x1" opacity={0.9} mt={8}>
                                Search and select the major journey you want to know!
                            </Text>
                        </Box>

                        <HStack justify="space-between" py={16} spacing={8}>
                            <SubjectCard />
                            <SubjectCard />
                            <SubjectCard />
                            <SubjectCard />
                            <SubjectCard />
                            <SubjectCard />
                            <SubjectCard />
                        </HStack>
                    </Stack>
                </Container>
            </Box>
        </>
    )
}