const db = require('./index');
const User = db.User;
const superadmin = {
    id: 1,
    first_name: 'super',
    last_name: 'admin',
    email: 'superadmin@gmail.com',
    password: '$2a$10$zAa7qSC.ZzP.n/61eGkq9uzmlZkQaMd09I6hnpDWH6/RqobBCTSC6',
    permission: 'superadmin',
    verified: true
};
User.findAll().then((result)=>{
    // console.log(result)
    if(!result.length){
        User.create(superadmin)
            .then(() => {
                console.log("superadmin was created");
            })
        .catch(err => {
            console.log(err);
        });
    } else {
        console.log('superadmin is already existed')
    }
})