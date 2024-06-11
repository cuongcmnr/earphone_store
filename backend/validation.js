// We will use simple if conditions for validation instead of Joi
module.exports.registerValidation = (data) => {
  if (!data.name || data.name.length < 6) {
    return { error: "Name must be at least 6 characters long." };
  }
  if (!data.email || !data.email.includes("@")) {
    return { error: "Email is invalid." };
  }
  if (!data.password || data.password.length < 6) {
    return { error: "Password must be at least 6 characters long." };
  }
  return {};
};

module.exports.loginValidation = (data) => {
  if (!data.email || !data.email.includes("@")) {
    return { error: "Email is invalid." };
  }
  if (!data.password || data.password.length < 6) {
    return { error: "Password must be at least 6 characters long." };
  }
  return {};
};