import { Inject, Injectable } from "@nestjs/common";
import { map, Observable, tap, zip } from "rxjs";
import { OrchestrationRequestContext } from "src/dtos/OrchestrationRequestContext";
import { Status } from "src/dtos/Status";
import { Orchestrator } from "./Orchestrator";

@Injectable()
export class OrderFulfillmentService {
    constructor(
        // private readonly orchestrators: Orchestrator[]
        @Inject('Orchestrators') private readonly orchestrators: Orchestrator[]
    ) {
        this.placeOrder = this.placeOrder.bind(this);
        this.updateStatus = this.updateStatus.bind(this);
    }

    placeOrder(ctx: OrchestrationRequestContext): Observable<OrchestrationRequestContext> {
        return zip(...this.orchestrators.map(o => o.create(ctx)))
            .pipe(
                map((contexts) => contexts[0]),
                tap(this.updateStatus)
            )
    }

    updateStatus(ctx: OrchestrationRequestContext): void {
        const allSuccess = this.orchestrators.every(x => x.isSuccess()(ctx))

        ctx.status = allSuccess ? Status.SUCCESS : Status.FAILED;
    }
}