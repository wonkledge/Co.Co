import {either, resolved, rejected, combine} from "./promise";

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

        expect(resolved(data)).resolves.toBe(data)
    });
});

describe('rejected function', () => {
    it('Should return object with status REJECTED', () => {
        const data = 'payload';

        expect(rejected(data)).rejects.toBe(data);
    });
});

describe('combine function', () => {
    it('Should array of functions', () => {
        const sum = (a,b) => a + b;
        const times = (a,b) => a * b;

        expect(combine(sum, times)).toStrictEqual([sum, times]);
    });
});
