import Currency from '../currency/currency.type';

interface HourlyRate {
	id: string;
	value: number;
	currency: Currency;
	date: string;
}

export default HourlyRate;
