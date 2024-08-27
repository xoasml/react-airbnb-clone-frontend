import { Heading, Spinner, Text, useToast, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { kakaoLogIn } from "../apis/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function KakaoConfirm() {
  const { search } = useLocation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const toast = useToast();

  const mutation = useMutation({
    mutationFn: kakaoLogIn,
    onSuccess: () => {
      toast({
        status: "success",
        title: "Welcome!",
        description: "Happy to have you back!",
        position: "bottom-right",
      });
      // 성공하면 home으로 이동
      queryClient.refetchQueries({ queryKey: ["me"] });
      navigate("/");
    },
  });

  const confirmLogin = () => {
    const params = new URLSearchParams(search);
    const code = params.get("code");
    if (code) {
      mutation.mutate(code);
    }
  };

  useEffect(() => {
    confirmLogin();
  }, []);
  return (
    <VStack justifyContent={"center"} mt="40">
      <Heading>Processing log in... </Heading>
      <Text>Dont go anywhere.</Text>
      <Spinner size="lg" />
    </VStack>
  );
}
