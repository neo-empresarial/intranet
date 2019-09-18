import apiUrls from "../_utils/paths";
import authHeader from "../_utils/auth-header";

function handleResponse(response) {
  if (!response.ok) {
    return Promise.reject(response.statusText);
  }
  return response.json();
}

const login = async (username, password) => {
  const loginResponse = await fetch(apiUrls.loginApi, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username,
      password
    })
  });
  const userToken = await handleResponse(loginResponse);
  const Authorization = "Token " + userToken.key;

  const userResponse = await fetch(apiUrls.userApi, {
    method: "GET",
    headers: {
      Authorization
    }
  });
  const user = await handleResponse(userResponse);
  localStorage.setItem(
    "user-key",
    JSON.stringify({
      key: userToken.key
    })
  );

  return {
    username: user.username
  };
};

const logout = async () => {
  const logoutRequest = await fetch(apiUrls.logoutApi, {
    method: "POST"
  });
  localStorage.removeItem("user-key");
  return logoutRequest;
};

const verifyAuth = async () => {DOMTokenList
  const userResponse = await fetch(apiUrls.userApi, {
    method: "GET",
    headers: authHeader()
  });
  return userResponse;
};

const authServices = {
  login,
  logout,
  verifyAuth
};

export default authServices;
