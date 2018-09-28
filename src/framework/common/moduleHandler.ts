module framework.common{
	
	export class moduleHandler{

		private static instanceObj: moduleHandler = null;
		public static instance(): moduleHandler {
			if (moduleHandler.instanceObj == null) {
				moduleHandler.instanceObj = new moduleHandler();
			}
			return moduleHandler.instanceObj;
		}

		private moduleHanders = new Map<number, (moduleId: number) => void>();

		public registerModuleHandler(moduleId, handler: (moduleId: number) => void){
			this.moduleHanders.set(moduleId, handler);
		}

		public unregisterModuleHandler(moduleId, handler: (moduleId: number) => void){
			this.moduleHanders.delete(moduleId);
		}

		public go(moduleId: number){
			if(this.moduleHanders.has(moduleId)){
				this.moduleHanders.get(moduleId)(moduleId);
			}
		}
	}
}