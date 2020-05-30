/**
 *
 * {
 *     source: field's name of data to map
 *     target: field's name wanted
 *     transform: function to apply on field's value (optional)
 * }
 *
 **/


/**
 *
 * @param arr
 * @returns {boolean}
 */
const empty = (arr) => arr.length === 0;

/**
 *
 * @param mapping
 * @returns {function(*): array}
 */
export const mapFields = mapping => data => {
    return data.map( entry => {
        let fields = Object.keys(entry);

        return fields.reduce( (entryMapped, field) => {
            let mapper = mapping.filter( mapper => mapper.source === field);

            if (empty(mapper)) {
                entryMapped[field] = entry[field];
                return entryMapped;
            }

            mapper = mapper[0];

            if (mapper.transform !== undefined)
                entryMapped[mapper.target] = mapper.transform(entry[field], entry);
            else
                entryMapped[mapper.target] = entry[field];

            return entryMapped;
        }, {});
    })
};
