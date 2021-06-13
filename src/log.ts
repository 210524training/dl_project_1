import log4js from 'log4js';

log4js.configure('logconfig.json');
const Log = log4js.getLogger();

export default Log;
