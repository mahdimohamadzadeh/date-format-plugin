import App from "./test.vue";
import DateFormatPlugin from "../src/date-format-plugin";
import { createApp } from "vue";
const app = createApp(App);

const dateFormatConfig = {
  default: {},
  langKey: "VITE_APP_LANG", // Add the environment key
  en: {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    formatMatcher: "basic",
  },
  fa: {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    formatMatcher: "basic",
  },
};
app.use(DateFormatPlugin, dateFormatConfig);
app.mount("#app");
