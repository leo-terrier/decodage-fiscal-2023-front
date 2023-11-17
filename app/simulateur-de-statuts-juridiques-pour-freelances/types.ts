export type ErrorObject = {
    [id: string]: FieldErrorObj
}
export type FieldErrorObj = {
    error: string
    warning: string
}
