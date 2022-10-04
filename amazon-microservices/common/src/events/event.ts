import { toJSON } from "../utils"

export abstract class AppEvent {
    public toJSON() {
        // plug out methods, keep only props
        return toJSON(this)
    }
}


