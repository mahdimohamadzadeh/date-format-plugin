import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { defineComponent } from "vue";
import DateFormatPlugin from "../src/date-format-plugin";
import { useDateFormat } from "../src/use-date-format";

describe("Vue Integration", () => {
  const sampleDate = "2024-12-22T05:30:00.000Z";

  it("directive mount - simple value", () => {
    const TestComponent = defineComponent({
      template: `<span v-format-date="'${sampleDate}'"></span>`
    });

    const wrapper = mount(TestComponent, {
      global: {
        plugins: [[DateFormatPlugin, { defaultFormat: () => 'simple-test' }]]
      }
    });

    expect(wrapper.text()).toBe('simple-test');
  });

  it("directive mount - complex binding", () => {
    const TestComponent = defineComponent({
      template: `<span v-format-date="{ date: '${sampleDate}', formatName: 'short' }"></span>`
    });

    const wrapper = mount(TestComponent, {
      global: {
        plugins: [[DateFormatPlugin, { 
          formats: { short: { format: () => 'complex-test' } }
        }]]
      }
    });

    expect(wrapper.text()).toBe('complex-test');
  });

  it("Options API - $dateFormat", () => {
    const TestComponent = defineComponent({
      template: `<span>{{ $dateFormat('${sampleDate}') }}</span>`
    });

    const wrapper = mount(TestComponent, {
      global: {
        plugins: [[DateFormatPlugin, { defaultFormat: () => 'options-api' }]]
      }
    });

    expect(wrapper.text()).toBe('options-api');
  });

  it("Composition API - useDateFormat", () => {
    const TestComponent = defineComponent({
      setup() {
        const { format } = useDateFormat();
        const formatted = format(sampleDate);
        return { formatted };
      },
      template: `<span>{{ formatted }}</span>`
    });

    const wrapper = mount(TestComponent, {
      global: {
        plugins: [[DateFormatPlugin, { defaultFormat: () => 'composition-api' }]]
      }
    });

    expect(wrapper.text()).toBe('composition-api');
  });
});
