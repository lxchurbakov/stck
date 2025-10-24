import React from 'react';
import { Container, Text } from 'lib/atoms';
import { Button } from '@/components/button';
import { Delimeter } from '@/components/delimeter';
// import { Button } from '@/components/button';
// import { useNavigate } from 'react-router-dom';

export const DashboardPage = () => {
    // const navigate = useNavigate();
    
    // const openMainPage = React.useCallback(() => {
    //     navigate('/');
    // }, [navigate]);

    return (
        <Container p="128px 0">
            <Text size="64px" weight="bold" mb="32px">Staack</Text>
            <Text mb="24px">Web development made easy</Text>
            <Delimeter mb="24px" />
            <Button>Create Project</Button>
        </Container>
    );
};
