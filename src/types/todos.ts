/* Todoアイテムの型定義ファイル */
export interface Todo {
  id: number;
  title: string;
  is_done: boolean;
}

/* Todoリスト取得APIのレスポンス型定義ファイル */
export interface TodoListResponse {
  items: Todo[];
}
