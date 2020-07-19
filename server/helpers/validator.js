// Validation of registration form by the EXPRESS VALIDATOR

const express = require("express");
const { body, validationResult } = require('express-validator')

const userValidationRules = () => {
  return [
   // name should be valid
   body('name').isLength({min:4}).trim().escape().not().isEmpty().withMessage("It should be atleast 5 letters long , with no Spaces."),
    // username must be an email
    body('username').isEmail().normalizeEmail().isLength({ min: 10 }).withMessage("Username should be an email"),
    // password must be at least 5 chars long
    body('password').trim().isLength({ min: 5 }).withMessage("Password should have atleast 5 letters"),
  ]
}


// get the errors after validation
const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push((err.msg)))
 
 res.locals.errors = extractedErrors;
//  res.redirect("/")
}

module.exports = {
 userValidationRules,
 validate,
}