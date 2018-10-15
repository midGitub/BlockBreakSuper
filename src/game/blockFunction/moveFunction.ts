import { Block } from "../blocks/block";
import { BlockFunction } from "./function";
import { BlockEvent } from "../blocks/blockEvent";
import { BaseFunction } from "./baseFunction";

export class MoveFunction extends BaseFunction {
    protected speed: Laya.Vector2 = new Laya.Vector2();
    protected limitRect: Laya.Rectangle = null;

    public setup(speed: Laya.Vector2, limitRect: Laya.Rectangle = null) {
        this.speed = speed;
        this.limitRect = limitRect;
    }

    public onUpdate(dt: number): boolean {
        if (!super.onUpdate(dt)) {
            return false;
        }

        var curr = this.owner.getPosition();
        var x = curr.x + this.speed.x * dt;
        var y = curr.y + this.speed.y * dt;
        if (this.limitRect != null && (this.limitRect.width > 0 || this.limitRect.height > 0)) {
            if (x >= this.limitRect.x + this.limitRect.width
                || x < this.limitRect.x
                || y >= this.limitRect.y + this.limitRect.height
                || y < this.limitRect.y) {
                this.speed = new Laya.Vector2(-this.speed.x, -this.speed.y);
            }
        }
        this.owner.setPosition(x, y);
        return true;
    }
}