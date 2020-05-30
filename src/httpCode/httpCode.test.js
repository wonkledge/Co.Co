import { httpResponseWrapper, HTTP_CODE_200 } from './httpCode';
describe('httpResponseWrapper function', () => {
    it('Should return object with code and payload', () => {

        expect(httpResponseWrapper(HTTP_CODE_200, { id: 34, name: 'anais'}))
            .toStrictEqual({ code: 200, payload: {id:34, name:'anais'}})
    });
});
