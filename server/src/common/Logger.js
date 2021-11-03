import logger from 'winston';

import config from 'src/config/config.json';
class Logger {
    info(...data) {
        if (config.debug) logger.info(...data);
    }

    debug(...data) {
        logger.debug(...data);
    }

    error(...data) {
        logger.error(...data);
    }
}

export default new Logger();
