import { Feature } from "../features/feature";

export interface Block {
    build(instace: any, props: any);
    addFeature(feature : any);
    removeFeature(feature : any);
    sendMessage(msg: string, params: any);
    start();
    update(dt : number);
    stop();
    destory();
}