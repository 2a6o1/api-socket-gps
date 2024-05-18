import * as stackTrace from "stack-trace";
import path from "path";

const errorWithDetails = (error) => {
    const trace = stackTrace.parse(error);
    // Get the first call site, which is usually the origin of the error
    const origin = trace[0];

    const originFile = origin.getFileName();
    const originLine = origin.getLineNumber();
    const originDir = path.dirname(originFile);

    // Concatenate all details into a single string
    return `Error: ${error.message}
            \nOrigin File: ${originFile}
            \nOrigin Line: ${originLine}
            \nOrigin Directory: ${originDir}`;
}

export default errorWithDetails;