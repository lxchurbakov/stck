// export const reactive = (predicate) => {
//     let listeners = [] as any[];

//     const on = (listener) => {
//         listeners.push(listener);

//         return () => {
//             listeners = listeners.filter(($) => $ !== listener);
//         };
//     };

//     const emit = () => {
//         listeners.forEach(($) => $());
//     };

//     return (...args) => {
//         const value = predicate(emit, on);

//         return { ...value, on };
//     };
// };
