import {SelectableDataTypes} from "./Data";

export interface DatabaseOperations {
    recordExists: (table: string, column: string, value: string) => Promise<boolean>;
    selectRecord: <T>(table: string, column: string, value: string) => Promise<T>;
    save: <T>(table: string, values: T[] | T) => Promise<T>;
    updateRecord: <T>(table: string, id: number | string, values: Partial<T>) => Promise<T>;
    selectAll: <T>(table: string, column: string, value: SelectableDataTypes) => Promise<T[]>;

}