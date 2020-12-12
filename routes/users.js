const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const passport = require('passport');

const sendEmail = require('../models/send.mail')
const msgs = require('../models/email.msgs')
const { CLIENT_ORIGIN } = require('../config/email_Config')

// Load Input Validation
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');
const validatePasswordInput = require('../validation/password');

// Load User model
const db = require('../models/index');
const User = db.User;
// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findAll({ where: { email: req.body.email }}).then(user => {
    if (user.length) {
      errors.email = 'Email already exists';
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: '200', // Size
        r: 'pg', // Rating
        d: 'mm' // Default
      });
      let role;
      if(req.body.role === "admin"){
        role = 2;
      } else if(req.body.role === "superadmin"){
        role = 3;
      } else {
        role = 1;
      }
      const newUser = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        avatar,
        password: req.body.password,
        role: role
      };
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          User.create(newUser).then(nuser => {
            const nuserr = nuser;
            const content = {
              Subject: "Confirm Email",
              HTMLPart: "<a href=\'http://"+CLIENT_ORIGIN+"/confirmed/"+nuserr.id+"\'>Click to confirm email</a>",      
              TextPart: "Copy and paste this link: "+CLIENT_ORIGIN+"/confirm/"+nuserr.id,
              CustomID: "CustomID"
            }
            sendEmail(req.body.email, content).then(()=>{
                res.json({});
              });
            })
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/verify_email', (req, res)=>{
  const errors={};
  User.findAll({where: { email: req.body.email }}).then(user => {
    // Check for user
    if (!user.length) {
      errors.email = 'User not found';
      return res.status(404).json(errors);
    }
    const userr = user[0].dataValues;
    const content = {
      Subject: "Confirm Email",
      HTMLPart: "<a href=\'http://"+CLIENT_ORIGIN+"/confirmed/"+userr.id+"\'>Click to confirm email</a>",      
      TextPart: "Copy and paste this link: "+CLIENT_ORIGIN+"/confirm/"+userr.id,
      CustomID: "CustomID"
    }
    if (userr && !userr.verified) {
      sendEmail(userr.email, content).then(()=>{
        errors.email_send_state = "Successfully your email sent, Please check in your mail inbox";
        res.status(404).json(errors);
      });
    }

    // The user has already confirmed this email address
    else {
      res.json({ msg: msgs.alreadyConfirmed })
    }
  });
});
router.post('/verify_password', (req, res)=>{
  const errors={};
  User.findAll({where: { email: req.body.email }}).then(user => {
    // Check for user
    if (!user.length) {
      errors.email = 'User not found';
      return res.status(404).json(errors);
    }
    const userr = user[0].dataValues;
    const content = {
      Subject: "Confirm Email",
      HTMLPart: "<a href=\'http://"+CLIENT_ORIGIN+"/confirmedpass/"+userr.id+"\'>Click to confirm email</a>",      
      TextPart: "Copy and paste this link: "+CLIENT_ORIGIN+"/confirmpass/"+userr.id,
      CustomID: "CustomID"
    }
    if (userr.verified) {
      sendEmail(userr.email, content).then(()=>{
        errors.email_send_state = true;
        res.status(404).json(errors);
      });
    }

    // The user has already confirmed this email address
    else {
      errors.email_send_state = false;
      res.status(404).json(errors);
    }
  });
});
router.post('/login', (req, res) => {
        const { errors, isValid } = validateLoginInput(req.body);
        // Check Validation
        if (!isValid) {
          return res.status(400).json(errors);
        }
        const email = req.body.email;
        const password = req.body.password;
        // Find user by email
        User.findAll({where: { email: email }}).then(user => {
          // Check for user
          if (!user.length) {
            errors.email = 'User not found';
            return res.status(404).json(errors);
          }
          let userr = user[0].dataValues;
          if(req.body.id > 0){
            User.update({verified:true}, {where: { id: req.body.id }}).then((result)=>{
              userr = result;
            })
          } else {
            if(!userr.verified){
              errors.state_email = "Please verify your email at first";
              return res.status(404).json(errors);
            }
          }
          bcrypt.compare(password, userr.password).then(isMatch => {
            if (isMatch) {
              // User Matched
              const payload = { id: userr.id, first_name: userr.first_name, last_name: userr.last_name, avatar: userr.avatar, role: userr.role, verified: userr.verified }; // Create JWT Payload
              // Sign Token
              jwt.sign(
                payload,
                keys.secretOrKey,
                { expiresIn: 3600 },
                (err, token) => {
                  res.json({
                    success: true,
                    token: 'Bearer ' + token
                  });
                }
              );
            } else {
              errors.password = 'Password incorrect';
              return res.status(400).json(errors);
            }
          });
        });
});
router.post('/change_password', (req, res)=>{
  const { errors, isValid } = validatePasswordInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(req.body.password, salt, (err, hash) => {
      if (err) throw err;
      User.update({password: hash}, {where: { id: req.body.id }}).then((result)=>{
        errors.change_pass = "Password successfully changed, Please come via login";
        return res.status(404).json(errors);
      });
    });
  });
});
module.exports = router;
