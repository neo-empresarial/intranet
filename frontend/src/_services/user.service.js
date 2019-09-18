import authHeader from "../_utils/auth-header";
import apiUrls from "../_utils/paths";

function handleResponse(response) {
  if (!response.ok) {
    return Promise.reject(response.statusText);
  }
  return response.json();
}

const returnUserData = async () => {
  const user = {};

  const response = await fetch(apiUrls.userApi, {
    method: "GET",
    headers: authHeader()
  });

  const userData = await handleResponse(response);
  console.log(userData);

  const neosonResponse = await fetch(apiUrls.neosonApi(userData.username), {
    method: "GET",
    headers: authHeader()
  });

  const neosonData = await handleResponse(neosonResponse);

  console.log(neosonData);

  if (neosonData.length !== 0) {
    return neosonData;
  } else {
    return false;
  }
};

export const userService = {
  returnUserData
};
