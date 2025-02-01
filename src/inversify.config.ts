import { Container } from "inversify";
import { TYPES } from "./types";
import { IValidateNotePayloadMiddleware, ValidateNotePayloadMiddleware } from './middlewares/validate.note.payload.middleware';
import { NoteService, INoteService } from "./services/note.service";
import { INoteRepository, NoteRepository } from "./repositories/note.repository";
import { INotesController, NoteController } from "./controllers/notes.controller";



let container: Container = new Container();

container.bind<INoteRepository>(TYPES.NoteRepository).to(NoteRepository);

container.bind<IValidateNotePayloadMiddleware>(TYPES.ValidateFilterNotePayloadMiddleware).to(ValidateNotePayloadMiddleware);

container.bind<INoteService>(TYPES.NoteService).to(NoteService);


container.bind<INotesController>(TYPES.NoteController).to(NoteController);


export default container;