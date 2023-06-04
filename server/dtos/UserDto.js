module.exports = class UserDto {
  email;
  id;
  name;
  lastname;
  patronymic;

  constructor(userLoginData, userAccount) {
    this.email = userLoginData.email;
    this.id = userLoginData.user_id;
    this.name = userAccount.firstname;
    this.patronymic = userAccount.patronymic;
    this.lastname = userAccount.lastname;
  }
};
