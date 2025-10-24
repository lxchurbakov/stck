import React from 'react';

import { Card } from 'lib/atoms';

import * as theme from 'lib/theme';

export const Delimeter = ({ ...props }) => {
    return (
        <Card w="100%" h="1px" background={theme.colors.border} {...props} />
    );
};
