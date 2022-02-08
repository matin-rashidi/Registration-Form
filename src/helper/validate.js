export const validate = (formType, data) => {
  const { name, email, password, confirmPassword, isAccepted } = data;
  const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  let errors = {};

  if (formType === "signUp") {
    if (name.trim(" ").length === 0) {
      errors.name = "enter your name";
    }
    if (email.length === 0) {
      errors.email = "enter your email address";
    } else if (!regex.test(email)) {
      errors.email = "Your email is invalid";
    }
    if (password.length === 0) {
      errors.password = "enter your password";
    } else if (password.length > 0 && password.length < 8) {
      errors.password = "your password is to short";
    }
    if (confirmPassword.length === 0) {
      errors.confirmPassword = "enter your confirm password";
    } else if (confirmPassword !== password) {
      errors.confirmPassword = "your confirm password does not match";
    }
    if (!isAccepted) {
      errors.isAccepted = "please agree to our terms and privacy policy";
    }
  } else {
    if (email.length === 0) {
      errors.email = "enter your email address";
    } else if (!regex.test(email)) {
      errors.email = "Your email is invalid";
    }
    if (password.length === 0) {
      errors.password = "enter your password";
    } else if (password.length >= 1 && password.length < 8) {
      errors.password = "your password is to short";
    }
  }
  return errors;
};
