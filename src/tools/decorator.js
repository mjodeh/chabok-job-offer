"use strict";
import logWinston from "./log";
/**
 * log decorator
 * @param {string} className
 */
const logTime = className => {
    return (target, key, descriptor) => {
        if (descriptor.value === null || descriptor.value === undefined) {
            return descriptor;
        }
        const originalMethod = descriptor.value.bind(target);
        descriptor.value = async (...args) => {
            let currentTime = process.hrtime()[1];// time in nano sec
            try {
                const result = await originalMethod(...args);
                let logObject = {
                    className,
                    time: process.hrtime()[1] - currentTime,// execution time
                };
                logWinston.info(JSON.stringify(logObject));
                return result;
            } catch (ex) {
                let logObject = {
                    className,
                    funcName: key,
                    hasException: true,
                    time: process.hrtime()[1] - currentTime,// execution time
                };
                logWinston.info(JSON.stringify(logObject));
                throw ex;
            }
        };
        return descriptor;
    };
};

const logController = className => {
    return (target, key, descriptor) => {
        if (descriptor.value === null || descriptor.value === undefined) {
            return descriptor;
        }
        const originalMethod = descriptor.value.bind(target);
        let funcParams = getParams(descriptor.value);
        descriptor.value = async (...args) => {
            let currentTime = new Date().getTime();
            let input = getFunctionInputAsObject(funcParams, args);
            try {
                const result = await originalMethod(...args);
                let logObject = {
                    className,
                    funcName: key,
                    input,
                    output: result,
                    hasException: false,
                    time: new Date().getTime() - currentTime,
                    trackId: input.trackId
                };
                logWinston.info(JSON.stringify(logObject));
                return result;
            } catch (ex) {
                let logObject = {
                    className,
                    funcName: key,
                    input,
                    hasException: true,
                    time: new Date().getTime() - currentTime,
                    exception: {
                        message: ex.message
                    },
                    trackId: input.trackId
                };
                logWinston.info(JSON.stringify(logObject));
                return new result(true, 500, "internal server error", null);
            }
        };
        return descriptor;
    };
};
/**
 * get function input parameters
 * @param {function} func
 */
function getParams(func) {
    let str = func.toString();

    // Remove comments of the form /* ... */
    // Removing comments of the form //
    // Remove body of the function { ... }
    // removing '=>' if func is arrow function
    str = str
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/\/\/(.)*/g, "")
        .replace(/{[\s\S]*}/, "")
        .replace(/=>/g, "")
        .trim();

    let start = str.indexOf("(") + 1;
    let end = str.length - 1;
    let result = str.substring(start, end).split(", ");
    let params = [];

    result.forEach(element => {
        // Removing any default value
        element = element.replace(/=[\s\S]*/g, "").trim();

        if (element.length > 0) params.push(element);
    });
    return params;
}
/**
 * convert array to object
 * @param {object[]} params
 * @param {object[]} args
 */
function getFunctionInputAsObject(params, args) {
    let paramsOut = {};
    for (let i = 0; i < args.length; i++) {
        paramsOut[params[i]] = args[i];
    }
    return paramsOut;
}

/**@module decorators */
export default { logTime, logController };
