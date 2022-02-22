const router= require('express').Router();
const userCtrl = require('../controllers/user.controller')
const authCtrl = require('../controllers/auth.controller')


router.route('/api/users')
  .get(userCtrl.list)
  .post(userCtrl.create)

router.route('/api/users/:userId')
  .get(authCtrl.requriesignin, userCtrl.read)
  .put(authCtrl.requriesignin,authCtrl.hasAuthorization, userCtrl.update)
  .delete(authCtrl.requriesignin,authCtrl.hasAuthorization,userCtrl.remove)
 
  router.param('userId', userCtrl.userByID)

module.exports = router; 