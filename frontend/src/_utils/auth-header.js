const authHeader = () => {
  let user = JSON.parse(localStorage.getItem("user-key"));

  if (user && user.key) {
    return { Authorization: "Token " + user.key };
  } else {
    return {};
  }
};

export default authHeader;
