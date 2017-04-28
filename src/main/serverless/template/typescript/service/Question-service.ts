import {Injectable} from "@angular/core";
import {Observable, Observer} from 'rxjs';
import {Question} from '../domain/Question';
import {DynamoDB} from "aws-sdk";

const AWS = require('aws-sdk');

import DocumentClient = DynamoDB.DocumentClient;

AWS.config.update({
    region: "us-east-1"
});

@Injectable()
export class QuestionServiceImpl {

    constructor() {
        console.log("in QsnPaperServiceImpl constructor()");
    }

        getQsn(QsnId:string, Category:string): Observable<Question> {
        console.log("in QsnPaperServiceImpl get()");
        var Q_array = ["Question1","Question2","Question6","Question7"];
        const queryParams: DynamoDB.Types.QueryInput = {
            TableName: "QuestionList",
            ProjectionExpression: "Category,QsnId, Qsn, Curct_ans, Opt1,Opt2, Opt3, Opt4,curct_ans,flag",
            KeyConditionExpression: "#Category = :Category and #QsnId = :QsnId",
            ExpressionAttributeNames:{
                "#Category": "Category",
                "#QsnId" : "QsnId"
            },
            ExpressionAttributeValues: {
                ":Category": Category,
                ":QsnId" : QsnId
            },
            
        }

        const documentClient = new DocumentClient();
        return Observable.create((observer:Observer<Question>) => {
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
                    console.log(`Category ${item.Category}`);
                    console.log(`Qsn ${item.Qsn}`);
                    console.log(`Curct_ans ${item.curct_ans}`);
                    console.log(`Opt1 ${item.Opt1}`);
                });
                
                observer.next(data.Items);
                observer.complete();

            });

        });

    }




}