var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Answer = require('../models/question');
var jwt = require('jsonwebtoken');

router.post('/register', function (req, res, next) {
  var user = new User({
    email: req.body.email,
    username: req.body.username,
    password: User.hashPassword(req.body.password),
    creation_dt: Date.now()
  });
  let promise = user.save();

  promise.then(function (doc) {
    return res.status(201).json(doc);
  })

  promise.catch(function (err) {
    return res.status(501).json({ message: 'Error registering user.' })
  })
})
router.post('/answerstore', function (req, res, next) {
  var answer = new Answer({
    username: req.body.username,
    one: req.body.one,
    two: req.body.two,
    three: req.body.three

  });
  let promise = answer.save();

  promise.then(function (doc) {
    return res.status(201).json(doc);
  })

  promise.catch(function (err) {
    return res.status(501).json({ message: 'Error answerStore user.' })
  })
})
  



router.post('/login', function (req, res, next) {
  let promise = User.findOne({ email: req.body.email }).exec();

  promise.then(function (doc) {
    if (doc) {
      if (doc.isValid(req.body.password)) {
        // generate token
        let token = jwt.sign({ username: doc.username }, 'secret', { expiresIn: '3h' });

        return res.status(200).json(token);

      } else {
        return res.status(501).json({ message: ' Invalid Credentials' });
      }
    }
    else {
      return res.status(501).json({ message: 'User email is not registered.' })
    }
  });

  promise.catch(function (err) {
    return res.status(501).json({ message: 'Some internal error' });
  })
})


router.get('/username', verifyToken, function (req, res, next) {
  return res.status(200).json(decodedToken.username);
})


var decodedToken = '';
function verifyToken(req, res, next) {
  let token = req.query.token;

  jwt.verify(token, 'secret', function (err, tokendata) {
    if (err) {
      return res.status(400).json({ message: ' Unauthorized request' });
    }
    if (tokendata) {
      decodedToken = tokendata;
      next();
    }
  })
}

module.exports = router;
