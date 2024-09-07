import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getRoom, getRoomReviews } from "../apis/api";
import { IReview, IRoomDetail } from "../types";
import { Helmet } from "react-helmet";
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
  Button,
} from "@chakra-ui/react";
import { FaStar } from "react-icons/fa6";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";
import roomsApi from "../apis/rooms/rooms.api";
import type { Value } from "react-calendar/dist/cjs/shared/types";

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

  const [dates, setDates] = useState<Value>(new Date());
  const {
    data: checkBookingData,
    isLoading: isCheckingBooking,
    refetch,
  } = useQuery({
    queryKey: ["check", roomPk, dates],
    queryFn: roomsApi.checkBooking,
    enabled: Array.isArray(dates) ? (dates.length > 1 ? true : false) : false,
    gcTime: 0,
  });

  return (
    <Box
      mt={10}
      px={{
        sm: 10,
        lg: 40,
      }}
    >
      <Helmet>
        <title>{data ? data.name : "Loading..."}</title>
      </Helmet>
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
              {data?.photos && data.photos.length > 0 ? (
                <Image
                  objectFit={"cover"}
                  w="100%"
                  h="100%"
                  src={srcCheck(data?.photos[index]?.file)}
                />
              ) : null}
            </Skeleton>
          </GridItem>
        ))}
      </Grid>

      <Grid gap={60} templateColumns={"2fr 1fr"}>
        <Box>
          <HStack justifyContent={"space-between"} mt={10}>
            <VStack alignItems={"flex-start"}>
              <Skeleton isLoaded={!isLoading} height={"30px"}>
                <Heading fontSize={"2xl"}>
                  House hosted by {data?.owner.name}
                </Heading>
              </Skeleton>
              <Skeleton isLoaded={!isLoading} height={"30px"}>
                <HStack justifyContent={"flex-start"} w="100%">
                  <Text>
                    {data?.toilets} toliet{data?.toilets === 1 ? "" : "s"}
                  </Text>
                  <Text>∙</Text>
                  <Text>
                    {data?.rooms} room{data?.rooms === 1 ? "" : "s"}
                  </Text>
                </HStack>
              </Skeleton>
            </VStack>
            <Avatar
              name={data?.owner.name}
              size={"xl"}
              src={data?.owner.avatar}
            />
          </HStack>
          <Box mt={10}>
            <Heading mb={5} fontSize={"2xl"}>
              <HStack>
                <FaStar /> <Text>{data?.rating}</Text>
                <Text>∙</Text>
                <Text>
                  {reviewsData?.length} review
                  {reviewsData?.length === 1 ? "" : "s"}
                </Text>
              </HStack>
            </Heading>
            <Container mt={16} maxW="container.lg" marginX="none">
              <Grid gap={10} templateColumns={"1fr 1fr"}>
                {reviewsData?.map((review, index) => (
                  <VStack alignItems={"flex-start"} key={index}>
                    <HStack>
                      <Avatar
                        name={review.user.name}
                        src={review.user.avatar}
                        size="md"
                      />
                      <VStack spacing={0} alignItems={"flex-start"}>
                        <Heading fontSize={"md"}>{review.user.name}</Heading>
                        <HStack spacing={1}>
                          <FaStar size="12px" />
                          <Text>{review.rating}</Text>
                        </HStack>
                      </VStack>
                    </HStack>
                    <Text>{review.payload}</Text>
                  </VStack>
                ))}
              </Grid>
            </Container>
          </Box>
        </Box>
        <Box mt={10}>
          <Calendar
            value={dates}
            onChange={setDates}
            prev2Label={null} // 전년도로 이동 버튼 제거
            next2Label={null} // 다음년도로 이동 버튼 제거
            minDetail="month" // 캘릭더 표현 선택 (달력, 연력, 10년력 선택 가능하게 할지)
            minDate={new Date()} // 설정 날짜 이전 날짜 선택 불가
            maxDate={new Date(Date.now() + 60 * 60 * 24 * 7 * 4 * 6 * 1000)} // 설정 날짜 이후 날짜 선택 불가
            selectRange // 시작일 ~ 종료일 선택 가능 모드
          />
          <Button
            disabled={!checkBookingData?.ok}
            isLoading={isCheckingBooking}
            my={5}
            w="100%"
            colorScheme="red"
          >
            Make booking
          </Button>
          {!isCheckingBooking && !checkBookingData?.ok ? (
            <Text color={"red"}>이 날짜에는 예약을 할 수 없습니다. sry</Text>
          ) : null}
        </Box>
      </Grid>
    </Box>
  );
}
