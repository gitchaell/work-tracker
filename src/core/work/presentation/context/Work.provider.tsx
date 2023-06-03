import { useCallback, useEffect, useReducer, useState } from 'react';

import { Work } from '@/core/work/domain/Work.model';
import { WorkService } from '@/core/work/application/Work.service';
import { WorkState } from '@/core/work/presentation/state/Work.state';
import { WorkContext } from '@/core/work/presentation/context/Work.context';
import { WorkCreatedEvent, WorkCreatedEventListener } from '@/core/work/application/events/WorkCreated.event';
import { WorkUpdatedEvent, WorkUpdatedEventListener } from '@/core/work/application/events/WorkUpdated.event';
import { WorkDeletedEvent, WorkDeletedEventListener } from '@/core/work/application/events/WorkDeleted.event';
import { WorkEntity } from '@/core/work/domain/entities/Work.entity';
import { WorkMapper } from '@/core/work/infrastructure/Work.mapper';

export const WorkProvider = ({ children }: { children: JSX.Element }) => {
	const [{ workSelected }, dispatch] = useReducer(
		WorkState.reducer,
		WorkState.initialState,
		WorkState.initializer
	);

	const [works, setWorks] = useState(WorkService.findWorks().map(WorkMapper.toModel));

	const findWorks = useCallback(() => {
		const works = WorkService.findWorks().map(WorkMapper.toModel);
		setWorks(works);
		return works;
	}, []);

	const selectWork = useCallback((work: Work) => {
		dispatch({ type: 'work/selected', payload: WorkMapper.toEntity(work) });
	}, []);

	const unselectWork = useCallback(() => {
		dispatch({ type: 'work/unselected', payload: null });
	}, []);

	const createWork = useCallback((work: Work | WorkEntity) => {
		const workCreated = WorkService.createWork(work);
		const workModel = WorkMapper.toModel(workCreated);

		return workModel;
	}, []);

	const updateWork = useCallback((work: Work | WorkEntity) => {
		const workUpdated = WorkService.updateWork(work);
		const workModel = WorkMapper.toModel(workUpdated);

		return workModel;
	}, []);

	const deleteWork = useCallback((work: Work | WorkEntity) => {
		const workDeleted = WorkService.deleteWork(work);
		const workModel = WorkMapper.toModel(workDeleted);

		return workModel;
	}, []);

	useEffect(() => {
		const handleWorkCreated: WorkCreatedEventListener = (event) => {
			const workModel = WorkMapper.toModel(event.detail.work);
			setWorks((previous) => [...previous, workModel]);
		};

		const handleWorkUpdated: WorkUpdatedEventListener = (event) => {
			const workModel = WorkMapper.toModel(event.detail.work);
			setWorks((previous) =>
				previous.map((work) => (work.id.get() === workModel.id.get() ? workModel : work))
			);
		};

		const handleWorkDeleted: WorkDeletedEventListener = (event) => {
			const workModel = WorkMapper.toModel(event.detail.work);
			setWorks((previous) => previous.filter((work) => work.id.get() !== workModel.id.get()));
		};

		WorkCreatedEvent.subscribe(handleWorkCreated);
		WorkUpdatedEvent.subscribe(handleWorkUpdated);
		WorkDeletedEvent.subscribe(handleWorkDeleted);

		return () => {
			WorkCreatedEvent.unsubscribe(handleWorkCreated);
			WorkUpdatedEvent.unsubscribe(handleWorkUpdated);
			WorkDeletedEvent.unsubscribe(handleWorkDeleted);
		};
	}, []);

	return (
		<WorkContext.Provider
			value={{
				works,
				workSelected: workSelected ? WorkMapper.toModel(workSelected) : null,
				findWorks,
				selectWork,
				unselectWork,
				createWork,
				updateWork,
				deleteWork,
			}}
		>
			{children}
		</WorkContext.Provider>
	);
};
