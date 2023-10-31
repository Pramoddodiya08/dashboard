export class ConfigApi {
  public static SERVER_HOST = 'http://localhost:8080';
  //   public static BASE_URL = ConfigApi.SERVER_HOST + '/api/'; // base url for server

  // URL CONSTANTS
  public static URLS: any = {
    /* Contact Api */

    CONTACT: ConfigApi.SERVER_HOST + '/contact',
    SIGNUP: ConfigApi.SERVER_HOST + '/signup',
    LOGIN: ConfigApi.SERVER_HOST + '/login',
    PROFILE: ConfigApi.SERVER_HOST + '/profile',
  };
}
