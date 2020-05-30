export const RESOLVED = 'RESOLVED';
export const REJECTED = 'REJECTED';

export const compose = (...functions) => input => {
    const defaultBehavior = (data) => new Promise((resolve,reject) => reject(data));

    functions.reduceRight((chain, func) => {
        let resolveCallback = func.left ? func.left : func;
        let catchCallback = func.right ? func.right : defaultBehavior;

        return chain.then(resolveCallback).catch(catchCallback)
    }, Promise.resolve(input));
}

export const pipe = (...functions) => input => {
    const defaultBehavior = (data) => new Promise((resolve,reject) => reject(data));

    functions.reduce((chain, func) => {
        let resolveCallback = func.left ? func.left : func;
        let catchCallback = func.right ? func.right : defaultBehavior;

        return chain.then(resolveCallback).catch(catchCallback)
    }, Promise.resolve(input));
}

export const either = (left, right) => ({left: left, right: right});

export const resolved = (data) => new Promise((resolve, rejected) => resolve(data));
export const rejected = (data) => new Promise((resolve, rejected) => rejected(data));

export const promiseWrapper = (data) => new Promise(
    (resolve, reject) => data.status === RESOLVED ? resolve(data.payload) : reject(data.payload)
);

