import utils from "../../lib/utils";
import { QueryFunctionContext } from "@tanstack/react-query";
import { axiosInstance as django, getHeader } from "../axiosConfig";
import {
  IUploadImageVariables,
  IUploadRoom,
  ICreatePhotoVariables,
} from "./rooms.interface";
import axios from "axios";
import type { Value } from "react-calendar/dist/cjs/shared/types";

type BookingQueryKey = [string, string | undefined, Value];

class RoomsApi {
  private static instance: RoomsApi;

  public static get Instance(): RoomsApi {
    return this.instance || (this.instance = new this());
  }

  public async getAmenities(): Promise<any> {
    return django()
      .get(`rooms/amenities`, { headers: getHeader() })
      .then((response) => response.data);
  }

  public async createRoom(input: IUploadRoom): Promise<any> {
    return django()
      .post(`rooms/`, input, { headers: getHeader() })
      .then((response) => response.data);
  }

  public async getUploadURL(): Promise<any> {
    return django()
      .post(`medias/photos/get-url`, null, { headers: getHeader() })
      .then((response) => response.data);
  }

  public async uploadImage({
    file,
    uploadURL,
  }: IUploadImageVariables): Promise<any> {
    const form = new FormData();
    form.append("file", file[0]);

    return axios
      .post(uploadURL, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => response.data);
  }

  public async createPhoto({
    description,
    file,
    roomPk,
  }: ICreatePhotoVariables): Promise<any> {
    return django()
      .post(
        `rooms/${roomPk}/photos/`,
        { description, file },
        { headers: getHeader() }
      )
      .then((response) => response.data);
  }

  public async checkBooking({
    queryKey,
  }: QueryFunctionContext<BookingQueryKey>): Promise<any> {
    const [_, roomPk, dates] = queryKey;
    if (Array.isArray(dates)) {
      const [firstDate, secondDate] = dates;
      const checkIn = utils.formatDate(firstDate);
      const checkOut = utils.formatDate(secondDate);
      console.log(checkIn, checkOut);
      return django()
        .get(
          `rooms/${roomPk}/bookings/check?check_in=${checkIn}&check_out=${checkOut}`
        )
        .then((response) => response.data);
    }
  }
}

export default RoomsApi.Instance;
