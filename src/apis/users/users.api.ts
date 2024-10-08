import { axiosInstance as axios, getHeader } from "../axiosConfig";
import { ISignUp } from "./users.interface";

class UsersApi {
  private static instance: UsersApi;

  public static get Instance(): UsersApi {
    return this.instance || (this.instance = new this());
  }

  public async signUpFetch(input: ISignUp): Promise<any> {
    return axios().post(`users/sign-up/`, input, {
      headers: getHeader(),
    });
  }
}

export default UsersApi.Instance;
