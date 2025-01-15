import App from "./test.vue";
import DateFormatPlugin from "../src/date-format-plugin";
import { createApp } from "vue";
const app = createApp(App);

app.use(DateFormatPlugin, {
  langKey: "fa", // can use env lang
  default: {
    format: (dateParts) => {
      const retval = `${dateParts.month}/${dateParts.year}`;
      return retval;
    },
  },
  en: {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    formatMatcher: "basic",
    format: (dateParts) => {
      const retval = `${dateParts.year}-${dateParts.month}-${dateParts.day} ${dateParts.hour}:${dateParts.minute} ${dateParts.day}`;
      return retval;
    },
  },
  fa: {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    formatMatcher: "basic",
    format: (dateParts) => {
      const retval = `${dateParts.month}/${dateParts.year}${dateParts.day}`;
      return retval;
    },
  },
});
app.mount("#app");
