module.exports.isLoggedIn = (req, res, next) => {
  const user = req.session.user;
  if (!user) {
    return res.status(401).send('You must be logged in to do that');
  }
  next();
}
module.exports.registerValidation = (data) => {
  if (!data.Name || data.Name.length < 2) {
    return { error: "Name must be at least 2 characters long." };
  }
  if (!data.Email || !data.Email.includes("@")) {
    return { error: "Email is invalid." };
  }
  if (!data.Password || data.Password.length < 6) {
    return { error: "Password must be at least 6 characters long." };
  }
  return {};
};

module.exports.loginValidation = (data) => {
  if (!data.Email || !data.Email.includes("@")) {
    return { error: "Email is invalid." };
  }
  if (!data.Password || data.Password.length < 6) {
    return { error: "Password must be at least 6 characters long." };
  }
  return {};
};