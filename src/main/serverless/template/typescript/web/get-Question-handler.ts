
import { QuestionFacade } from '../facade/Question-facade';
import { Injector } from '@angular/core';
import { HttpContextImpl } from "../http/http-context-impl";

export class GetQsnIdsHandler {

    static getQsn (httpContext:HttpContextImpl,injector:Injector) : void {

        // injector.get(QuestionFacade).getAll()
        //     .subscribe(result => {
        //          httpContext.ok(200, result);
        //          console.log("myresult = ",result);
        //         injector.get(QuestionFacade).getAllBookings(result)
        //             .subscribe(result1 => {
        //                 console.log("myresult = ",result1);
        //                 httpContext.ok(200, result1);
        //             });
        //       //  httpContext.ok(200, result);
        //     },  err => {
        //         httpContext.fail(err, 500);
//         });
    }
 }