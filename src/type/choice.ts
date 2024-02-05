export interface Choice<Value> {
    name?: string;
    description?: string;
    value: Value;
    disabled?: boolean | string;
    checked?: boolean;
    type?: never;
}
