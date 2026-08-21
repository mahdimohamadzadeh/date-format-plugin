export interface DatePartType {
  year?: string;
  month?: string;
  day?: string;
  weekday?: string;
  hour?: string;
  minute?: string;
  second?: string;
  dayPeriod?: string;
  timeZoneName?: string;
  [key: string]: string | undefined;
}

export interface FormatContext {
  locale: string;
  timeZone: string;
  options: Intl.DateTimeFormatOptions;
}

export type FormatFunction = (
  dateParts: DatePartType,
  context: FormatContext
) => string;

export interface LocaleOptions extends Intl.DateTimeFormatOptions {
  format?: FormatFunction;
  locale?: string;
  timeZone?: string;
}

export interface PluginOptions {
  locale?: string;
  timeZone?: string;
  defaultFormat?: FormatFunction;
  defaultOptions?: Intl.DateTimeFormatOptions;
  formats?: Record<string, LocaleOptions>;
}

export interface LocalFormatOptions extends Intl.DateTimeFormatOptions {
  formatName?: string;
  format?: FormatFunction;
  locale?: string;
  timeZone?: string;
}

export type DirectiveBindingValue = string | number | Date | {
  date: string | number | Date;
} & LocalFormatOptions;
