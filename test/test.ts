import App from "./test.vue";
import DateFormatPlugin from "../src/date-format-plugin";
import { PluginOptions } from "../src/date-format.type";
import { createApp } from "vue";
const app = createApp(App);

const options: PluginOptions = {
  locale: "fa-IR", // can use env lang
  timeZone: "Asia/Tehran", // default timezone
  defaultFormat: (dateParts) => {
    return `${dateParts.month}/${dateParts.year}`;
  },
  formats: {
    en: {
      locale: "en-US",
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      formatMatcher: "basic",
      format: (dateParts) => {
        return `${dateParts.year}-${dateParts.month}-${dateParts.day} ${dateParts.hour}:${dateParts.minute}`;
      },
    },
    fa: {
      locale: "fa-IR",
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      formatMatcher: "basic",
      format: (dateParts) => {
        return `${dateParts.year}/${dateParts.month}/${dateParts.day}`;
      },
    },
  },
};

app.use(DateFormatPlugin, options);
app.mount("#app");
