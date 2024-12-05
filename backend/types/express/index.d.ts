//her must modify express global types
declare global {
    namespace Express {
        export interface Request {
            userId?: string
        }
    }
}

export {}