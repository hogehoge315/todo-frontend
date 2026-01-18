"use client";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  List,
  Spinner,
  Badge,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface Todo {
  id: number;
  title: string;
  is_done: boolean;
}

interface TodoListResponse {
  items: Todo[];
}

const ShowPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch("http://localhost:8000/todos");
        if (!response.ok) {
          throw new Error("Failed to fetch todos");
        }
        const data: TodoListResponse = await response.json();
        console.log(data);
        setTodos(data.items);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  if (loading) {
    return (
      <Container maxW="container.md" py={8}>
        <VStack gap={4}>
          <Spinner size="xl" />
          <Text>Loading todos...</Text>
        </VStack>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxW="container.md" py={8}>
        <Text color="red.500">Error: {error}</Text>
      </Container>
    );
  }

  return (
    <Container maxW="container.md" py={8}>
      <VStack gap={6} align="stretch">
        <Heading as="h1" size="xl">
          Todo List
        </Heading>
        {todos.length === 0 ? (
          <Text color="gray.500">No todos found.</Text>
        ) : (
          <List.Root gap={3}>
            {todos.map((todo) => (
              <List.Item key={todo.id}>
                <Box
                  p={4}
                  borderWidth="1px"
                  borderRadius="md"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Text
                    fontSize="lg"
                    textDecoration={todo.is_done ? "line-through" : "none"}
                  >
                    {todo.title}
                  </Text>
                  <Badge colorScheme={todo.is_done ? "green" : "gray"}>
                    {todo.is_done ? "Done" : "Pending"}
                  </Badge>
                </Box>
              </List.Item>
            ))}
          </List.Root>
        )}
      </VStack>
    </Container>
  );
};

export default ShowPage;
