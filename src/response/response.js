import {either} from "../promise/promise";
import {HTTP_CODE_200, HTTP_CODE_201} from "../httpCode/httpCode";

const VERB_POST = 'VERB_POST';
const VERB_GET = 'VERB_GET';

const handleResponse = (res, verb) => (data) => {
    let httpCode = undefined;

    if (verb === VERB_GET) {
        httpCode = HTTP_CODE_200;
    }

    if (verb === VERB_POST) {
        httpCode = HTTP_CODE_201;
    }

    res.status(httpCode);
    res.json({ data });
}

const handleErrorResponse = (res) => errors => {
    res.status(errors.code);
    res.json({ errors });
}

export const sendResponse = (res, verb) => {
    return either(handleResponse(res,verb), handleErrorResponse(res))
}