import { NoteModel, INote, insertOptions } from "../models/notes";
import { injectable } from "inversify";
import { BaseRepository } from "./base.repository";

export interface INoteRepository {
    findById: (Id: number) => Promise<INote>;
    insert: (data: INote, options?: insertOptions) => Promise<INote>;
    getNoteList: () => Promise<INote[]>;
    updateById(data: INote, Id: number, options?: insertOptions): Promise<void>;
    deleteById(Id: number, options?: insertOptions): Promise<void>;
}

@injectable()
export class NoteRepository extends BaseRepository<NoteModel> implements INoteRepository {
    constructor() {
        super("NoteModel");
    }

    public findById = async (Id: number): Promise<INote> => {
        return await this.findOne({
            where: {
                Id,
            },
        });
    };
    public getNoteList = async (): Promise<INote[]> => {
        return this.findAll({});
    }

    public insert = async (data: INote, options?: insertOptions): Promise<INote> => {
        if (options && options.transaction) {
            return await this.create(data, { transaction: options.transaction });
        } else {
            return await this.create(data);
        }
    };

    public updateById = async (data: INote, Id: number, options?: insertOptions): Promise<void> => {
        await this.update(
            data,
            {
                where: {
                    Id,
                },
            },
            options
        );
    };
    public deleteById = async (Id: number, options?: insertOptions): Promise<void> => {
        await this.delete({
            where: {
                Id,
            },
        }, options);
    }


}
