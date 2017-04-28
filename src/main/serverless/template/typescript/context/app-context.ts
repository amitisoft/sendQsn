import {QsnIdsServiceImpl} from "../service/QsnIds-service";
import {QsnIdsFacade} from "../facade/QsnIds-facade";
import {QuestionServiceImpl} from "../service/Question-service";
import {QuestionFacade} from "../facade/Question-facade";
import {ResultServiceImpl} from "../service/Result-service";
import {ResultFacade} from "../facade/Result-facade";

export const AppProviders = [
    QsnIdsServiceImpl,
    QsnIdsFacade,
    QuestionServiceImpl,
    QuestionFacade,
    ResultServiceImpl,
    ResultFacade

];
