module.exports = function(req, res, next){
    console.log(req.body);
    var username = req.body.username;
    var password = req.body.password;
    var displayname = req.body.displayname;
    console.log(username +" "+ password+" "+displayname);
  res.send("it's login method");
};