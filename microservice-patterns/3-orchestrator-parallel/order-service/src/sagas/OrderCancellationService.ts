import { Inject, Injectable } from "@nestjs/common";
import { Subject } from "rxjs";
import { OrchestrationRequestContext } from "src/dtos/OrchestrationRequestContext";
import { Orchestrator } from "./Orchestrator";

@Injectable()
export class OrderCancellationService {
    subject: Subject<OrchestrationRequestContext>;

    constructor(
        // private readonly orchestrators: Orchestrator[]
        @Inject('Orchestrators') private readonly orchestrators: Orchestrator[]
    ) {
        this.subject = new Subject<OrchestrationRequestContext>()

        this.orchestrators.forEach(o => {
            this.subject.subscribe((ctx) => {
                o.cancel()(ctx)
            })
        })

        this.cancelOrder = this.cancelOrder.bind(this);
    }

    cancelOrder(ctx: OrchestrationRequestContext): void {
        this.subject.next(ctx);
    }
}