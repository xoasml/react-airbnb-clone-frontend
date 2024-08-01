import { Box, Button, Divider, HStack, Text, VStack } from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";
import { FaComment } from "react-icons/fa6";

export default function SocialLogin() {
  return (
    <Box mb={4}>
      <HStack my={8}>
        <Divider />
        <Text
          textTransform={"uppercase"}
          color={"gray.500"}
          fontSize={"xs"}
          as={"b"}
        >
          Or
        </Text>
        <Divider />
      </HStack>
      <VStack>
        <Button w={"100%"} leftIcon={<FaGithub />} colorScheme={"blackAlpha"}>
          Continue with Github
        </Button>
        <Button w={"100%"} leftIcon={<FaComment />} colorScheme={"yellow"}>
          Continue with KaKao
        </Button>
      </VStack>
    </Box>
  );
}
