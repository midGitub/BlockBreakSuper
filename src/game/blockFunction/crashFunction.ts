import { BaseFunction } from "./baseFunction";
import { BlockEvent } from "../blocks/blockEvent";

export class CrashFunction extends BaseFunction {

    public onEvent(event: BlockEvent, data: any){
        if(event == BlockEvent.Collision){
            this.owner.event(BlockEvent.Crash, null);
        }
    }
}