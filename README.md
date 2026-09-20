# date-format-plugin

[![npm version](https://img.shields.io/npm/v/date-format-plugin.svg)](https://www.npmjs.com/package/date-format-plugin)
[![npm downloads](https://img.shields.io/npm/dm/date-format-plugin.svg)](https://www.npmjs.com/package/date-format-plugin)
[![bundle size](https://img.shields.io/bundlephobia/minzip/date-format-plugin)](https://bundlephobia.com/package/date-format-plugin)
[![license](https://img.shields.io/npm/l/date-format-plugin.svg)](./LICENSE)
[![Vue 3](https://img.shields.io/badge/Vue-3.x-42b883.svg)](https://vuejs.org/)

**date-format-plugin** is a lightweight, SSR-safe **Vue 3 date formatting plugin**. It formats dates and timestamps using the native `Intl.DateTimeFormat` API — no moment.js, no date-fns, no extra runtime dependencies — with first-class support for **multiple locales, timezones, named/reusable formats, and custom format functions**.

Use it however your app is built: as a **Composition API composable** (`useDateFormat()`), an **Options API** global (`this.$dateFormat()`), or a **template directive** (`v-format-date`).

## Table of Contents

- [Why date-format-plugin?](#why-date-format-plugin)
- [Features](#features)
- [Installation](#installation)
- [Setup & Configuration](#setup--configuration)
- [Usage](#usage)
  - [Vue Directive](#1-vue-directive-v-format-date)
  - [Composition API](#2-composition-api-usedateformat)
  - [Options API](#3-options-api-dateformat)
- [Types Reference](#types-reference)
- [Fallback Chain](#fallback-chain)
- [Browser & SSR Support](#browser--ssr-support)
- [FAQ](#faq)
- [Contributing](#contributing)
- [License](#license)

## Why date-format-plugin?

Most date-formatting libraries ship their own locale data, adding kilobytes to your bundle. `date-format-plugin` instead formats dates with the **native `Intl` API already built into every modern browser and Node.js runtime**, so the package itself stays tiny (~1 KB gzipped) with **zero runtime dependencies**.

It's a good fit when you need:

- Locale-aware date/time formatting in a Vue 3 app (e.g. `en-US`, `en-GB`, or any BCP 47 locale)
- Timezone-aware rendering that's safe to run on both server and client
- A single source of truth for date formats across a large app (named formats)
- Full TypeScript autocompletion and type safety for date formatting options

## Features

- **SSR-Safe Default Values** (defaults to `en-US` and `UTC`, so server and client render identically)
- **Composition API**: `useDateFormat()`
- **Options API**: `this.$dateFormat()`
- **Template Directive**: `v-format-date`
- **Timezone Support**: Format any date in any IANA timezone, e.g. `Europe/London`, `America/New_York`
- **Named Formats**: Define reusable formats once and reference them by name anywhere in your app
- **Fallback Resolution**: Local overrides > Named formats > Global default > Standard Intl formatting
- **Strong Typing**: Written in strict TypeScript with no `any` in its public API
- **Zero Dependencies**: Built entirely on the native `Intl.DateTimeFormat` API

## Installation

```bash
npm install date-format-plugin
# or
yarn add date-format-plugin
# or
pnpm add date-format-plugin
```

Requires Vue `^3.2.0` and Node.js `>=18`.

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
    'us': {
      locale: 'en-US',
      timeZone: 'America/New_York',
      format: (parts) => `${parts.month}/${parts.day}/${parts.year}`
    },
    'uk': {
      locale: 'en-GB',
      timeZone: 'Europe/London',
      format: (parts) => `${parts.day}/${parts.month}/${parts.year}`
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
    formatName: 'uk' 
  }"></span>

  <!-- Ad-hoc local override -->
  <span v-format-date="{ 
    date: '2024-12-22T05:30:00.000Z', 
    locale: 'en-GB',
    timeZone: 'Europe/London',
    format: (parts) => \`\${parts.day}/\${parts.month}/\${parts.year}\`
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
const ukString = format(myDate, { formatName: 'uk' })

// Output using a local override
const customString = format(myDate, { 
  locale: 'en-GB', 
  timeZone: 'Europe/London',
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
    ukDate() {
      // Use a local override
      return this.$dateFormat(this.myDate, { formatName: 'uk' })
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

## Fallback Chain

When a date is formatted, the plugin evaluates options in this exact order:

1. **Local Override** (e.g., `format(date, { locale: 'en-GB' })`)
2. **Named Format** (e.g., `formatName: 'uk'`)
3. **Global Defaults** (`pluginOptions.locale`, `pluginOptions.defaultFormat`)
4. **SSR-Safe Intl Defaults** (Defaults to `en-US` and `UTC`)

## Browser & SSR Support

Because formatting is powered by the native `Intl.DateTimeFormat` API, `date-format-plugin` works anywhere a modern JS engine does: all evergreen browsers, Node.js `>=18` (SSR, Nuxt, Vite SSR), and edge runtimes. Defaults of `en-US` / `UTC` guarantee the server-rendered and client-hydrated output match, avoiding Vue hydration mismatches.

## FAQ

**Does this package bundle locale data?**
No. It relies on the `Intl` API already present in your JS runtime, keeping the install size minimal.

**Can I use it without Vue's global plugin registration?**
Yes — `useDateFormat()` and the exported `formatDate` logic work standalone; `app.use()` is only needed if you also want the directive and `$dateFormat` global.

**Does it support locales other than English?**
Yes — pass any valid [BCP 47 locale tag](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locale_identification_and_negotiation) (e.g. `de-DE`, `ja-JP`, `fr-FR`) to `locale`; the examples above use `en-US` and `en-GB` for clarity.

## Contributing

Issues and pull requests are welcome at [github.com/mahdimohamadzadeh/date-format-plugin](https://github.com/mahdimohamadzadeh/date-format-plugin).

```bash
npm install
npm test
npm run build
```

## Support

- [@mahdimohamadzadeh](https://github.com/mahdimohamadzadeh)

## License
[MIT](LICENSE)
