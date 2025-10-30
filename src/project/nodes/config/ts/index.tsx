import React from 'react';

import { Editor as MonacoEditor } from '@monaco-editor/react';
import { useField } from '@/hooks';
import { CompositeInstance } from '../../types';

const Editor = ({ value, onChange }: { value: CompositeInstance, onChange: ($: CompositeInstance) => void }) => {
    // if (value.type === 'folder') {
    //     return (
    //         <Flex w="100%" h="100%" align="center" justify="center">
    //             <Text>Folders are not editable</Text>
    //         </Flex>
    //     );
    // }

    const [code, setCode] = useField([value, onChange], 'data', '');

    return (
        <MonacoEditor
            value={code}
            onChange={(e) => setCode(e ?? '')}
            width="100%"
            height="100%"
            theme="vs-dark"
            defaultLanguage="typescript"
        />
    );
};

export default {
    type: 'ts',
    name: 'TS File',
    emoji: '🪛',
    description: 'simple file with code',
    tags: [],
    editor: Editor,
};
