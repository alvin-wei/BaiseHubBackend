// authMiddleware.js

const jwt = require("jsonwebtoken");

const authenticate = async (ctx, next) => {
  const token = ctx.headers.authorization;
  if (!token) {
    ctx.status = 401;
    ctx.body = { error: "Unauthorized: Token missing" };
    return;
  }

  try {
    const decoded = jwt.verify(token, "your_secret_key"); // Replace 'your_secret_key' with your actual secret key
    ctx.state.user = decoded;
    await next();
  } catch (error) {
    ctx.status = 401;
    ctx.body = { error: "Unauthorized: Invalid token" };
  }
};

const authorize = (roles) => {
  return async (ctx, next) => {
    const { role } = ctx.state.user;
    if (!roles.includes(role)) {
      ctx.status = 403;
      ctx.body = { error: "Forbidden: Insufficient permissions" };
      return;
    }
    await next();
  };
};

module.exports = { authenticate, authorize };
