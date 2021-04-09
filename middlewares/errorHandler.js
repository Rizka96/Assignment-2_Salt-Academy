module.exports = (err, req, res, next) => {
  let code;
  let name = err.name;
  let message;

  switch (name) {
    case "Email_Fail":
      code = 400;
      message = "Please Fiil Valid Email";
      break;
    case "Invade_Attack":
      code = 400;
      message = "Prohibited Attack";
      break;
    case "Missing_Token":
      code = 401;
      message = "Unauthorized access";
      break;
    case "Forbidden_Access":
      code = 403;
      message = "You Can't Access";
      break;
    case "Email_and_Password":
      code = 404;
      message = "Invalid Username or Password";
      break;
    case "Not_Found":
      code = 404;
      message = "Page Not Found";
      break;
    case "Barrak_Failed":
      code = 500;
      message = "Barrack max: 30";
      break;
    case "Fail_Created":
      code = 500;
      message = "Fail Creates: Resources is not Enough";
      break;
    default:
      code = 500;
      message = "Internal Server Error";
      break;
  }
  res.status(code).json({ success: false, message: message, error: err });
};
