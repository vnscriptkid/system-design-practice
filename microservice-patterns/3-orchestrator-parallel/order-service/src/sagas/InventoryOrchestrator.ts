import { Injectable } from "@nestjs/common";
import { Observable, map, tap, of, filter, mergeMap } from "rxjs";
import { InventoryClient } from "src/clients/inventory.client";
import { OrchestrationRequestContext } from "src/dtos/OrchestrationRequestContext";
import { Status } from "src/dtos/Status";
import { Orchestrator } from "./Orchestrator";

@Injectable()
export class InventoryOrchestrator extends Orchestrator {

    constructor(
        private readonly inventoryClient: InventoryClient
    ) {
        super();
    }

    public create(ctx: OrchestrationRequestContext): Observable<OrchestrationRequestContext> {
        return this.inventoryClient.deduct(ctx.inventoryRequest)
            .pipe(
                tap(inventoryResponse => {
                    ctx.inventoryResponse = inventoryResponse
                }),
                map(_ => ctx)
            )
    }

    public isSuccess(): (orchestrationRequestContext: OrchestrationRequestContext) => boolean {
        return (ctx: OrchestrationRequestContext) => {
            return ctx.inventoryResponse.status === Status.SUCCESS
        }
    }

    public cancel(): (orchestrationRequestContext: OrchestrationRequestContext) => void {
        return (ctx: OrchestrationRequestContext) => {
            of(ctx)
                .pipe(
                    filter(this.isSuccess()),
                    map(x => x.inventoryRequest),
                    mergeMap(this.inventoryClient.restore)
                )
                .subscribe();
        }
    }


}