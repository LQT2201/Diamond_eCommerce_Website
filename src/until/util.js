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
const getAdminToken = (req) =>{
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
    token = req.headers.authorization.split(' ')[1]
  }
  else {
    token = req.headers["x-access-token"] || req.cookies['jwt-admin'] || null;
  }
  return token;
}
//Reference https://byby.dev/js-slugify-string
const slugify = (name) => {
  return String(name).normalize('NFKD') // split accented characters into their base characters and diacritical marks
  .replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
  .trim() // trim leading or trailing whitespace
  .toLowerCase() // convert to lowercase
  .replace(/[^a-z0-9 -]/g, '') // remove non-alphanumeric characters
  .replace(/\s+/g, '-') // replace spaces with hyphens
  .replace(/-+/g, '-'); // remove consecutive hyphens
}
const toObjectId = (id) => {
  var ObjectId = (require('mongoose').Types.ObjectId);
  return new ObjectId(id);
}
module.exports = { getToken , slugify, getAdminToken, toObjectId};