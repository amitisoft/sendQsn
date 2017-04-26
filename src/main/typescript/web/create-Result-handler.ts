import { Context, Callback } from 'aws-lambda';
import { ResultFacade } from '../facade/Result-facade';

export class CreateResultHandler {

    constructor(private facade: ResultFacade) {
        console.log("in putResultHandler constructor");
    }

    handler = (event: any, context: Context, callback: Callback) => {
        console.log(`calling facade update Result ${JSON.stringify(event)}`);
        const data = event.body;
        console.log(`putting Result with data from request ${data}`);

        this.facade.createResult(data).subscribe(
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
                console.log("completed updating Result");
            }
        );

    }
}