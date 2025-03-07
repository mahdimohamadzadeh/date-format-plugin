export interface DatePartType {
  year: string;
  month: string;
  day: string;
  hour: string;
  minute: string;
  second: string;
}

export type DateParts = (dateParts: DatePartType) => string;

export interface LocalizationOptions {
  default: Intl.DateTimeFormatOptions & { format: DateParts };
  [key: string]: Intl.DateTimeFormatOptions & { format: DateParts };
}
