"use client";

import { Button, Container, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function CreatePage() {
  const router = useRouter();
  const goPreviousPage = () => {
    router.push("/");
  };

  return (
    <>
      <Container
        maxW="container.lg"
        h="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <VStack gap={8}>
          <Text fontSize="xl">ここはTodoの作成ページになる予定です。</Text>
          <Button onClick={goPreviousPage}>トップに戻る</Button>
        </VStack>
      </Container>
    </>
  );
}
