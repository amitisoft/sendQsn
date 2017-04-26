// import { GetCandidateHandler } from '../../typescript/web/get-candidate-handler';
// import { CreateCandidateHandler } from '../../typescript/web/create-candidate-handler';
// import { FindCandidateHandler } from '../../typescript/web/find-candidate-handler';
// import { UpdateCandidateHandler } from '../../typescript/web/update-candidate-handler';
// import { DeleteCandidateHandler } from '../../typescript/web/delete-candidate-handler';
// import { CandidateFacade } from '../../typescript/facade/candidate-facade';
// import { CandidateService, CandidateServiceImpl } from '../../typescript/service/candidate-service';

import { GetQsnPaperHandler } from '../../typescript/web/get-QsnPaper-handler';
import { QsnPaperFacade } from '../../typescript/facade/QsnPaper-facade';
import { QsnPaperService, QsnPaperServiceImpl } from '../../typescript/service/QsnPaper-service';

import { CreateResultHandler } from '../../typescript/web/create-Result-handler';
import { ResultFacade } from '../../typescript/facade/Result-facade';
import { ResultService, ResultServiceImpl } from '../../typescript/service/Result-service';


class AppContext {

    endPoint: string = process.env.CANDIDATE_ALL_END_POINT;

   QsnPaper() : QsnPaperService {
        return new QsnPaperServiceImpl();
    }

    QsnPaperFacade(): QsnPaperFacade {
        return new QsnPaperFacade(this.QsnPaper());
    }
    Result() : ResultService {
        return new ResultServiceImpl();
    }

    ResultFacade(): ResultFacade {
        return new ResultFacade(this.Result());
    }
}

let appContext: AppContext = new AppContext();
// exports.getAllCandidatesHandler = new GetCandidateHandler(appContext.candidateFacade()).handler;
//exports.getQuestion = new GetQsnPaperHandler(appContext.QsnPaperFacade()).handler;
// exports.createCandiateHandler = new CreateCandidateHandler(appContext.candidateFacade()).handler;
// exports.getCandiateHandler = new FindCandidateHandler(appContext.candidateFacade()).handler;
//exports.updateCandidateHandler = new UpdateCandidateHandler(appContext.candidateFacade()).handler;
exports.createResultHandler = new CreateResultHandler(appContext.ResultFacade()).handler;
