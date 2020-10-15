export const isNumberValueValid = (
    number: number,
    validateObj: any
): boolean => {
    if (
        validateObj["biggerThan"] !== undefined &&
        number <= validateObj["biggerThan"]
    ) {
        return false;
    }

    if (
        validateObj["smallerThan"] !== undefined &&
        number >= validateObj["smallerThan"]
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
        number !== validateObj["equalsTo"]
    ) {
        return false;
    }

    if (validateObj["differFrom"]) {
        for (let i = 0; i < validateObj["differFrom"].length; i++) {
            if (number === validateObj["differFrom"][i]) {
                return false;
            }
        }
    }

    if (
        validateObj["minDigitsAmount"] !== undefined &&
        String(number).length < validateObj["minDigitsAmount"]
    ) {
        return false;
    }

    if (
        validateObj["maxDigitsAmount"] !== undefined &&
        String(number).length > validateObj["maxDigitsAmount"]
    ) {
        return false;
    }

    if (
        validateObj["digitsAmount"] !== undefined &&
        String(number).length !== validateObj["digitsAmount"]
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
        (validateObj["isEven"] && number % 2 !== 0) ||
        (validateObj["isEven"] === false && number % 2 === 0)
    ) {
        return false;
    }

    if (
        (validateObj["isPositive"] && number < 0) ||
        (validateObj["isPositive"] === false && number >= 0)
    ) {
        return false;
    }

    if (
        (validateObj["isPrime"] && !isPrime(number)) ||
        (validateObj["isPrime"] === false && isPrime(number))
    ) {
        return false;
    }

    if (
        (validateObj["isDecimal"] && number % 1 === 0) ||
        (validateObj["isDecimal"] === false && number % 1 !== 0)
    ) {
        return false;
    }

    return true;
};

const isPrime = (num: number): boolean => {
    for (let i = 2; i < num; i++) if (num % i === 0) return false;
    return num > 1;
};