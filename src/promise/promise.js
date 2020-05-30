export const compose = (...functions) => input => {
    const defaultBehavior = (data) => new Promise((resolve,reject) => reject(data));
    functions.reduceRight((chain, func) => {
        let resolveCallback = func.right ? func.right : func;
        let catchCallback = func.left ? func.left : defaultBehavior;

        return chain.then(resolveCallback).catch(catchCallback)
    }, Promise.resolve(input));
}

export const pipe = (...functions) => input => {
    const defaultBehavior = (data) => new Promise((resolve,reject) => reject(data));
    functions.reduce((chain, func) => {
        let resolveCallback = func.right ? func.right : func;
        let catchCallback = func.left ? func.left : defaultBehavior;

        return chain.then(resolveCallback).catch(catchCallback)
    }, Promise.resolve(input));
}

export const either = (left, right) => ({left: left, right: right});
