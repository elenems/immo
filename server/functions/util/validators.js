exports.validateEmail = (email) => {
  const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (email.trim().length === 0) {
    return {
      valid: false,
      message: 'Please enter an email adress',
    };
  }

  if (!email.match(regEx)) {
    return {
      valid: false,
      message: 'Email is incorrect',
    };
  }

  return { valid: true };
};

exports.validatePassword = (password) => {
  if (password.length < 8) {
    return {
      valid: false,
      message: 'Password must contain at least 8 characters',
    };
  }
  if (password.length > 50) {
    return {
      valid: false,
      message: 'Password must be less than 50 characters',
    };
  }

  return { valid: true };
};

exports.validateCred = (cred) => {
  if (cred.length > 50) {
    return {
      valid: false,
      message: 'To many letters',
    };
  }

  if (cred.length < 2) {
    return {
      valid: false,
      message: 'Must contain atleast 2 charachters',
    };
  }

  return { valid: true };
};

exports.isEmpty = (text) => {
  if (!text.length) {
    return { valid: false, message: 'Must not be empty' };
  }
  return { valid: true };
};
