export type CompositeType = 'ts' | 'script' | 'folder';

export type CompositeInstance = {
    type: CompositeType,
    name: string,
    data: any,
    children: CompositeInstance[],
};
