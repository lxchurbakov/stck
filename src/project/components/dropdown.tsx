import React from 'react';
import styled from 'styled-components';

import { Base, Clickable } from 'lib/atoms';

const Wrap = styled(Base)`
    position: relative;
`;

const Overlay = styled(Base)`
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    background: #1e1e1e;
    box-shadow: 0 0 2px 4px rgba(0,0,0,.2);

    border-radius: 12px;

    z-index: 10;
`;

export const useWindow = () => {
    if (typeof window === 'undefined') {
        return null;
    }

    return window;
};

export const useListener = (target: any, event: string, callback: EventListenerOrEventListenerObject, deps: React.DependencyList, options?: any) => {
    React.useEffect(() => {
        target.addEventListener(event, callback, options);
        return () => target.removeEventListener(event, callback);
    }, [...deps, callback]);
};

export const useClickOutside = (predicate) => {
    const ref = React.useRef(null as any);
    const window = useWindow();

    useListener(window ?? {}, 'click', (e) => {
        if (!ref.current?.contains(e.target)) {
            predicate();
        }
    }, [predicate]);

    return ref;
};

export const Dropdown = ({ children, overlay }) => {
    const [visible, setVisible] = React.useState(false);

    return (
        <Wrap ref={useClickOutside(() => setVisible(false))}>
            <Clickable onClick={() => setVisible(true)}>
                {children}
            </Clickable>

            {visible && (
                <Overlay>
                    {overlay}
                </Overlay>
            )}
        </Wrap>
    );
};
