import { ObjectDirective, DirectiveBinding } from "vue";
import { DirectiveBindingValue, PluginOptions, LocalFormatOptions } from "./date-format.type";
import { formatDate } from "./formatter";

const applyFormat = (
  el: HTMLElement,
  binding: DirectiveBinding<DirectiveBindingValue>,
  pluginOptions: PluginOptions
) => {
  let dateValue: string | number | Date;
  let localOptions: LocalFormatOptions | undefined = undefined;

  if (
    typeof binding.value === "string" ||
    typeof binding.value === "number" ||
    binding.value instanceof Date
  ) {
    dateValue = binding.value;
  } else if (binding.value && binding.value.date) {
    const { date, ...restOptions } = binding.value;
    dateValue = date;
    localOptions = restOptions;
  } else {
    // Fallback if no date is provided
    return;
  }

  const formattedValue = formatDate(dateValue, pluginOptions, localOptions);

  // Prevent unnecessary DOM updates
  if (el.textContent !== formattedValue) {
    el.textContent = formattedValue;
  }
};

export default function vDateFormatDirective(
  pluginOptions: PluginOptions
): ObjectDirective<HTMLElement, DirectiveBindingValue> {
  return {
    mounted(el, binding) {
      applyFormat(el, binding, pluginOptions);
    },
    updated(el, binding) {
      // Only re-evaluate if the binding value has changed
      // Vue's binding.value vs binding.oldValue can be checked
      // But for complex objects it's safer to rely on the textContent check inside applyFormat
      applyFormat(el, binding, pluginOptions);
    },
  };
}
