import React from 'react';

// import { Flex, Text } from 'lib/atoms';

import CONFIG from './config';

import { CompositeInstance } from './types';

export const Editor = ({ value, onChange }: { value: CompositeInstance, onChange: ($: CompositeInstance) => void }) => {
    const Component = CONFIG[value.type].editor;

    return <Component value={value} onChange={onChange} />;
};
