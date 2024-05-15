globalThis.Object.getName = () => {
	const error = new Error();
	const stackTrace = error.stack;
	const functionNameRegex = /at\s+([\w.]+)\s+/g;

	let match;
	let functionName = "";
    if (stackTrace !== undefined) {
        while ((match = functionNameRegex.exec(stackTrace))) {
            if (match[1] !== "getCurrentFunctionName") {
                functionName = match[1];
                break;
            }
        }
    }

	return functionName;
};
