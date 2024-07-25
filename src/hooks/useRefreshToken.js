import useAuth from "../hooks/useAuth";
import { refreshToken } from "../utils/auth.js";

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();
  const refresh = async () => {
    const token = await refreshToken(auth.accessToken);
    setAuth((prev) => {
      return { ...prev, accessToken: token.data.access_token };
    });
    return token.data.access_token;
  };

  return refresh;
};

export default useRefreshToken;
