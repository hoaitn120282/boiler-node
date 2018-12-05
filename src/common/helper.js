import { CLIEngine } from "eslint";
import models from "src/database/Initialize";

const cli = new CLIEngine({
    fix: true,
    useEslintrc: true
});

const helper = {};

/**
 * Convert random date
 * @param {date} start
 * @param {date} end
 */
helper.randomDate = function(start, end) {
    return new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
};
/**
 * Turn the string to dash
 * @param {*} myStr
 */
helper.camelCaseToDash = function(myStr) {
    return myStr.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
};
/**
 * Turn the string to underscore
 * @param {*} myStr
 */
helper.camelCaseToUnderscore = function(myStr) {
    return myStr.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase();
};
/**
 * Change first Char to Uppercase
 * @param {*} myStr
 */
helper.Ucfirst = function(myStr) {
    return myStr.charAt(0).toUpperCase() + myStr.slice(1);
};

/**
 * Convert variable to string
 * @param {*} myStr
 */
helper.parseVariableToString = function(myStr) {
    const args = [].slice.call(arguments, 1);
    let i = 0;

    return myStr.replace(/%s/g, function() {
        return args[i++];
    });
};

/**
 * Format the output data for responding
 * @param data The object/array of data to return within the data property
 * @param message The message return together with response
 * @param additionalProperties Other properties included in the response
 * @returns {{}}
 */
helper.formatOutputData = function(data, message, additionalProperties = {}) {
    const result = {};
    result.data =
        typeof data === "object"
            ? data
            : typeof data != undefined ? data : null;
    result.success = true;
    result.message = message ? message : "common.success";
    Object.assign(result, additionalProperties);
    return result;
};

/**
 * Display the error message to the client. If the error is validation error display exact error, otherwise display unknown error
 * @param err
 * @returns {{success: boolean, message: string}}
 */

helper.displayErrorMessage = function(err) {
    const myErrMsg = [];
    const translateVariablePattern = /\w+\.\w+/g;
    if (Array.isArray(err.errors)) {
        err.errors.forEach(error => {
            if (error instanceof models.Sequelize.ValidationErrorItem) {
                if (error.message.indexOf(".") !== -1) {
                    myErrMsg.push("{{" + error.message + "}}");
                } else {
                    myErrMsg.push(helper.Ucfirst(error.message));
                }
            } else {
                myErrMsg.push(helper.Ucfirst(error.message));
            }
        });
    } else {
        if (err instanceof models.Sequelize.ValidationErrorItem) {
            if (translateVariablePattern.test(err.message)) {
                myErrMsg.push("{{" + err.message + "}}");
            } else {
                myErrMsg.push(helper.Ucfirst(err.message));
            }
        } else {
            myErrMsg.push(err);
        }
    }
    const myMessage = myErrMsg.map(m => {
        return "<li>" + m + "</li>";
    });
    return {
        success: false,
        message: "<ul>" + myMessage.join("") + "</ul>"
    };
};

/**
 * Validate a json string
 * @param str
 * @returns {boolean}
 */
helper.isValidJson = function(str) {
    try {
        JSON.parse(str);
        return true;
    } catch (e) {
        return false;
    }
};

/**
 * Turn the string to camel case
 * @param str
 * @returns {string}
 */
helper.camelize = function(str) {
    return str.trim().replace(/[-_\s]+(.)?/g, (match, c) => c.toUpperCase());
};
/**
 * Format code ESLint
 *
 * @param {String} data
 */
helper.formatCode = data => {
    const report = cli.executeOnText(data);
    return report.results[0].output || data;
};
export default helper;
