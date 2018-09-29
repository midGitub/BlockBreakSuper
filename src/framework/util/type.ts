export default class type {

    static isFunction(value: any): boolean {
        return value != null && typeof value === "function";
    }

    static isInteger(value: any): boolean {
        return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
    }

    static isNumber(value: any): boolean {
        return typeof value === "number";
    }

    static isString(value: any): boolean {
        return typeof value === "string" || value instanceof String;
    }

    static isObject(value: any): boolean {
        return value && typeof value === "object";
    }

    static isArray(value: any): boolean {
        return Array.isArray(value);
    }

    static isBoolean(value: any): boolean {
        return typeof value === "boolean";
    }
}