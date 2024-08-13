import axios from "axios";
import { QueryFunctionContext } from "@tanstack/react-query";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/",
  withCredentials: true,
});

export const getRooms = () =>
  instance.get("rooms/").then((response) => response.data);

export const getRoom = ({ queryKey }: QueryFunctionContext) => {
  const [_, roomPK] = queryKey;
  return instance.get(`rooms/${roomPK}`).then((response) => response.data);
};

export const getRoomReviews = ({ queryKey }: QueryFunctionContext) => {
  const [_, roomPK] = queryKey;
  return instance
    .get(`rooms/${roomPK}/reviews`)
    .then((response) => response.data);
};

export const getMe = () =>
  instance.get(`users/me`).then((response) => response.data);
