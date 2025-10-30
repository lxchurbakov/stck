import React from 'react';
import { Base, Flex, Text, Clickable, BaseProps } from 'lib/atoms';
import { Dropdown } from '../components/dropdown';
import CONFIG from './config';
import { CompositeInstance } from './types';
import { CursorContext } from './cursor';
import { CompositeLeaf } from '.';

const Knobs = ({ currentNode, setCurrentNode, value, onChange, path }) => {
    const TypeKnobs = CONFIG[currentNode.type].knobs;

    if (TypeKnobs) {
        return <TypeKnobs value={currentNode} onChange={setCurrentNode} />;
    }

    const add = React.useCallback((wtf) => {
        const parent = path.slice(1).reduce((acc, token) => {
            if (!acc) {
                return null;
            }
            
            return acc.children.find(($) => $.name === token) as CompositeInstance;
        }, value) as CompositeInstance;

        parent.children.push(wtf);

        onChange({ ...value });
    }, [path, value, onChange]);

    const remove = React.useCallback(() => {
        const parent = path.slice(1, -1).reduce((acc, token) => {
            if (!acc) {
                return null;
            }
            
            return acc.children.find(($) => $.name === token);
        }, value) as CompositeInstance;

        parent.children = parent.children.filter((child) => child.name !== path[path.length - 1]);

        onChange({ ...value });
    }, [path, value, onChange]);

    const rename = React.useCallback(() => {
        if (!currentNode) {
            return;
        }

        setCurrentNode({ ...currentNode, name: prompt(`New filename`, currentNode.name) ?? currentNode.name });
    }, [currentNode]);

    return (
        <Flex gap="8px">
            <Dropdown overlay={(
                <Flex dir="column" w="300px" align="flex-start">
                    {Object.values(CONFIG).map(({ emoji, type, name, description }) => (
                        <Clickable key={type} p="8px 12px" radius="24px" onClick={() => add({ type, name: prompt('new name', '') ?? '', children: [] })}>
                            <Text size="14px" weight="600">{emoji} {name}</Text>
                            <Text size="14px" weight="400">{description}</Text>
                        </Clickable>
                    ))}
                </Flex>
            )}>
                <Clickable w="23px" h="24px" radius="6px" border="1px solid #cccccc">
                    <Flex w="100%" h="100%" align="center" justify="center">
                        <Text size="14px" weight="bold">+</Text>
                    </Flex>
                </Clickable>
            </Dropdown>

            <Clickable w="23px" h="24px" radius="6px" border="1px solid yellow" onClick={rename}>
                <Flex w="100%" h="100%" align="center" justify="center">
                    <Text size="14px" weight="bold" color="yellow">e</Text>
                </Flex>
            </Clickable>

            <Clickable w="23px" h="24px" radius="6px" border="1px solid red" onClick={remove}>
                <Flex w="100%" h="100%" align="center" justify="center">
                    <Text size="14px" weight="bold" color="red">x</Text>
                </Flex>
            </Clickable>
        </Flex>
    );
};

export type Props = {
    value: CompositeInstance, onChange: ($: CompositeInstance) => void 
    currentNode: CompositeInstance, setCurrentNode: ($: CompositeInstance) => void,
    path: string[], setPath: ($: string[]) => void,
} & BaseProps;

export const Tree = ({ value, onChange, path, setPath, currentNode, setCurrentNode, ...props }: Props) => {
    

    return (
        <Base {...props}>
            <Flex p="24px" justify="space-between">
                <Text weight="800">Files</Text>

                <Knobs {...{ value, onChange, path, currentNode, setCurrentNode }} />
            </Flex>

            <Base p="0 24px">
                <CursorContext.Provider value={{ path, setPath }}>
                    <CompositeLeaf instance={value} prefix={[]} />
                </CursorContext.Provider>
            </Base>
        </Base>
    );
};