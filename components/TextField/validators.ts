import isEmail from "validator/lib/isEmail";
import isMobilePhone from "validator/lib/isMobilePhone";

export function validateRequired(
  value: any,
  options: { label: string } = {
    label: "test",
  }
): string[] {
  const errors = [];
  if (!value) {
    errors.push(`${options.label} is required`);
  }
  return errors;
}

export function validateRequiredNumber(
  value: any,
  options: { label: string } = {
    label: "test",
  }
): string[] {
  const errors = [];
  if (!value) {
    errors.push(`${options.label} is required`);
  }
  if (isNaN(value)) {
    errors.push(`${options.label} must be a valid number`);
  }
  return errors;
}

export function validateEmail(
  value: any,
  options: { label: string } = {
    label: "test",
  }
): string[] {
  const errors = [];
  const check = isEmail(value);
  if (!check) {
    errors.push(`${options.label} must be email`);
  }
  return errors;
}

export function validateMobilePhone(
  value: any,
  options: { label: string } = {
    label: "test",
  }
): string[] {
  const errors = [];
  const check = isMobilePhone(value);
  if (!check) {
    errors.push(`${options.label} must be mobile phone`);
  }
  return errors;
}
