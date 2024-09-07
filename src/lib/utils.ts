import type { Value } from "react-calendar/dist/cjs/shared/types";

class Utils {
  private static instance: Utils;

  public static get Instance(): Utils {
    return this.instance || (this.instance = new this());
  }

  public formatDate(date: Value): string {
    if (date instanceof Date) {
      return `${date?.getFullYear()}-${date?.getMonth() + 1}-${date?.getDate()}`;
    } else {
      throw new Error("Date 객채가 아닙니다.");
    }
  }
}

export default Utils.Instance;
