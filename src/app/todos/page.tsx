"use client";
import {
  Container,
  Heading,
  Text,
  VStack,
  Spinner,
  Button,
  HStack,
} from "@chakra-ui/react";
import { useShowPage } from "@/hooks/todos/useShowPage";
import { useTodoOperations } from "@/hooks/todos/useTodoOperations";
import { useTodoForm, useTodoEditForm } from "@/hooks/todos/useTodoForm";
import { NewTodoCard } from "@/components/features/todos/NewTodoCard";
import { EditTodoCard } from "@/components/features/todos/EditTodoCard";
import { TodoCard } from "@/components/features/todos/TodoCard";
import { FiPlus } from "react-icons/fi";

const ShowPage = () => {
  const { goToPreviousPage } = useShowPage();

  const {
    todos,
    loading,
    error,
    isCreating,
    isUpdating,
    deletingId,
    createTodo,
    deleteTodo,
    toggleTodo,
    updateTodo,
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

  const {
    editingId,
    editTodoTitle,
    setEditTodoTitle,
    setIsComposing: setIsEditComposing,
    startEdit,
    handleUpdateTodo,
    handleCancelEdit,
    handleKeyDown: handleEditKeyDown,
  } = useTodoEditForm(updateTodo);

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
            {todos.map((todo) =>
              editingId === todo.id ? (
                <EditTodoCard
                  key={todo.id}
                  editTodoTitle={editTodoTitle}
                  setEditTodoTitle={setEditTodoTitle}
                  handleKeyDown={handleEditKeyDown}
                  setIsComposing={setIsEditComposing}
                  handleCancelEdit={handleCancelEdit}
                  handleUpdateTodo={handleUpdateTodo}
                  isUpdating={isUpdating}
                />
              ) : (
                <TodoCard
                  key={todo.id}
                  todo={todo}
                  toggleTodo={toggleTodo}
                  deleteTodo={deleteTodo}
                  deletingId={deletingId}
                  onEdit={startEdit}
                />
              ),
            )}
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

        <HStack gap={4} justify="space-between">
          <Button
            variant="subtle"
            colorPalette="green"
            onClick={() => setIsAdding(true)}
            disabled={isAdding}
          >
            <FiPlus />
            追加
          </Button>
          <Button variant="subtle" onClick={goToPreviousPage}>
            戻る
          </Button>
        </HStack>
      </VStack>
    </Container>
  );
};

export default ShowPage;
