import { BlockEvent } from "./blockEvent";
import { BlockFunction } from "../blockFunction/function";

export interface BlockEventSender {
    event(event: BlockEvent, data: any);
}

export interface Block extends BlockEventSender{
    build(instace: any, props: any);
    addFunction(blockFunctionClass: any);
    removeFunction(blockFunctionClass: any);
    start();
    update(dt: number);
    stop();
    destory();
    onCollision(target: any);
    setPosition(x: number, y: number);
    getPosition(): Laya.Vector2;
}