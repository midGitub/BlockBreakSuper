module framework.common{

	export class defaultConfig{
		public compilerOptions : any;
		public exclude : Array<string>;
	}

	export class configs{
		private static configMap = new Map<string, any>();

		public static get<T>(name: string): T{
			return <T>this.load(name);
		}

		public static load(name: string){
			if(!this.configMap.has(name)){
				this.configMap.set(name, net.network.instance().loadJson(name));
			}
			return this.configMap.get(name);
		}

		public static clear(){
			this.configMap.clear();
		}
	}
}