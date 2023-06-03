export type UnloadEventListener = EventListenerOrEventListenerObject;

export class UnloadEvent {
	static eventName = 'common/unload';

	static subscribe(handler: UnloadEventListener) {
		window.addEventListener('beforeunload', handler as EventListener);
	}

	static unsubscribe(handler: UnloadEventListener) {
		window.removeEventListener('beforeunload', handler as EventListener);
	}
}
