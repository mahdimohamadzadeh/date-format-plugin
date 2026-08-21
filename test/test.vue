<script setup lang="ts">
import { DatePartType } from '../src/main';

const testDate = new Date('2024-12-22T05:30:00.000Z');
const testTimestamp = testDate.getTime();
const testString = '2024-12-22T05:30:00.000Z';

const customFormatFunc = (dateParts: DatePartType) => {
  return `${dateParts.year} 🔥 ${dateParts.month} 🔥 ${dateParts.day}`;
};
</script>

<template>
  <div style="font-family: sans-serif; padding: 20px; display: flex; flex-direction: column; gap: 15px;">
    <h2>Vue Date Format Plugin - Usage Scenarios</h2>

    <section>
      <h3>1. Basic Types (String, Number, Date)</h3>
      <p><strong>String:</strong> <span v-format-date="testString"></span></p>
      <p><strong>Number (Timestamp):</strong> <span v-format-date="testTimestamp"></span></p>
      <p><strong>Date Object:</strong> <span v-format-date="testDate"></span></p>
    </section>

    <section>
      <h3>2. Object Formats</h3>
      <p><strong>Basic Object:</strong> <span v-format-date="{ date: testString }"></span></p>
      
      <p><strong>Using a Named Format ('en'):</strong> 
        <span v-format-date="{ date: testString, formatName: 'en' }"></span>
      </p>
      
      <p><strong>Using a Named Format ('fa'):</strong> 
        <span v-format-date="{ date: testString, formatName: 'fa' }"></span>
      </p>
    </section>

    <section>
      <h3>3. Overriding Locales & TimeZones</h3>
      <p><strong>French Locale, Paris TimeZone:</strong> 
        <span v-format-date="{ 
          date: testString, 
          locale: 'fr-FR', 
          timeZone: 'Europe/Paris',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }"></span>
      </p>
    </section>

    <section>
      <h3>4. Custom Format Functions</h3>
      <p><strong>Inline Format Function:</strong> 
        <span v-format-date="{
          date: testString,
          format: (value: DatePartType) => `${value.year}-${value.month}-${value.day}`
        }"></span>
      </p>
      
      <p><strong>Referenced Format Function:</strong> 
        <span v-format-date="{
          date: testString,
          format: customFormatFunc
        }"></span>
      </p>
    </section>
    
    <section>
      <h3>5. Standard Intl.DateTimeFormatOptions</h3>
      <p><strong>Weekday and Month Names:</strong> 
        <span v-format-date="{
          date: testString,
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }"></span>
      </p>
    </section>
  </div>
</template>
