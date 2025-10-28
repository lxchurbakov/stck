import React from 'react';
import { Base, Flex, Card, Container, Text, Clickable, BaseProps } from 'lib/atoms';
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

const File = ({ selected, file, onClick, ...props }: { selected?: boolean, file: File, onClick: () => void } & BaseProps) => {
    return (
        <Base onClick={onClick} {...props}>
            <Clickable background={selected ? '#121212' : 'none'}>
                <Text weight={selected ? 'bold' : '400'} size="14px">{file.name}.{file.extension}</Text>
            </Clickable>
        </Base>
    )
};

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

// const useFileTree = ([state, setState] = React.useState([] as File[])) => {
//     const get = React.useCallback((path: string) => {

//     }, []);

//     return { get, list };
// };

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
    
    const [files, setFiles] = useField([project, setProject], 'files', []);

    const addFileToRoot = React.useCallback(() => {
        setFiles([...files, {
            name: 'file-'+Math.random(),
            extension: 'ts',
            content: '',
            children: [],
        }]);
    }, [setFiles, files]);

    const [index, setIndex] = React.useState(0);

    const file = React.useMemo(() => files[index], [files, index]);
    const setFile = React.useCallback(($) => setFiles(files.map((e, i) => i === index ? $ : e)), [setFiles, files, index]);

    // const [file, setFile] = useArrayField([files, setFiles], (f) => f.name === path.slice(1), null);

    const [code, setCode] = useField([file ?? {}, setFile], 'content', '');

    const deleteFile = React.useCallback(() => {
        setFiles(files.filter((f, i) => i !== index ));
    }, [setFiles, files, index]);

    const renameFile = React.useCallback(() => {
        if (!file) {
            return;
        }

        const name = prompt(`New filename`, file.name)
        setFile({...file, name })
    }, [file, setFile]);

    return (
        <Container p="128px 20px">
            <Text size="64px" weight="bold" mb="32px">STCK</Text>
            <Text mb="24px">Web development made easy</Text>
            <Delimeter mb="24px" />
            
            <Flex gap="12px">
                <Card w="300px" h="50vh" background="#1e1e1e" radius="24px">
                    <Flex p="24px" justify="space-between">
                        <Text weight="800">Файлы</Text>

                        <Flex gap="8px">
                            <Clickable w="23px" h="24px" radius="6px" border="1px solid #cccccc" onClick={addFileToRoot}>
                                <Flex w="100%" h="100%" align="center" justify="center">
                                    <Text size="14px" weight="bold">+</Text>
                                </Flex>
                            </Clickable>

                            <Clickable w="23px" h="24px" radius="6px" border="1px solid yellow" onClick={renameFile}>
                                <Flex w="100%" h="100%" align="center" justify="center">
                                    <Text size="14px" weight="bold" color="yellow">e</Text>
                                </Flex>
                            </Clickable>

                            <Clickable w="23px" h="24px" radius="6px" border="1px solid red" onClick={deleteFile}>
                                <Flex w="100%" h="100%" align="center" justify="center">
                                    <Text size="14px" weight="bold" color="red">x</Text>
                                </Flex>
                            </Clickable>
                        </Flex>
                    </Flex>

                    <Base p="0 24px">
                        {files.map((file, i) => (
                            <File selected={i === index} file={file} key={i} onClick={() => setIndex(i)} />
                        ))}
                    </Base>
                </Card>

                <Card w="100%" h="50vh" radius="24px" style={{ overflow: 'hidden' }} background="#1e1e1e">
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
