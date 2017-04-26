import { Observable, Observer } from 'rxjs';
import { QsnPaperService } from '../service/QsnPaper-service';
import { QsnPaperDto } from '../dto/QsnPaper-dto';
import { QsnPaper } from '../domain/QsnPaper';


export class QsnPaperFacade {

    constructor(private QsnPaperService: QsnPaperService) {
    }

     getAll(): Observable<QsnPaperDto> {
         return this.QsnPaperService.getAll();
     }
        

    //     return this.QsnPaperService.getAll()
    //         .map((candidates) => {
    //             return {
    //                 candidates: candidates.map(this.mapCandidateToDto)
    //             }
    //         });
    // }

    // private mapCandidateToDto(candidate: QsnPaper): QsnPaperDto {
    //     console.log("in mapCandidateToDto");
    //     return {
    //         category: candidate.category,
    //         Qsn_id: candidate.Qsn_id,
    //         crtd_date: candidate.crtd_date,
    //         curct_ans: candidate.curct_ans,
    //         opt1: candidate.opt1,
    //         opt2: candidate.opt2,
    //         opt3: candidate.opt3,
    //         opt4: candidate.opt4,
    //         Qsn: candidate.Qsn
    //     }
    // }


    // createCandidate(data: any) : Observable<Candidate> {
    //     //validate data as per business logic
    //     return this.candidateService.create(data);
    // }


    // updateCandidate(data: any) :Observable<Candidate> {
    //     return this.candidateService.update(data);
    // }

    // findCandidate(candidateId: string) : Observable<Candidate> {
    //     return this.candidateService.find(candidateId);
    // }

}