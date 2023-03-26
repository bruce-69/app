import { useMutation } from "@tanstack/react-query";
import BoxLogin from "components/BoxLogin";
import { LocalStorageHelper } from "helpers/LocalStorageHelper";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "services/AuthService";
import { ErrorResponse } from "types/api/error";
import { Login as LoginData, LoginResponse } from "types/api/login";
import { User } from "types/api/user";
import { LocalStorageKeys } from "types/LocalStorageKeys";
import { RoutePath } from "types/routes";
import * as S from "./style";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const mutation = useMutation(AuthService.login, {
    onSuccess: (data: LoginResponse & ErrorResponse) => {
      if (data.statusCode) {
        setErrorMessage(data.message);
        return;
      }
      if (data.token && data.user) {
        LocalStorageHelper.set<string>(LocalStorageKeys.TOKEN, data.token);
        LocalStorageHelper.set<User>(LocalStorageKeys.USER, data.user);
        navigate(RoutePath.HOME);
      }
      setErrorMessage("Tente novamente!");
    },

    onError: () => {
      setErrorMessage("Ocorreu um erro durante a requisição");
    },
  });

  const handleSubmit = (data: LoginData) => {
    mutation.mutate(data);
    setErrorMessage("");
  };

  return (
    <S.Login>
      <S.LoginContent>
        <BoxLogin onSubmitData={handleSubmit} errorMessage={errorMessage} />
      </S.LoginContent>
    </S.Login>
  );
};

export default Login;