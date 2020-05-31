import {combine, either, rejected, resolved} from "../promise/promise";
import {HTTP_CODE_500, httpResponseWrapper} from "../httpCode/httpCode";


const handleData = (data) => Array.isArray(data) ? resolved(data.map( datum => datum._doc)) : resolved(data);

const handleError = (error) => rejected(httpResponseWrapper(HTTP_CODE_500, error));

export const query = callback => combine(either(handleData, handleError), callback);