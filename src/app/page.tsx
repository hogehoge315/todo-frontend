"use client";

import {
  Button,
  Container,
  Heading,
  LinkBox,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ColorModeButton } from "@/components/ui/color-mode";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const goToCreatePage = () => {
    router.push("/create");
  };

  return (
    <Container
      maxW="container.lg"
      h="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <VStack gap={8}>
        <Heading as="h1" size="2xl" textAlign="center">
          Welcome to the Todo App
        </Heading>
        <Text fontSize="xl" textAlign="center">
          Get started by creating a new todo item.
        </Text>
        <Button onClick={goToCreatePage} colorScheme="teal" size="lg">
          Go to Create Page
        </Button>
        <ColorModeButton />
      </VStack>
    </Container>
  );
}
