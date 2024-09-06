import { axiosInstance as django, getHeader } from "../axiosConfig";
import {
  IUploadImageVariables,
  IUploadRoom,
  ICreatePhotoVariables,
} from "./rooms.interface";
import axios from "axios";

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
}

export default RoomsApi.Instance;
