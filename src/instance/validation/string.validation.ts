export const isStringValueValid = (
    string: string,
    validateObj: any
): boolean => {
    if (
        validateObj["longerThan"] !== undefined &&
        string.length <= validateObj["longerThan"]
    ) {
        return false;
    }

    if (
        validateObj["shorterThan"] !== undefined &&
        string.length >= validateObj["shorterThan"]
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
        string.length !== validateObj["length"]
    ) {
        return false;
    }

    if (validateObj["equalsTo"] && string !== validateObj["equalsTo"]) {
        return false;
    }

    if (validateObj["differFrom"]) {
        for (let i = 0; i < validateObj["differFrom"].length; i++) {
            if (string === validateObj["differFrom"][i]) {
                return false;
            }
        }
    }

    if (
        validateObj["startsWith"] &&
        !string.startsWith(validateObj["startsWith"])
    ) {
        return false;
    }

    if (validateObj["endsWith"] && !string.endsWith(validateObj["endsWith"])) {
        return false;
    }

    if (validateObj["includes"]) {
        for (let i = 0; i < validateObj["includes"].length; i++) {
            if (!string.includes(validateObj["includes"][i])) {
                return false;
            }
        }
    }

    if (validateObj["mustNotIncludeChars"]) {
        for (let i = 0; i < validateObj["mustNotIncludeChars"].length; i++) {
            if (string.includes(validateObj["mustNotIncludeChars"][i])) {
                return false;
            }
        }
    }

    if (
        (validateObj["isPhoneNumber"] &&
            !/^\+?(972|0)(\-)?0?(([23489]{1}\d{7})|[5]{1}\d{8})$/.test(string)) ||
        (validateObj["isPhoneNumber"] === false &&
            /^\+?(972|0)(\-)?0?(([23489]{1}\d{7})|[5]{1}\d{8})$/.test(string))
    ) {
        return false;
    }

    if (
        (validateObj["isEmail"] && !/\S+@\S+\.\S+/.test(string)) ||
        (validateObj["isEmail"] === false && /\S+@\S+\.\S+/.test(string))
    ) {
        return false;
    }
    return true;
};