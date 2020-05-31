export const RESOLVED = 'RESOLVED';
export const REJECTED = 'REJECTED';

export const compose = (...functions) => input => {
    const defaultBehavior = (data) => new Promise((resolve,reject) => reject(data));

    functions.reduce( (acc, fct) => {
        if (Array.isArray(fct)) {
            return [...acc, ...fct];
        }

        return [...acc, fct];
    }, []).reduceRight((chain, func) => {
        let resolveCallback = func.left ? func.left : func;
        let catchCallback = func.right ? func.right : defaultBehavior;

        return chain.then(resolveCallback).catch(catchCallback)
    }, Promise.resolve(input));
}

export const combine = (...functions) => functions;
export const either = (left, right) => ({left: left, right: right});
export const resolved = (data) => new Promise((resolve, rejected) => resolve(data));
export const rejected = (data) => new Promise((resolve, rejected) => rejected(data));

export const promiseWrapper = (data) => new Promise(
    (resolve, reject) => data.status === RESOLVED ? resolve(data.payload) : reject(data.payload)
);

