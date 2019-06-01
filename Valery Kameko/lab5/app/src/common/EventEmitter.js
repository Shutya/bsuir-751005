export default class EventEmitter {
    constructor() {
        this.events = {};
    }

    emit(event, ...args) {
        let listeners = this.events[event];
        if (listeners) {
            listeners.forEach(listener => listener(...args));
        }
    }

    on(event, listener) {
        this.events[event] = this.events[event] || [];
        this.events[event].push(listener);
    }
}