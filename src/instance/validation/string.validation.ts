import { ValidationFunction } from "./validation.interface";

export const isStringValueValid: ValidationFunction = (
  input: string,
  validateObj: any
): boolean => {
  if (
    validateObj["longerThan"] !== undefined &&
    input.length <= validateObj["longerThan"]
  ) {
    return false;
  }

  if (
    validateObj["shorterThan"] !== undefined &&
    input.length >= validateObj["shorterThan"]
  ) {
    return false;
  }

  if (
    validateObj["shorterThan"] !== undefined &&
    validateObj["longerThan"] !== undefined &&
    validateObj["shorterThan"] <= validateObj["longerThan"]
  ) {
    return false;
  }

  if (
    validateObj["length"] !== undefined &&
    input.length !== validateObj["length"]
  ) {
    return false;
  }

  if (validateObj["equalsTo"] && input !== validateObj["equalsTo"]) {
    return false;
  }

  if (validateObj["differFrom"]) {
    for (let i = 0; i < validateObj["differFrom"].length; i++) {
      if (input === validateObj["differFrom"][i]) {
        return false;
      }
    }
  }

  if (
    validateObj["startsWith"] &&
    !input.startsWith(validateObj["startsWith"])
  ) {
    return false;
  }

  if (validateObj["endsWith"] && !input.endsWith(validateObj["endsWith"])) {
    return false;
  }

  if (validateObj["includes"]) {
    for (let i = 0; i < validateObj["includes"].length; i++) {
      if (!input.includes(validateObj["includes"][i])) {
        return false;
      }
    }
  }

  if (validateObj["mustNotIncludeChars"]) {
    for (let i = 0; i < validateObj["mustNotIncludeChars"].length; i++) {
      if (input.includes(validateObj["mustNotIncludeChars"][i])) {
        return false;
      }
    }
  }

  if (
    (validateObj["isPhoneNumber"] &&
      !/^\+?(972|0)(\-)?0?(([23489]{1}\d{7})|[5]{1}\d{8})$/.test(input)) ||
    (validateObj["isPhoneNumber"] === false &&
      /^\+?(972|0)(\-)?0?(([23489]{1}\d{7})|[5]{1}\d{8})$/.test(input))
  ) {
    return false;
  }

  if (
    (validateObj["isEmail"] && !/\S+@\S+\.\S+/.test(input)) ||
    (validateObj["isEmail"] === false && /\S+@\S+\.\S+/.test(input))
  ) {
    return false;
  }
  return true;
};
