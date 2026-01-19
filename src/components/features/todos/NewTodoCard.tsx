import { Card, HStack, Input, IconButton } from "@chakra-ui/react";
import { FiX, FiCheck } from "react-icons/fi";

interface NewTodoCardProps {
  newTodoTitle: string;
  setNewTodoTitle: (value: string) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  setIsComposing: (value: boolean) => void;
  handleCancelAdd: () => void;
  handleAddTodo: () => void;
  isCreating: boolean;
}

export const NewTodoCard = ({
  newTodoTitle,
  setNewTodoTitle,
  handleKeyDown,
  setIsComposing,
  handleCancelAdd,
  handleAddTodo,
  isCreating,
}: NewTodoCardProps) => {
  return (
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
  );
};
