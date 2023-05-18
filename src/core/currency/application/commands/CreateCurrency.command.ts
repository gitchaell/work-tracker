import { ICommand, ICommandHandler, Injectable, EventPublisher } from 'use-cqrs';

import { CurrencyCreatedEvent } from '@/core/currency/application/events/CurrencyCreated.event';
import { CreateCurrencyDTO } from '@/core/currency/domain/Currency.dto';

export class CreateCurrencyCommand implements ICommand {
	constructor(public readonly currency: CreateCurrencyDTO) {}
}

@Injectable(CreateCurrencyCommand)
export class CreateCurrencyHandler implements ICommandHandler<CreateCurrencyCommand> {
	constructor(private readonly eventBus: EventPublisher) {}

	async handle(command: CreateCurrencyCommand) {
		const { currency } = command;

		console.log('CreateCurrencyCommand', currency);

		this.eventBus.publish(new CurrencyCreatedEvent(currency));
	}
}
