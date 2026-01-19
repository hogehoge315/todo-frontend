"use client";
import {
  Container,
  Heading,
  Text,
  VStack,
  Spinner,
  Button,
  HStack,
  IconButton,
  Card,
  Box,
  Input,
} from "@chakra-ui/react";
import { useShowPage } from "@/hooks/todos/useShowPage";
import {
  FiEdit,
  FiPlus,
  FiRotateCw,
  FiTrash2,
  FiX,
  FiCheck,
} from "react-icons/fi";

const ShowPage = () => {
  const {
    todos,
    loading,
    error,
    goToPreviousPage,
    fetchTodos,
    deleteTodo,
    toggleTodo,
    isFetching,
    isCreating,
    deletingId,
    isAdding,
    setIsAdding,
    newTodoTitle,
    setNewTodoTitle,
    setIsComposing,
    handleAddTodo,
    handleCancelAdd,
    handleKeyDown,
  } = useShowPage();

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
              <Card.Root key={todo.id} w="full" variant="outline">
                <Card.Body p={4}>
                  <HStack w="full" align="center">
                    <Button
                      size="xs"
                      colorPalette={todo.is_done ? "green" : "gray"}
                      variant="subtle"
                      onClick={() => toggleTodo(todo.id)}
                    >
                      {todo.is_done ? "完了" : "未完了"}
                    </Button>
                    <Text
                      flex="1"
                      fontSize="lg"
                      textDecoration={todo.is_done ? "line-through" : "none"}
                    >
                      {todo.title}
                    </Text>
                    <IconButton
                      onClick={() => {}}
                      variant="subtle"
                      colorPalette="gray"
                    >
                      <FiEdit />
                    </IconButton>
                    <IconButton
                      onClick={() => deleteTodo(todo.id)}
                      variant="plain"
                      colorPalette="red"
                      disabled={deletingId === todo.id}
                      loading={deletingId === todo.id}
                    >
                      <FiTrash2 />
                    </IconButton>
                  </HStack>
                </Card.Body>
              </Card.Root>
            ))}
          </VStack>
        )}

        {isAdding && (
          <Card.Root w="full" variant="outline" colorPalette="green">
            <Card.Body p={4}>
              <HStack w="full" align="center">
                <Input
                  flex="1"
                  placeholder="新しいTodoを入力..."
                  value={newTodoTitle}
                  onChange={(e) => setNewTodoTitle(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onCompositionStart={() => setIsComposing(true)}
                  onCompositionEnd={() => setIsComposing(false)}
                  autoFocus
                />
                <IconButton
                  onClick={handleCancelAdd}
                  variant="subtle"
                  colorPalette="gray"
                >
                  <FiX />
                </IconButton>
                <IconButton
                  onClick={handleAddTodo}
                  variant="subtle"
                  colorPalette="green"
                  disabled={!newTodoTitle.trim() || isCreating}
                  loading={isCreating}
                >
                  <FiCheck />
                </IconButton>
              </HStack>
            </Card.Body>
          </Card.Root>
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
