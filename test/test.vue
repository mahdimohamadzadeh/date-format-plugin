<script setup lang="ts">
import { DatePartType } from '../src/main';

const testDate = new Date('2024-12-22T05:30:00.000Z');
const testString = '2024-12-22T05:30:00.000Z';

const customFormatFunc = (dateParts: DatePartType) => {
  return `${dateParts.year} 🔥 ${dateParts.month} 🔥 ${dateParts.day}`;
};
</script>

<template>
  <div class="showcase-root">
    <!-- Background ambient glows -->
    <div class="glow glow-1"></div>
    <div class="glow glow-2"></div>
    <div class="glow glow-3"></div>

    <div class="showcase-wrapper">
      <!-- HERO -->
      <header class="hero">
        <div class="badge-row">
          <span class="badge badge-vue">Vue 3</span>
          <span class="badge badge-ts">TypeScript</span>
          <span class="badge badge-npm">npm</span>
        </div>
        <h1 class="hero-title">
          <span class="gradient-text">date-format-plugin</span>
        </h1>
        <p class="hero-sub">
          The flexible, SSR-safe Vue date formatting plugin with full TypeScript support.<br />
          Works with Directives, Composition API &amp; Options API.
        </p>
        <div class="install-box">
          <span class="install-dollar">$</span>
          <span class="install-cmd">npm install date-format-plugin</span>
        </div>
      </header>

      <!-- FEATURE PILLS -->
      <div class="feature-pills">
        <div class="pill">🌍 Multi-locale</div>
        <div class="pill">🕐 Timezone aware</div>
        <div class="pill">🔒 SSR Safe</div>
        <div class="pill">🎯 Fallback chain</div>
        <div class="pill">💡 Composable</div>
        <div class="pill">📝 Directive</div>
      </div>

      <!-- CARDS GRID -->
      <div class="cards-grid">

        <!-- Card 1: Directive -->
        <div class="card card-directive">
          <div class="card-header">
            <span class="card-icon">⚡</span>
            <div>
              <h3 class="card-title">v-format-date Directive</h3>
              <p class="card-desc">Zero-boilerplate template formatting</p>
            </div>
          </div>
          <div class="demo-rows">
            <div class="demo-row">
              <span class="demo-label">String input</span>
              <span class="demo-value" v-format-date="testString"></span>
            </div>
            <div class="demo-row">
              <span class="demo-label">Date object</span>
              <span class="demo-value" v-format-date="testDate"></span>
            </div>
            <div class="demo-row">
              <span class="demo-label">Named format (fa)</span>
              <span class="demo-value" v-format-date="{ date: testString, formatName: 'fa' }"></span>
            </div>
          </div>
          <div class="code-snippet">
            <span class="ct">&lt;span</span>
            <span class="ca"> v-format-date</span>
            <span class="co">=</span>
            <span class="cs">"myDate"</span>
            <span class="ct">&gt;&lt;/span&gt;</span>
          </div>
        </div>

        <!-- Card 2: Composition API -->
        <div class="card card-composable">
          <div class="card-header">
            <span class="card-icon">🔧</span>
            <div>
              <h3 class="card-title">Composition API</h3>
              <p class="card-desc">useDateFormat() composable</p>
            </div>
          </div>
          <div class="composable-code">
            <div class="cl"><span class="ck">import</span> <span class="cb">{</span> useDateFormat <span class="cb">}</span> <span class="ck">from</span> <span class="cs">'date-format-plugin'</span></div>
            <div class="cl cl-blank"></div>
            <div class="cl"><span class="ck">const</span> <span class="cb">{</span> format <span class="cb">}</span> = <span class="cf">useDateFormat</span>()</div>
            <div class="cl"><span class="ck">const</span> result = <span class="cf">format</span>(myDate, {</div>
            <div class="cl cl-indent"><span class="ca">locale</span>: <span class="cs">'fa-IR'</span>,</div>
            <div class="cl cl-indent"><span class="ca">timeZone</span>: <span class="cs">'Asia/Tehran'</span></div>
            <div class="cl">})</div>
          </div>
        </div>

        <!-- Card 3: Multi-locale -->
        <div class="card card-locales">
          <div class="card-header">
            <span class="card-icon">🌐</span>
            <div>
              <h3 class="card-title">Multi-locale Output</h3>
              <p class="card-desc">Same date, different cultures</p>
            </div>
          </div>
          <div class="locale-list">
            <div class="locale-row">
              <span class="locale-flag">🇺🇸</span>
              <span class="locale-name">en-US / UTC</span>
              <span class="locale-out" v-format-date="{ date: testString, locale: 'en-US', timeZone: 'UTC', year: 'numeric', month: 'long', day: 'numeric' }"></span>
            </div>
            <div class="locale-row">
              <span class="locale-flag">🇮🇷</span>
              <span class="locale-name">fa-IR / Tehran</span>
              <span class="locale-out" v-format-date="{ date: testString, locale: 'fa-IR', timeZone: 'Asia/Tehran', year: 'numeric', month: 'long', day: 'numeric' }"></span>
            </div>
            <div class="locale-row">
              <span class="locale-flag">🇫🇷</span>
              <span class="locale-name">fr-FR / Paris</span>
              <span class="locale-out" v-format-date="{ date: testString, locale: 'fr-FR', timeZone: 'Europe/Paris', year: 'numeric', month: 'long', day: 'numeric' }"></span>
            </div>
            <div class="locale-row">
              <span class="locale-flag">🇯🇵</span>
              <span class="locale-name">ja-JP / Tokyo</span>
              <span class="locale-out" v-format-date="{ date: testString, locale: 'ja-JP', timeZone: 'Asia/Tokyo', year: 'numeric', month: 'long', day: 'numeric' }"></span>
            </div>
          </div>
        </div>

        <!-- Card 4: Custom format -->
        <div class="card card-custom">
          <div class="card-header">
            <span class="card-icon">✨</span>
            <div>
              <h3 class="card-title">Custom Format Functions</h3>
              <p class="card-desc">Full control over output</p>
            </div>
          </div>
          <div class="custom-demo">
            <div class="custom-item">
              <span class="custom-badge">inline</span>
              <span v-format-date="{ date: testString, format: (v: DatePartType) => `${v.year}-${v.month}-${v.day}` }"></span>
            </div>
            <div class="custom-item">
              <span class="custom-badge">referenced</span>
              <span v-format-date="{ date: testString, format: customFormatFunc }"></span>
            </div>
            <div class="custom-item">
              <span class="custom-badge">long form</span>
              <span v-format-date="{ date: testString, weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }"></span>
            </div>
          </div>
        </div>

        <!-- Card 5: Fallback chain -->
        <div class="card card-chain">
          <div class="card-header">
            <span class="card-icon">🔗</span>
            <div>
              <h3 class="card-title">Smart Fallback Chain</h3>
              <p class="card-desc">Priority-based resolution</p>
            </div>
          </div>
          <div class="chain-steps">
            <div class="chain-step">
              <span class="chain-num">1</span>
              <span class="chain-text">Local Override</span>
              <span class="chain-ex">locale, format, timeZone</span>
            </div>
            <div class="chain-arrow">↓</div>
            <div class="chain-step">
              <span class="chain-num">2</span>
              <span class="chain-text">Named Format</span>
              <span class="chain-ex">formatName: 'persian'</span>
            </div>
            <div class="chain-arrow">↓</div>
            <div class="chain-step">
              <span class="chain-num">3</span>
              <span class="chain-text">Global Defaults</span>
              <span class="chain-ex">app.use(plugin, options)</span>
            </div>
            <div class="chain-arrow">↓</div>
            <div class="chain-step">
              <span class="chain-num">4</span>
              <span class="chain-text">SSR-Safe Intl</span>
              <span class="chain-ex">en-US / UTC (default)</span>
            </div>
          </div>
        </div>

        <!-- Card 6: TypeScript -->
        <div class="card card-ts">
          <div class="card-header">
            <span class="card-icon">🛡️</span>
            <div>
              <h3 class="card-title">Full TypeScript</h3>
              <p class="card-desc">Strict types, zero any</p>
            </div>
          </div>
          <div class="ts-exports">
            <div class="ts-row"><span class="ts-type">interface</span> <span class="ts-name">PluginOptions</span></div>
            <div class="ts-row"><span class="ts-type">interface</span> <span class="ts-name">LocalFormatOptions</span></div>
            <div class="ts-row"><span class="ts-type">interface</span> <span class="ts-name">DatePartType</span></div>
            <div class="ts-row"><span class="ts-type">interface</span> <span class="ts-name">FormatContext</span></div>
            <div class="ts-row"><span class="ts-type">type</span> <span class="ts-name">DirectiveBindingValue</span></div>
          </div>
        </div>

      </div>

      <!-- FOOTER -->
      <footer class="showcase-footer">
        <span>Made with ❤️ by <strong>@mahdimohamadzadeh</strong></span>
        <span class="footer-sep">·</span>
        <span>github.com/mahdimohamadzadeh</span>
        <span class="footer-sep">·</span>
        <span>MIT License</span>
      </footer>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Fira+Code:wght@400;500&display=swap');

/* ROOT */
.showcase-root {
  min-height: 100vh;
  background: #060b18;
  font-family: 'Inter', sans-serif;
  position: relative;
  overflow: hidden;
  padding: 48px 24px 64px;
  box-sizing: border-box;
}

/* AMBIENT GLOWS */
.glow {
  position: fixed;
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.35;
  pointer-events: none;
  z-index: 0;
}
.glow-1 { width: 600px; height: 600px; background: radial-gradient(circle, #4f46e5, transparent 70%); top: -200px; left: -200px; }
.glow-2 { width: 500px; height: 500px; background: radial-gradient(circle, #06b6d4, transparent 70%); bottom: -150px; right: -150px; }
.glow-3 { width: 400px; height: 400px; background: radial-gradient(circle, #8b5cf6, transparent 70%); top: 40%; left: 50%; transform: translateX(-50%); }

/* WRAPPER */
.showcase-wrapper {
  max-width: 1100px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

/* HERO */
.hero { text-align: center; margin-bottom: 40px; }
.badge-row { display: flex; justify-content: center; gap: 10px; margin-bottom: 20px; }
.badge { font-size: 11px; font-weight: 600; padding: 4px 12px; border-radius: 999px; letter-spacing: 0.05em; text-transform: uppercase; }
.badge-vue  { background: rgba(66,184,131,0.15); color: #42b883; border: 1px solid rgba(66,184,131,0.3); }
.badge-ts   { background: rgba(59,130,246,0.15);  color: #60a5fa; border: 1px solid rgba(59,130,246,0.3); }
.badge-npm  { background: rgba(239,68,68,0.15);   color: #f87171; border: 1px solid rgba(239,68,68,0.3); }

.hero-title { font-size: clamp(36px, 6vw, 62px); font-weight: 800; margin: 0 0 16px; letter-spacing: -0.03em; line-height: 1.1; }
.gradient-text {
  background: linear-gradient(135deg, #a78bfa 0%, #60a5fa 40%, #34d399 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.hero-sub { font-size: 16px; color: #94a3b8; line-height: 1.7; margin: 0 auto 28px; max-width: 620px; }
.install-box { display: inline-flex; align-items: center; gap: 10px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 12px 24px; font-family: 'Fira Code', monospace; font-size: 15px; }
.install-dollar { color: #4ade80; }
.install-cmd    { color: #e2e8f0; }

/* PILLS */
.feature-pills { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; margin-bottom: 48px; }
.pill { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 999px; padding: 8px 18px; font-size: 13px; font-weight: 500; color: #cbd5e1; transition: all 0.2s ease; }
.pill:hover { background: rgba(99,102,241,0.15); border-color: rgba(99,102,241,0.4); color: #a78bfa; transform: translateY(-2px); }

/* GRID */
.cards-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 48px; }

/* CARD BASE */
.card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 20px; padding: 24px; backdrop-filter: blur(12px); transition: transform 0.25s ease, box-shadow 0.25s ease; }
.card:hover { transform: translateY(-4px); box-shadow: 0 20px 60px rgba(0,0,0,0.4); }
.card-header { display: flex; align-items: flex-start; gap: 14px; margin-bottom: 20px; }
.card-icon { font-size: 26px; line-height: 1; flex-shrink: 0; }
.card-title { font-size: 15px; font-weight: 700; color: #f1f5f9; margin: 0 0 4px; }
.card-desc { font-size: 12px; color: #64748b; margin: 0; }

.card-directive  { border-top: 2px solid #6366f1; }
.card-composable { border-top: 2px solid #06b6d4; }
.card-locales    { border-top: 2px solid #10b981; }
.card-custom     { border-top: 2px solid #f59e0b; }
.card-chain      { border-top: 2px solid #8b5cf6; }
.card-ts         { border-top: 2px solid #3b82f6; }

/* DIRECTIVE CARD */
.demo-rows { display: flex; flex-direction: column; gap: 10px; margin-bottom: 16px; }
.demo-row { display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.03); border-radius: 8px; padding: 8px 12px; gap: 8px; }
.demo-label { font-size: 11px; color: #64748b; flex-shrink: 0; }
.demo-value { font-size: 13px; color: #a5b4fc; font-family: 'Fira Code', monospace; text-align: right; }
.code-snippet { background: rgba(0,0,0,0.3); border-radius: 8px; padding: 10px 14px; font-family: 'Fira Code', monospace; font-size: 12px; line-height: 1.6; }
.ct { color: #f87171; }
.ca { color: #a78bfa; }
.co { color: #94a3b8; }
.cs { color: #4ade80; }

/* COMPOSABLE CARD */
.composable-code { background: rgba(0,0,0,0.3); border-radius: 10px; padding: 14px 16px; font-family: 'Fira Code', monospace; font-size: 12px; line-height: 1.75; }
.cl { color: #e2e8f0; }
.cl-blank { height: 8px; }
.cl-indent { padding-left: 16px; }
.ck { color: #c084fc; }
.cb { color: #fbbf24; }
.cf { color: #60a5fa; }

/* LOCALE CARD */
.locale-list { display: flex; flex-direction: column; gap: 10px; }
.locale-row { display: flex; align-items: center; gap: 10px; background: rgba(255,255,255,0.03); border-radius: 8px; padding: 8px 12px; }
.locale-flag { font-size: 18px; }
.locale-name { font-size: 11px; color: #64748b; min-width: 110px; }
.locale-out { font-size: 12px; color: #34d399; font-family: 'Fira Code', monospace; margin-left: auto; text-align: right; }

/* CUSTOM CARD */
.custom-demo { display: flex; flex-direction: column; gap: 12px; }
.custom-item { display: flex; align-items: center; gap: 10px; background: rgba(255,255,255,0.03); border-radius: 8px; padding: 10px 12px; }
.custom-badge { font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; background: rgba(245,158,11,0.15); color: #fbbf24; border: 1px solid rgba(245,158,11,0.25); border-radius: 6px; padding: 2px 8px; flex-shrink: 0; }
.custom-item > span:last-child { font-size: 12px; color: #fcd34d; font-family: 'Fira Code', monospace; }

/* CHAIN CARD */
.chain-steps { display: flex; flex-direction: column; gap: 4px; }
.chain-step { display: flex; align-items: center; gap: 10px; background: rgba(255,255,255,0.03); border-radius: 8px; padding: 8px 12px; }
.chain-num { width: 22px; height: 22px; border-radius: 50%; background: linear-gradient(135deg, #8b5cf6, #6366f1); color: #fff; font-size: 11px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.chain-text { font-size: 13px; font-weight: 600; color: #e2e8f0; }
.chain-ex { font-size: 11px; color: #64748b; margin-left: auto; font-family: 'Fira Code', monospace; }
.chain-arrow { font-size: 16px; color: #334155; text-align: center; }

/* TS CARD */
.ts-exports { display: flex; flex-direction: column; gap: 8px; }
.ts-row { display: flex; align-items: center; gap: 10px; background: rgba(255,255,255,0.03); border-radius: 8px; padding: 8px 12px; }
.ts-type { font-family: 'Fira Code', monospace; font-size: 12px; color: #c084fc; }
.ts-name { font-family: 'Fira Code', monospace; font-size: 13px; color: #60a5fa; font-weight: 500; }

/* FOOTER */
.showcase-footer { text-align: center; font-size: 13px; color: #475569; display: flex; justify-content: center; align-items: center; gap: 12px; flex-wrap: wrap; }
.showcase-footer strong { color: #94a3b8; }
.footer-sep { color: #1e293b; }
</style>
