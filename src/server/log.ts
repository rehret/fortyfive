import * as bunyan from "bunyan";
import * as nconf from "nconf";

export const Log = bunyan.createLogger({
    name: "fortyfive",
    level: nconf.get("LOG_LEVEL") || "trace",
    serializers: bunyan.stdSerializers,
    src: nconf.get("LOG_LINENUMBERS") || false
});
