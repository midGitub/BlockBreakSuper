module framework.util{
	export class ui{
		
		public static playCoinEffect(res: string, sx: number, sy: number, dx: number, dy: number, count: number) {
			for (var i = 0; i < count; i++) {
				var coin: laya.display.Sprite = new laya.display.Sprite();
				coin.loadImage(res);
				Laya.stage.addChild(coin);
				coin.pos(sx + (-20 + Math.random() * 40), sy + (-20 + Math.random() * 40));
				var distance = Math.sqrt((sx - dx)*(sx - dx) + (sy - dy)*(sy - dy));
				var speed = 1000 / 1000;
				Laya.Tween.to(coin, { x: dx, y: dy }, 200 * Math.random() + (distance / speed), null, new Laya.Handler(coin, function () {
					this.removeSelf();
				}));
			}
		}
	}
}