import React from 'react';
import { Container, Text } from 'lib/atoms';
import { Button } from '@/components/button';
import { useNavigate } from 'react-router-dom';

export const NotFoundPage = () => {
    const navigate = useNavigate();
    
    const openMainPage = React.useCallback(() => {
        navigate('/');
    }, [navigate]);

    return (
        <Container p="128px 0">
            <Text size="128px" mb="64px">{'\\(-_-)/'}</Text>
            <Text mb="24px">We are sorry we were unable to find what you were looking for.</Text>

            <Button onClick={openMainPage}>Go to main page</Button>
        </Container>
    );
};
