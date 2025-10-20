let cachedServiceToken: string | null = null;
let expiresAt = 0;

/**
 *@description 서비스 키 발급하는 함수
 */
export async function getServiceTokenServerApi() {
  // 이미 유효한 토큰이 있으면 캐시 재사용
  if (cachedServiceToken && Date.now() < expiresAt - 5000) {
    return cachedServiceToken;
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/service/token`, {
    method: "POST",
    headers: {
      "X-API-KEY": process.env.SERVICE_API_KEY!,
    },
  });

  if (!res.ok) throw new Error("서비스 토큰 발급 실패");

  const data = await res.json();

  cachedServiceToken = data.access_token;
  expiresAt = Date.now() + 60 * 60 * 1000; // 1시간 유효

  return cachedServiceToken;
}
