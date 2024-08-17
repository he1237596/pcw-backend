module.exports = () => {
  return async (ctx, next) => {
    const loginUserId = ctx.state.loginUserId;
    if (loginUserId) {
      ctx.state.loginUser = await ctx.model.User.findByPk(loginUserId);
    }
    return next();
  };
};
