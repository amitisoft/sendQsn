import {Observable, Observer} from 'rxjs';
import {QsnPaper} from '../domain/QsnPaper';
import {DynamoDB, SES} from "aws-sdk";

import DocumentClient = DynamoDB.DocumentClient;

var uuid = require('uuid');
var AWS = require("aws-sdk");

AWS.config.update({
    region: "us-east-1"
});

export interface QsnPaperService {
    getAll(): Observable<QsnPaper>;
    // create(data: any): Observable<Candidate>;
    // find(candidateId:string) : Observable<Candidate>;
    // update(data: any): Observable<Candidate>;
}

export class QsnPaperServiceImpl implements QsnPaperService {

    constructor() {

    }

    // sendEmail(email, messageBody) {
    //         const emailConfig = {
    //             region: 'us-east-1'
    //         };

    //         const emailSES = new SES(emailConfig);

    //         const p = new Promise((res, rej)=>{

    //             if(!email || !messageBody) {
    //                 rej('Please provide email and message');
    //                 return;
    //             }

    //             const emailParams: AWS.SES.SendEmailRequest = this.createEmailParamConfig(email, messageBody);
    //             emailSES.sendEmail(emailParams, (err:any, data: AWS.SES.SendEmailResponse) => {
    //                 if(err) {
    //                     console.log(err);
    //                     rej(`Error in sending out email ${err}`)
    //                     return;
    //                 }

    //                 res(`Successfully sent email to ${email}`);

    //             });

    //         });
    // }


    // create(data: any): Observable<Candidate> {
    //     console.log("in CandidateServiceImpl create()");
    //     const documentClient = new DocumentClient();

    //     const params = {
    //         TableName: "candidate",
    //         Item: {
    //             candidateId: data.candidateId,
    //             firstName: data.firstName,
    //             lastName: data.lastName,
    //             email: data.email,
    //             phoneNumber: data.phoneNumber,
    //         },
    //         ConditionExpression: "attribute_not_exists(candidateId)"
    //     };

    //     return Observable.create((observer:Observer<Candidate>) => {

    //         documentClient.put(params, (err, data: any) => {
    //             if(err) {
    //                 if(err.code === 'ConditionalCheckFailedException'){
    //                     console.error('candidate already exists',data.candidateId);
    //                     observer.error(err);
    //                     return;
    //                 }
    //             }

    //             observer.next(data.Item[0]);
    //             observer.complete();
    //         });
    //     });

    // }


    // update(data: any): Observable<Candidate> {
    //     console.log("in CandidateServiceImpl update()");
    //     console.log(`data received ${data.firstName}`);
    //     console.log(`data received ${data.lastName}`);
    //     console.log(`data received ${data.email}`);
    //     console.log(`data received ${data.candidateId}`);

    //     const documentClient = new DocumentClient();
    //     const params = {
    //         TableName: "candidate",
    //         Key: {
    //             candidateId: data.candidateId,
    //         },
    //         ExpressionAttributeNames: {
    //             '#fn': 'firstName',
    //             '#ln': 'lastName',
    //             '#em': 'email'
    //         },
    //         ExpressionAttributeValues: {
    //             ':fn': data.firstName,
    //             ':ln': data.lastName,
    //             ':em': data.email,
    //         },
    //         UpdateExpression: 'SET #fn = :fn, #ln = :ln, #em = :em',
    //         ReturnValues: 'ALL_NEW',
    //     };

    //     return Observable.create((observer:Observer<Candidate>) => {

    //         documentClient.update(params, (err, data: any) => {
    //             if(err) {
    //                 console.error(err);
    //                 observer.error(err);
    //                 return;
    //             }
    //             console.log(`result ${JSON.stringify(data)}`);

    //             this.sendEmail("monica@amitisoft.com", "RandomToken");

    //             observer.next(data.Attributes);
    //             observer.complete();
    //         });
    //     });
    // }


    // find(candidateId:string): Observable<Candidate> {
    //     console.log("in CandidateServiceImpl find()");

    //     const queryParams: DynamoDB.Types.QueryInput = {
    //         TableName: "candidates",
    //         ProjectionExpression: "candidateId, firstName, lastName, email, phoneNumber",
    //         KeyConditionExpression: "#candidateId = :candidateIdFilter",
    //         ExpressionAttributeNames:{
    //             "#candidateId": "candidateId"
    //         },
    //         ExpressionAttributeValues: {
    //             ":candidateIdFilter": candidateId
    //         }
    //     }

    //     const documentClient = new DocumentClient();
    //     return Observable.create((observer:Observer<Candidate>) => {
    //         console.log("Executing query with parameters " + queryParams);
    //         documentClient.query(queryParams,(err,data:any) => {
    //             console.log(`did we get error ${err}`);
    //             if(err) {
    //                 observer.error(err);
    //                 throw err;
    //             }
    //             console.log(`data items receieved ${data.Items.length}`);
    //             if(data.Items.length === 0) {
    //                 console.log("no data received for getAll candidates");
    //                 observer.complete();
    //                 return;
    //             }
    //             data.Items.forEach((item) => {
    //                 console.log(`candidate Id ${item.candidateId}`);
    //                 console.log(`candidate firstName ${item.firstName}`);
    //                 console.log(`candidate lastName ${item.lastName}`);
    //                 console.log(`candidate email ${item.email}`);
    //             });
    //             observer.next(data.Items[0]);
    //             observer.complete();

    //         });
    //     });

    // }

    getAll(): Observable<QsnPaper> {
        console.log("in QsnPaperServiceImpl getAll()");
       var Q_array = ["Question1","Question2","Question3","Question5"];
       console.log("q =" , Q_array[0]);
       const queryParams: DynamoDB.Types.QueryInput = {
            TableName: "QuestionList",
            ProjectionExpression: "Qsn,Curct_ans,Opt1,Opt2,Opt3,Opt4",
            KeyConditionExpression: "#Category = :Category  and #Qsn = :Qsn",
            ExpressionAttributeNames:{
                "#Category": "Category",
                "#Qsn" : "Qsn"
            },
            ExpressionAttributeValues: {
                ":Category": "JavaScript",
                ":Qsn" : Q_array[0]
            }
        }

        const documentClient = new DocumentClient();
        return Observable.create((observer:Observer<QsnPaper>) => {
            console.log("Executing query with parameters " + queryParams);
            documentClient.query(queryParams,(err,data:any) => {
                console.log(`did we get error ${err}`);
                console.log(`data = ${data}`);
                if(err) {
                    observer.error(err);
                    throw err;
                }
                console.log(`data items receieved ${data.Items.length}`);
                if(data.Items.length === 0) {
                    console.log("no data received for get QsnPaper");
                    observer.complete();
                    return;
                }
                // data.Items.forEach((item) => {
                //     console.log(`Category ${item.Category}`);
                //     console.log(`Qsn  ${item.Qsn}`);
                //     console.log(`Qsn_id ${item.Qsn_id}`);
                //     console.log(`Curct_ans ${item.Curct_ans}`);
                // });
                observer.next(data.Items[0]);
                observer.complete();

            });

        });

    }



}