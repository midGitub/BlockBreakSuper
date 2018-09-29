
export default class Map<K, V> {
    private key: K;
    private value: V;
    private data: any = {};

    constructor() {
        this.data = {};
    }

    public clear() {
        this.data = {};
    }

    public set(key: K, value: V) {
        this.data[key] = value;
    }

    public get(key: K): V {
        if (this.has(key)) {
            return this.data[key];
        }
        return null;
    }

    public has(key: K): boolean {
        return this.data.hasOwnProperty(key);
    }

    public delete(key: K) {
        if (this.has(key)) {
            delete this.data[key];
        }
    }

    public forEach(fn: (value, key) => any) {
        for(var prop in this.data){
            if(this.data.hasOwnProperty(prop)){
                fn(this.data[prop], prop);
            }
        }
    }
}