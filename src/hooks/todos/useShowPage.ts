import { useRouter } from "next/navigation";

/**
 * Todo一覧ページのナビゲーション機能を提供するカスタムフック
 */
export const useShowPage = () => {
  const router = useRouter();

  const goToPreviousPage = () => {
    router.push("/");
  };

  return {
    goToPreviousPage,
  };
};
