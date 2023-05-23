import { Logger } from './Logger.helper';
import { UUID } from './UUID.helper';

const DATABASE_KEY = 'Database';

class Database {
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

	public getCollection<T extends Entity>(name: string, seed?: Array<T>): Collection<T> {
		const database = this._get();

		const collection = database.get(name) ? Collection.restore<T>(name) : new Collection<T>(name, seed);

		Logger.info('database', name + ' collection is initialized', collection.findAll());

		return collection;
	}
}

class Collection<T extends Entity> {
	private database = new Map<string, Array<T>>();

	static restore<T extends Entity>(name: string) {
		return new Collection<T>(name);
	}

	constructor(private name: string, seed?: Array<T>) {
		if (seed) {
			this._set(seed);
		}
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
		const collection = this.database.get(this.name);

		if (!collection) {
			return [];
		}

		return Array.from(collection.values());
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
		const newItem = { ...item, id: UUID() };

		const newList = [...this._get(), newItem];

		this._set(newList);

		Logger.success('database', `${this.name} created`, newItem);

		return item;
	}

	update(item: T): T {
		const list = this._get();

		const index = list.findIndex(({ id }) => id === item.id);

		if (index !== -1) {
			list[index] = { ...list[index], ...item };

			this._set(list);

			Logger.success('database', `${this.name} updated`, item);
		} else {
			Logger.error('database', `${this.name} not updated`, item);
		}

		return item;
	}

	bulk(items: Array<T>): void {
		items.forEach((item) => {
			this.create(item);
		});
	}

	delete(item: T): T {
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

export const DatabaseStorage = new Database();
