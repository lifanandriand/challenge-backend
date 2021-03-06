module.exports = (req, res, next) => {
    res.respond = (
      data = null,
      message = "",
      statusCode = 200,
      status = true
    ) => {
      // eslint-disable-next-line no-param-reassign
      if (statusCode >= 400) status = false;
  
      res.status(statusCode).json({
        success: status,
        message,
        data,
      });
    };
  
    res.success = (message, data = null) => {
      res.respond(data, message, 200);
    };
  
    res.created = (message = "Success create data!", data = null) => {
      res.respond(data, message, 201);
    };
  
    res.badRequest = (message = "Bad request!", data = null) => {
      res.respond(data, message, 400);
    };
  
    res.unauthorized = (message = "Unauthorized") => {
      res.respond(null, message, 401);
    };
  
    res.notFound = (message = "Data doesn't exist!") => {
      res.respond(null, message, 404);
    };
  
    res.conflict = (message = "Data already exist") => {
      res.respond(null, message, 409);
    };
  
    res.serverError = (message = "Internal server error!") => {
      res.respond(null, message, 500);
    };
  
    next();
  };