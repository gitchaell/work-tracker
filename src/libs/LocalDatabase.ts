import uuid from './uuid';

const DATABASE_KEY = 'Database';

export class LocalDatabase {
	protected _get(): Map<string, Array<Entity>> {
		try {
			const store = JSON.parse(localStorage.getItem(DATABASE_KEY) || '[]');
			return new Map(store);
		} catch (error) {
			return new Map();
		}
	}

	protected _set(collections: Map<string, Array<Entity>> = new Map()): void {
		try {
			localStorage.setItem(DATABASE_KEY, JSON.stringify(Array.from(collections)));
		} catch (error) {
			return;
		}
	}

	public createCollection<T extends Entity>(name: string, seed: Array<T> = []): Collection<T> {
		const database = this._get();

		if (database.has(name)) {
			throw new Error(`Collection ${name} already exists`);
		}

		console.log(`Collection ${name} created`);

		return new Collection<T>(name, seed);
	}

	public deleteCollection(name: string): void {
		const database = this._get();

		if (!database.has(name)) {
			throw new Error(`Collection ${name} does not exist`);
		}

		database.delete(name);

		this._set(database);

		console.log(`Collection ${name} deleted`);
	}
}

class Collection<T extends Entity> {
	private database = new Map<string, Array<T>>();

	constructor(private name: string, seed: Array<T> = []) {
		this._set(seed);
	}

	protected _database(): Map<string, Array<T>> {
		try {
			const store = JSON.parse(localStorage.getItem(DATABASE_KEY) || '[]');
			return new Map(store);
		} catch (error) {
			return new Map();
		}
	}

	protected _get(): Array<T> {
		this.database = this._database();
		return this.database.get(this.name) || [];
	}

	protected _set(list: Array<T> = []): void {
		this.database = this._database();
		this.database.set(this.name, list);
		localStorage.setItem(DATABASE_KEY, JSON.stringify(Array.from(this.database) || []));
	}

	findAll(): Array<T> {
		return this._get();
	}

	findById(id: string): T | null {
		const list = this._get();
		return list.find((item) => item.id === id) || null;
	}

	create(item: T): T {
		const newItem = { ...item, id: uuid() };

		const newList = [...this._get(), newItem];

		this._set(newList);

		return item;
	}

	update(item: T): T | null {
		const list = this._get();

		const index = list.findIndex(({ id }) => id === item.id);

		if (index !== -1) {
			list[index] = { ...list[index], ...item };

			this._set(list);

			return item;
		} else {
			return null;
		}
	}

	bulk(items: Array<T>): void {
		items.forEach((item) => {
			this.create(item);
		});
	}

	delete(item: T): T | null {
		const list = this._get().filter(({ id }) => id !== item.id);

		this._set(list);

		return item;
	}

	deleteAll(): void {
		this._set([]);
	}
}

interface Entity {
	id: string;
}
