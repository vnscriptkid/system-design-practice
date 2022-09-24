import { Injectable } from "@nestjs/common";
import { Observable, map, tap, of, filter, mergeMap } from "rxjs";
import { UserClient } from "src/clients/user.client";
import { OrchestrationRequestContext } from "src/dtos/OrchestrationRequestContext";
import { Status } from "src/dtos/Status";
import { Orchestrator } from "./Orchestrator";

@Injectable()
export class PaymentOrchestrator extends Orchestrator {
    constructor(
        private readonly userClient: UserClient
    ) {
        super();
    }

    public create(orchestrationRequestContext: OrchestrationRequestContext): Observable<OrchestrationRequestContext> {
        return this.userClient.createPayment(orchestrationRequestContext.paymentRequest)
            .pipe(
                tap(paymentResponse => {
                    orchestrationRequestContext.paymentResponse = paymentResponse;
                }),
                map(_ => orchestrationRequestContext)
            )
    }

    public isSuccess(): (orchestrationRequestContext: OrchestrationRequestContext) => boolean {
        return (ctx: OrchestrationRequestContext) => {
            return ctx.paymentResponse.status === Status.SUCCESS
        }
    }

    public cancel(): (ctx: OrchestrationRequestContext) => void {
        return (ctx: OrchestrationRequestContext) => {
            of(ctx)
                .pipe(
                    filter(this.isSuccess()),
                    map(ctx => ctx.paymentRequest),
                    mergeMap(this.userClient.refundPayment)
                )
                .subscribe()
        }
    }

}