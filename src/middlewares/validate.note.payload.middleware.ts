import { Request, Response, NextFunction, response } from "express";
import { id, injectable } from "inversify";
import { IErrorMessage } from "../models/notes";
import responseJson from "../response";

export interface IValidateNotePayloadMiddleware {
    validateParameters: (req: Request, res: Response, next: NextFunction, forInsertion?: boolean) => void;
}

@injectable()
export class ValidateNotePayloadMiddleware implements IValidateNotePayloadMiddleware {
    public validateParameters(req: Request, res: Response, next: NextFunction): void {
        const params = req.params;
        const bodyParams = req.body;

        let errors: IErrorMessage[] = []
        let id: string = params.Id as string;
        if (params?.Id) {
            if (!isNaN(id as unknown as number)) {
                errors.push({ error: responseJson.error_invalid_id });
            }
        }
        let title: string = (bodyParams.Title as string);
        if (!title?.length) {
            errors.push({ error: responseJson.error_invalid_title });
        }
        if (!errors || errors.length === 0) {
            next();
        } else {
            res.status(401).json({ body: errors });
            return;
        }
    }
}
