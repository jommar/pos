export const rules = {
  required: (value) => !!value || "This field is required",
  positive: (value) => value > 0 || "Must be a positive number",
  email: (value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || "Invalid email address",
};
