import { Feature } from "./feature";
import { Block } from "../blocks/block";

export class Move implements Feature {
    
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
}