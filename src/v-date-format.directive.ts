import { DirectiveBinding } from "vue";

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const { value } = binding;
    if (!value) {
      console.error("binding.value is undefined");
      return;
    }
    const { date, options } = value;
    const formatDate =
      binding.instance?.$.appContext?.config?.globalProperties?.$formatDate;

    if (typeof formatDate === "function") {
      el.textContent = formatDate(date, options);
    } else {
      console.error("formatDate function is not available");
    }
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    const { value } = binding;
    const { date, options } = value;
    const formatDate =
      binding.instance?.$.appContext.config.globalProperties.$formatDate;

    if (typeof formatDate === "function") {
      el.textContent = formatDate(date, options);
    } else {
      console.error("formatDate function is not available");
    }
  },
};
