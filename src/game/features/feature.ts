import { Block } from "../blocks/block";

export interface Feature {
    instance: Block;
    isEnable: boolean;

    onAwake(instance: Block);
    onStart();
    onEnabel();
    onDisable();
    onUpdate(dt: number);
    onPause();
    onStop();
    onDestroy();
}