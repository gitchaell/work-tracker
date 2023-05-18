import { IEvent, IEventHandler, Injectable } from 'use-cqrs';

import { CreateCurrencyDTO } from '@/core/currency/domain/Currency.dto';

export class CurrencyCreatedEvent implements IEvent {
	constructor(public readonly currency: CreateCurrencyDTO) {}
}

@Injectable(CurrencyCreatedEvent)
export class CurrencyCreatedEventHandler implements IEventHandler<CurrencyCreatedEvent> {
	async handle(event: CurrencyCreatedEvent) {
		const { currency } = event;

		console.log('CurrencyCreatedEvent', currency);
	}
}
