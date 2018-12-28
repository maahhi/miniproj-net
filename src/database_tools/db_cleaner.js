const mongoose = require('mongoose');
const User = require('../model/User')
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://zzgooloo:taabetaa@194.225.229.204/test', { useNewUrlParser: true });

// let user = new User();
// user.save(function(err) {
//     if (err) {
//         return next(new errors.InternalError(err.message));
//     }

const db = mongoose.connection;
db.once('open',function () {
    let user = new User({username:"alibi", display_name:"alibi", password:"123456"});
    user.save()

    for (c in db.collections)
    {
        console.log("kiiir");
        console.log(c);
    }
});