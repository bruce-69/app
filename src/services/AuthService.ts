import { Api } from "helpers/endpoints/Api";
import { endpoint } from "helpers/endpoints";
import { ErrorResponse } from "types/api/error";
import { Login, LoginResponse } from "types/api/login";
import { User } from "types/api/user";

export const AuthService = {
  login: (loginData: Login): Promise<LoginResponse & ErrorResponse> =>
    Api(endpoint.auth(), {
      method: "POST",
      body: JSON.stringify(loginData),
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json()),

  me: (): Promise<User> =>
    Api(endpoint.auth(), { method: "GET" }).then((response) => response.json()),
};