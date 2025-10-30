import React from 'react';
import { Clickable, Base, Text, Flex } from 'lib/atoms';

import CONFIG from './config';

// import { useField } from '@/hooks';
import { useCursor } from './cursor';
import { pathsMatch } from './utils';
import { CompositeInstance } from './types';

export const CompositeLeaf = ({ prefix, instance, ...props }: { instance: CompositeInstance, prefix: string[] }) => {
    const { path, setPath } = useCursor();

    const nodePath = React.useMemo(() => ([...prefix, instance.name]), [prefix, instance]);
    const selected = React.useMemo(() => pathsMatch(nodePath, path), [nodePath, path]);

    return (
        <Base onClick={(e) => {setPath(nodePath);e.stopPropagation()}} {...props}>
            <Clickable background={selected ? '#121212' : 'none'}>
                <Text weight={selected ? 'bold' : '400'} size="14px">{instance.name}.{instance.type}</Text>
            </Clickable>

            <Base pl="12px">
                {instance.children.map((child) => (
                    <CompositeLeaf prefix={nodePath} key={child.name} instance={child} />
                ))}
            </Base>
        </Base>
    );
};

export default Object.values(CONFIG);


// export default [
//     ts, folder, script,
//     // folder.config,
//     // {
//     //     type: 'webapp',
//     //     name: 'Web Application',
//     //     emoji: '✨',
//     //     description: 'the one you can find online',
//     // },
//     // {
//     //     type: 'srvapp',
//     //     name: 'Server Application',
//     //     emoji: '🛠️',
//     //     description: 'the one you can you can curl',
//     // },
//     // script.config,
//     // {
//     //     type: 'router',
//     //     name: 'Router',
//     //     emoji: '🚦',
//     //     description: 'the one that accepts requests and dispatches them',
//     // },
//     // {
//     //     type: 'palette',
//     //     name: 'Palette',
//     //     emoji: '💅',
//     //     description: 'the one that lets you manage colors',
//     // },
//     // {
//     //     type: 'vis',
//     //     name: 'Visual Component',
//     //     emoji: '🖼️',
//     //     description: 'the one that you can see',
//     // },
// ];
