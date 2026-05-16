import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers;
    console.log(req.headers);

    if (!token) {
      return res.json({
        success: false,
        message: "User not authorized",
      });
    }

    const decodedToken = jwt.decode(token);
    console.log(decodedToken);

    req.clerkId = decodedToken.clerkId;

    next();
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export { authUser };
