export type DateParts = (dateParts: any) => string;
export interface LocalizationOptions {
    default: Intl.DateTimeFormatOptions & {
        format: DateParts;
    };
    [key: string]: Intl.DateTimeFormatOptions & {
        format: DateParts;
    };
}
