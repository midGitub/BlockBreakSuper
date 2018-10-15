import { Block } from "./block";
import { BlockEvent } from "./blockEvent";
import { BlockFunction } from "../blockFunction/function";

export class SpriteBlock implements Block {

    private instance: Laya.Sprite = null;
    private functions: Array<BlockFunction> = new Array<BlockFunction>();
    private isEnable: boolean = false;

    public build(instace: any, props: any) {
        this.instance = instace;
        if (this.instance != null) {
            for (var prop in props) {
                this.instance[prop] = props[prop];
            }
        }
    }

    public addFunction(blockFunctionClass: any) {
        // 重复添加会删除之前的脚本
        this.removeFunction(blockFunctionClass);

        var f = new blockFunctionClass() as BlockFunction;
        f.onAwake(this);
        this.functions.push(f);
    }

    public removeFunction(blockFunctionClass: any) {
        this.functions = this.functions.filter(function (v: BlockFunction, i: number, array) {
            if (v instanceof blockFunctionClass) {
                v.onStop();
                v.onDestroy();
                return false;
            }
            return true;
        }.bind(this));
    }

    public setEnable(enable: boolean) {
        this.isEnable = true;
        for (var i = 0; i < this.functions.length; i++) {
            if (enable) {
                this.functions[i].onEnabel();
            } else {
                this.functions[i].onDisable();
            }
        }

    }
    
    public fireEvent(event: BlockEvent, data: any) {
        for(var i = 0; i < this.functions.length; i++){
            this.functions[i].onEvent(event, data);
        }
    }

    public start() {
        this.setEnable(true);
        for (var i = 0; i < this.functions.length; i++) {
            this.functions[i].onStart();
        }
    }

    public stop() {
        this.setEnable(false);
        for (var i = 0; i < this.functions.length; i++) {
            this.functions[i].onStop();
        }
    }

    public update(dt: number) {
        if (this.isEnable) {
            for (var i = 0; i < this.functions.length; i++) {
                this.functions[i].onUpdate(dt);
            }
        }
    }

    public destory() {
        for (var i = 0; i < this.functions.length; i++) {
            this.functions[i].onDestroy();
        }
    }

    public setPosition(x: number, y: number) {
        this.instance.pos(x, y, true);
    }

    public getPosition(): Laya.Vector2 {
        return new Laya.Vector2(this.instance.x, this.instance.y);
    }
}