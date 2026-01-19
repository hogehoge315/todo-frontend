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

/**
 * Todo編集フォームの状態管理を行うカスタムフック
 */
export const useTodoEditForm = (
  updateTodo: (id: number, title: string) => Promise<void>,
) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTodoTitle, setEditTodoTitle] = useState("");
  const [isComposing, setIsComposing] = useState(false);

  const startEdit = (id: number, currentTitle: string) => {
    setEditingId(id);
    setEditTodoTitle(currentTitle);
  };

  const handleUpdateTodo = async () => {
    if (editingId !== null && editTodoTitle.trim()) {
      await updateTodo(editingId, editTodoTitle);
      setEditTodoTitle("");
      setEditingId(null);
    }
  };

  const handleCancelEdit = () => {
    setEditTodoTitle("");
    setEditingId(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isComposing) {
      handleUpdateTodo();
    } else if (e.key === "Escape") {
      handleCancelEdit();
    }
  };

  return {
    editingId,
    editTodoTitle,
    setEditTodoTitle,
    isComposing,
    setIsComposing,
    startEdit,
    handleUpdateTodo,
    handleCancelEdit,
    handleKeyDown,
  };
};
