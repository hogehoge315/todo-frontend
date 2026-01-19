import { Card, HStack, Input, IconButton } from "@chakra-ui/react";
import { FiX, FiCheck } from "react-icons/fi";

interface EditTodoCardProps {
  editTodoTitle: string;
  setEditTodoTitle: (value: string) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  setIsComposing: (value: boolean) => void;
  handleCancelEdit: () => void;
  handleUpdateTodo: () => void;
  isUpdating: boolean;
}

export const EditTodoCard = ({
  editTodoTitle,
  setEditTodoTitle,
  handleKeyDown,
  setIsComposing,
  handleCancelEdit,
  handleUpdateTodo,
  isUpdating,
}: EditTodoCardProps) => {
  return (
    <Card.Root w="full" variant="outline" colorPalette="blue">
      <Card.Body p={4}>
        <HStack w="full" align="center">
          <Input
            flex="1"
            placeholder="Todoを編集..."
            value={editTodoTitle}
            onChange={(e) => setEditTodoTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            onCompositionStart={() => setIsComposing(true)}
            onCompositionEnd={() => setIsComposing(false)}
            autoFocus
          />
          <IconButton
            onClick={handleCancelEdit}
            variant="subtle"
            colorPalette="gray"
          >
            <FiX />
          </IconButton>
          <IconButton
            onClick={handleUpdateTodo}
            variant="subtle"
            colorPalette="blue"
            disabled={!editTodoTitle.trim() || isUpdating}
            loading={isUpdating}
          >
            <FiCheck />
          </IconButton>
        </HStack>
      </Card.Body>
    </Card.Root>
  );
};
