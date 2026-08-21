import { describe, it, expect } from "vitest";
import { formatDate } from "../src/formatter";
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
