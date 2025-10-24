import React from 'react';
import { BaseProps, Clickable, Text } from 'lib/atoms';
import * as theme from 'lib/theme';

export const Button = ({ children, onClick, ...props }: React.PropsWithChildren<{ onClick?: () => void } & BaseProps>) => {
    return (
        <Clickable border={`1px solid ${theme.colors.border}`} p="8px 24px" radius="12px" onClick={onClick} {...props}>
            <Text>{children}</Text>
        </Clickable>
    );
};
