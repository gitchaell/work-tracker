import { useCallback, useEffect, useReducer, useState } from 'react';

import { Work } from '@/core/work/domain/Work.entity';
import { WorkService } from '@/core/work/application/Work.service';
import {
	WorkInitialState,
	WorkReducer,
	WorkStateInitializer,
} from '@/core/work/presentation/state/Work.state';
import { WorkContext } from '@/core/work/presentation/context/Work.context';
import { CreateWorkDTO, DeleteWorkDTO, UpdateWorkDTO } from '@/core/work/domain/Work.dto';
import { WorkCreatedEvent } from '@/core/work/application/events/WorkCreated.event';
import { WorkUpdatedEvent } from '@/core/work/application/events/WorkUpdated.event';
import { WorkDeletedEvent } from '@/core/work/application/events/WorkDeleted.event';

export const WorkProvider = ({ children }: { children: JSX.Element }) => {
	const [{ workSelected }, dispatch] = useReducer(WorkReducer, WorkInitialState, WorkStateInitializer);

	const [works, setWorks] = useState([] as Work[]);

	const findWorks = useCallback(() => {
		const works = WorkService.findWorks();
		setWorks(works);
		return works;
	}, []);

	const selectWork = useCallback((work: Work) => {
		dispatch({ type: 'work/selected', payload: work });
	}, []);

	const createWork = useCallback((work: CreateWorkDTO) => {
		const workCreated = WorkService.createWork(work);
		dispatch({ type: 'work/selected', payload: workCreated });
	}, []);

	const updateWork = useCallback((work: UpdateWorkDTO) => {
		const workUpdated = WorkService.updateWork(work);
		dispatch({ type: 'work/selected', payload: workUpdated });
	}, []);

	const deleteWork = useCallback((work: DeleteWorkDTO) => {
		WorkService.deleteWork(work);
		dispatch({ type: 'work/unselected', payload: null });
	}, []);

	useEffect(() => {
		const handleWorkManipulation = () => {
			const works = WorkService.findWorks();
			setWorks(works);
		};

		WorkCreatedEvent.subscribe(handleWorkManipulation);
		WorkUpdatedEvent.subscribe(handleWorkManipulation);
		WorkDeletedEvent.subscribe(handleWorkManipulation);

		return () => {
			WorkCreatedEvent.unsubscribe(handleWorkManipulation);
			WorkUpdatedEvent.unsubscribe(handleWorkManipulation);
			WorkDeletedEvent.unsubscribe(handleWorkManipulation);
		};
	}, []);

	return (
		<WorkContext.Provider
			value={{
				works,
				workSelected,
				findWorks,
				selectWork,
				createWork,
				updateWork,
				deleteWork,
			}}
		>
			{children}
		</WorkContext.Provider>
	);
};
