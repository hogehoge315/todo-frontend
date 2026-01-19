import { Card, HStack, Button, Text, IconButton } from "@chakra-ui/react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { Todo } from "@/types/todos";

interface TodoCardProps {
  todo: Todo;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  deletingId: number | null;
  onEdit?: () => void;
}

export const TodoCard = ({
  todo,
  toggleTodo,
  deleteTodo,
  deletingId,
  onEdit,
}: TodoCardProps) => {
  return (
    <Card.Root w="full" variant="outline">
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
            onClick={onEdit || (() => {})}
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
  );
};
