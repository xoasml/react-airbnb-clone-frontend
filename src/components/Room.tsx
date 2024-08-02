import {
  Box,
  Button,
  Grid,
  HStack,
  Image,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { FaRegHeart, FaStar } from "react-icons/fa6";

export default function Room() {
  const gray = useColorModeValue("gray.600", "gray.300");

  return (
    <VStack alignItems={"flex-start"}>
      <Box position={"relative"} overflow={"hidden"} mb={3} rounded={"2xl"}>
        <Image
          objectFit={"cover"}
          minH="280"
          src="https://a0.muscache.com/im/pictures/miso/Hosting-54213085/original/ddb110ec-b878-41ea-9081-7d526abdb327.jpeg?im_w=720"
        />
        <Button
          variant={"unstyled"}
          cursor={"pointer"}
          position={"absolute"}
          top={"0"}
          right={"0"}
          color={"white"}
        >
          <FaRegHeart size={"20px"} />
        </Button>
      </Box>
      <Box>
        <Grid gap={2} templateColumns={"6fr 1fr"}>
          <Text as={"b"} noOfLines={1} fontSize={"md"}>
            스페인 말라가, 가나다라마바사아자차카타파하
          </Text>
          <HStack
            _hover={{
              color: "red.100",
            }}
            spacing={1}
          >
            <FaStar size={"15px"} />
            <Text> 5.0</Text>
          </HStack>
        </Grid>
        <Text fontSize={"sm"} color={gray}>
          seoul, S. Korea
        </Text>
      </Box>
      <Text fontSize={"sm"} color={gray}>
        <Text as={"b"}>$72</Text> / night
      </Text>
    </VStack>
  );
}
