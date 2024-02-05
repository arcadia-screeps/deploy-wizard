export type Prettify<T> = unknown & {
    [K in keyof T]: T[K];
} ;
