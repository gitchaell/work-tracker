import { createContext } from 'react';

import { Work } from '@/core/work/domain/Work.entity';
import { CreateWorkDTO, DeleteWorkDTO, UpdateWorkDTO } from '@/core/work/domain/Work.dto';

interface WorkContextProps {
	works: Work[];
	workSelected: Work | null;
	findWorks: () => Work[];
	selectWork: (work: Work) => void;
	createWork: (work: CreateWorkDTO) => void;
	updateWork: (work: UpdateWorkDTO) => void;
	deleteWork: (work: DeleteWorkDTO) => void;
}

export const WorkContext = createContext<WorkContextProps>({
	works: [],
	workSelected: null,
	findWorks: () => {
		throw new Error('findWorks() method not implemented.');
	},
	selectWork: () => {
		throw new Error('selectWork() method not implemented.');
	},
	createWork: () => {
		throw new Error('createWork() method not implemented.');
	},
	updateWork: () => {
		throw new Error('updateWork() method not implemented.');
	},
	deleteWork: () => {
		throw new Error('deleteWork() method not implemented.');
	},
});
