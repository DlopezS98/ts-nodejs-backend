import { HttpStatusCodes } from "./constants/status.codes";

export class HttpResponse{
    constructor(value: HttpResponse) {
        Object.assign(this, value);
    }
    public statusCode?: HttpStatusCodes = HttpStatusCodes.BadRequest;
    public message!: string;
    public success?: boolean = false;
    public options?: any;
}