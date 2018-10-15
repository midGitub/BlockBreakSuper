import { Block } from "../blocks/block";
import { BlockFunction } from "./function";
import { BlockEvent } from "../blocks/blockEvent";

export class Move implements BlockFunction {
    
    instance: Block;
    isEnable: boolean;
    
    public onAwake(instance: Block) {
    }

    public onStart() {
    }

    public onEnabel() {
    }

    public onDisable() {
    }

    public onUpdate(dt: number) {
    }

    public onPause() {
    }

    public onStop() {
    }

    public onDestroy() {
    }

    public onEvent(event: BlockEvent, data: any) {
        throw new Error("Method not implemented.");
    }
}