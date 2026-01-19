"use client";

import { Button, Container, Heading, Text, VStack } from "@chakra-ui/react";
import { ColorModeButton } from "@/components/ui/color-mode";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const goToCreatePage = () => {
    router.push("/create");
  };

  const goToShowPage = () => {
    router.push("/todos");
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
          Todoアプリへようこそ
        </Heading>
        <Text fontSize="xl" textAlign="center">
          工事中
        </Text>
        <Button onClick={goToCreatePage} colorScheme="teal" size="lg">
          作成ページへ
        </Button>

        <Text fontSize="xl" textAlign="center">
          Todoアプリを表示します。
        </Text>
        <Button onClick={goToShowPage} colorScheme="teal" size="lg">
          Todoアプリページへ
        </Button>
        <ColorModeButton />
      </VStack>
    </Container>
  );
}
