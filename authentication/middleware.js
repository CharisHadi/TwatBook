// function to authenticate middleware
function authenticationMiddleware () {
    return function (req, res, next) {
      if (req.isAuthenticated()) {
        return next()
      }
      res.redirect('/')
    };
  };