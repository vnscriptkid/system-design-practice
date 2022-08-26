import { EventEmitter } from 'events';

export class AppEvent {
    constructor(
        public readonly appEventId: string,
        public readonly payload: any
    ) { }
}

export class SimpleEventBus {
    eventToListeners: Map<string, Function[]> = new Map();

    emit(event: AppEvent) {
        const listeners = this.eventToListeners.get(event.appEventId);

        if (!listeners) {
            return;
        }

        for (let fn of listeners) {
            fn(event.payload);
        }
    }

    dispatch(event: AppEvent) {
        this.emit(event);
    }

    subscribe(appEventId: string, fn: Function) {
        if (!this.eventToListeners.has(appEventId)) {
            this.eventToListeners.set(appEventId, [])
        }

        this.eventToListeners.get(appEventId)!.push(fn);
    }

}

export class NativeEventBus {
    eventsSystem = new EventEmitter();

    emit(eventName: string, ...args: any) {
        this.eventsSystem.emit(eventName, ...args);
    }

    dispatch(eventName: string) {
        this.emit(eventName);
    }

    subscribe(eventName: string, fn: (...args: any[]) => void) {
        this.eventsSystem.addListener(eventName, fn);
    }
}
