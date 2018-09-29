
export default class Map<K, V> {
    private key: K;
    private value: V;
    private data : any = {};

    constructor(){
        this.data = {};
    }

    public clear(){
        this.data = {};
    }

    public set(key: K, value: V){
        this.data[key] = value;
    }

    public get(key: K): V {
        if(this.data.hasOwnProperty(key)){
            return this.data[key];
        }
        return null;
    }
}