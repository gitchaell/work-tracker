import Entity from './base.entity';

class BaseRepository<T extends Entity> {
	private static instance: BaseRepository<Entity>;

	constructor(private entityName: string) {}

	static getInstance<T extends Entity>(entityName: string) {
		if (!BaseRepository.instance) {
			BaseRepository.instance = new BaseRepository<T>(entityName);
		}

		return BaseRepository.instance;
	}

	protected get(): Array<T> {
		const data = localStorage.getItem(this.entityName);
		return data ? JSON.parse(data) : [];
	}

	protected set(list: Array<T> = []): void {
		localStorage.setItem(this.entityName, JSON.stringify(list));
	}

	getAll(): Array<T> {
		return this.get();
	}

	getOne(id: string): T | undefined {
		const list = this.get();
		return list.find((item) => item.id === id);
	}

	create(item: T): T {
		const list = this.get();

		if (list.some(({ id }) => id === item.id)) {
			return item;
		}

		this.set([...list, item]);

		return item;
	}

	update(item: T): T {
		const list = this.get();

		const index = list.findIndex(({ id }) => id === item.id);

		if (index === -1) {
			return this.create(item);
		}

		list[index] = { ...list[index], ...item };

		this.set(list);

		return item;
	}

	delete(item: T): T {
		const list = this.get().filter(({ id }) => id !== item.id);

		this.set(list);

		return item;
	}
}

export default BaseRepository;
