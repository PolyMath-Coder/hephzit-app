import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilsService {
    constructor() {}

    SuccessResponse (httpCode: number, msg: string, data: object, meta: any) {
        const body = {
            responseCode: httpCode,
            status: true,
            message: msg,
            data: data,
            meta: meta
        }

        return body
    }

    ErrorResponse (httpCode: number, msg: string, data: object, meta: any){
        const body = {
            responseCode: httpCode,
            status: false,
            message: msg,
            data: data,
            meta: meta
        }
    
        return body
    }
}
