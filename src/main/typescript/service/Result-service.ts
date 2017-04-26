import {Observable, Observer} from 'rxjs';
import {Result} from '../domain/Result';
import {DynamoDB, SES} from "aws-sdk";

import DocumentClient = DynamoDB.DocumentClient;

var uuid = require('uuid');
var AWS = require("aws-sdk");

AWS.config.update({
    region: "us-east-1"
});

export interface ResultService {
    //getAll(): Observable<QsnPaper>;
    // create(data: any): Observable<Candidate>;
    // find(candidateId:string) : Observable<Candidate>;
     create(data: any): Observable<Result>;
}
export class ResultServiceImpl implements ResultService {

    constructor() {

    }

    create(data: any): Observable<Result> {
        console.log("in CandidateServiceImpl update()");
        console.log(`data received ${data.Candidate_id}`);
        console.log(`data received ${data.Category}`);
      
        const documentClient = new DocumentClient();
        const params = {
            TableName: "Results",
            Item:{
                 'Candidate_id':data.Candidate_id,
                 'Category': data.Category,
                  },
            ConditionExpression: "attribute_not_exists(Category)"
          
        };

        return Observable.create((observer:Observer<Result>) => {
        documentClient.put(params, (err, data: any) => {
                if(err) {
                    if(err.code === 'ConditionalCheckFailedException'){
                        console.error('category already exists',data.Category);
                        observer.error(err);
                        return;
                    }
                }
                console.log("data = ",data);
                observer.next(data.Item);
                observer.complete();
            });
        });
    }

update(data: any): Observable<Result> {
        console.log("in CandidateServiceImpl update()");
        console.log(`data received ${data.Candidate_id}`);
      

        const documentClient = new DocumentClient();
        const params = {
            TableName: "Results",
            IndexName: "ResultInfo",
            Key: {
                Qsn: data.Qsn,
            },
            ExpressionAttributeNames: {
                '#C_ans': 'C_ans',
                '#ans': 'ans'
            },
            ExpressionAttributeValues: {
                ':C_ans': data.C_ans,
                ':ans': data.ans
            },
            UpdateExpression: 'SET #C_ans = :C_ans, #ans = :ans',
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