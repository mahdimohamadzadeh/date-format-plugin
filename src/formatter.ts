import {
  DatePartType,
  FormatContext,
  LocalFormatOptions,
  PluginOptions,
} from "./date-format.type";

const DEFAULT_LOCALE = "en-US";
const DEFAULT_TIMEZONE = "UTC";

const DEFAULT_INTL_OPTIONS: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
};

export function resolveFormatOptions(
  pluginOptions: PluginOptions,
  localOptions?: LocalFormatOptions
) {
  let namedFormatOptions: Intl.DateTimeFormatOptions = {};
  let namedFormatFunction: undefined | ((parts: DatePartType, ctx: FormatContext) => string) = undefined;
  let namedLocale: string | undefined = undefined;
  let namedTimeZone: string | undefined = undefined;

  if (localOptions?.formatName && pluginOptions.formats) {
    const formatConfig = pluginOptions.formats[localOptions.formatName];
    if (formatConfig) {
      const { format, locale, timeZone, ...restIntlOptions } = formatConfig as any;
      namedFormatOptions = restIntlOptions;
      namedFormatFunction = format;
      namedLocale = locale;
      namedTimeZone = timeZone;
    }
  }

  const locale = localOptions?.locale || namedLocale || pluginOptions.locale || DEFAULT_LOCALE;
  const timeZone = localOptions?.timeZone || namedTimeZone || pluginOptions.timeZone || DEFAULT_TIMEZONE;

  const intlOptionsToUse: Intl.DateTimeFormatOptions = {
    ...DEFAULT_INTL_OPTIONS,
    ...(pluginOptions.defaultOptions || {}),
    ...namedFormatOptions,
  };

  if (localOptions) {
    const validIntlKeys = [
      "localeMatcher", "weekday", "era", "year", "month", "day", "hour",
      "minute", "second", "timeZoneName", "formatMatcher", "hour12",
      "timeZone", "dateStyle", "timeStyle", "calendar", "dayPeriod",
      "numberingSystem", "hourCycle", "fractionalSecondDigits",
    ];
    for (const key of Object.keys(localOptions)) {
      if (validIntlKeys.includes(key)) {
        (intlOptionsToUse as any)[key] = (localOptions as any)[key];
      }
    }
  }
  
  intlOptionsToUse.timeZone = timeZone;

  const formatFunction =
    localOptions?.format ||
    namedFormatFunction ||
    pluginOptions.defaultFormat;

  return {
    locale,
    timeZone,
    intlOptions: intlOptionsToUse,
    formatFunction,
  };
}

export function formatDate(
  dateValue: string | number | Date,
  pluginOptions: PluginOptions = {},
  localOptions?: LocalFormatOptions
): string {
  const date = new Date(dateValue);
  
  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  const { locale, timeZone, intlOptions, formatFunction } = resolveFormatOptions(
    pluginOptions,
    localOptions
  );

  const formatter = new Intl.DateTimeFormat(locale, intlOptions);

  if (!formatFunction) {
    return formatter.format(date);
  }

  const parts = formatter.formatToParts(date);
  const dateParts: DatePartType = {};

  for (const part of parts) {
    if (part.type !== "literal") {
      dateParts[part.type] = part.value;
    }
  }

  const context: FormatContext = {
    locale,
    timeZone,
    options: intlOptions,
  };

  return formatFunction(dateParts, context);
}
