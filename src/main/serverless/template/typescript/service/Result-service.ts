import { Injectable } from "@angular/core";
import { Observable, Observer } from 'rxjs';
import { Result } from '../domain/Result';
import { DynamoDB } from "aws-sdk";

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

    update(data: any): Observable<Result> {
        console.log("in ResultServiceImpl get()");
        const documentClient = new DocumentClient();
        var score;
        if(data.curct_ans === data.cand_ans)
            score = 1;
        else
            score = 0;
        const params = {
            TableName: "Result",
            Key: {
                BookingId: data.BookingId,
                QsnId: data.QsnId
            },
            ExpressionAttributeNames: {
                '#ci': 'CandidateId',
                '#a' :'curct_ans',
                '#ca':'cand_ans',
                '#s' :'score'
            },
            ExpressionAttributeValues: {
                ':ci': data.CandidateId,
                ':a' : data.curct_ans,
                ':ca': data.cand_ans,
                ':s' : score
            },
            UpdateExpression: 'SET #ci = :ci,  #a=:a , #ca = :ca , #s =:s',
            ReturnValues: 'ALL_NEW',
        };

        return Observable.create((observer: Observer<Result>) => {

            documentClient.update(params, (err, data: any) => {
                if (err) {
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