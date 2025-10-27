import React from 'react';

const indifferentStorage = {
    getItem: (name: string) => {
        if (typeof window === 'undefined') {
            return null;
        }

        return JSON.parse(localStorage.getItem(name) ?? 'null');
    },
    setItem: <T,>(name: string, value: T) => {
        if (typeof window === 'undefined') {
            return null;
        }

        return localStorage.setItem(name, JSON.stringify(value));
    },
};

const useLocalStorage = <T,>(name: string, def: T) => {
    const [state, setState] = React.useState(indifferentStorage.getItem(name) ?? def);

    React.useEffect(() => {
        indifferentStorage.setItem(name, state);
    }, [state]);
    
    return [state, setState];
};

export const useProjects = () => {
    const [projects, setProjects] = useLocalStorage('projects', [] as { name: string }[]);

    const get = React.useCallback((projectId: string) => {
        return projects.find(({ id }) => projectId === id);
    }, [projects]);

    const set = React.useCallback((projectId: string, data: any) => {
        return setProjects((prs) => prs.map(($) => {
            if ($.id === projectId) {
                return data;
            } else {
                return $;
            }
        }));
    }, [projects]);

    return { projects, setProjects, get, set };
};

type State<T> = [T, ($: T) => void];

export const useField = <T, K extends keyof T, S extends T[K]>([state, setState]: State<T>, name: K, def: S) => {
    const value = React.useMemo(() => {
        return state[name] ?? def;
    }, [state, name]);

    const setValue = React.useCallback(($: T[K]) => {
        return setState({ ...state, [name]: $ });
    }, [state, name, setState])

    return [value, setValue];
};
