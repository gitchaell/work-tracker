type LogType = 'info' | 'success' | 'error' | 'warn';

const LogColor = {
	info: '#3b82f6',
	success: '#22c55e',
	error: '#ef4444',
	warn: '#f59e0b',
};

export class Logger {
	static enabled = true;

	static log(type: LogType, module: string, title: string, body: any): void {
		if (!Logger.enabled) return;

		console.group(`%c[${module}] ${title}`, 'color: ' + LogColor[type]);
		console.info(body);
		console.groupEnd();
	}

	static info(module: string, title: string, body: any): void {
		Logger.log('info', module, title, body);
	}

	static success(module: string, title: string, body: any): void {
		Logger.log('success', module, title, body);
	}

	static error(module: string, title: string, body: any): void {
		Logger.log('error', module, title, body);
	}

	static warn(module: string, title: string, body: any): void {
		Logger.log('warn', module, title, body);
	}
}
