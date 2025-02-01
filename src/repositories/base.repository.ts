import {
    AllowReadonlyArray,
    BulkCreateOptions,
    CountOptions,
    CreateOptions,
    FindOptions,
    IncrementDecrementOptionsWithBy,
    InstanceDestroyOptions,
    Model,
    UpdateOptions,
    WhereOptions,
} from "sequelize";
import { DbConnection } from "../database";
import { injectable, unmanaged } from "inversify";
import { insertOptions } from "../models/notes";

export interface IBaseRepository<M extends Model> {
    findAll(options?: FindOptions<M>): Promise<M[]>;
    create(data: Partial<M>, otherOptions?: insertOptions, options?: CreateOptions<M>): Promise<M>;
    update(data: Partial<M>, options: UpdateOptions): Promise<void>;
    bulkCreate: (data: Partial<M>[], options?: BulkCreateOptions, otherOptions?: insertOptions) => Promise<M[]>;
    findOrCreate(data?: WhereOptions, otherOptions?: insertOptions): Promise<M>;
    delete(data?: WhereOptions, options?: InstanceDestroyOptions): Promise<void>;
    count(data?: WhereOptions, otherOptions?: insertOptions, options?: CountOptions): Promise<number>;
}

// abstract class because instance of class can not be created.
// Constructors are allowed.
@injectable()
export abstract class BaseRepository<M extends Model> implements IBaseRepository<M> {
    private model;
    // unmanaged so that inversify does not interfere with this dynamic key in constructor
    constructor(@unmanaged() key: string) {
        this.model = DbConnection.getInstance().models[key];
    }

    public async findAll(options?: FindOptions<M>, otherOptions?: insertOptions): Promise<M[]> {
        if (otherOptions && otherOptions.transaction) {
            return await this.model.findAll(options, { transaction: otherOptions.transaction });
        } else {
            return await this.model.findAll(options);
        }
    }

    public async findOne(options?: FindOptions<M>, otherOptions?: insertOptions): Promise<M> {
        if (otherOptions && otherOptions.transaction) {
            return await this.model.findOne(options, { transaction: otherOptions.transaction });
        } else {
            return await this.model.findOne(options);
        }
    }

    public async create(data: Partial<M>, otherOptions?: insertOptions, options?: CreateOptions<M>): Promise<M> {
        if (otherOptions && otherOptions.transaction) {
            return await this.model.create(data, options, { transaction: otherOptions.transaction });
        } else {
            return await this.model.create(data, options);
        }
    }

    public async bulkCreate(
        data: Partial<M>[],
        otherOptions?: insertOptions,
        options?: BulkCreateOptions
    ): Promise<M[]> {
        if (otherOptions && otherOptions.transaction) {
            return await this.model.bulkCreate(data, options, { transaction: otherOptions.transaction });
        } else {
            return await this.model.bulkCreate(data, options);
        }
    }

    public async update(data: Partial<M>, options: UpdateOptions, otherOptions?: insertOptions): Promise<void> {
        if (otherOptions && otherOptions.transaction) {
            return await this.model.update(data, options, { transaction: otherOptions.transaction });
        } else {
            return await this.model.update(data, options);
        }
    }

    public async delete(
        data?: WhereOptions,
        otherOptions?: insertOptions,
        options?: InstanceDestroyOptions
    ): Promise<void> {
        if (otherOptions && otherOptions.transaction) {
            return await this.model.destroy(data, options, { transaction: otherOptions.transaction });
        } else {
            return await this.model.destroy(data, options);
        }
    }

    public async findOrCreate(data?: WhereOptions, otherOptions?: insertOptions): Promise<M> {
        if (otherOptions && otherOptions.transaction) {
            return await this.model.findOrCreate(data, { transaction: otherOptions.transaction });
        } else {
            return await this.model.findOrCreate(data);
        }
    }

    public async count(data?: WhereOptions, otherOptions?: insertOptions, options?: CountOptions): Promise<number> {
        if (otherOptions && otherOptions.transaction) {
            return await this.model.count(data, options, { transaction: otherOptions.transaction });
        } else {
            return await this.model.count(data, options);
        }
    }

    public async increment(fields: AllowReadonlyArray<keyof Notification>, options?: IncrementDecrementOptionsWithBy, otherOptions?: insertOptions) {
        if (otherOptions && otherOptions.transaction) {
            return await this.model.increment(fields, options, { transaction: otherOptions.transaction });
        } else {
            return await this.model.increment(fields, options);
        }
    }
}
