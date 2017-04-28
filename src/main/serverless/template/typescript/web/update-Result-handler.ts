
import { ResultFacade } from '../facade/Result-facade';
import { Injector } from '@angular/core';
import { HttpContextImpl } from "../http/http-context-impl";

export class updateResultHandler {

    static updateResult (httpContext:HttpContextImpl,injector:Injector) : void {

        let pathParameters = httpContext.getPathParameters();
        console.log(JSON.stringify(pathParameters));

        let data = httpContext.getRequestBody();
        
        injector.get(ResultFacade).update(data)
            .subscribe(result => {
                httpContext.ok(200, result);
                //   injector.get(ResultFacade).getQsn(result)
                //     .subscribe(result1 => {
                //         console.log("Qsn = ",result1);
                //         httpContext.ok(200, result1);
                //     });
            },  err => {
                httpContext.fail(err, 500);
        });
    }
}