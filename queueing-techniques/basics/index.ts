import { AppEvent, NativeEventBus, SimpleEventBus } from "./event-bus";

const eventBus = new SimpleEventBus()

eventBus.subscribe('hello', () => {
    console.log('say hello')
});

setTimeout(() => {
    eventBus.emit(new AppEvent('hello', {}));
}, 1000)


const nativeEventBus = new NativeEventBus();

nativeEventBus.subscribe('hi', (data) => {
    console.log('say hi', data);
})

setTimeout(() => {
    nativeEventBus.emit('hi', { vietnamese: 'xin chao' })
}, 2000)