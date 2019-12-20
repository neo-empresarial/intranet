const host = process.env.API_HOST || 'http://localhost';
const port = process.env.API_PORT || 8000;

const authApi = `${host}:${port}/api-auth/`;
const contactApi = `${host}:${port}/contact/`;
const api = `${host}:${port}/api/`

const loginApi = `${authApi}login/`;
const logoutApi = `${authApi}logout/`;
const userApi = `${authApi}users/`;
const registerApi = `${authApi}registration/`;
const neosonApi = username =>
  `${contactApi}list-create/neoson/?search=${username}`;

const apiUrls = {
  loginApi,
  logoutApi,
  userApi,
  registerApi,
  neosonApi,
  api
};

export default apiUrls;
