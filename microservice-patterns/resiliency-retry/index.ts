// https://github.com/mauricedb/polly-js/blob/master/src/polly.js

type Callback = () => Promise<any>

type Config = {
    delays: number[];
    needsRetryOrNot: (e: Error | null) => boolean;
}

function executeForPromiseWithDelay(config: Config, cb: Callback) {
    return new Promise(function (resolve, reject) {
        function execute() {
            var original = cb();
            original.then(function (e) {
                resolve(e);
            }, function (e) {
                var delay = config.delays.shift();
                if (delay && config.needsRetryOrNot(e)) {
                    setTimeout(execute, delay);
                } else {
                    reject(e);
                }
            });
        }

        execute();
    });
}