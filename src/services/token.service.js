import { Cookies } from "react-cookie";
const cookies = new Cookies();

const getAccessToken = () => {
  const user = getUser();
  return user?.accessToken;
};

const getUser = () => {
  const user = cookies.get("user");
  return user;
};

const removeUser = () => {
  cookies.remove("user", { path: "/" });
};

const setUser = (user) => {
  if (user) {
    cookies.set(
      "user",
      {
        _id: user?._id || user?.id,
        id: user?.id,
        username: user?.username,
        accessToken: user?.accessToken,
      },
      {
        path: "/",
        expires: new Date(Date.now() + 86400000), // 1 day 24*60*60*1000 ms
      }
    );
  } else {
    removeUser();
  }
};

const TokenService = {
  getAccessToken,
  setUser,
  getUser,
  removeUser,
};

export default TokenService;
