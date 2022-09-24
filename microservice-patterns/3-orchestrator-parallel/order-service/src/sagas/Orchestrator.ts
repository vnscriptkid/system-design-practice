import { Observable } from 'rxjs';
import { OrchestrationRequestContext } from '../dtos/OrchestrationRequestContext';

export abstract class Orchestrator {
    public abstract create(orchestrationRequestContext: OrchestrationRequestContext): Observable<OrchestrationRequestContext>;
    public abstract isSuccess(): (orchestrationRequestContext: OrchestrationRequestContext) => boolean;
    public abstract cancel(): (orchestrationRequestContext: OrchestrationRequestContext) => void;
}