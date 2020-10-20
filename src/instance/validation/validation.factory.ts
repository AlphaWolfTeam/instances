import { isStringValueValid } from "./string.validation";
import { isDateValueValid } from "./date.validation";
import { isNumberValueValid } from "./number.validation";
import { ValidationFunction } from "./validation.interface";

export function validationFactory(type: any): ValidationFunction {
  switch (type) {
    case "string":
      return isStringValueValid;
    case "date":
      return isDateValueValid;
    case "number":
      return isNumberValueValid;
    default:
      return falseFunction;
  }
}

const falseFunction: ValidationFunction = function (...args: any[]): boolean {
  return false;
};
