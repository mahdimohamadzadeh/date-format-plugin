
# Mobile table Pagination

mobile-table-pagination is a Vue 3 component designed for creating mobile-friendly, card-based data tables with integrated pagination. Built with TypeScript and Quasar Framework, it offers a seamless way to display dynamic datasets with responsive layouts. This component supports custom column templates, event-driven data updates, and flexible configurations, making it perfect for applications targeting both mobile.


## Authors

- [@mahdimohamadzadeh](https://github.com/mahdimohamadzadeh)


## Installation

Install my-project with npm

```bash
# Using npm
    npm install mobile-table-pagination

# Using yarn
    yarn add mobile-table-pagination
```

## Usage/Examples

```javascript
import mobile-table-pagination from "mobile-table-pagination";
```
create a card-list.constants.ts put your COLUMNS on that
```javascript
export const CARD_COLUMNS: any[] = [
  {
    name: "",
    label: "",
    field: "header",
    class: "tw-col-span-12",
  },
  {
    name: "username",
    label: "Username",
    field: "username",
    class: "tw-col-span-6 tw-my-6",
  },
  {
    name: "status",
    label: "status",
    field: "status",
    class: "tw-col-span-6",
  },
  {
    name: "email",
    label: "email",
    field: "email",
    class: "tw-col-span-12",
  },
  {
    name: "actions",
    label: "",
    field: "actions",
    class: "",
  },
]
```
and use slot like this
``` javascript
<!-- Username Slot -->
<mobile-table-pagination
    ref="mobileTableRef"
    :countOfCardsInPage="countOfRowsInPage"
    :change-data="fetchCardList"
    :columns="CARD_COLUMNS"
  >
    <template #column-username="{ row, column }">
        <div class="">
          <span class="tw-text-xs tw-font-400 tw-dark-200">
          {{ column.field }} : </span>{{ row.username || 'No Username' }}
        </div>
    </template>
</mobile-table-pagination>
```
