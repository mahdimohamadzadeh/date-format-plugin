import { Plugin, App, InjectionKey } from "vue";
import { PluginOptions, LocalFormatOptions } from "./date-format.type";
import vDateDirective from "./v-date-format.directive";
import { formatDate } from "./formatter";

export const DateFormatSymbol: InjectionKey<PluginOptions> = Symbol("DateFormat");

const DateFormatPlugin: Plugin<PluginOptions> = {
  install(app: App, options: PluginOptions = {}) {
    app.provide(DateFormatSymbol, options);

    app.config.globalProperties.$dateFormat = (
      date: string | number | Date,
      localOptions?: LocalFormatOptions
    ) => {
      return formatDate(date, options, localOptions);
    };

    app.directive("format-date", vDateDirective(options));
  },
};

export default DateFormatPlugin;
