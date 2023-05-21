const STATE_KEY = 'State';

export class GlobalStateStorage {
	protected _get(): Map<string, any> {
		try {
			const store = JSON.parse(localStorage.getItem(STATE_KEY) || '[]');
			return new Map(store);
		} catch (error) {
			return new Map();
		}
	}

	protected _set(collections: Map<string, any>): void {
		try {
			localStorage.setItem(STATE_KEY, JSON.stringify(Array.from(collections) || []));
		} catch (error) {
			return;
		}
	}

	public value<Type, Payload>(): Map<Type, Payload> {
		return this._get() as Map<Type, Payload>;
	}

	public save<Type, Payload>(action: { type: Type; payload: Payload }): void {
		const state = this._get();

		console.group(`%c[state] ${action.type}`, 'color: #3b82f6');
		console.info(action.payload);
		console.groupEnd();

		state.set(action.type as string, action.payload);

		this._set(state);
	}

	public clear(): void {
		this._set(new Map());
	}
}

export const StateStorage = new GlobalStateStorage();
