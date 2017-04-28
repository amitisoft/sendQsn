import {Injectable} from "@angular/core";
import {Observable, Observer} from 'rxjs';
import {Result} from '../domain/Result';
import {DynamoDB} from "aws-sdk";

const AWS = require('aws-sdk');

import DocumentClient = DynamoDB.DocumentClient;

AWS.config.update({
    region: "us-east-1"
});

@Injectable()
export class ResultServiceImpl {

    constructor() {
        console.log("in ResultServiceImpl constructor()");
    }

    update(data:any): Observable<Result> {
        console.log("in ResultServiceImpl get()");
        const documentClient = new DocumentClient();
       const params = {
            TableName: "Result",
            Key: {
                BookingId: data.BookingId,
            },
            ExpressionAttributeNames: {
                '#ci': 'CandidateId',
            },
            ExpressionAttributeValues: {
                ':ci': data.CandidateId,
            },
            UpdateExpression: 'SET #ci = :ci',
            ReturnValues: 'ALL_NEW',
        };

        return Observable.create((observer:Observer<Result>) => {

            documentClient.update(params, (err, data: any) => {
                if(err) {
                    console.error(err);
                    observer.error(err);
                    return;
                }
                console.log(`result ${JSON.stringify(data)}`);   
                observer.next(data.Attributes);
                observer.complete();
            });
        });

    }



}