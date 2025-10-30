import React from 'react';
import { Flex, Text } from 'lib/atoms';

const Editor = () => {
    return (
        <Flex w="100%" h="100%" align="center" justify="center">
            <Text>Scripts are not editable</Text>
        </Flex>
    );
};

const Knobs = () => {
    return (
        <Text>Nope</Text>
    );
};

export default {
    type: 'script',
    name: 'Script',
    emoji: '📜',
    description: 'the one you can run',
    tags: ['deployable'],
    editor: Editor,
    knobs: Knobs,
};

