import App from "./test.vue";
import DateFormatPlugin from "../src/date-format-plugin";
import { PluginOptions } from "../src/date-format.type";
import { createApp } from "vue";
const app = createApp(App);

const options: PluginOptions = {
  locale: "en-US", // can use env lang
  timeZone: "UTC", // default timezone
  defaultFormat: (dateParts) => {
    return `${dateParts.month}/${dateParts.year}`;
  },
  formats: {
    us: {
      locale: "en-US",
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      formatMatcher: "basic",
      format: (dateParts) => {
        return `${dateParts.month}/${dateParts.day}/${dateParts.year} ${dateParts.hour}:${dateParts.minute} ${dateParts.dayPeriod}`;
      },
    },
    uk: {
      locale: "en-GB",
      timeZone: "Europe/London",
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      formatMatcher: "basic",
      format: (dateParts) => {
        return `${dateParts.day}/${dateParts.month}/${dateParts.year} ${dateParts.hour}:${dateParts.minute}`;
      },
    },
  },
};

app.use(DateFormatPlugin, options);
app.mount("#app");
