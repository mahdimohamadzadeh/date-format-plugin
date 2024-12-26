import { LocalizationOptions } from "./date-format.type";
import { Plugin } from "vue";
import vDateDirective from "./v-date-format.directive";

const DateFormatPlugin: Plugin<LocalizationOptions> = {
  install(app, options) {
    if (!options || !options.default) {
      throw new Error('DateFormatPlugin requires a "option" value.');
    }
    const formatDate = (
      dateString: string | Date,
      formatOptions?: LocalizationOptions
    ) => {
      const date =
        dateString instanceof Date ? dateString : new Date(dateString);
      const langKey = options.langKey || "VITE_APP_LANG";
      const locale = langKey === "fa" ? "fa-IR" : "en-US";

      try {
        // If no options passed, use locale-specific defaults
        const defaultOptions = options[langKey] || options.default;
        // If formatOptions provided, use those instead of defaults
        const finalOptions = formatOptions || defaultOptions;

        return date.toLocaleString(locale, finalOptions);
      } catch (error) {
        console.error("Date formatting error:", error);
        return date.toLocaleDateString(locale);
      }
    };

    app.config.globalProperties.$formatDate = formatDate;
    app.provide("formatDate", formatDate);
    app.directive("format-date", vDateDirective);
  },
};

export default DateFormatPlugin;
