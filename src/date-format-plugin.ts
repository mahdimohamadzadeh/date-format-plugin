import { LocalizationOptions } from "./date-format.type";
import { Plugin, App } from "vue";
import vDateDirective from "./v-date-format.directive";

const DateFormatPlugin: Plugin<LocalizationOptions & { langKey: string }> = {
  install(app: App, options: LocalizationOptions & { langKey: string }) {
    if (!options) {
      throw new Error('DateFormatPlugin requires a "option" value.');
    }
    app.config.globalProperties.options = options;
    app.directive("format-date", vDateDirective);
  },
};

export default DateFormatPlugin;
