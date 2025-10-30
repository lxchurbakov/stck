import React from 'react';
import { Base, Flex, Card, Container, Text, Clickable, BaseProps } from 'lib/atoms';
import { Delimeter } from '@/components/delimeter';

import * as theme from 'lib/theme';
import { useParams } from 'react-router-dom';
import { indifferentStorage, useField, useLocalStorage, useProjects } from '@/hooks';
import { Dropdown } from './components/dropdown';

import config from './nodes';


import { CompositeLeaf } from './nodes';
import { Editor } from './nodes/editor';
import { CompositeInstance } from './nodes/types';
import { CursorContext } from './nodes/cursor';
import { Tree } from './nodes/tree';

export const ProjectPage = () => {
    const [node, setNode] = useLocalStorage('root', { name: 'root', type: 'folder', children: [] });

     const [path, setPath] = React.useState([] as string[]);
    
    const currentNode = React.useMemo(() => {
        return path.slice(1).reduce((acc, token) => {
            if (!acc) {
                return null;
            }
            
            return acc.children.find(($) => $.name === token);
        }, node) as CompositeInstance;
    }, [node, path]);

    // console.log({ path, node, currentNode, wtf: path.slice(0, -1) });

    const setCurrentNode = React.useCallback(($) => {
        for (let key in $) {
            currentNode[key] = $[key];
        }

        setNode({ ...node });
    }, [currentNode, setNode, node]);
  
    return (
        <Container p="128px 20px">
            <Text size="64px" weight="bold" mb="32px">STCK</Text>
            <Text mb="24px">Web development made easy</Text>
            <Delimeter mb="24px" />
            
            <Flex gap="12px">
                <Card w="300px" h="50vh" background="#1e1e1e" radius="24px">
                    <Tree
                        value={node} onChange={setNode} 
                        currentNode={currentNode} setCurrentNode={setCurrentNode}
                        path={path} setPath={setPath}
                    />
                </Card>

                <Card w="100%" h="50vh" radius="24px" style={{ overflow: 'hidden' }} background="#1e1e1e">
                    {currentNode && (
                        <Editor
                            value={currentNode}
                            onChange={setCurrentNode}
                        />
                    )}
                </Card>
            </Flex>
        </Container>
    );
};
