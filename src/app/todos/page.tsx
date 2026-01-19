"use client";
import {
  Container,
  Heading,
  Text,
  VStack,
  Spinner,
  Button,
  HStack,
  Box,
} from "@chakra-ui/react";
import { useShowPage } from "@/hooks/todos/useShowPage";
import { useTodoOperations } from "@/hooks/todos/useTodoOperations";
import { useTodoForm } from "@/hooks/todos/useTodoForm";
import { NewTodoCard } from "@/components/features/todos/NewTodoCard";
import { TodoCard } from "@/components/features/todos/TodoCard";
import { FiPlus, FiRotateCw } from "react-icons/fi";

const ShowPage = () => {
  const { goToPreviousPage } = useShowPage();

  const {
    todos,
    loading,
    error,
    isFetching,
    isCreating,
    deletingId,
    fetchTodos,
    createTodo,
    deleteTodo,
    toggleTodo,
  } = useTodoOperations();

  const {
    isAdding,
    setIsAdding,
    newTodoTitle,
    setNewTodoTitle,
    setIsComposing,
    handleAddTodo,
    handleCancelAdd,
    handleKeyDown,
  } = useTodoForm(createTodo);

  if (loading) {
    return (
      <Container maxW="container.md" py={8}>
        <VStack gap={4}>
          <Spinner size="xl" />
          <Text>Todoを読み込み中...</Text>
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
          Todo一覧
        </Heading>

        {todos.length === 0 ? (
          <Text color="gray.500">Todoが見つかりません。</Text>
        ) : (
          <VStack gap={3}>
            {todos.map((todo) => (
              <TodoCard
                key={todo.id}
                todo={todo}
                toggleTodo={toggleTodo}
                deleteTodo={deleteTodo}
                deletingId={deletingId}
              />
            ))}
          </VStack>
        )}

        {isAdding && (
          <NewTodoCard
            newTodoTitle={newTodoTitle}
            setNewTodoTitle={setNewTodoTitle}
            handleKeyDown={handleKeyDown}
            setIsComposing={setIsComposing}
            handleCancelAdd={handleCancelAdd}
            handleAddTodo={handleAddTodo}
            isCreating={isCreating}
          />
        )}

        <HStack gap={4}>
          <Button
            variant="subtle"
            colorPalette="green"
            onClick={() => setIsAdding(true)}
            disabled={isAdding}
          >
            <FiPlus />
            追加
          </Button>
          <Box flex="1" />
          <Button variant="subtle" onClick={goToPreviousPage}>
            戻る
          </Button>
          <Button
            variant="subtle"
            onClick={fetchTodos}
            colorPalette="blue"
            loading={isFetching}
          >
            <FiRotateCw />
            {isFetching ? "更新中..." : "更新"}
          </Button>
        </HStack>
      </VStack>
    </Container>
  );
};

export default ShowPage;
