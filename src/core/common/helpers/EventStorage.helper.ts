const EVENTS_KEY = 'Events';

export class GlobalEventStorage {
	protected _get(): Map<string, any> {
		try {
			const store = JSON.parse(localStorage.getItem(EVENTS_KEY) || '[]');
			return new Map(store);
		} catch (error) {
			return new Map();
		}
	}

	protected _set(collections: Map<string, any>): void {
		try {
			localStorage.setItem(EVENTS_KEY, JSON.stringify(Array.from(collections) || []));
		} catch (error) {
			return;
		}
	}

	public value<Name, Detail>(): Map<Name, Detail> {
		return this._get() as Map<Name, Detail>;
	}

	public save(event: { name: string; detail: any }): void {
		const state = this._get();

		state.set(event.name, event.detail);

		console.group(`%c[event] ${event.name}`, 'color: #3b82f6');
		console.info(event.detail);
		console.groupEnd();

		this._set(state);
	}

	public clear(): void {
		this._set(new Map());
	}
}

export const EventStorage = new GlobalEventStorage();
