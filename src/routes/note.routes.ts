import "reflect-metadata";
import container from "../inversify.config";
import * as express from "express";
import { INotesController } from "../controllers/notes.controller";
import { TYPES } from "../types";
import { IValidateNotePayloadMiddleware } from "../middlewares/validate.note.payload.middleware";

export class NotificationRoutes {
    private noteController: INotesController;
    private validateNotePayload: IValidateNotePayloadMiddleware;

    constructor() {
        this.noteController = container.get<INotesController>(TYPES.NoteController);
        this.validateNotePayload =
            container.get<IValidateNotePayloadMiddleware>(
                TYPES.ValidateFilterNotePayloadMiddleware
            );
    }

    getRouter(): express.Router {
        let NoteRouter = express.Router();

        NoteRouter.get(
            "/:id",
            this.validateNotePayload.validateParameters.bind(this.validateNotePayload),
            this.noteController.getNote.bind(this.noteController)
        );

        NoteRouter.get(
            "/",
            this.noteController.getNoteList.bind(this.noteController)
        );

        NoteRouter.post(
            "/add",
            this.validateNotePayload.validateParameters.bind(this.validateNotePayload),
            this.noteController.save.bind(this.noteController)
        );
        NoteRouter.put(
            "/:id",
            this.validateNotePayload.validateParameters.bind(this.validateNotePayload),
            this.noteController.save.bind(this.noteController)
        );
        NoteRouter.delete(
            "/:id",
            this.validateNotePayload.validateParameters.bind(this.validateNotePayload),
            this.noteController.deleteNote.bind(this.noteController)
        );

        return NoteRouter;
    }
}
