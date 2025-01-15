# Vue Date Format Plugin

A Vue.js plugin for formatting dates with support for different locales and customizable formatting options.

## Installation

```
npm i date-format-plugin
# or
yarn add date-format-plugin
```

## Usage

```ts
import { createApp } from 'vue'
import DateFormatPlugin from 'date-format-plugin'

const app = createApp(App)
app.use(DateFormatPlugin, {
  langKey: 'fa', // default language key
  default: {
    format: (dateParts) => `${dateParts.month}/${dateParts.year}`
  },
  en: {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    formatMatcher: 'basic',
    format: (dateParts) => {
      return `${dateParts.year}-${dateParts.month}-${dateParts.day} ${dateParts.hour}:${dateParts.minute} ${dateParts.day}`
    }
  },
  fa: {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    formatMatcher: 'basic',
    format: (dateParts) => {
      return `${dateParts.month}/${dateParts.year}${dateParts.day}`
    }
  }
})
```

In your Vue template:
```vue
<template>
  <!-- Using directive with custom format -->
  <span
    v-format-date="{
      date: '2024-12-22T05:30:00.000Z',
      options: {
        format: (dateParts) => {
          return `${dateParts.year}-${dateParts.month}-${dateParts.day} ${dateParts.hour}:${dateParts.minute}`
        }
      }
    }"
  ></span>

  <!-- Using global method -->
  <div>{{ $dateFormat(new Date()) }}</div>
</template>
```

## Features

- Easy date formatting in Vue templates
- Multiple locale support
- Customizable date formats
- Lightweight and performant
- TypeScript support

## Configuration

The plugin accepts configuration options for different languages and formats:

```ts
interface DateFormatOptions {
  langKey: string;              // Default language key (e.g., 'en' or 'fa')
  default?: {
    format: (dateParts: DateParts) => string;
  };
  [key: string]: {             // Language-specific options
    year: 'numeric';
    month: 'numeric';
    day: 'numeric';
    hour: '2-digit';
    minute: '2-digit';
    hour12: boolean;
    formatMatcher: 'basic';
    format: (dateParts: DateParts) => string;
  };
}

interface DateParts {
  year: string;
  month: string;
  day: string;
  hour: string;
  minute: string;
}
```

Example configuration:
```ts
app.use(DateFormatPlugin, {
  langKey: "fa",
  default: {
    format: (dateParts) => `${dateParts.month}/${dateParts.year}`
  },
  en: {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    formatMatcher: "basic",
    format: (dateParts) => `${dateParts.year}-${dateParts.month}-${dateParts.day} ${dateParts.hour}:${dateParts.minute}`
  }
})
```

## Authors

- [@mahdimohamadzadeh](https://github.com/mahdimohamadzadeh)

## 🔗 Links
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](www.linkedin.com/in/mahdi-mohamadzadeh)
[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/mahdi45858716)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT](LICENSE)
