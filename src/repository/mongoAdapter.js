import {either, rejected, resolved} from "../promise/promise";
import {HTTP_CODE_500, httpResponseWrapper} from "../httpCode/httpCode";


const handleData = (data) => resolved(data.map( datum => datum._doc));

const handleError = (error) => rejected(httpResponseWrapper(HTTP_CODE_500, error));

export const handleQueryResponse = (queryResponse) => either(handleData, handleError);