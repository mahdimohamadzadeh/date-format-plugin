function l(e) {
  var f, m, c;
  const t = (f = e.instance) == null ? void 0 : f.$.appContext.config.globalProperties.options;
  if (!t)
    throw new Error("Plugin options not set. Please configure the date format.");
  let { date: a, options: r } = e.value;
  a = new Date(a);
  const o = r || t[t.langKey] || t.default || {};
  o.year || (o.year = "numeric", o.month = "2-digit", o.day = "2-digit", o.hour = "2-digit", o.minute = "2-digit", o.second = "2-digit");
  const u = new Intl.DateTimeFormat(t.langKey, o).formatToParts(a), s = {};
  u.forEach((i) => {
    i.type !== "literal" && (s[i.type] = i.value);
  });
  const n = (r == null ? void 0 : r.format) || ((m = t[t.langKey]) == null ? void 0 : m.format) || ((c = t == null ? void 0 : t.default) == null ? void 0 : c.format);
  if (!n)
    throw new Error("Custom format is not set. Please configure the date format.");
  if (typeof n == "function")
    return n(s);
  throw new Error("customFormat is not a function");
}
const d = {
  mounted(e, t) {
    e.textContent = l(t);
  },
  updated(e, t) {
    e.textContent = l(t);
  }
}, w = {
  install(e, t) {
    if (!t)
      throw new Error('DateFormatPlugin requires a "option" value.');
    e.config.globalProperties.options = t, e.directive("format-date", d);
  }
};
export {
  w as DateFormatPlugin,
  d as vDateFormatDirective
};
