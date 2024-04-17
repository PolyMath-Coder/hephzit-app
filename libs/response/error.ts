export function ErrorResponse (httpCode: number, msg: string, data: object, meta: any){
    const body = {
        responseCode: httpCode,
        status: true,
        data: data,
        meta: meta
    }

    return body
}