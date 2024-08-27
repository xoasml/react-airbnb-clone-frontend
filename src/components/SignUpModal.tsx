import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa6";
import SocialLogin from "./SocialLogin";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import UsersApi from "../apis/users/users.api";
import { ISignUp } from "../apis/users/users.interface";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const schema = yup.object({
  name: yup
    .string()
    .matches(/^[^0-9]*$/, "유저이름에 숫자 포함 불가")
    .min(2, "최소 2글자")
    .max(150, "최대 150 글자")
    .required(),
  email: yup.string().email("email 형식이 아닙니다.").required(),
  username: yup
    .string()
    .matches(/^[^0-9]*$/, "유저이름에 숫자 포함 불가")
    .min(2, "최소 2글자")
    .max(150, "최대 150 글자")
    .required(),
  password: yup
    .string()
    .min(4, "최소 4글자")
    .max(50, "최대 50 글자")
    .required(),
});

export default function SignUpModal({ isOpen, onClose }: SignUpModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ISignUp>({ resolver: yupResolver(schema) });

  const onError = (errors: FieldValues) => {
    console.log(errors);
  };

  const toast = useToast();

  const modalClose = () => {
    onClose();
    reset();
  };

  const mutation = useMutation({
    mutationFn: UsersApi.signUpFetch,
    onMutate: () => {
      console.log("mutation starting");
    },
    onSuccess: () => {
      toast({
        title: "회원가입 성공, 로그인 후 이용하세요.",
        status: "success",
      });
      modalClose();
    },
    onError: () => {
      toast({
        title: "동일한 Eamil이 존재 합니다.",
        status: "error",
      });
    },
  });

  const onSubmit: SubmitHandler<ISignUp> = (data) => {
    console.log(data);
    mutation.mutate(data);
  };
  return (
    <Modal isOpen={isOpen} onClose={modalClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>Sign up</ModalHeader>
        <ModalBody as="form" onSubmit={handleSubmit(onSubmit, onError)}>
          <VStack>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={"gray.500"}>
                    <FaUser />
                  </Box>
                }
              />
              <Input
                variant={"filled"}
                placeholder="Name"
                isInvalid={Boolean(errors.name?.message)}
                {...register("name")}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={"gray.500"}>
                    <FaEnvelope />
                  </Box>
                }
              />
              <Input
                variant={"filled"}
                placeholder="Email"
                isInvalid={Boolean(errors.email?.message)}
                {...register("email")}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={"gray.500"}>
                    <FaUser />
                  </Box>
                }
              />
              <Input
                variant={"filled"}
                placeholder="Username"
                {...register("username")}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={"gray.500"}>
                    <FaLock />
                  </Box>
                }
              />
              <Input
                type="password"
                variant={"filled"}
                placeholder="Password"
                {...register("password")}
              />
            </InputGroup>
          </VStack>
          <Button
            isLoading={mutation.isPending}
            type={"submit"}
            mt={4}
            colorScheme={"red"}
            w={"100%"}
          >
            Sign up
          </Button>
          <SocialLogin />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
