export const enum HttpStatus {
    SUCCESS = 200,
    CREATED = 201,
    ACCEPTED = 202,
    CLIENT_ERROR = 400,
    AUTHENTICATE = 301,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    SERVER_ERROR = 500,
    BAD_GATEWAY = 502,
    SERVICE_UNAVAILABLE = 503,
    GATEWAY_TIMEOUT = 504
}
export const enum TranMessage {
    SUCCESS = 'C000000000',
    PROCESSING = 'W000000000',
    AUTH = 'E000000001'
}

export type Response = {
    respCode: string;
    respData: any;
    respMsg: string
}