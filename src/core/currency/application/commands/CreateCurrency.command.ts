import { CreateCurrencyDTO } from '@/core/currency/domain/Currency.dto';
import { Currency } from '@/core/currency/domain/Currency.entity';
import { CurrencyCreatedEvent } from '@/core/currency/application/events/CurrencyCreated.event';
import { CurrencyRepository } from '@/core/currency/infrastructure/Currency.repository';
import { CurrencyMapper } from '@/core/currency/application/helpers/CurrencyMapper.helper';

export class CreateCurrencyCommand {
	static execute(currencyDto: CreateCurrencyDTO): Currency {
		const currencyData = CurrencyMapper.toCurrency(currencyDto);
		const currencyCreated = CurrencyRepository.create(currencyData);

		CurrencyCreatedEvent.publish({ currency: currencyCreated });

		return currencyCreated;
	}
}
