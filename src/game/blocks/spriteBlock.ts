import { Block } from "./block";
import { Feature } from "../features/feature";

export class SpriteBlock implements Block {

    private instance: Laya.Sprite = null;
    private features: Array<Feature> = new Array<Feature>();
    private isEnable: boolean = false;

    public build(instace: any, props: any) {
        this.instance = instace;
        if (this.instance != null) {
            for (var prop in props) {
                this.instance[prop] = props[prop];
            }
        }
    }

    public addFeature(feature: any) {
        // 重复添加会删除之前的脚本
        this.removeFeature(feature);

        var f = new feature() as Feature;
        f.onAwake(this);
        this.features.push(f);
    }

    public removeFeature(feature: any) {
        this.features = this.features.filter(function (v: Feature, i: number, array) {
            if (v instanceof feature) {
                v.onStop();
                v.onDestroy();
                return false;
            }
            return true;
        }.bind(this));
    }

    public setEnable(enable: boolean) {
        this.isEnable = true;
        for (var i = 0; i < this.features.length; i++) {
            if (enable) {
                this.features[i].onEnabel();
            } else {
                this.features[i].onDisable();
            }
        }

    }

    public start() {
        this.setEnable(true);
        for (var i = 0; i < this.features.length; i++) {
            this.features[i].onStart();
        }
    }

    public stop() {
        this.setEnable(false);
        for (var i = 0; i < this.features.length; i++) {
            this.features[i].onStop();
        }
    }

    public update(dt: number) {
        if (this.isEnable) {
            for (var i = 0; i < this.features.length; i++) {
                this.features[i].onUpdate(dt);
            }
        }
    }

    public destory() {
        for (var i = 0; i < this.features.length; i++) {
            this.features[i].onDestroy();
        }
    }
}