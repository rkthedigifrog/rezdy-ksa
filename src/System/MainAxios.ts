import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export class MainAxios {
  protected static Instance: AxiosInstance;
  private static UserAccessToken: string;

  private static Init() {
    MainAxios.Instance = Axios.create({
      baseURL: 'https://dev.galaxyjewels.live',
      timeout: 10000,
      responseType: 'json',
    });

    MainAxios.Instance.interceptors.request.use(
      (request: AxiosRequestConfig) => {
        //if (request.method !== 'OPTIONS') {
        //console.log("Request is different from 'OPTIONS'");

        if (MainAxios.GetAccessToken() !== undefined) {
          //console.log("Injecting authorization header: ", MainAxios.GetAccessToken());

          request.headers = {
            ...request.headers,
            Authorization: 'Bearer ' + MainAxios.GetAccessToken(),
          };
        }

        request.headers = {
          ...request.headers,
          'Content-Type': 'application/json; charset=UTF-8',
          Accept: 'application/json',
        };
        //}

        //console.log('Request Uri: ', request.url);
        //console.log('Request Data: ', request.data);

        return request;
      }
    );

    MainAxios.Instance.interceptors.response.use((response) => {
      //console.log('Response: ', response);
      return response;
    });
  }

  public static GetInstance(): AxiosInstance {
    if (typeof MainAxios.Instance === 'undefined') {
      this.Init();
    }

    return MainAxios.Instance;
  }

  public static SetAccessToken(token: string): void {
    if (MainAxios.Instance != null) {
      MainAxios.UserAccessToken = token;
    }
  }

  /**
   * Gets the authorization token from the memory or from the storage if exists.
   */
  public static GetAccessToken(): string {
    //if (MainAxios.UserAccessToken === undefined)
    //  MainAxios.UserAccessToken = Storage.ReadUserJwt();

    return MainAxios.UserAccessToken;
  }
}
