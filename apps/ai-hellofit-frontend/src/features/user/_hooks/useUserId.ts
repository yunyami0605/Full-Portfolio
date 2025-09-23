import { useAccessTokenStore } from "@/features/auth/_stores/accessToken.store";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

type JwtPayload = {
  sub?: string;
  userId?: number;
  exp?: number;
  iat?: number;
};

/**
 *@description jwt에서 user id 조회
 */
export function useUserId() {
  const { accessToken } = useAccessTokenStore();
  const [userId, setUserId] = useState<string | null | undefined>(null);

  useEffect(() => {
    if (!accessToken) {
      setUserId(null);
      return;
    }

    try {
      const decoded = jwtDecode<JwtPayload>(accessToken);
      setUserId(decoded.sub);
    } catch (e) {
      setUserId(null);
    }
  }, [accessToken]);

  return userId;
}
