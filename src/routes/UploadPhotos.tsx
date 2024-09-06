import {
  Box,
  Button,
  Container,
  FormControl,
  Heading,
  Input,
  useToast,
  VStack,
} from "@chakra-ui/react";
import ProtectedPage from "../components/ProtectedPage";
import useHostOnlyPage from "../components/HostOnlyPage";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  IRoomImageUpload,
  IUploadURLResponse,
} from "../apis/rooms/rooms.interface";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import roomsApi from "../apis/rooms/rooms.api";

export default function UploadPhotos() {
  const FILE_SIZE = 300 * 1024; // 300KB
  const IMAGE_FORMATS = ["image/*"];
  // const IMAGE_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
  // const AUDIO_FORMATS = ['audio/mpeg', 'audio/wav'];
  // const VIDEO_FORMATS = ['video/mp4', 'video/avi'];

  // const schema = yup.object({
  //   image: yup
  //     .mixed()
  //     .required()
  //     .test(
  //       "fileSize",
  //       "파일 크기가 너무 큽니다.",
  //       (value) => value && (value as File).size <= FILE_SIZE
  //     )
  //     .test(
  //       "fileFormat",
  //       "지원되지 않는 파일 형식입니다.",
  //       (value) => value && IMAGE_FORMATS.includes((value as File).type)
  //     ),
  // });
  const { register, handleSubmit, watch, reset } = useForm<IRoomImageUpload>();
  const { roomPk } = useParams();
  const toast = useToast();
  const createPhotoMutation = useMutation({
    mutationFn: roomsApi.createPhoto,
    onSuccess: () => {
      console.log("???????");
      toast({
        status: "success",
        isClosable: true,
        title: "Image uploaded",
        description: "Feel free to upload more images",
      });
      reset();
    },
  });
  const uploadImageMutation = useMutation({
    mutationFn: roomsApi.uploadImage,
    onSuccess: ({ result }: any) => {
      if (roomPk) {
        createPhotoMutation.mutate({
          description: "I Love React",
          file: `https://imagedelivery.net/1k3LuOA37XqEfyZ01U6YiA/${result.id}/public`,
          roomPk,
        });
      }
    },
    onError: (e) => {
      console.log(e);
    },
  });
  const uploadURLMutation = useMutation({
    mutationFn: roomsApi.getUploadURL,
    onSuccess: (data: IUploadURLResponse) => {
      uploadImageMutation.mutate({
        uploadURL: data.uploadURL,
        file: watch("image"),
      });
    },
  });
  const onSubmit = async () => {
    uploadURLMutation.mutate();
  };

  useHostOnlyPage();
  return (
    <ProtectedPage>
      <Box pb={40} mt={10} px={{ base: 10, lg: 40 }}>
        <Container>
          <Heading textAlign={"center"}>Upload a Photo</Heading>
          <VStack
            as="form"
            spacing={5}
            mt={10}
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormControl>
              <Input
                required
                {...register("image")}
                type="file"
                accept="image/*"
              />
            </FormControl>
            <Button
              isLoading={
                createPhotoMutation.isPending ||
                uploadImageMutation.isPending ||
                uploadURLMutation.isPending
              }
              type="submit"
              w="full"
              colorScheme="red"
            >
              Upload photo
            </Button>
          </VStack>
        </Container>
      </Box>
    </ProtectedPage>
  );
}
