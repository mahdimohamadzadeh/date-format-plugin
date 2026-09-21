import { describe, it, expect } from "vitest";
import { formatDate } from "../src/formatter";
import { formatDate as publicFormatDate } from "../src/main";
import { PluginOptions } from "../src/date-format.type";

describe("formatter.ts", () => {
  const sampleDate = new Date("2024-12-22T05:30:00.000Z");

  it("handles default locale (SSR safe)", () => {
    // default locale is en-US, UTC
    const result = formatDate(sampleDate);
    // 2024-12-22T05:30:00.000Z in UTC is 05:30:00 AM on 12/22/2024
    // en-US numeric default is "12/22/2024, 05:30:00 AM" or similar depending on node version,
    // let's just check if it contains 2024
    expect(result).toContain("2024");
    expect(result).not.toBe("Invalid Date");
  });

  it("handles custom locale", () => {
    const result = formatDate(sampleDate, { locale: "fa-IR" });
    // In Persian calendar 2024 is 1403 or 1402 (with Persian numerals)
    expect(result).toContain("۱۴۰۳");
  });

  it("handles default timezone", () => {
    // Should be UTC by default
    const defaultRes = formatDate(sampleDate, {}, { hour: "numeric", timeZoneName: "short" });
    expect(defaultRes).toContain("UTC");
  });

  it("handles custom timezone", () => {
    const resultTehran = formatDate(sampleDate, { timeZone: "Asia/Tehran" }, { hour: "numeric", timeZoneName: "short" });
    // Tehran is +03:30, so 05:30 UTC -> 09:00 IRST
    expect(resultTehran).toContain("GMT+3:30");
  });

  it("handles named format", () => {
    const pluginOptions: PluginOptions = {
      formats: {
        short: {
          year: "2-digit",
          format: (parts) => `${parts.year}`,
        }
      }
    };
    const result = formatDate(sampleDate, pluginOptions, { formatName: "short" });
    expect(result).toBe("24");
  });

  it("handles local override", () => {
    const result = formatDate(sampleDate, { locale: "en-US" }, { locale: "fa-IR" });
    expect(result).toContain("۱۴۰۳");
  });

  it("handles fallback to defaultFormat", () => {
    const pluginOptions: PluginOptions = {
      defaultFormat: (parts) => `[${parts.year}]`
    };
    const result = formatDate(sampleDate, pluginOptions);
    expect(result).toBe("[2024]");
  });

  it("handles timestamp", () => {
    const result = formatDate(sampleDate.getTime());
    expect(result).toContain("2024");
  });

  it("handles ISO string", () => {
    const result = formatDate("2024-12-22T05:30:00.000Z");
    expect(result).toContain("2024");
  });

  it("handles invalid date", () => {
    const result = formatDate("not a date");
    expect(result).toBe("Invalid Date");
  });
});

describe("formatDate (public entry, no Vue context)", () => {
  const sampleDate = new Date("2024-12-22T05:30:00.000Z");

  it("is the same function re-exported from the package entry", () => {
    expect(publicFormatDate).toBe(formatDate);
  });

  it("formats a date with zero Vue setup context, app instance, or provide/inject", () => {
    // No createApp, no app.use(), no inject(), no getCurrentInstance() anywhere in this test.
    const result = publicFormatDate(sampleDate, { locale: "en-US", timeZone: "UTC" });
    expect(result).toContain("2024");
    expect(result).not.toBe("Invalid Date");
  });

  it("resolves named formats without Vue", () => {
    const pluginOptions: PluginOptions = {
      formats: {
        shortDate: {
          locale: "en-US",
          year: "2-digit",
          month: "2-digit",
          day: "2-digit",
          format: (parts) => `${parts.month}/${parts.day}/${parts.year}`,
        },
      },
    };
    const result = publicFormatDate(sampleDate, pluginOptions, { formatName: "shortDate" });
    expect(result).toBe("12/22/24");
  });

  it("lets a local override win over a named format's options", () => {
    const pluginOptions: PluginOptions = {
      formats: {
        shortDate: {
          locale: "en-US",
          timeZone: "UTC",
          format: (parts) => `${parts.month}/${parts.day}/${parts.year}`,
        },
      },
    };
    const result = publicFormatDate(sampleDate, pluginOptions, {
      formatName: "shortDate",
      timeZone: "Asia/Tehran",
      format: (parts) => `override:${parts.month}/${parts.day}/${parts.year}`,
    });
    expect(result).toBe("override:12/22/2024");
  });

  it("respects a custom timezone without Vue", () => {
    const result = publicFormatDate(
      sampleDate,
      { timeZone: "Asia/Tehran" },
      { hour: "numeric", timeZoneName: "short" }
    );
    expect(result).toContain("GMT+3:30");
  });

  it("supports custom format functions without Vue", () => {
    const result = publicFormatDate(sampleDate, {}, {
      format: (parts, ctx) => `${parts.year}-${parts.month}-${parts.day} (${ctx.locale})`,
    });
    expect(result).toBe("2024-12-22 (en-US)");
  });

  it("forces Gregorian calendar + Latin digits for machine-readable output even when the app locale is Persian", () => {
    const pluginOptions: PluginOptions = { locale: "fa-IR" };

    // Without an explicit override, the app-wide Persian locale produces
    // a Jalali calendar with Persian (Extended Arabic-Indic) digits.
    const localeSensitive = publicFormatDate(sampleDate, pluginOptions);
    expect(localeSensitive).toContain("۱۴۰۳");

    // Callers building machine-readable/internal date keys must be able to
    // opt out explicitly, without the plugin's locale leaking in.
    const machineReadable = publicFormatDate(sampleDate, pluginOptions, {
      locale: "en-US",
      calendar: "gregory",
      numberingSystem: "latn",
      timeZone: "UTC",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      format: (parts) => `${parts.year}-${parts.month}-${parts.day}`,
    });
    expect(machineReadable).toBe("2024-12-22");
  });
});
