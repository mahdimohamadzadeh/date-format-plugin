# Vue Date Format Plugin

A Vue.js plugin for formatting dates with support for different locales, custom formats, timezones, and full TypeScript types. It works seamlessly with Vue 3's Composition API, Options API, and Directives.

## Features

- **SSR-Safe Default Values** (defaults to `en-US` and `UTC`)
- **Composition API**: `useDateFormat()`
- **Options API**: `this.$dateFormat()`
- **Template Directives**: `v-format-date`
- **Timezone Support**: Easily switch to global timezones like `Asia/Tehran` or `America/New_York`
- **Fallback Resolution**: Local overrides > Named formats > Global default > Standard Intl formatting
- **Strong Typing**: Completely rewritten in strict TypeScript

## Installation

```bash
npm install date-format-plugin
# or
yarn add date-format-plugin
```

## Setup & Configuration

Configure the plugin in your `main.ts` or `main.js`:

```typescript
import { createApp } from 'vue'
import App from './App.vue'
import { DateFormatPlugin, PluginOptions } from 'date-format-plugin'

const app = createApp(App)

const options: PluginOptions = {
  // 1. Set global defaults
  locale: 'en-US',
  timeZone: 'UTC',

  // 2. Add a default format function
  defaultFormat: (parts) => {
    return `${parts.year}-${parts.month}-${parts.day}`;
  },

  // 3. Define named formats for easy reuse
  formats: {
    'persian': {
      locale: 'fa-IR',
      timeZone: 'Asia/Tehran',
      format: (parts) => `${parts.year}/${parts.month}/${parts.day} ${parts.hour}:${parts.minute}`
    },
    'short': {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
      format: (parts) => `${parts.month}/${parts.day}/${parts.year}`
    }
  }
}

app.use(DateFormatPlugin, options)
app.mount('#app')
```

## Usage

### 1. Vue Directive (`v-format-date`)

The directive is globally registered. You can pass a direct value, or a configuration object to override settings.

```vue
<template>
  <!-- Simple usage: falls back to global default format -->
  <span v-format-date="'2024-12-22T05:30:00.000Z'"></span>

  <!-- Using a predefined named format -->
  <span v-format-date="{ 
    date: '2024-12-22T05:30:00.000Z', 
    formatName: 'persian' 
  }"></span>

  <!-- Ad-hoc local override -->
  <span v-format-date="{ 
    date: '2024-12-22T05:30:00.000Z', 
    locale: 'de-DE',
    timeZone: 'Europe/Berlin',
    format: (parts) => \`\${parts.day}.\${parts.month}.\${parts.year}\`
  }"></span>
</template>
```

### 2. Composition API (`useDateFormat`)

The recommended approach for modern Vue 3 apps using `<script setup>`.

```vue
<script setup lang="ts">
import { useDateFormat } from 'date-format-plugin'

const { format } = useDateFormat()

const myDate = new Date()

// Output using global default
const defaultString = format(myDate)

// Output using a predefined format
const persianString = format(myDate, { formatName: 'persian' })

// Output using local override
const customString = format(myDate, { 
  locale: 'fa-IR', 
  timeZone: 'Asia/Tehran',
  hour: 'numeric',
  minute: 'numeric'
})
</script>
```

### 3. Options API (`$dateFormat`)

For classic Vue architecture, the plugin automatically binds `$dateFormat` to your global properties.

```vue
<script lang="ts">
export default {
  data() {
    return {
      myDate: new Date()
    }
  },
  computed: {
    formattedDate() {
      // Use the global default
      return this.$dateFormat(this.myDate)
    },
    persianDate() {
      // Use a local override
      return this.$dateFormat(this.myDate, { formatName: 'persian' })
    }
  }
}
</script>
```

## Types Reference

The package exports robust TypeScript definitions for all configurations:

```typescript
import { 
  PluginOptions, 
  LocalFormatOptions, 
  DatePartType, 
  FormatContext,
  DirectiveBindingValue 
} from 'date-format-plugin'
```

### `PluginOptions`
The global configuration passed to `app.use()`.

```typescript
interface PluginOptions {
  locale?: string;
  timeZone?: string;
  defaultFormat?: (parts: DatePartType, ctx: FormatContext) => string;
  defaultOptions?: Intl.DateTimeFormatOptions;
  formats?: Record<string, LocaleOptions>;
}
```

### Fallback Chain

When a date is formatted, the plugin evaluates options in this exact order:

1. **Local Override** (e.g., `format(date, { locale: 'fa-IR' })`)
2. **Named Format** (e.g., `formatName: 'persian'`)
3. **Global Defaults** (`pluginOptions.locale`, `pluginOptions.defaultFormat`)
4. **SSR-Safe Intl Defaults** (Defaults to `en-US` and `UTC`)

## Support

- [@mahdimohamadzadeh](https://github.com/mahdimohamadzadeh)

## License
[MIT](LICENSE)
