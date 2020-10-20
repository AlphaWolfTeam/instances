import { ValidationFunction } from "./validation.interface";

export const isNumberValueValid: ValidationFunction = (
  input: number,
  validateObj: any
): boolean => {
  if (
    validateObj["biggerThan"] !== undefined &&
    input <= validateObj["biggerThan"]
  ) {
    return false;
  }

  if (
    validateObj["smallerThan"] !== undefined &&
    input >= validateObj["smallerThan"]
  ) {
    return false;
  }

  if (
    validateObj["biggerThan"] !== undefined &&
    validateObj["smallerThan"] !== undefined &&
    validateObj["smallerThan"] <= validateObj["biggerThan"]
  ) {
    return false;
  }

  if (
    validateObj["equalsTo"] !== undefined &&
    input !== validateObj["equalsTo"]
  ) {
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
    validateObj["minDigitsAmount"] !== undefined &&
    String(input).length < validateObj["minDigitsAmount"]
  ) {
    return false;
  }

  if (
    validateObj["maxDigitsAmount"] !== undefined &&
    String(input).length > validateObj["maxDigitsAmount"]
  ) {
    return false;
  }

  if (
    validateObj["digitsAmount"] !== undefined &&
    String(input).length !== validateObj["digitsAmount"]
  ) {
    return false;
  }

  if (
    validateObj["maxDigitsAmount"] !== undefined &&
    validateObj["minDigitsAmount"] !== undefined &&
    validateObj["minDigitsAmount"] >= validateObj["maxDigitsAmount"]
  ) {
    return false;
  }
  if (
    (validateObj["isEven"] && input % 2 !== 0) ||
    (validateObj["isEven"] === false && input % 2 === 0)
  ) {
    return false;
  }

  if (
    (validateObj["isPositive"] && input < 0) ||
    (validateObj["isPositive"] === false && input >= 0)
  ) {
    return false;
  }

  if (
    (validateObj["isPrime"] && !isPrime(input)) ||
    (validateObj["isPrime"] === false && isPrime(input))
  ) {
    return false;
  }

  if (
    (validateObj["isDecimal"] && input % 1 === 0) ||
    (validateObj["isDecimal"] === false && input % 1 !== 0)
  ) {
    return false;
  }

  return true;
};

const isPrime = (num: number): boolean => {
  for (let i = 2; i < num; i++) if (num % i === 0) return false;
  return num > 1;
};
