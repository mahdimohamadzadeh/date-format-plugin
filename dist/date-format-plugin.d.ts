import { Plugin } from "vue";
import { LocalizationOptions } from "./date-format.type";
declare const DateFormatPlugin: Plugin<LocalizationOptions & {
    langKey: string;
}>;
export default DateFormatPlugin;
