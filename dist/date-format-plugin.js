const s = {
  mounted(a, t) {
    var o, l, c, f;
    const { value: n } = t;
    if (!n) {
      console.error("binding.value is undefined");
      return;
    }
    const { date: r, options: i } = n, e = (f = (c = (l = (o = t.instance) == null ? void 0 : o.$.appContext) == null ? void 0 : l.config) == null ? void 0 : c.globalProperties) == null ? void 0 : f.$formatDate;
    typeof e == "function" ? a.textContent = e(r, i) : console.error("formatDate function is not available");
  },
  updated(a, t) {
    var o;
    const { value: n } = t, { date: r, options: i } = n, e = (o = t.instance) == null ? void 0 : o.$.appContext.config.globalProperties.$formatDate;
    typeof e == "function" ? a.textContent = e(r, i) : console.error("formatDate function is not available");
  }
}, u = {
  install(a, t) {
    if (!t || !t.default)
      throw new Error('DateFormatPlugin requires a "option" value.');
    const n = (r, i) => {
      const e = r instanceof Date ? r : new Date(r), o = t.langKey || "VITE_APP_LANG", l = o === "fa" ? "fa-IR" : "en-US";
      try {
        const c = t[o] || t.default, f = i || c;
        return e.toLocaleString(l, f);
      } catch (c) {
        return console.error("Date formatting error:", c), e.toLocaleDateString(l);
      }
    };
    a.config.globalProperties.$formatDate = n, a.provide("formatDate", n), a.directive("format-date", s);
  }
};
export {
  u as DateFormatPlugin,
  s as vDateFormatDirective
};
