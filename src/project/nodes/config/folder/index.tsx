import React from 'react';
import { Flex, Text } from 'lib/atoms';

const Editor = () => {
    return (
        <Flex w="100%" h="100%" align="center" justify="center">
            <Text>Folders are not editable</Text>
        </Flex>
    );
};

export default {
    type: 'folder',
    name: 'Folder',
    emoji: '📁',
    description: 'the one that can have files',
    tags: [],
    editor: Editor,
};
