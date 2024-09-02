import { axiosInstance as axios, getHeader } from "../axiosConfig";
import { IUploadRoom } from "./rooms.interface";

class RoomsApi {
  private static instance: RoomsApi;

  public static get Instance(): RoomsApi {
    return this.instance || (this.instance = new this());
  }

  public async getAmenities(): Promise<any> {
    return axios()
      .get(`rooms/amenities`, { headers: getHeader() })
      .then((response) => response.data);
  }

  public async createRoom(input: IUploadRoom): Promise<any> {
    return axios()
      .post(`rooms/`, input, { headers: getHeader() })
      .then((response) => response.data);
  }
}

export default RoomsApi.Instance;
