export abstract class AppEvent {
    public toJSON() {
        return JSON.stringify(this);
    }
}