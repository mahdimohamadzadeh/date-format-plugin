import { DateParts, LocalizationOptions } from "./date-format.type";
import { DirectiveBinding, inject } from "vue";

function main(binding: DirectiveBinding) {
  const pluginOptions: (LocalizationOptions & { langKey: string }) | undefined =
    binding.instance?.$.appContext.config.globalProperties.options;
  if (!pluginOptions) {
    throw new Error("Plugin options not set. Please configure the date format.");
  }

  let { date, options } = binding.value;
  date = new Date(date);
  const tempOption =
    ((options ||
      pluginOptions[pluginOptions.langKey]) as Intl.DateTimeFormatOptions) ||
    pluginOptions.default || {};
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
  const dateParts: { [key: string]: string } = {};
  parts.forEach((part) => {
    if (part.type !== "literal") {
      dateParts[part.type] = part.value;
    }
  });

  const customFormat: DateParts | undefined =
    (options?.format as DateParts | undefined) ||
    pluginOptions[pluginOptions.langKey]?.format ||
    pluginOptions?.default?.format;

  if (!customFormat) {
    throw new Error("Custom format is not set. Please configure the date format.");
  }

  if (typeof customFormat === "function") {
    return customFormat(dateParts);
  } else {
    throw new Error("customFormat is not a function");
  }
}

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    el.textContent = main(binding);
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    el.textContent = main(binding);
  },
};
