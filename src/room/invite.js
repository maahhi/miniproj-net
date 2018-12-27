sse = require('../sse.js');
module.exports= function(req,res,next)
{
    inviter= req.user.id;
    invited_users = req.body.invited_users;
    for (iu in invited_users)
    {
        sse.send({ room_id: req.body.room_id }, iu)
    }
    res.send({"state":"user invited"})
    next();
};