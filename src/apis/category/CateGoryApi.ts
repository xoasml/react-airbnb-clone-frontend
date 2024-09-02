import { axiosInstance as axios, getHeader } from "../axiosConfig";
import { ICategory } from "./category.interface";

class CategoryApi {
  private static instance: CategoryApi;

  public static get Instance(): CategoryApi {
    return this.instance || (this.instance = new this());
  }

  public async getCategories(): Promise<any> {
    return axios()
      .get(`categories/`, { headers: getHeader() })
      .then((response) => response.data);
  }
}

export default CategoryApi.Instance;
