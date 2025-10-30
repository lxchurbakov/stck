// import React from 'react';
// import { Base, Clickable, Text, BaseProps } from 'lib/atoms';

// type File = {
//     name: string;
//     type: string;
//     data: any;
// };

// const Folder = ({ file, ...props }: any) => {
//     const [open, setOpen] = React.useState(false);

//     return (
//         <Base {...props}>
//             <Clickable onClick={() => setOpen(!open)}>
//                 <Text size="14px">{open ? '+' : '-'} {file.name}</Text>
//             </Clickable>

//             {open && (
//                 <Base pl="24px">
//                     {file.data.map((child) => (
//                         <Node file={child} />
//                     ))}
//                 </Base>
//             )}
//         </Base>
//     );
// };

// const File = ({ file, ...props }: any) => {
//     const selected = false;

//     return (
//         <Base {...props}>
//             <Clickable background={selected ? '#121212' : 'none'}>
//                 <Text weight={selected ? 'bold' : '400'} size="14px">{file.name}.{file.type}</Text>
//             </Clickable>
//         </Base>
//     )
// };

// const Node = ({ file, ...props }: { file: File } & BaseProps) => {
//     if (file.type === 'folder') {
//         return <Folder file={file} {...props} />
//     }

//     return <File file={file} {...props} />
// };

// class Node {
//     private root = null; // empty tree
// }

// export const Tree = ({ file })


// const useArrayField = ([state, setState], predicate, def) => {
//     const value = React.useMemo(() => state.find(predicate) ?? def, [state, predicate, def]);
//     const setValue = React.useCallback(($) => {
//         setState(state.map((entry) => {
//             if (predicate(entry)) {
//                 return $;
//             } else {
//                 return entry
//             }
//         }));
//     }, [setState, state]);

//     return [value, setValue];
// };
