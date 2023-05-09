import { Entity } from './base.entity';

export class MultiRepository<T extends Entity> {
	constructor(private entityName: string) {}

	protected _get(): Array<T> {
		const data = localStorage.getItem(this.entityName);
		return data ? JSON.parse(data) : [];
	}

	protected _set(list: Array<T> = []): void {
		localStorage.setItem(this.entityName, JSON.stringify(list));
	}

	getAll(): Array<T> {
		return this._get();
	}

	find(id: string): T | null {
		const list = this._get();
		return list.find((item) => item.id === id) || null;
	}

	save(item: T | null): T | null {
		if (!item) {
			return null;
		}

		let list = this._get();

		const index = list.findIndex(({ id }) => id === item.id);

		if (index === -1) {
			list = [...list, item];
		} else {
			list[index] = { ...list[index], ...item };
		}

		this._set(list);

		return item;
	}

	bulk(items: Array<T | null>): void {
		items
			.filter((item) => !!item)
			.forEach((item) => {
				this.save(item);
			});
	}

	init(items: Array<T | null>): void {
		const newItems = items.filter((item) => !!item) as Array<T>;
		this._set(newItems);
	}

	delete(item: T | null): T | null {
		if (!item) {
			return null;
		}

		const list = this._get().filter(({ id }) => id !== item.id);

		this._set(list);

		return item;
	}

	deleteAll(): void {
		this._set([]);
	}
}
