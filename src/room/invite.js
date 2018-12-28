sse = require('../sse.js');
module.exports= function(req,res,next)
{
    inviter= req.user.id;
    invited_users = req.body.invited_users;
    console.log(invited_users)
    var iu;
    for (iu in invited_users)
    {
        console.log(invited_users[iu])
        sse.send({ room_id: req.body.room_id, peer: inviter}, "sse/" + invited_users[iu])
    }
    res.send({"state":"user invited"})
    next();
};