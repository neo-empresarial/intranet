const host = process.env.API_HOST || 'http://localhost';
const port = process.env.API_PORT || 8000;

const authApi = `${host}:${port}/auth/`;
const contactApi = `${host}:${port}/contact/`;

const loginApi = `${authApi}login/`;
const logoutApi = `${authApi}logout/`;
const userApi = `${authApi}user/`;
const registerApi = `${authApi}registration/`;
const neosonApi = username =>
  `${contactApi}list-create/neoson/?search=${username}`;

const apiUrls = {
  loginApi,
  logoutApi,
  userApi,
  registerApi,
  neosonApi
};

export default apiUrls;
