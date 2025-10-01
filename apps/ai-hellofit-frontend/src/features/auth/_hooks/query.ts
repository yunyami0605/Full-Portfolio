import { serverStateConstants } from "@/shared/constants/serverStateConstants";
import { useQuery } from "@tanstack/react-query";
import { getAuthInfo } from "../_apis/auth.api";

/**
 *@description 자기 정보 조회 훅
 */
export const useGetAuthInfo = () => {
  return useQuery({
    queryKey: [serverStateConstants.auth.getInfo],
    queryFn: () => getAuthInfo(),
  });
};
