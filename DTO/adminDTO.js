module.exports = class AdminDTO {
  email;
  firstName;
  lastName;
  id;
  constructor(model) {
    this.email = model.email
    this.firstName = model.firstName
    this.lastName = model.lastName
    this.id = model.id
  }
}
