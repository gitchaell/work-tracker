export class TaskStartedAt {
	private value!: string;

	get(): string {
		return this.value;
	}

	set(value: string): void {
		this.value = value;
	}
}
