import { Block } from "../blocks/block";
import { BlockEvent } from "../blocks/blockEvent";

export interface BlockFunction {
    instance: Block;
    isEnable: boolean;

    onAwake(instance: Block);
    onStart();
    onEnabel();
    onDisable();
    onUpdate(dt: number): boolean;
    onPause();
    onStop();
    onDestroy();
    onEvent(event: BlockEvent, data: any);
}