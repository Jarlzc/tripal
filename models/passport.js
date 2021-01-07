const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require('./bcrypt.js');
const knexConfig = require("../knexfile").development;
const knex = require('knex')(knexConfig)

function passportinit(passport) {
    passport.use('local-login', new LocalStrategy(async (username, password, done)=>{
        try {
          console.log('logging in')
          let users = await knex('users').where({username: username})
          if (users.length ==0) {
            return done(null, false, {message: 'User not existed'})
          }
          let user = users[0];
          let result = await bcrypt.checkPassword(password, user.password)
          console.log('checkpassword failed')
          console.log(result)
          if (result) {
            return done (null, user)
          } else {
            return done (null, false, {message: 'Incorrect Password'});
          }
      
        } catch(err) {
          done(err)
        }
      })
      );
      
      passport.use('local-signup', new LocalStrategy({passReqToCallback: true}, async function (req, username, password, done) {
        try {
            
          let users = await knex('users').where({username: username});
          if(users.length > 0) {
            return done(null, false, {message: "User name already existed"});
          }
          //hash password
          let hash = await bcrypt.hashPassword(password);
        
          const newUser = {
            username: username, 
            password: hash,
            email: req.body.email,
            profile_pic_url: req.body.profile_picture
          }
        
          let userId = await knex('users').insert(newUser).returning('id');
         
          newUser.id = userId[0];
          done(null, newUser);


        } catch (err){
          done(err);
        }
      
      }))
      
      passport.serializeUser((user, done) => {
        console.log('session saved')
        done(null, user.id);
      });
      
      passport.deserializeUser(async (id, done) => {
        console.log('deserialising user')
      
        let users = await knex('users').where({id:id});
        if (users.length == 0) {
            return done(new Error(`Wrong user id ${id}`));
        }
        let user = users[0];
        return done(null, user);
      });
      
}

module.exports = passportinit; 