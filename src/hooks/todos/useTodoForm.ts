import { useState } from "react";

/**
 * Todo追加フォームの状態管理を行うカスタムフック
 */
export const useTodoForm = (createTodo: (title: string) => Promise<void>) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [isComposing, setIsComposing] = useState(false);

  const handleAddTodo = async () => {
    if (newTodoTitle.trim()) {
      await createTodo(newTodoTitle);
      setNewTodoTitle("");
      setIsAdding(false);
    }
  };

  const handleCancelAdd = () => {
    setNewTodoTitle("");
    setIsAdding(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isComposing) {
      handleAddTodo();
    } else if (e.key === "Escape") {
      handleCancelAdd();
    }
  };

  return {
    isAdding,
    setIsAdding,
    newTodoTitle,
    setNewTodoTitle,
    isComposing,
    setIsComposing,
    handleAddTodo,
    handleCancelAdd,
    handleKeyDown,
  };
};
