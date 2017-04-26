import { Observable, Observer } from 'rxjs';
import { ResultService } from '../service/Result-service';
import { ResultDto } from '../dto/Result-dto';
import { Result } from '../domain/Result';


export class ResultFacade {

    constructor(private ResultService: ResultService) {
    } 
    
    createResult(data: any) :Observable<Result> {
         return this.ResultService.create(data);
     }

}