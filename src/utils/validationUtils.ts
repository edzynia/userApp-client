export const emailValidation = (value: string): string | null =>
  /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
    ? null
    : 'Please type in a valid email address.';

export const requiredField = (value: string): string | null =>
  value.trim() ? null : 'This field is required.';

export const validateForm = (
  formData: Record<string, string>,
  validationRules: Record<string, (value: string) => string | null>,
) => {
  const newErrors: Record<string, string> = {};
  for (const [key, rule] of Object.entries(validationRules)) {
    const value = formData[key] || '';
    const error = rule(value);
    if (error) {
      newErrors[key] = error;
    }
  }
  return newErrors;
};
