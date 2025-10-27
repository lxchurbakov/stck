import React from 'react';
import { Base, Flex, Card, Container, Text, Clickable } from 'lib/atoms';
import { Button } from '@/components/button';
import { Delimeter } from '@/components/delimeter';
import { Editor } from '@monaco-editor/react';
// import { Button } from '@/components/button';
// import { useNavigate } from 'react-router-dom';
import * as theme from 'lib/theme';
import { useParams } from 'react-router-dom';
import { useField, useProjects } from '@/hooks';
// import { useNavigate } from 'react-router-dom';

// edit many files
// files can be 

type File = {
    name: string;
    extension: string;
    data: any;
};

const File = ({ file }: { file: File }) => {

};

export const ProjectPage = () => {
    const { projectId } = useParams();
    const { projects, get, set } = useProjects();

    if (!projectId) {
        return null;
    }

    const project = React.useMemo(() => projectId ? get(projectId) : null, [get, projectId]);

    if (!project) {
        return null;
    }

    const setProject = React.useCallback(($: any) => set(projectId as string, $), [projectId, set]);

    // const [projects, setProjects] = useLocalStorage('projects', [] as { name: string }[]);
    const [code, setCode] = React.useState('');
    const [files, setFiles] = useField([project, setProject], 'files', []);

    const addFileToRoot = React.useCallback(() => {
        setFiles([...files, {
            name: 'new-file',
            extension: 'ts',
        }]);
    }, [setFiles, files]);

    return (
        <Container p="128px 20px">
            <Text size="64px" weight="bold" mb="32px">STCK</Text>
            <Text mb="24px">Web development made easy</Text>
            <Delimeter mb="24px" />
            
            <Flex gap="12px">
                <Card w="300px" h="50vh" background="#1e1e1e" radius="24px">
                    <Flex p="24px" justify="space-between">
                        <Text weight="800">Файлы</Text>

                        <Clickable w="23px" h="24px" radius="6px" border="1px solid #cccccc" onClick={addFileToRoot}>
                            <Flex w="100%" h="100%" align="center" justify="center">
                                <Text size="14px" weight="bold">+</Text>
                            </Flex>
                        </Clickable>
                    </Flex>

                    <Base p="0 24px">
                        {files.map((file) => (
                            <Base>
                                <Clickable>
                                    <Text size="14px">{file.name}.{file.extension}</Text>
                                </Clickable>
                            </Base>
                        ))}
                    </Base>
                </Card>

                <Card w="100%" h="50vh" radius="24px" style={{ overflow: 'hidden' }}>
                    <Editor
                        value={code}
                        onChange={(e) => setCode(e ?? '')}
                        width="100%"
                        height="100%"
                        theme="vs-dark"
                        defaultLanguage="typescript"

                    />
                </Card>
            </Flex>
        </Container>
    );
};
