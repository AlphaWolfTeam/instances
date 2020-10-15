export const isDateValueValid = (date: Date, validateObj: any): boolean => {
    if (validateObj["before"] && date >= validateObj["before"]) {
        return false;
    }

    if (validateObj["after"] && date <= validateObj["after"]) {
        return false;
    }

    if (validateObj["before"] && validateObj["after"] &&
        validateObj["before"] <= validateObj["after"]) {
        return false;
    }

    if (validateObj["equalsTo"] && date !== validateObj["equalsTo"]) {
        return false;
    }

    if (validateObj["differFrom"]) {
        for (let i = 0; i < validateObj["differFrom"].length; i++) {
            if (date === validateObj["differFrom"][i]) {
                return false;
            }
        }
    }

    return true;
};
