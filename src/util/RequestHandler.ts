import axios, { AxiosResponse, AxiosError } from "axios";

export interface IConfig {
  headers: { "x-access-token": string };
}

export class RequestHandler {
  async get(uri: string, config?: IConfig) {
    return await axios
      .get(uri, config)
      .then((res: AxiosResponse) => ({
        data: res.data,
        error: ""
      }))
      .catch((error: AxiosError) => ({
        data: (error.response as AxiosResponse).data,
        error: decodeURI((error.response as AxiosResponse).statusText)
      }));
  }

  async post(uri: string, body: any, config?: IConfig) {
    return await axios
      .post(uri, body, config)
      .then((res: AxiosResponse) => ({
        data: res.headers["x-access-token"] || "",
        error: ""
      }))
      .catch((error: AxiosError) => ({
        data: "",
        error: decodeURI((error.response as AxiosResponse).statusText)
      }));
  }

  async patch(uri: string, body: any, config: IConfig) {
    return await axios
      .patch(uri, body, config)
      .then(() => ({
        error: ""
      }))
      .catch((error: AxiosError) => ({
        error: decodeURI((error.response as AxiosResponse).statusText)
      }));
  }
}
