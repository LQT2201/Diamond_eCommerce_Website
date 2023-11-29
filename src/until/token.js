const getToken = (req) =>{
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
    token = req.headers.authorization.split(' ')[1]
  }
  else {
    token = req.headers["x-access-token"] || req.cookies['jwt'] || null;
  }
  return token;
}

module.exports = { getToken };