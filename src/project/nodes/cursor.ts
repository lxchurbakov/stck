import React from 'react';

export const CursorContext = React.createContext({ path: [], setPath: () => {} } as { path: string[], setPath: (p: string[]) => void });

export const useCursor = () => {
    const { path, setPath } = React.useContext(CursorContext);

    return { path, setPath };
};
