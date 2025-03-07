import {
  DateParts,
  DatePartType,
  LocalizationOptions,
} from "./date-format.type";
import { DirectiveBinding } from "vue";

interface DateFormatBinding {
  date: string | Date;
  options?: {
    format?: (value: DatePartType) => string;
  } & Intl.DateTimeFormatOptions;
}

function main(binding: DirectiveBinding<DateFormatBinding>) {
  const pluginOptions: (LocalizationOptions & { langKey: string }) | undefined =
    binding.instance?.$.appContext.config.globalProperties.options;
  if (!pluginOptions) {
    throw new Error("Please set format");
  }

  let { date, options } = binding.value;
  date = new Date(date);
  const tempOption =
    ((options ||
      pluginOptions[pluginOptions.langKey]) as Intl.DateTimeFormatOptions) ||
    pluginOptions.default;
  if (!tempOption.year) {
    tempOption.year = "numeric";
    tempOption.month = "2-digit";
    tempOption.day = "2-digit";
    tempOption.hour = "2-digit";
    tempOption.minute = "2-digit";
    tempOption.second = "2-digit";
  }

  const formatter = new Intl.DateTimeFormat(pluginOptions.langKey, tempOption);

  const parts = formatter.formatToParts(date);
  const dateParts: Partial<DatePartType> = {};
  parts.forEach((part) => {
    if (
      part.type !== "literal" &&
      ["year", "month", "day", "hour", "minute", "second"].includes(part.type)
    ) {
      (dateParts as any)[part.type] = part.value;
    }
  });

  const customFormat: DateParts | undefined =
    (options?.format as DateParts | undefined) ||
    pluginOptions[pluginOptions!.langKey]?.format ||
    pluginOptions?.default?.format;

  if (!customFormat) {
    throw new Error("Please set format");
  }

  return customFormat(dateParts as DatePartType);
}

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding<DateFormatBinding>) {
    el.textContent = main(binding);
  },
  updated(el: HTMLElement, binding: DirectiveBinding<DateFormatBinding>) {
    el.textContent = main(binding);
  },
};
