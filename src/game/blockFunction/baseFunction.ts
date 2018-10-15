import { BlockFunction } from "./function";
import { Block } from "../blocks/block";
import { BlockEvent } from "../blocks/blockEvent";

export class BaseFunction implements BlockFunction {
    public owner: Block = null;
    public isEnable: boolean = null;
    public updateTime: number = 0;

    onAwake(instance: Block) {
        this.owner = instance;
        this.isEnable = false;
    }

    onStart() {
    }

    onEnabel() {
        this.isEnable = true;
    }

    onDisable() {
        this.isEnable = false;
    }

    onUpdate(dt: number): boolean {
        if (this.isEnable) {
            this.updateTime += dt;
            return true;
        }
        return false;
    }

    onPause() {
    }

    onStop() {
    }

    onDestroy() {
    }

    onEvent(event: BlockEvent, data: any) {
    }
}