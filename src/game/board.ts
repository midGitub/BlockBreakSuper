import log from "../framework/common/log";


export default class Board extends Laya.Script{
    private rigidBody: Laya.RigidBody = null;
    private speed: number = 0;

    public onAwake(){
        log.info("onAwake");
        this.rigidBody = this.owner.getComponent(Laya.RigidBody);
        this.speed = 0;
    }

    public onKeyDown(e: Laya.Event){
        log.info("onKeyDown");
        var maxSpeed = 600;
        if(e.keyCode == Laya.Keyboard.LEFT){
            this.speed = -maxSpeed;
        } else if(e.keyCode == Laya.Keyboard.RIGHT){
            this.speed = maxSpeed;
        }
    }

    public onKeyUp(e: Laya.Event){
        log.info("onKeyUp");
        this.speed = 0;
    }

    public onUpdate(){
        if(this.speed == 0){
            return;
        }
        var dt = Laya.timer.delta;
        (this.owner as Laya.Sprite).x += (dt/1000) * this.speed;
    }
}