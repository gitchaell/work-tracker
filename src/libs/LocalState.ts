export class LocalState {
	private name = 'State';

	protected _get(): Map<string, object | null> {
		try {
			const store = JSON.parse(localStorage.getItem(this.name) || '[]');
			return new Map(store);
		} catch (error) {
			return new Map();
		}
	}

	protected _set(collections: Map<string, object | null>): void {
		try {
			localStorage.setItem(this.name, JSON.stringify(collections.entries() || []));
		} catch (error) {
			return;
		}
	}

	public value<Type, Payload>(): Map<Type, Payload> {
		return this._get() as Map<Type, Payload>;
	}

	public save(action: { type: string; payload: object | null }): void {
		const state = this._get();

		state.set(action.type, action.payload);

		this._set(state);
	}

	public clear(): void {
		this._set(new Map());
	}
}
