import { ValidationFunction } from "./validation.interface";

export const isDateValueValid: ValidationFunction = (
  input: Date,
  validateObj: any
): boolean => {
  if (validateObj["before"] && input >= validateObj["before"]) {
    return false;
  }

  if (validateObj["after"] && input <= validateObj["after"]) {
    return false;
  }

  if (
    validateObj["before"] &&
    validateObj["after"] &&
    validateObj["before"] <= validateObj["after"]
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

  return true;
};
