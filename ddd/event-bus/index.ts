type Handler = () => void;

class EventBus {
    eventToHandlers: Map<string, Handler[]>;

    register(eventName: string, handler: Handler) {
        if (!this.eventToHandlers.has(eventName)) {
            this.eventToHandlers.set(eventName, [])
        }
        this.eventToHandlers.get(eventName)?.push(handler);
    }

    emit(eventName: string) {
        if (!this.eventToHandlers.has(eventName)) {
            return;
        }

        for (let handler of this.eventToHandlers.get(eventName)!) {
            handler();
        }
    }
}