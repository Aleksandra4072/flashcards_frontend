import useAuth from "../hooks/useAuth";
import { refreshToken, decodeToken } from "../utils/auth.js";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const refresh = async () => {
    const token = await refreshToken();
    const response = await decodeToken(token.data.access_token);
    setAuth((prev) => {
      return {
        ...prev,
        roles: response.data.token_payload.roles,
        accessToken: token.data.access_token,
      };
    });
    return token.data.access_token;
  };

  return refresh;
};

export default useRefreshToken;
