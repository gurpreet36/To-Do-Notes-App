import { inject, injectable } from "inversify";
import { INoteRepository } from "../repositories/note.repository";
import { TYPES } from "../types";
import { INote, insertOptions, NoteModel } from "../models/notes";

export interface INoteService {
    createNote: (insertData: INote, options?: insertOptions) => Promise<number>;
    updateNote(NoteId: number, data: Partial<INote>): Promise<void>
    deleteNote(NoteId: number, options?: insertOptions): Promise<void>
    getNotelist(): Promise<INote[]>
    getNote(NoteId: number): Promise<INote>
}

@injectable()
export class NoteService implements INoteService {
    constructor(@inject(TYPES.NoteRepository) private noteRepository: INoteRepository) { }

    public async createNote(insertData: INote, options?: insertOptions): Promise<number> {
        let note: INote = await this.noteRepository.insert(insertData, options);
        if (note && note.Id) {
            return note.Id;
        }
    }
    public async updateNote(NoteId: number, data: Partial<INote>): Promise<void> {
        await this.noteRepository.updateById(data as INote, NoteId);
    }

    public async deleteNote(NoteId: number, options?: insertOptions): Promise<void> {
        
        await this.noteRepository.deleteById(NoteId, options);
    }

    public async getNotelist(): Promise<INote[]> {
        return this.noteRepository.getNoteList();
    }
    public async getNote(NoteId: number): Promise<INote> {
        return this.noteRepository.findById(NoteId);
    }
}
