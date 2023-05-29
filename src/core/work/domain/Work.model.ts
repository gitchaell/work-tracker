import { WorkEntity } from '@/core/work/domain/entities/Work.entity';
import { WorkId } from '@/core/work/domain/value-objects/WorkId.value';
import { WorkTitle } from '@/core/work/domain/value-objects/WorkTitle.value';
import { WorkMinSalary } from '@/core/work/domain/value-objects/WorkMinSalary.value';
import { WorkCreatedAt } from '@/core/work/domain/value-objects/WorkCreatedAt.value';
import { WorkExperience } from '@/core/work/domain/value-objects/WorkExperience.value';
import { WorkDemand } from '@/core/work/domain/value-objects/WorkDemand.value';
import { WorkExperiences } from '@/core/work/domain/constants/WorkExperiences.constant';
import { WorkDemands } from '@/core/work/domain/constants/WorkDemands.constant';
import { PerPeriod } from '@/core/work/domain/value-objects/PerPeriod.value';
import { Currency } from '@/core/currency/domain/Currency.model';

export class Work {
	id: WorkId;
	title: WorkTitle;
	minSalary: WorkMinSalary;
	experience: WorkExperience;
	demand: WorkDemand;
	profitMargin: {
		perMonth: PerPeriod;
	};
	costs: {
		perMonth: PerPeriod;
	};
	workHours: {
		perDay: PerPeriod;
	};
	workDays: {
		perWeek: PerPeriod;
	};
	rate: {
		perSecond: PerPeriod;
		perMinute: PerPeriod;
		perHour: PerPeriod;
		perDay: PerPeriod;
		perWeek: PerPeriod;
		perMonth: PerPeriod;
		perYear: PerPeriod;
	};
	currency: Currency;
	createdAt: WorkCreatedAt;

	static from(entity: WorkEntity, currency: Currency): Work {
		const work = new Work();

		work.id.set(entity.id);
		work.title.set(entity.title);
		work.minSalary.set(entity.minSalary);
		work.experience.set(entity.experience);
		work.demand.set(entity.demand);
		work.profitMargin.perMonth.set(entity.profitMargin.perMonth);
		work.costs.perMonth.set(entity.costs.perMonth);
		work.workHours.perDay.set(entity.workHours.perDay);
		work.workDays.perWeek.set(entity.workDays.perWeek);
		work.rate.perSecond.set(entity.rate.perSecond);
		work.rate.perMinute.set(entity.rate.perMinute);
		work.rate.perHour.set(entity.rate.perHour);
		work.rate.perDay.set(entity.rate.perDay);
		work.rate.perWeek.set(entity.rate.perWeek);
		work.rate.perMonth.set(entity.rate.perMonth);
		work.rate.perYear.set(entity.rate.perYear);
		work.createdAt.set(entity.createdAt);

		work.setCurrency(currency);

		work.calculateRate();

		return work;
	}

	constructor() {
		this.id = new WorkId();
		this.title = new WorkTitle();
		this.minSalary = new WorkMinSalary();
		this.experience = new WorkExperience();
		this.demand = new WorkDemand();
		this.profitMargin = {
			perMonth: new PerPeriod(),
		};
		this.costs = {
			perMonth: new PerPeriod(),
		};
		this.workHours = {
			perDay: new PerPeriod(),
		};
		this.workDays = {
			perWeek: new PerPeriod(),
		};
		this.rate = {
			perSecond: new PerPeriod(),
			perMinute: new PerPeriod(),
			perHour: new PerPeriod(),
			perDay: new PerPeriod(),
			perWeek: new PerPeriod(),
			perMonth: new PerPeriod(),
			perYear: new PerPeriod(),
		};
		this.currency = new Currency();
		this.createdAt = new WorkCreatedAt();
	}

	setCurrency(currency: Currency): void {
		this.currency = currency;
	}

	calculateRate() {
		const weeksPerMonth = 4;

		const workHoursPerWeek = this.workHours.perDay.get() * this.workDays.perWeek.get();
		const workHoursPerMonth = weeksPerMonth * workHoursPerWeek;

		const baseSalary =
			this.minSalary.get() * WorkExperiences[this.experience.get()] * WorkDemands[this.demand.get()];

		const costsByHour = this.costs.perMonth.get() / workHoursPerMonth;
		const baseSalaryByHour = baseSalary / workHoursPerMonth;

		const hourlyRate = (baseSalaryByHour + costsByHour) * (1 + this.profitMargin.perMonth.get() / 100);

		const secondlyRate = hourlyRate / 3600;
		const minutelyRate = hourlyRate / 60;
		const dailyRate = hourlyRate * this.workHours.perDay.get();
		const weeklyRate = dailyRate * this.workDays.perWeek.get();
		const monthlyRate = weeklyRate * 4;
		const yearlyRate = monthlyRate * 12;

		this.rate.perSecond.set(secondlyRate);
		this.rate.perMinute.set(minutelyRate);
		this.rate.perHour.set(hourlyRate);
		this.rate.perDay.set(dailyRate);
		this.rate.perWeek.set(weeklyRate);
		this.rate.perMonth.set(monthlyRate);
		this.rate.perYear.set(yearlyRate);
	}
}
