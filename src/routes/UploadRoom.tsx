import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Text,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import useHostOnlyPage from "../components/HostOnlyPage";
import ProtectedPage from "../components/ProtectedPage";
import { FaBath, FaBed, FaSackDollar } from "react-icons/fa6";
import { useMutation, useQuery } from "@tanstack/react-query";
import RoomsApi from "../apis/rooms/rooms.api";
import { IAmenity, IUploadRoom } from "../apis/rooms/rooms.interface";
import CateGoryApi from "../apis/category/CateGoryApi";
import { ICategory } from "../apis/category/category.interface";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IRoomDetail } from "../types";
import { useNavigate } from "react-router-dom";

export default function UploadRoom() {
  const schema = yup.object({
    name: yup.string().required(),
    country: yup.string().required(),
    city: yup.string().required(),
    price: yup.number().required(),
    rooms: yup.number().required(),
    toilets: yup.number().required(),
    description: yup.string().required(),
    address: yup.string().required(),
    pet_friendly: yup.boolean().required(),
    kind: yup.string().required(),
    amenities: yup.array().required(),
    category: yup.number().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUploadRoom>({ resolver: yupResolver(schema) });

  const { data: amenities, isLoading: isAmenitiesLoading } = useQuery<
    IAmenity[]
  >({
    queryKey: ["amenities"],
    queryFn: RoomsApi.getAmenities,
  });

  const { data: categories, isLoading: isCategoriesLoading } = useQuery<
    ICategory[]
  >({
    queryKey: ["categories"],
    queryFn: CateGoryApi.getCategories,
  });

  const toast = useToast();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: RoomsApi.createRoom,
    onMutate: () => {
      console.log("start mutating");
    },
    onSuccess: (data: IRoomDetail) => {
      toast({
        status: "success",
        title: "방 생성",
        position: "bottom-right",
      });
      navigate(`/rooms/${data.id}`);
    },
    onError: () => {
      console.log("error mutate");
    },
  });

  const onSubmit = (data: IUploadRoom) => {
    mutation.mutate(data);
  };

  useHostOnlyPage();
  return (
    <ProtectedPage>
      <Box pb={40} mt={10} px={{ base: 10, lg: 40 }}>
        <Container>
          <Heading textAlign={"center"}>Upload Room</Heading>
          <VStack
            spacing={10}
            as="form"
            mt={5}
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormControl isRequired>
              <FormLabel>이름</FormLabel>
              <Input {...register("name")} required type="text" />
              <FormHelperText>숙소 이름을 적어주세요.</FormHelperText>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>국가</FormLabel>
              <Input {...register("country")} required type="text" />
              <FormHelperText>한국, 미국, 일본, ...</FormHelperText>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>도시</FormLabel>
              <Input {...register("city")} required type="text" />
              <FormHelperText>서울, LA, 도쿄, ...</FormHelperText>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>주소</FormLabel>
              <Input {...register("address")} required type="text" />
              <FormHelperText>숙소의 상세 주소를 적어주세요.</FormHelperText>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>요금</FormLabel>
              <InputGroup>
                <InputLeftAddon children={<FaSackDollar />} />
                <Input {...register("price")} type="number" min={0} />
              </InputGroup>
              <FormHelperText>일박에 얼마 인가요?</FormHelperText>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>방</FormLabel>
              <InputGroup>
                <InputLeftAddon children={<FaBed />} />
                <Input {...register("rooms")} type="number" min={0} />
              </InputGroup>
              <FormHelperText>방이 몇개 인가요?</FormHelperText>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>욕실</FormLabel>
              <InputGroup>
                <InputLeftAddon children={<FaBath />} />
                <Input {...register("toilets")} type="number" min={0} />
              </InputGroup>
              <FormHelperText>욕실이 몇개 인가요?</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>기타 설명</FormLabel>
              <Textarea
                {...register("description")}
                placeholder="추가 설명이나 자랑할 내용을 자유롭게 작성해주세요."
              />
            </FormControl>
            <FormControl>
              <Checkbox {...register("pet_friendly")}>
                반려동물 동반 가능
              </Checkbox>
            </FormControl>
            <FormControl>
              <FormLabel>숙소 구분</FormLabel>
              <Select
                {...register("kind")}
                placeholder="숙소 구분을 선택해주세요."
              >
                <option value="entire_place">독체</option>
                <option value="private_room">프라이빗 룸</option>
                <option value="shared_room">쉐어 룸</option>
              </Select>
              <FormHelperText>
                어떤 종류의 숙소를 대여할 생각이신가요?
              </FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>카테고리</FormLabel>
              <Select
                {...register("category")}
                placeholder="카테고리를 선택해주세요."
              >
                {categories?.map((category) => (
                  <option key={category.pk} value={category.pk}>
                    {category.name}
                  </option>
                ))}
              </Select>
              <FormHelperText>어떤 카테고리 인가요?</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>어메니티</FormLabel>
              <Grid templateColumns={"1fr 1fr"} gap={5}>
                {amenities?.map((amenity) => (
                  <Box key={amenity.pk}>
                    <Checkbox
                      value={amenity.pk}
                      {...register("amenities")}
                      key={amenity.pk}
                    >
                      {amenity.name}
                    </Checkbox>
                    <FormHelperText>{amenity.description}</FormHelperText>
                  </Box>
                ))}
              </Grid>
            </FormControl>
            {mutation.isError ? (
              <Text color={"red.500"}>뭔가 잘못 됐슈</Text>
            ) : null}
            <Button
              type="submit"
              isLoading={mutation.isPending}
              colorScheme="red"
              size={"lg"}
              w="100%"
            >
              방 게시하기
            </Button>
          </VStack>
        </Container>
      </Box>
    </ProtectedPage>
  );
}
