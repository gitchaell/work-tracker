import { EventStorage } from '@/core/common/helpers/EventStorage.helper';
import { Currency } from '@/core/currency/domain/Currency.entity';

export class CurrencyCreatedEvent {
	static eventName = 'currency/created';

	static publish(detail: { currency: Currency }) {
		EventStorage.save({ name: this.eventName, detail });
	}
}
