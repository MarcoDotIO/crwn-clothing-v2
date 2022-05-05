export type ErrorWithMessage = {
    message: string;
}

export function isErrorProper(err: any): err is ErrorWithMessage {
    return typeof err.message === 'string';
};

export type ErrorWithCode = {
    code: string;
}

export function isErrorCoded(err: any): err is ErrorWithCode {
    return typeof err.code === 'string';
};