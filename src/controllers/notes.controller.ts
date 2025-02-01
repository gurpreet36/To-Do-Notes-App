import { Request, Response } from "express";
import { injectable, inject } from "inversify";
import { TYPES } from "../types";
import { INoteService } from "../services/note.service";
import { INote } from "../models/notes";
import { logger } from "../utils";



export interface INotesController {
    getNote(req: Request, res: Response): Promise<void>;
    deleteNote(req: Request, res: Response): Promise<void>;
    getNoteList(req: Request, res: Response): Promise<void>;
    save(req: Request, res: Response): Promise<void>
}

@injectable()
export class NoteController implements INotesController {
    constructor(
        @inject(TYPES.NoteService) private noteService: INoteService,
    ) { }

    public async getNote(req: Request, res: Response): Promise<void> {
        try {
            const noteId = req.params.id;
            const note = await this.noteService.getNote(+noteId);
            res.status(200).send({
                data: note
            });
        } catch (error) {
            logger.error(`[GET_NOTE] error :${error}`);
            res.status(500).send({
                message: "Something went wrong"
            });
        }
    }
    public async deleteNote(req: Request, res: Response): Promise<void> {
        try {
            const noteId = req.params.id;
            await this.noteService.deleteNote(+noteId);
            res.status(200).send({
                message: "Note deleted successfully"
            });
        } catch (error) {
            logger.error(`[DETETE_NOTE] error :${error}`);
            res.status(500).send({
                message: "Something went wrong"
            });
        }

    }
    public async getNoteList(req: Request, res: Response): Promise<void> {
        try {
            const list = await this.noteService.getNotelist();
            res.status(200).send({
                collection: list,
                count: list.length
            });
        } catch (error) {
            logger.error(`[LIST_NOTE] error :${error}`);
            res.status(500).send({
                message: "Something went wrong"
            });
        }
    }
    public async save(req: Request, res: Response): Promise<void> {
        try {
            const noteId = req.params.id;
            if (noteId) {
                const note: INote = req.body;
                await this.noteService.updateNote(+noteId, note);
                res.status(200).send({
                    message: "Note updated successfully"
                });
            }
            else {
                const note: INote = req.body;
                const response = await this.noteService.createNote(note);
                res.status(200).send({
                    message: "Note created successfully",
                    note: response
                });
            }
        } catch (error) {
            logger.error(`[DETETE_NOTE] error :${error}`);
            res.status(500).send({
                message: "Something went wrong"
            });
        }
    }


}
