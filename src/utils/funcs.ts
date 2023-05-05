export const $ = <E extends Element>(query: string) =>
    document.querySelector(query) as E
