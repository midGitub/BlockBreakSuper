import { Block } from "../blocks/block";
import { BlockFunction } from "./function";
import { BlockEvent } from "../blocks/blockEvent";
import { BaseFunction } from "./baseFunction";

export class MoveFunction extends BaseFunction {

    public setup(speed: Laya.Vector2, limitRect: Laya.Rectangle){

    }

    public onUpdate(dt: number): boolean{
        if(!super.onUpdate(dt)){
            return false;
        }
        return true;
    }
}