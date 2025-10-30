// import { reactive } from "./reactive";

// export type Node = { name: string, children: Node[] };

// export const tree = reactive((emit, on, blob: string) => {
//     let _root: Node = JSON.parse(blob ?? JSON.stringify({ name: '', children: }));

//     const toString = () => {
//         return JSON.stringify(_root);
//     };

//     // Basic first level functions

//     const step = (node: Node, token: string) => {
//         return node.children.find(($) => $.name === token);
//     };

//     const get = (path: string[]) => {
//         return path.reduce((acc, token) => step(acc, token), _root);
//     };

//     const insert = (path: string[], node: Node) => {
//         const parent = get(path);

//         parent?.children.push(node);

//         emit();
//     };

//     // const root = () => {
//     //     return _root;
//     // };

//     const remove = (path: string[]) => {
//         const parent = get(path.slice(0, -1));

//         if (parent) {
//             parent.children = parent?.children.filter(($) => $.name === path[path.length - 1]);
//         }

//         emit();
//     };

//     // Renaming (moving)

//     const rename = (a: string[], b: string[]) => {
//         const node = get(a);

//         if (node) {
//             remove(a);
//             insert(b.slice(0, -1), node);
//         }
//     };

//     // Reactive stuff

//     // on(() => {

//     // });

//     return { toString, get, insert, rename };
// });

// // const tree = reactive((wrap, on) => {
//     // let nodes:  Node[] = indifferentStorage.getItem('nodes') ?? [];

//     // const add = wrap((prefix: string, name: string, type: string) => {
//     //     nodes.push({ name, type, children: [], data: '/* */' });
//     // });

//     // const all = () => {
//     //     return nodes;
//     // };

//     // const get = (path: string) => {
//     //     const tokens = path.split('/');
//     //     let pointer = { children: nodes } as any;

//     //     console.log({ tokens })

//     //     for (let token of tokens) {
//     //         pointer = pointer.children.find(($) => $.name === token);
//     //     }

//     //     return pointer;
//     // };

//     // const rename = wrap((index: number, name) => {
//     //     nodes[index].name = name;
//     // });

//     // const setData = wrap((index: number, data) => {
//     //     nodes[index].data = data;
//     // });

//     // const remove = wrap((index: number) => {
//     //     nodes.splice(index, 1);
//     // });

//     // on(() => {
//     //     indifferentStorage.setItem('nodes', nodes);
//     // });

//     // return {
//     //     add, get, all, rename, setData, remove
//     // };
// // });
