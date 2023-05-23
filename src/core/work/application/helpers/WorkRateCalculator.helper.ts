import { Work, WorkRate } from '@/core/work/domain/Work.entity';
import { WorkExperienceYearsFactor, WorkMarketDemandFactor } from '@/core/work/domain/Work.constant';

export class WorkRateCalculator {
	static calculate(work: Work): WorkRate {
		const weeksPerMonth = 4;

		const workHoursPerWeek = work.workHoursPerDay * work.workDaysPerWeek;
		const workHoursPerMonth = weeksPerMonth * workHoursPerWeek;

		const baseSalary =
			work.minSalary * WorkExperienceYearsFactor[work.experience] * WorkMarketDemandFactor[work.marketDemand];

		const indirectCostsByHour = work.indirectCostsMonthly / workHoursPerMonth;
		const baseSalaryByHour = baseSalary / workHoursPerMonth;

		const hourlyRate = (baseSalaryByHour + indirectCostsByHour) * (1 + work.profitMargin / 100);

		const secondlyRate = hourlyRate / 3600;
		const minutelyRate = hourlyRate / 60;
		const dailyRate = hourlyRate * work.workHoursPerDay;
		const weeklyRate = dailyRate * work.workDaysPerWeek;
		const monthlyRate = weeklyRate * 4;
		const yearlyRate = monthlyRate * 12;

		return {
			perSecond: secondlyRate,
			perMinute: minutelyRate,
			perHour: hourlyRate,
			perDay: dailyRate,
			perWeek: weeklyRate,
			perMonth: monthlyRate,
			perYear: yearlyRate,
		};
	}
}
