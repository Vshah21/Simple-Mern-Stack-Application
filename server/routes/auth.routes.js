const router = require('express').Router();
const authCtrl = require('../controllers/auth.controller')

router.route('/auth/signin')
      .post(authCtrl.signin)

router.route('/auth/signout')
    .get(authCtrl.signout)

module.exports = router