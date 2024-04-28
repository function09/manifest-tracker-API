const authenticateUser = (req, res, next) => {
  console.log(`Is authenticated? ${req.isAuthenticated()}`);
  if (!req.isAuthenticated()) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  return next();
};

export default authenticateUser;
