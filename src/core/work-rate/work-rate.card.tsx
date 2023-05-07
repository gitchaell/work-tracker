import { useEffect, useState } from 'react';

type ExperienceLevels = '0-1' | '2-3' | '4-5' | '6-7' | '8-9' | '10+';
type MarketDemand = 'Low' | 'Normal' | 'High';

interface RateInput {
	minSalary: number;
	experience: ExperienceLevels;
	marketDemand: MarketDemand;
	indirectCostsMonthly: number;
	profitMargin: number;
	workHoursPerDay: number;
	workDaysPerWeek: number;
	currency: string;
}

const calculateHourlyRate = (input: RateInput): string => {
	const experienceFactors: Record<ExperienceLevels, number> = {
		'0-1': 1.0,
		'2-3': 1.2,
		'4-5': 1.4,
		'6-7': 1.6,
		'8-9': 1.8,
		'10+': 2.0,
	};

	const marketDemandFactors: Record<MarketDemand, number> = {
		Low: 1.0,
		Normal: 1.1,
		High: 1.2,
	};

	const weeksPerMonth = 4;

	const workHoursPerWeek = input.workHoursPerDay * input.workDaysPerWeek;
	const workHoursPerYear = weeksPerMonth * workHoursPerWeek;

	const baseSalary =
		input.minSalary *
		experienceFactors[input.experience] *
		marketDemandFactors[input.marketDemand];

	const indirectCostsByHour = input.indirectCostsMonthly / workHoursPerYear;
	const baseSalaryByHour = baseSalary / workHoursPerYear;

	const hourlyRate =
		(baseSalaryByHour + indirectCostsByHour) *
		((100 + input.profitMargin) / 100);

	return input.currency + ' ' + hourlyRate.toFixed(2);
};

export const WorkRate = () => {
	const [hourlyRate, setHourlyRate] = useState('');

	useEffect(() => {
		const input: RateInput = {
			minSalary: 2250,
			experience: '4-5',
			marketDemand: 'Normal',
			indirectCostsMonthly: 1300,
			profitMargin: 0,
			workHoursPerDay: 8,
			workDaysPerWeek: 5,
			currency: 'BOB',
		};

		setHourlyRate(calculateHourlyRate(input));
	}, []);

	return <>{hourlyRate}</>;
};
