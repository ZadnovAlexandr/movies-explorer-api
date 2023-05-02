const express = require('express');

const router = express.Router();

const {
  getUserInfo,
  updateUser,
} = require('../controllers/user');

const { updateUserVal } = require('../middlewares/validate');

router.get('/me', getUserInfo);
router.patch('/me', updateUserVal, updateUser);

module.exports = router;
