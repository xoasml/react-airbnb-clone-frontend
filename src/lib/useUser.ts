import { useQuery } from "@tanstack/react-query";
import { getMe } from "../apis/api";

export default function useUser() {
  const { isLoading, data, isError } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false, // reactquery는 요청에 에러가 있을때 약 4번정도 다시 시도를 하는데 retry: false를 설정하면 1번 시도
  });

  return {
    userLoading: isLoading,
    user: data,
    isLoggedIn: !isError,
  };
}
