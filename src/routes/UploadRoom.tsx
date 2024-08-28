import {
  Box,
  Checkbox,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  InputAddon,
  InputGroup,
  InputLeftAddon,
  Select,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import useHostOnlyPage from "../components/HostOnlyPage";
import ProtectedPage from "../components/ProtectedPage";
import { FaBath, FaBed, FaSackDollar } from "react-icons/fa6";

export default function UploadRoom() {
  useHostOnlyPage();
  return (
    <ProtectedPage>
      <Box pb={40} mt={10} px={{ base: 10, lg: 40 }}>
        <Container>
          <Heading textAlign={"center"}>Upload Room</Heading>
          <VStack spacing={5} as="form" mt={5}>
            <FormControl isRequired>
              <FormLabel>이름</FormLabel>
              <Input required type="text" />
              <FormHelperText>숙소 이름을 적어주세요.</FormHelperText>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>국가</FormLabel>
              <Input required type="text" />
              <FormHelperText>한국, 미국, 일본, ...</FormHelperText>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>도시</FormLabel>
              <Input required type="text" />
              <FormHelperText>서울, LA, 도쿄, ...</FormHelperText>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>주소</FormLabel>
              <Input required type="text" />
              <FormHelperText>숙소의 상세 주소를 적어주세요.</FormHelperText>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>요금</FormLabel>
              <InputGroup>
                <InputLeftAddon children={<FaSackDollar />} />
                <Input type="number" min={0} />
              </InputGroup>
              <FormHelperText>일박에 얼마 인가요?</FormHelperText>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>방</FormLabel>
              <InputGroup>
                <InputLeftAddon children={<FaBed />} />
                <Input type="number" min={0} />
              </InputGroup>
              <FormHelperText>방이 몇개 인가요?</FormHelperText>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>욕실</FormLabel>
              <InputGroup>
                <InputLeftAddon children={<FaBath />} />
                <Input type="number" min={0} />
              </InputGroup>
              <FormHelperText>욕실이 몇개 인가요?</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>기타 설명</FormLabel>
              <Textarea placeholder="추가 설명이나 자랑할 내용을 자유롭게 작성해주세요." />
            </FormControl>
            <FormControl>
              <Checkbox>반려동물 동반 가능</Checkbox>
            </FormControl>
            <FormControl>
              <FormLabel>숙소 구분</FormLabel>
              <Select placeholder="하나를 선택해주세요.">
                <option value="entire_place">독체</option>
                <option value="private_room">프라이빗 방</option>
                <option value="shared_room">쉐어 룸</option>
              </Select>
              <FormHelperText>
                어떤 종류의 숙소를 대여할 생각이신가요?
              </FormHelperText>
            </FormControl>
          </VStack>
        </Container>
      </Box>
    </ProtectedPage>
  );
}
