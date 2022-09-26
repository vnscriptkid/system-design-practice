// https://blog.appsignal.com/2020/07/22/nodejs-resiliency-concepts-the-circuit-breaker.html
// https://www.yaircarreno.com/2021/01/circuit-breaker-pattern-implemented.html
// https://tutorialedge.net/typescript/angular/stability-patterns-in-angular/
// https://martinfowler.com/bliki/CircuitBreaker.html
// https://www.npmjs.com/package/opossum

enum State {
    OPEN,
    CLOSED,
    HALF_OPEN
}

class CircuitBreakerIsOpen extends Error { }

class CircuitBreaker {
    invocationTimeout: number;
    failureThreshold: number;
    failureCount: number;
    successCount: number;
    underlyingCall: Function;
    state: State;
    nextCallAt: number;
    successThreshold: number;

    constructor(underlyingCall: Function) {
        this.invocationTimeout = 3000;
        this.failureThreshold = 5;
        this.failureCount = 0;
        this.underlyingCall = underlyingCall;
        this.state = State.CLOSED;
        this.nextCallAt = 0;
        this.successCount = 0;
        this.successThreshold = 2;

        this.call = this.call.bind(this);
    }

    async call(...args: any[]): Promise<any> {
        switch (this.state) {
            case State.CLOSED,
                State.HALF_OPEN: {
                    try {
                        const result = await this.underlyingCall(...args);
                        this._handleSuccess()
                        return result;
                    } catch (err) {
                        this._handleFailure();
                        throw err;
                    }
                }
            case State.OPEN: {
                if (Date.now() > this.nextCallAt) {
                    this.state = State.HALF_OPEN;

                    return await this.call(...args);
                }

                throw new CircuitBreakerIsOpen();
            }
            default: {
                throw new Error('Unreachable code')
            }
        }
    }
    private _handleSuccess() {
        this.failureCount = 0;

        if (this.state === State.HALF_OPEN) {
            this.successCount += 1;

            if (this.successCount === this.successThreshold) {
                this.state = State.OPEN;
                this.successCount = 0;
            }
        }
    }

    private _handleFailure(err?: any) {
        // TODO: do something with err

        this.failureCount += 1;

        if (this.failureCount === this.failureThreshold) {
            this.state = State.OPEN;
            this.nextCallAt = Date.now() + this.invocationTimeout;
        }
    }
}

// cBreaker = new CircuitBreaker(axios.post)
// cBreaker.call('http://abc.com', { name: 'xyz' })