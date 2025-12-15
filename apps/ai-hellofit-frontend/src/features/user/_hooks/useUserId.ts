import { useGetAuthInfo } from "@/features/auth/_hooks/query";
/**
 *@description 서버의 자기 정보 조회 결과에서 userId를 반환
 */
export function useUserId(): string | null {
  const { data } = useGetAuthInfo();
  // 기대 구조: { data: { id: string, ... } }
  return (data as any)?.data?.id ?? null;
}
