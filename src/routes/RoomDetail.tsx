import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getRoom, getRoomReviews } from "../api";
import { IReview, IRoomDetail } from "../types";
import {
  Box,
  Grid,
  Heading,
  Skeleton,
  Image,
  GridItem,
  VStack,
  HStack,
  Text,
  Avatar,
  Container,
} from "@chakra-ui/react";
import { FaStar } from "react-icons/fa6";

export default function RoomDetail() {
  const { roomPk } = useParams();

  const { isLoading, data } = useQuery<IRoomDetail>({
    queryKey: [`rooms`, roomPk],
    queryFn: getRoom,
  });

  const { data: reviewsData, isLoading: isReviewsLoading } = useQuery<
    IReview[]
  >({
    queryKey: [`rooms`, roomPk, `reviews`],
    queryFn: getRoomReviews,
  });

  const srcCheck = (src: string | undefined): string => {
    if (src !== undefined) {
      return src;
    } else {
      return "/images/noimage.png";
    }
  };

  return (
    <Box
      mt={10}
      px={{
        sm: 10,
        lg: 40,
      }}
    >
      <Skeleton height={"43px"} width={"25%"} isLoaded={!isLoading}>
        <Heading>{data?.name}</Heading>
      </Skeleton>
      <Grid
        rounded={"2xl"}
        overflow={"hidden"}
        mt={8}
        gap={3}
        h={"40vh"}
        templateRows={"1fr 1fr"}
        templateColumns={"repeat(4, 1fr)"}
      >
        {[0, 1, 2, 3, 4].map((index) => (
          <GridItem
            colSpan={index === 0 ? 2 : 1}
            rowSpan={index === 0 ? 2 : 1}
            overflow={"hidden"}
            key={index}
          >
            <Skeleton isLoaded={!isLoading} h={"100%"} w={"100%"}>
              <Image
                objectFit={"cover"}
                w="100%"
                h="100%"
                src={srcCheck(data?.photos[index]?.file)}
              />
            </Skeleton>
          </GridItem>
        ))}
      </Grid>
      <HStack w={"40%"} justifyContent={"space-between"} mt={10}>
        <VStack alignItems={"flex-start"}>
          <Skeleton isLoaded={!isLoading} h={"30px"}>
            <Heading fontSize={"2xl"}>
              House hosted by {data?.owner.name}
            </Heading>
          </Skeleton>
          <Skeleton isLoaded={!isLoading} h={"30px"}>
            <HStack justifyContent={"flex-start"} w={"100%"}>
              <Text>
                {data?.toilets} toilet{data?.toilets === 1 ? "" : "s"}
              </Text>
              <Text>•</Text>
              <Text>
                {data?.rooms} room{data?.rooms === 1 ? "" : "s"}
              </Text>
            </HStack>
          </Skeleton>
        </VStack>
        <Avatar name={data?.owner.name} size={"lg"} src={data?.owner.avatar} />
      </HStack>
      <Box mt={10}>
        <Box mb={5}>
          <Skeleton isLoaded={!isLoading && !isReviewsLoading} w={"25%"}>
            <Heading fontSize={"2xl"}>
              <HStack justifyContent={"flex-start"}>
                <FaStar /> <Text>{data?.rating}</Text>
                <Text>•</Text>
                <Text>
                  {reviewsData?.length} review
                  {reviewsData?.length === 1 ? "" : "s"}
                </Text>
              </HStack>
            </Heading>
          </Skeleton>
        </Box>

        <Container mt={16} maxW={"container.lg"} marginX={"none"}>
          <Skeleton isLoaded={!isReviewsLoading}>
            <Box w={"full"} h={"1000px"}>
              <Grid gap={10} templateColumns={"1fr 1fr"}>
                {reviewsData?.map((review, index) => (
                  <VStack alignItems={"flex-start"} key={index}>
                    <HStack>
                      <Avatar
                        name={review?.user?.name}
                        src={review?.user?.avatar}
                        size={"md"}
                      />
                      <VStack spacing={0} alignItems={"flex-start"}>
                        <Heading fontSize={"md"}>{review.user.name}</Heading>
                        <HStack spacing={1}>
                          <FaStar size={"12px"} />
                          <Text>{review.rating}</Text>
                        </HStack>
                      </VStack>
                    </HStack>
                    <Text>{review.payload}</Text>
                  </VStack>
                ))}
              </Grid>
            </Box>
          </Skeleton>
        </Container>
      </Box>
    </Box>
  );
}
