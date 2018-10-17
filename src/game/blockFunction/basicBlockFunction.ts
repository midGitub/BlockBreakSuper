import { BaseFunction } from "./baseFunction";
import { BlockEvent } from "../blocks/blockEvent";

export class BasicBlockFunction extends BaseFunction {

    public onEvent(event: BlockEvent, data: any){
        if(!this.isEnable) {
            return;
        }

        if(event == BlockEvent.Collision){
            this.owner.event(BlockEvent.Crash, null);
        }

        if(event == BlockEvent.Crash){
            this.owner.stop();
            this.owner.destory();
        }
    }
}