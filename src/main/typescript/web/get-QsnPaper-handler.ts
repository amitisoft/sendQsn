import { Context, Callback } from 'aws-lambda';
import { QsnPaperFacade } from '../facade/QsnPaper-facade';

export class GetQsnPaperHandler {

    constructor(private facade: QsnPaperFacade) {
        console.log("in GetQsnPaperHandler constructor");
    }

    handler = (event: any, context: Context, callback: Callback) => {
        console.log("calling facade get QsnPaper");
        this.facade.getAll().subscribe(
            result => {
                const response = {
                    statusCode: 200,
                    body: result
                }
                console.log("responses:" + response);
                callback(null, response);
            },
            error => {
                callback(error);
            },
            () => {
                console.log("completed loading QsnPaper");
            }
        );

    }
}