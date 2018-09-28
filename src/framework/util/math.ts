module framework.util{
	export class math{
		
		public static randInt(min, max){
			var v = min + Math.round(Math.random() * (max - min)) % (max - min);
			return v;
		}
	}
}