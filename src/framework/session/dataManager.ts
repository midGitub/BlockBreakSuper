import type from "../util/type";
import format, { formatType } from "../util/format";
import Map from "../util/Map";

export interface dataEventHandler {
    (data: dataInfo): void;
}

export class dataInfo {
    private _value: any = null;
    public lastValue: any = null;
    public getter: () => any = null;
    public setter: (data: any) => void = null;
    public handlers = new Map<any, dataEventHandler>();

    constructor() {
        this._value = null;
        this.lastValue = null;
        this.getter = null;
        this.setter = null;
        this.handlers.clear();
    }

    public value() {
        if (type.isFunction(this.getter)) {
            return this.getter();
        }
        return this._value;
    }

    public string(ftype: formatType = formatType.Normal, formatStr: string = null, maxLength: number = 0) {
        var value = this.value();
        if (value == null) {
            return "";
        }
        if (type.isNumber(value)) {
            return format.number(value, ftype, formatStr);
        }
        return value;
    }

    public number() {
        var value = this.value();
        if (value == null) {
            return 0;
        }
        return value;
    }

    public setValue(value) {
        this.lastValue = this.value();
        if (type.isFunction(this.setter)) {
            this.setter(value);
        } else {
            this._value = value;
        }
    }
}

export class dataManager {

    private static instanceObj: dataManager = null;
    public static instance(): dataManager {
        if (dataManager.instanceObj == null) {
            dataManager.instanceObj = new dataManager();
        }
        return dataManager.instanceObj;
    }

    private dataInfos = new Map<string, dataInfo>();

    public initialize() {
        this.reset();
    }

    public reset() {
        this.dataInfos = new Map<string, dataInfo>();
    }

    public addDataHandler(dataName: string, instance: any, handler: dataEventHandler, callHandler: boolean = true) {
        if (!this.dataInfos.has(dataName)) {
            this.dataInfos.set(dataName, new dataInfo());
        }
        var info = this.dataInfos.get(dataName);
        info.handlers.set(instance, handler);
        if (callHandler === true) {
            info.handlers.get(instance).call(instance, info);
        }
        return info;
    }

    public ramoveDataHandler(dataName: string, instance: any) {
        if (this.dataInfos.has(dataName)) {
            this.dataInfos.get(dataName).handlers.delete(instance);
        }
    }

    public removeAllDataHandler(instance: any) {
        this.dataInfos.forEach(function (value, key) {
            this.ramoveDataHandler(key, instance);
        }.bind(this));
    }

    public callDataHandler(dataName: string) {
        if (this.dataInfos.has(dataName)) {
            var handlers = this.dataInfos.get(dataName).handlers;
            handlers.forEach(function (value, key, map) {
                if (type.isFunction(value)) {
                    value.call(key, this.dataInfos.get(dataName));
                }
            }.bind(this));
        }
    }

    public setDataSetter(dataName: string, setter: (data: any) => void) {
        if (!this.dataInfos.has(dataName)) {
            this.dataInfos.set(dataName, new dataInfo());
        }
        this.dataInfos.get(dataName).setter = setter;
    }

    public setDataGetter(dataName: string, getter: () => any) {
        if (!this.dataInfos.has(dataName)) {
            this.dataInfos.set(dataName, new dataInfo());
        }
        this.dataInfos.get(dataName).getter = getter;
    }

    public setData(dataName: string, value: any, callHandler: boolean = false) {
        if (!this.dataInfos.has(dataName)) {
            this.dataInfos.set(dataName, new dataInfo());
        }
        this.dataInfos.get(dataName).setValue(value);
        if (callHandler === true) {
            this.callDataHandler(dataName);
        }
    }

    public addData(dataName: string, value: number, callHandler: boolean = false) {
        if (!this.dataInfos.has(dataName)) {
            this.dataInfos.set(dataName, new dataInfo());
        }
        var curValue = this.getData(dataName);
        if (curValue == null) {
            curValue = 0;
        }
        if (type.isNumber(value) && type.isNumber(curValue)) {
            this.dataInfos.get(dataName).setValue(curValue + value);
            if (callHandler === true) {
                this.callDataHandler(dataName);
            }
        }
    }

    public getData(dataName: string, defaultValue: any = null) {
        var value = null;
        if (this.dataInfos.has(dataName)) {
            value = this.dataInfos.get(dataName).value();
        }
        if (value == null) {
            value = defaultValue;
        }
        return value;
    }

    public getLastData(dataName: string, defaultValue: any = null) {
        var value = null;
        if (this.dataInfos.has(dataName)) {
            value = this.dataInfos.get(dataName).lastValue;
        }
        if (value == null) {
            value = defaultValue;
        }
        return value;
    }
}