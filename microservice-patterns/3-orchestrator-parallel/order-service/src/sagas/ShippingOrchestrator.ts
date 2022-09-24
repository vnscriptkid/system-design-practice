import { Injectable } from "@nestjs/common";
import { Observable, map, tap, of, filter, mergeMap } from "rxjs";
import { ShippingClient } from "src/clients/shipping.client";
import { OrchestrationRequestContext } from "src/dtos/OrchestrationRequestContext";
import { Status } from "src/dtos/Status";
import { Orchestrator } from "./Orchestrator";

@Injectable()
export class ShippingOrchestrator extends Orchestrator {
    constructor(
        private readonly shippingClient: ShippingClient
    ) {
        super();
    }

    public create(ctx: OrchestrationRequestContext): Observable<OrchestrationRequestContext> {
        return this.shippingClient.schedule(ctx.shippingRequest)
            .pipe(
                tap(shippingResponse => {
                    ctx.shippingResponse = shippingResponse;
                }),
                map(_ => ctx)
            )
    }

    public isSuccess(): (ctx: OrchestrationRequestContext) => boolean {
        return (ctx: OrchestrationRequestContext) => {
            return ctx.shippingResponse.status === Status.SUCCESS
        }
    }

    public cancel(): (ctx: OrchestrationRequestContext) => void {
        return (ctx: OrchestrationRequestContext) => {
            of(ctx)
                .pipe(
                    filter(this.isSuccess()),
                    map(x => x.shippingRequest),
                    mergeMap(this.shippingClient.cancel)
                )
                .subscribe()
        }
    }
}