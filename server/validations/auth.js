const { body } = require('express-validator')

const registerValidator = [
  body("email").isEmail(),
  body("password").isLength({
    min: 5,
  }),
  body("name").isLength({
    min: 3,
  }),
];

const changeDataValidator = [
  body("name").isLength({
    min: 3,
  })
]

const changePasswordValidator = [
  body("password").isLength({
    min: 6,
  }),
  body("newPassword").isLength({
    min: 6,
  })
]



module.exports = {
  registerValidator,
  changeDataValidator,
  changePasswordValidator
}