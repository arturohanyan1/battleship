const userName = (req, res, next) => {
  res.locals.superuser = req.session?.superuser;
  next();
};

const sessionLogger = (req, res, next) => {
  console.log('ЛОГГЕР СЕССИЙ', req.session);
  next();
};

module.exports = { userName, sessionLogger };
