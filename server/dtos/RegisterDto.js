module.exports = class RegisterDto {
  email;
  name;
  enc;


  constructor(email, password, name) {
    this.email = email;
    this.name = name;
    this.enc = password;
  }
};