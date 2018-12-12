module.exports = function(req, res, next){
  console.log(req.body);
  console.log(req.body.msg);
  res.send("it's signup method");
};