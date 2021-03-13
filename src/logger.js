const loggingEnabled = true;
const noop = () => {};

const logger = {
    /* eslint-disable no-console */
    debug: loggingEnabled ? console.log : noop,
    log: loggingEnabled ? console.log : noop,
    warn: loggingEnabled ? console.log : noop,
    /* eslint-disable no-console */
};

export default logger;
