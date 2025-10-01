import { useQuery } from "@tanstack/react-query";
import { checkNicknameDuplicateApi } from "../_apis/auth.api";
import { serverStateConstants } from "@/shared/constants/serverStateConstants";

/**
 *@description check nickname duplicate
 */
export const useCheckNicknameDuplicateApi = (nickname: string) => {
  return useQuery({
    queryKey: [serverStateConstants.auth.checkNickname, nickname],
    queryFn: () => checkNicknameDuplicateApi(nickname),
    enabled: false,
  });
};
