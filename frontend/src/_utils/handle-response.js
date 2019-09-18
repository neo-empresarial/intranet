const handleResponse = response => {
  if (!response.ok) {
    return Promise.reject(response.statusText);
  }
  return response.json();
};

export default handleResponse;
