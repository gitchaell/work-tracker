import Entity from './base.entity';

export class SingleRepository<T extends Entity> {
	constructor(private entityName: string) {}

	protected _get(): T | null {
		const data = localStorage.getItem(this.entityName);
		return data ? JSON.parse(data) : null;
	}

	protected _set(object: T): void {
		localStorage.setItem(this.entityName, JSON.stringify(object));
	}

	get(): T | null {
		return this._get() || null;
	}

	save(item: T | null): T | null {
		if (!item) {
			return null;
		}

		this._set(item);

		return item;
	}
}
