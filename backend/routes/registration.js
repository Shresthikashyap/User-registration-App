const express = require('express');
const router = express.Router();
const resgisterController = require('../controllers/register');
const userAuthentication = require('../middleware/auth')

router.get('/all',userAuthentication.authenticate,resgisterController.registeredUsers);
router.put('/edit-user/:id',userAuthentication.authenticate,resgisterController.editUser);
router.delete('/delete-user/:id',userAuthentication.authenticate,resgisterController.deleteUser);

module.exports = router;
