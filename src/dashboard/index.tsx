import React from 'react';
import { Flex, Card, Container, Text, Clickable } from 'lib/atoms';
import { Button } from '@/components/button';
import { Delimeter } from '@/components/delimeter';
// import { Button } from '@/components/button';
// import { useNavigate } from 'react-router-dom';
import * as theme from 'lib/theme';
import { useNavigate } from 'react-router-dom';
import { useProjects } from '@/hooks';

const rand = (from: number, to: number) => Math.floor(Math.random() * (to - from) + from);



export const DashboardPage = () => {
    const navigate = useNavigate();
    
    const { projects, setProjects } = useProjects();

    const createProject = React.useCallback(() => {
        setProjects([...projects, {
            id: rand(0, 100) + '',
            name: `New Project #${projects.length + 1}`,
        }]);
    }, [projects, setProjects]);

    const openProject = React.useCallback((id: string) => {
        navigate(`/projects/${id}`);
    }, [navigate]);

    return (
        <Container p="128px 20px">
            <Text size="64px" weight="bold" mb="32px">STCK</Text>
            <Text mb="24px">Web development made easy</Text>
            <Delimeter mb="24px" />
            
            <Flex justify="flex-start" gap="8px" mb="24px">
                {projects.map((project) => (
                    <Clickable onClick={() => openProject(project.id)} background={theme.colors.card} key={project.id} p="48px 12px 12px 48px" radius="12px">
                        <Text>{project.name}</Text>
                    </Clickable>
                ))}
            </Flex>

            <Button onClick={createProject}>Create Project</Button>
        </Container>
    );
};
