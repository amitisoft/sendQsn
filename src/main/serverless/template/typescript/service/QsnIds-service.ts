import {Injectable} from "@angular/core";
import {Observable, Observer} from 'rxjs';
import {QsnIds} from '../domain/QsnIds';
import {Question} from '../domain/Question';
import {DynamoDB} from "aws-sdk";

const AWS = require('aws-sdk');

import DocumentClient = DynamoDB.DocumentClient;

AWS.config.update({
    region: "us-east-1"
});

@Injectable()
export class QsnIdsServiceImpl {

    constructor() {
        console.log("in QsnIdsServiceImpl constructor()");
    }

    getQsnId(PaperId:string): Observable<QsnIds[]> {
        console.log("in QsnIdsServiceImpl get()");
        
        const queryParams: DynamoDB.Types.QueryInput = {
            TableName: "QuestionId",
            ProjectionExpression: "QsnId",
            KeyConditionExpression: "#PaperId = :PaperId",
            ExpressionAttributeNames:{
                "#PaperId": "PaperId",

            },
            ExpressionAttributeValues: {
                ":PaperId": PaperId,
            },
            
        }

        const documentClient = new DocumentClient();
        return Observable.create((observer:Observer<QsnIds[]>) => {
            console.log("Executing query with parameters " + queryParams);
            documentClient.query(queryParams,(err,data:any) => {
                console.log(`did we get error ${err}`);
                if(err) {
                    observer.error(err);
                    throw err;
                }
                console.log(`data items receieved ${data.Items.length}`);
                if(data.Items.length === 0) {
                    console.log("no data received for get Qsn");
                    observer.complete();
                    return;
                }
                data.Items.forEach((item) => {
                    console.log(`Qsn Id ${item.QsnId}`);
                   
                });
                observer.next(data.Items);
                observer.complete();

            });

        });

    }



}