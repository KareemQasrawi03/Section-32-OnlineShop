function isEmpty(value) {
  return !value && value.trim() !== "";
}
function userDetilesAreValid(email, password, name, street, postal, city) {
  return (
    email &&
    email.includes("@") &&
    password.trim().length >= 6 &&
    !isEmpty(name) &&
    !isEmpty(street) &&
    !isEmpty(postal) &&
    !isEmpty(city)
  );
}

function confirmEmail(email,confirmEmail){
    return email === confirmEmail
}

module.exports = {
  userDetilesAreValid: userDetilesAreValid,
  confirmEmail: confirmEmail,
};
