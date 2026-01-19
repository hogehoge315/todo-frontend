import { Todo, TodoListResponse } from "@/types/todos";

const API_BASE_URL = "http://localhost:8000";

export const todoClient = {
  /**
   * Todo一覧を取得
   */
  async fetchTodos(): Promise<TodoListResponse> {
    const response = await fetch(`${API_BASE_URL}/todos`);
    if (!response.ok) {
      throw new Error("Failed to fetch todos");
    }
    return response.json();
  },

  /**
   * Todoを作成
   */
  async createTodo(title: string): Promise<Todo> {
    const response = await fetch(`${API_BASE_URL}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });
    if (!response.ok) {
      throw new Error("Failed to create todo");
    }
    return response.json();
  },

  /**
   * Todoを更新
   */
  async updateTodo(
    id: number,
    updates: { title?: string; is_done?: boolean },
  ): Promise<Todo> {
    const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    });
    if (!response.ok) {
      throw new Error("Failed to update todo");
    }
    return response.json();
  },

  /**
   * Todoを削除
   */
  async deleteTodo(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete todo");
    }
  },
};
