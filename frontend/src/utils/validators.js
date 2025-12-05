// Basic validators
export const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const isValidPhone = (phone) =>
  /^[0-9]{10}$/.test(phone);

export const isValidName = (name) =>
  name?.trim().length >= 2;

export const isValidSalary = (salary) =>
  !isNaN(salary) && Number(salary) > 0;

// Full Employee Form Validation
export const validateEmployeeForm = (form) => {
  if (!isValidName(form.name)) {
    return "Please enter a valid name";
  }

  if (!isValidEmail(form.email)) {
    return "Please enter a valid email address";
  }

  if (!isValidPhone(form.phone)) {
    return "Phone number must be 10 digits";
  }

  if (!form.designation) {
    return "Please select a designation";
  }

  if (!isValidSalary(form.salary)) {
    return "Please enter a valid salary";
  }

  return null;
};

// Registration Form Validation
export const validateRegisterForm = (form) => {
  if (!isValidName(form.name)) return "Please enter a valid name";
  if (!isValidEmail(form.email)) return "Please enter a valid email address";
  if (!form.password || form.password.length < 6) return "Password must be at least 6 characters";
  return null;
};
