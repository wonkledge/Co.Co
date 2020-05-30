import {either, REJECTED, RESOLVED, resolved, rejected, promiseWrapper} from "./promise";

describe('either function', () => {
    it('call left function on success, call right function on fail', () => {
        const sum = (a,b) => a + b;
        const times = (a, b) => a * b;

        const sumOnSuccessTimesOnFail = either(sum, times);

        expect(sumOnSuccessTimesOnFail.left(2,0)).toBe(2);
        expect(sumOnSuccessTimesOnFail.right(2,0)).toBe(0);
    });
});

describe('resolved function', () => {
    it('Should return object with status RESOLVED', () => {
        const data = 'payload';

        expect(resolved(data)).toStrictEqual({status: RESOLVED, payload: data})
    });
});

describe('rejected function', () => {
    it('Should return object with status REJECTED', () => {
        const data = 'payload';

        expect(rejected(data)).toStrictEqual({status: REJECTED, payload: data})
    });
});


describe('promise wrapper function', () => {
    it('Should resolve when data has status resolved', () => {
        const data = 'payload';
        const promiseStatus = resolved(data);

        expect(promiseWrapper(promiseStatus)).resolves.toBe(data);
    });
});


describe('promise wrapper function', () => {
    it('Should reject when data has status resolved', () => {
        const data = 'payload';
        const promiseStatus = rejected(data);

        expect(promiseWrapper(promiseStatus)).rejects.toBe(data);
    });
});