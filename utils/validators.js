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

module.exports = { validateEmail, validatePassword };
