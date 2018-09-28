
module framework.core {

	export interface IGame {
		gameId: number;
		onLoad(): void;
		onStart(): void;
		onExit(): void;
		onDestroy(): void;
	}

}