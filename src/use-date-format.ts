import { inject } from "vue";
import { PluginOptions, LocalFormatOptions } from "./date-format.type";
import { DateFormatSymbol } from "./date-format-plugin";
import { formatDate } from "./formatter";

export function useDateFormat() {
  const pluginOptions = inject(DateFormatSymbol, {} as PluginOptions);

  const format = (
    date: string | number | Date,
    localOptions?: LocalFormatOptions
  ) => {
    return formatDate(date, pluginOptions, localOptions);
  };

  return {
    format,
  };
}
