import { DataTypes, Optional, Model, Sequelize, Transaction } from "sequelize";
import { DbConnection } from "../database";
import { constant } from "../constants";

export interface INote {
    Id: number;
    Title: string;
    Description?: string;
    CreatedAt?: Date;

}

export interface insertOptions {
    transaction: Transaction;
}

export interface IErrorMessage {
    error: string;
}


export class NoteModel extends Model<INote> implements INote {
    declare Id: number;
    declare Title: string;
    declare Description: string;
    declare CreatedAt: Date;
}

NoteModel.init(
    {
        Id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        Title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        CreatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: Sequelize.fn(constant.created_at_default),
        }
    },
    {
        sequelize: DbConnection.getInstance(),
        tableName: "Note",
    }
);
