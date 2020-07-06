import { assert } from "console";

export class AttemptUserCommand
{
    _id: string | null;
    type: string;
    object: string;
    constructor({ id, type, object }: AttemptUserCommandArgs)
    {
        this._id = id || null; // Only in fromJson
        this.type = type;
        this.object = object;
    }

    static fromJson(json: any): AttemptUserCommand
    {
        assert(json.object != null && (json.CRD == "create" || json.CRD == "update" || json.CRD == "delete"));
        let attemptUserCommandArgs: AttemptUserCommandArgs = {
            type: json.type,
            object: json.object
        };
        return new AttemptUserCommand(attemptUserCommandArgs);
    }

    toJson(): any
    {
        let json: any = {};
        if (this._id != null)
        {
            json._id = this._id;
        }
        json.type = this.type;
        json.object = this.object;
        return json;
    }
}

export class AttemptUserCommandArgs
{
    id?: string | null;
    type!: string;
    object!: string;
}