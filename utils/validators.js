const validateEmail = (email) => {
  const validEmail = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
  return validEmail.test(email);
};

const validatePassword = (password) => {
  const validPassword = new RegExp(
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
  );
  return validPassword.test(password);
};

const validateUsername = (username) => {
  const validUserName = new RegExp(
    /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/
  );
  return validUserName.test(username);
};

module.exports = { validateEmail, validatePassword, validateUsername };
