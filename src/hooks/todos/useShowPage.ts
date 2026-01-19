import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Todo } from "@/types/todos";
import { toaster } from "@/components/ui/toaster";
import { todoClient } from "@/services/todoApi";

export const useShowPage = () => {
  const router = useRouter();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // フォーム関連の状態
  const [isAdding, setIsAdding] = useState(false);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [isComposing, setIsComposing] = useState(false);

  const goToPreviousPage = () => {
    router.push("/");
  };

  const fetchTodos = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await todoClient.fetchTodos();
      setTodos(data.items);

      toaster.success({
        title: "更新完了",
        description: "Todo一覧を更新しました",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      toaster.error({
        title: "更新失敗",
        description: "Todo一覧の取得に失敗しました",
      });
    } finally {
      setLoading(false);
    }
  };

  const createTodo = async (title: string) => {
    setLoading(true);
    setError(null);
    try {
      const newTodo = await todoClient.createTodo(title);
      setTodos((prevTodos) => [...prevTodos, newTodo]);

      toaster.success({
        title: "作成完了",
        description: "Todoを作成しました",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      toaster.error({
        title: "作成失敗",
        description: "Todoの作成に失敗しました",
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteTodo = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await todoClient.deleteTodo(id);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));

      toaster.success({
        title: "削除完了",
        description: "Todoを削除しました",
      });
    } catch (err) {
      toaster.error({
        title: "削除失敗",
        description: "Todoの削除に失敗しました",
      });
    } finally {
      setLoading(false);
    }
  };

  // フォーム関連のハンドラー
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

  useEffect(() => {
    fetchTodos();
  }, []);

  return {
    todos,
    loading,
    error,
    goToPreviousPage,
    fetchTodos,
    deleteTodo,
    createTodo,
    // フォーム関連
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
