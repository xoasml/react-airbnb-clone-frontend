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
        <Button
          as="a"
          href="https://github.com/login/oauth/authorize?client_id=Ov23lir3uFzYk7Fyu6fl&scope=read:user,user:email"
          w={"100%"}
          leftIcon={<FaGithub />}
        >
          Continue with Github
        </Button>
        <Button w={"100%"} leftIcon={<FaComment />} colorScheme={"yellow"}>
          Continue with KaKao
        </Button>
      </VStack>
    </Box>
  );
}
