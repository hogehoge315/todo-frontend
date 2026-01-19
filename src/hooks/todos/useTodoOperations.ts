import { useEffect, useState } from "react";
import { Todo } from "@/types/todos";
import { toaster } from "@/components/ui/toaster";
import { todoClient } from "@/services/todoApi";

/**
 * Todo操作（CRUD）を管理するカスタムフック
 */
export const useTodoOperations = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const fetchTodos = async () => {
    setIsFetching(true);
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
      setIsFetching(false);
    }
  };

  const createTodo = async (title: string) => {
    setIsCreating(true);
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
      setIsCreating(false);
    }
  };

  const deleteTodo = async (id: number) => {
    setDeletingId(id);
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
      setDeletingId(null);
    }
  };

  const toggleTodo = async (id: number) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    try {
      const updatedTodo = await todoClient.updateTodo(id, {
        is_done: !todo.is_done,
      });
      setTodos((prevTodos) =>
        prevTodos.map((t) => (t.id === id ? updatedTodo : t)),
      );
    } catch (err) {
      toaster.error({
        title: "更新失敗",
        description: "Todoの更新に失敗しました",
      });
    }
  };

  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      try {
        const data = await todoClient.fetchTodos();
        setTodos(data.items);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    loadInitialData();
  }, []);

  return {
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
  };
};
