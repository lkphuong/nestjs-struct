import { SQL_KEYWORD_REGEX, SQL_LOGIC_REGEX } from '@constants/index';

interface ValidationResult {
  isValid: boolean;
  message: string;
}

const validateSQLKeywords = (input: string): ValidationResult => {
  if (SQL_KEYWORD_REGEX.test(input)) {
    return {
      isValid: false,
      message: 'Input contains SQL keywords.',
    };
  }
  if (SQL_LOGIC_REGEX.test(input)) {
    return {
      isValid: false,
      message: 'Input contains SQL logical operators.',
    };
  }
  return { isValid: true, message: '' };
};

const validateField = (field: any): ValidationResult => {
  if (typeof field === 'string') {
    return validateSQLKeywords(field);
  } else if (Array.isArray(field)) {
    for (const item of field) {
      const result = validateField(item);
      if (!result?.isValid) {
        return result;
      }
    }
  } else if (typeof field === 'object' && field !== null) {
    return validateInputObject(field);
  }
  return { isValid: true, message: '' };
};

export const validateInputObject = (inputObject: {
  [key: string]: any;
}): ValidationResult => {
  for (const [key, value] of Object.entries(inputObject)) {
    const result = validateField(value);

    if (!result?.isValid && result) {
      return {
        isValid: false,
        message: `Field "${key}" contains potential SQL injection content.`,
      };
    }
  }
  return null;
};
