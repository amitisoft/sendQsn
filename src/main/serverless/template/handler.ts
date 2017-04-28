import 'reflect-metadata';
import { GetQsnIdsHandler } from './typescript/web/get-QsnIds-handler';
import { GetCandidateHandler } from './typescript/web/get-candidate-handler';
import { updateResultHandler } from './typescript/web/update-Result-handler';
import { AppProviders } from './typescript/context/app-context';
import { ExecutionContextImpl } from "./typescript/context/execution-context-impl";

 //exports.getAllCandidatesFunction = ExecutionContextImpl.createHttpHandler(AppProviders, GetCandidateHandler.getAllCandidates);
//exports.findCandiateByIdFunction = ExecutionContextImpl.createHttpHandler(AppProviders, GetCandidateHandler.findCandidateById);
exports.getAllQsnIdsFunction = ExecutionContextImpl.createHttpHandler(AppProviders, GetQsnIdsHandler.getQsnIds);
//exports.updateResultFunction = ExecutionContextImpl.createHttpHandler(AppProviders, updateResultHandler.updateResult);