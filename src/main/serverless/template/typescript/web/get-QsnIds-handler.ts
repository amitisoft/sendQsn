
import { QsnIdsFacade } from '../facade/QsnIds-facade';
import { QuestionFacade } from '../facade/Question-facade';
import { ResultFacade } from '../facade/Result-facade';
import { Injector } from '@angular/core';
import { HttpContextImpl } from "../http/http-context-impl";

export class GetQsnIdsHandler {

    static getQsnIds (httpContext:HttpContextImpl,injector:Injector) : void {

    let pathParameters = httpContext.getPathParameters();
        console.log(JSON.stringify(pathParameters));
    let dataFromUI = httpContext.getRequestBody();
        let data = httpContext.getRequestBody();

        //  injector.get(QsnIdsFacade).getQsnId(data["PaperId"])
        //      .subscribe(result => {

        //          httpContext.ok(200, result);
        //           injector.get(QuestionFacade).getQsn(result)
        //             .subscribe(result1 => {
        //                 console.log("Qsn = ",result1);
        //                //  httpContext.ok(200, result1);
        //                  injector.get(ResultFacade).update(data)
        //                   .subscribe(result2 => {
        //                   httpContext.ok(200, result2);
        //                   });
        //          });
    //         },  err => {
    //             httpContext.fail(err, 500);
    //    });
     }
}