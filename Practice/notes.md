# INT222 — Complete Node.js & Express.js Notes

---

# UNIT I — Getting Started with Node.JS & Handling Data I/O

---

## 1. INTRODUCING NODE.JS

<pre><div class="not-prose my-0 flex w-full flex-col overflow-clip border border-border text-text-primary rounded-lg not-prose relative" data-code-block="true"><div class="border-border flex items-center justify-between border-b px-4 py-2"><div class="flex items-center gap-2"><svg width="14" stroke-width="1.5" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="text-text-secondary"><path d="M9.00001 21L8.00001 21C6.89544 21 6.00001 20.1057 6.00001 19.0011C6.00001 17.4501 6.00001 15.3443 6 14C6 13 4.5 12 4.5 12C4.5 12 6.00001 11 6.00001 10C6.00001 8.827 6.00001 6.62207 6.00001 4.99914C6.00001 3.89457 6.89544 3 8.00001 3L9.00001 3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 21L16 21C17.1046 21 18 20.1057 18 19.0011C18 17.4501 18 15.3443 18 14C18 13 19.5 12 19.5 12C19.5 12 18 11 18 10C18 8.827 18 6.62207 18 4.99914C18 3.89457 17.1046 3 16 3L15 3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg><span class="text-text-secondary text-sm font-medium">text</span></div><button class="inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ring-offset-2 focus-visible:ring-offset-surface-primary disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 text-sm text-interactive-active hover:text-interactive-normal active:text-text-tertiary font-normal relative rounded-lg p-[6px]" type="button" data-state="closed" data-slot="tooltip-trigger"><svg width="16" height="16" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="text-interactive-positive absolute inset-0 m-auto rotate-90 opacity-0 transition-all duration-300"><path d="M5 13L9 17L19 7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg><svg width="16" height="16" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="absolute inset-0 m-auto opacity-100 transition-opacity duration-300"><path d="M19.4 20H9.6C9.26863 20 9 19.7314 9 19.4V9.6C9 9.26863 9.26863 9 9.6 9H19.4C19.7314 9 20 9.26863 20 9.6V19.4C20 19.7314 19.7314 20 19.4 20Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 9V4.6C15 4.26863 14.7314 4 14.4 4H4.6C4.26863 4 4 4.26863 4 4.6V14.4C4 14.7314 4.26863 15 4.6 15H9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg></button></div><div class="code-block_container__lbMX4"><pre class="shiki github-dark shiki-code-block" tabindex="0"><code class="whitespace-pre-wrap break-words"><span class="line"><span>WHAT IS NODE.JS?</span></span>
<span class="line"><span>Node.js is a RUNTIME ENVIRONMENT that allows you to run</span></span>
<span class="line"><span>JavaScript code OUTSIDE the web browser.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>• It is NOT a programming language</span></span>
<span class="line"><span>• It is NOT a framework</span></span>
<span class="line"><span>• It IS a runtime built on Chrome's V8 JavaScript engine</span></span>
<span class="line"><span>• Created by Ryan Dahl in 2009</span></span>
<span class="line"><span></span></span>
<span class="line"><span>KEY FEATURES:</span></span>
<span class="line"><span>1. Single-Threaded    — Uses one main thread with Event Loop</span></span>
<span class="line"><span>2. Event-Driven       — Everything works on events</span></span>
<span class="line"><span>3. Non-Blocking I/O   — Doesn't wait for operations to finish</span></span>
<span class="line"><span>4. V8 Engine          — Compiles JS to machine code (very fast)</span></span>
<span class="line"><span>5. NPM                — 2+ million open-source packages</span></span>
<span class="line"><span>6. Cross-Platform     — Windows, Linux, macOS</span></span>
<span class="line"><span></span></span>
<span class="line"><span>WHERE USED:</span></span>
<span class="line"><span>✅ Web servers & REST APIs</span></span>
<span class="line"><span>✅ Real-time apps (Chat, Gaming)</span></span>
<span class="line"><span>✅ Streaming apps (Netflix)</span></span>
<span class="line"><span>✅ Microservices</span></span>
<span class="line"><span>✅ Command-line tools</span></span>
<span class="line"><span></span></span>
<span class="line"><span>WHERE NOT TO USE:</span></span>
<span class="line"><span>❌ CPU-intensive tasks (heavy calculations)</span></span>
<span class="line"><span>   Because single-threaded — blocks the thread</span></span>
<span class="line"><span></span></span>
<span class="line"><span>BLOCKING vs NON-BLOCKING:</span></span>
<span class="line"><span>Blocking (Synchronous):</span></span>
<span class="line"><span>  Waiter takes order → goes to kitchen → WAITS → serves → next order</span></span>
<span class="line"><span>  Very slow!</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Non-Blocking (Asynchronous — How Node.js works):</span></span>
<span class="line"><span>  Waiter takes order → gives to kitchen → IMMEDIATELY next customer</span></span>
<span class="line"><span>  When food ready → kitchen rings bell → waiter serves</span></span>
<span class="line"><span>  Very fast!</span></span></code></pre></div></div></pre>

---

## 2. INSTALLING NODE.JS

<pre><div class="not-prose my-0 flex w-full flex-col overflow-clip border border-border text-text-primary rounded-lg not-prose relative" data-code-block="true"><div class="border-border flex items-center justify-between border-b px-4 py-2"><div class="flex items-center gap-2"><svg width="14" stroke-width="1.5" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="text-text-secondary"><path d="M9.00001 21L8.00001 21C6.89544 21 6.00001 20.1057 6.00001 19.0011C6.00001 17.4501 6.00001 15.3443 6 14C6 13 4.5 12 4.5 12C4.5 12 6.00001 11 6.00001 10C6.00001 8.827 6.00001 6.62207 6.00001 4.99914C6.00001 3.89457 6.89544 3 8.00001 3L9.00001 3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 21L16 21C17.1046 21 18 20.1057 18 19.0011C18 17.4501 18 15.3443 18 14C18 13 19.5 12 19.5 12C19.5 12 18 11 18 10C18 8.827 18 6.62207 18 4.99914C18 3.89457 17.1046 3 16 3L15 3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg><span class="text-text-secondary text-sm font-medium">text</span></div><button class="inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ring-offset-2 focus-visible:ring-offset-surface-primary disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 text-sm text-interactive-active hover:text-interactive-normal active:text-text-tertiary font-normal relative rounded-lg p-[6px]" type="button" data-state="closed" data-slot="tooltip-trigger"><svg width="16" height="16" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="text-interactive-positive absolute inset-0 m-auto rotate-90 opacity-0 transition-all duration-300"><path d="M5 13L9 17L19 7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg><svg width="16" height="16" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="absolute inset-0 m-auto opacity-100 transition-opacity duration-300"><path d="M19.4 20H9.6C9.26863 20 9 19.7314 9 19.4V9.6C9 9.26863 9.26863 9 9.6 9H19.4C19.7314 9 20 9.26863 20 9.6V19.4C20 19.7314 19.7314 20 19.4 20Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 9V4.6C15 4.26863 14.7314 4 14.4 4H4.6C4.26863 4 4 4.26863 4 4.6V14.4C4 14.7314 4.26863 15 4.6 15H9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg></button></div><div class="code-block_container__lbMX4"><pre class="shiki github-dark shiki-code-block" tabindex="0"><code class="whitespace-pre-wrap break-words"><span class="line"><span>Step 1: Go to https://nodejs.org</span></span>
<span class="line"><span>Step 2: Download LTS version (Long Term Support)</span></span>
<span class="line"><span>Step 3: Run installer</span></span>
<span class="line"><span>Step 4: Verify in terminal:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  $ node --version    → v20.10.0</span></span>
<span class="line"><span>  $ npm --version     → 10.2.3</span></span>
<span class="line"><span></span></span>
<span class="line"><span>WHAT GETS INSTALLED:</span></span>
<span class="line"><span>  1. node  → Node.js runtime (runs JS files)</span></span>
<span class="line"><span>  2. npm   → Node Package Manager</span></span>
<span class="line"><span>  3. npx   → Node Package Execute</span></span>
<span class="line"><span></span></span>
<span class="line"><span>RUNNING A FILE:</span></span>
<span class="line"><span>  Create app.js → console.log("Hello!");</span></span>
<span class="line"><span>  Run: $ node app.js</span></span></code></pre></div></div></pre>

---

## 3. NODE.JS REPL

<pre><div class="not-prose my-0 flex w-full flex-col overflow-clip border border-border text-text-primary rounded-lg not-prose relative" data-code-block="true"><div class="border-border flex items-center justify-between border-b px-4 py-2"><div class="flex items-center gap-2"><svg width="14" stroke-width="1.5" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="text-text-secondary"><path d="M9.00001 21L8.00001 21C6.89544 21 6.00001 20.1057 6.00001 19.0011C6.00001 17.4501 6.00001 15.3443 6 14C6 13 4.5 12 4.5 12C4.5 12 6.00001 11 6.00001 10C6.00001 8.827 6.00001 6.62207 6.00001 4.99914C6.00001 3.89457 6.89544 3 8.00001 3L9.00001 3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 21L16 21C17.1046 21 18 20.1057 18 19.0011C18 17.4501 18 15.3443 18 14C18 13 19.5 12 19.5 12C19.5 12 18 11 18 10C18 8.827 18 6.62207 18 4.99914C18 3.89457 17.1046 3 16 3L15 3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg><span class="text-text-secondary text-sm font-medium">JavaScript</span></div><button class="inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ring-offset-2 focus-visible:ring-offset-surface-primary disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 text-sm text-interactive-active hover:text-interactive-normal active:text-text-tertiary font-normal relative rounded-lg p-[6px]" type="button" data-state="closed" data-slot="tooltip-trigger"><svg width="16" height="16" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="text-interactive-positive absolute inset-0 m-auto rotate-90 opacity-0 transition-all duration-300"><path d="M5 13L9 17L19 7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg><svg width="16" height="16" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="absolute inset-0 m-auto opacity-100 transition-opacity duration-300"><path d="M19.4 20H9.6C9.26863 20 9 19.7314 9 19.4V9.6C9 9.26863 9.26863 9 9.6 9H19.4C19.7314 9 20 9.26863 20 9.6V19.4C20 19.7314 19.7314 20 19.4 20Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 9V4.6C15 4.26863 14.7314 4 14.4 4H4.6C4.26863 4 4 4.26863 4 4.6V14.4C4 14.7314 4.26863 15 4.6 15H9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg></button></div><div class="code-block_container__lbMX4"><pre class="shiki github-dark shiki-code-block" tabindex="0"><code class="whitespace-pre-wrap break-words"><span class="line"><span>// REPL = Read Evaluate Print Loop</span></span>
<span class="line"><span>// Interactive JavaScript shell</span></span>
<span class="line"><span>// Start: type 'node' in terminal (without filename)</span></span>
<span class="line"><span>// Exit: .exit OR Ctrl+C twice</span></span>
<span class="line"></span>
<span class="line"><span>// EXAMPLES:</span></span>
<span class="line"><span>></span><span> 2</span><span> +</span><span> 3</span></span>
<span class="line"><span>5</span></span>
<span class="line"></span>
<span class="line"><span>></span><span> "Hello"</span><span> +</span><span> " World"</span></span>
<span class="line"><span>'Hello World'</span></span>
<span class="line"></span>
<span class="line"><span>></span><span> let</span><span> x </span><span>=</span><span> 10</span></span>
<span class="line"><span>undefined</span></span>
<span class="line"></span>
<span class="line"><span>></span><span> x </span><span>*</span><span> 5</span></span>
<span class="line"><span>50</span></span>
<span class="line"></span>
<span class="line"><span>></span><span> Math.</span><span>max</span><span>(</span><span>5</span><span>, </span><span>10</span><span>, </span><span>15</span><span>)</span></span>
<span class="line"><span>15</span></span>
<span class="line"></span>
<span class="line"><span>></span><span> [</span><span>1</span><span>,</span><span>2</span><span>,</span><span>3</span><span>].</span><span>map</span><span>(</span><span>n</span><span> =></span><span> n </span><span>*</span><span> 2</span><span>)</span></span>
<span class="line"><span>[</span><span>2</span><span>, </span><span>4</span><span>, </span><span>6</span><span>]</span></span>
<span class="line"></span>
<span class="line"><span>// UNDERSCORE (_) — holds LAST result</span></span>
<span class="line"><span>></span><span> 5</span><span> +</span><span> 5</span></span>
<span class="line"><span>10</span></span>
<span class="line"><span>></span><span> _ </span><span>+</span><span> 20</span></span>
<span class="line"><span>30</span><span>    // _ was 10</span></span>
<span class="line"></span>
<span class="line"><span>// MULTILINE:</span></span>
<span class="line"><span>></span><span> function</span><span> add</span><span>(</span><span>a</span><span>, </span><span>b</span><span>) {</span></span>
<span class="line"><span>...</span><span>   return</span><span> a </span><span>+</span><span> b;</span></span>
<span class="line"><span>...</span><span> }</span></span>
<span class="line"><span>></span><span> add</span><span>(</span><span>3</span><span>, </span><span>4</span><span>)</span></span>
<span class="line"><span>7</span></span>
<span class="line"></span>
<span class="line"><span>// SPECIAL COMMANDS:</span></span>
<span class="line"><span>// .help   → Show commands</span></span>
<span class="line"><span>// .exit   → Exit REPL</span></span>
<span class="line"><span>// .break  → Exit multiline</span></span>
<span class="line"><span>// .clear  → Reset context</span></span>
<span class="line"><span>// .save filename → Save session</span></span>
<span class="line"><span>// .load filename → Load file</span></span></code></pre></div></div></pre>

---

## 4. NODE PACKAGE MANAGER (NPM)

<pre><div class="not-prose my-0 flex w-full flex-col overflow-clip border border-border text-text-primary rounded-lg not-prose relative" data-code-block="true"><div class="border-border flex items-center justify-between border-b px-4 py-2"><div class="flex items-center gap-2"><svg width="14" stroke-width="1.5" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="text-text-secondary"><path d="M9.00001 21L8.00001 21C6.89544 21 6.00001 20.1057 6.00001 19.0011C6.00001 17.4501 6.00001 15.3443 6 14C6 13 4.5 12 4.5 12C4.5 12 6.00001 11 6.00001 10C6.00001 8.827 6.00001 6.62207 6.00001 4.99914C6.00001 3.89457 6.89544 3 8.00001 3L9.00001 3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 21L16 21C17.1046 21 18 20.1057 18 19.0011C18 17.4501 18 15.3443 18 14C18 13 19.5 12 19.5 12C19.5 12 18 11 18 10C18 8.827 18 6.62207 18 4.99914C18 3.89457 17.1046 3 16 3L15 3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg><span class="text-text-secondary text-sm font-medium">text</span></div><button class="inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ring-offset-2 focus-visible:ring-offset-surface-primary disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 text-sm text-interactive-active hover:text-interactive-normal active:text-text-tertiary font-normal relative rounded-lg p-[6px]" type="button" data-state="closed" data-slot="tooltip-trigger"><svg width="16" height="16" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="text-interactive-positive absolute inset-0 m-auto rotate-90 opacity-0 transition-all duration-300"><path d="M5 13L9 17L19 7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg><svg width="16" height="16" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="absolute inset-0 m-auto opacity-100 transition-opacity duration-300"><path d="M19.4 20H9.6C9.26863 20 9 19.7314 9 19.4V9.6C9 9.26863 9.26863 9 9.6 9H19.4C19.7314 9 20 9.26863 20 9.6V19.4C20 19.7314 19.7314 20 19.4 20Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 9V4.6C15 4.26863 14.7314 4 14.4 4H4.6C4.26863 4 4 4.26863 4 4.6V14.4C4 14.7314 4.26863 15 4.6 15H9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg></button></div><div class="code-block_container__lbMX4"><pre class="shiki github-dark shiki-code-block" tabindex="0"><code class="whitespace-pre-wrap break-words"><span class="line"><span>NPM = Node Package Manager</span></span>
<span class="line"><span>Comes pre-installed with Node.js</span></span>
<span class="line"><span></span></span>
<span class="line"><span>THREE THINGS:</span></span>
<span class="line"><span>  1. Website    → npmjs.com (search packages)</span></span>
<span class="line"><span>  2. Registry   → Database of 2+ million packages</span></span>
<span class="line"><span>  3. CLI Tool   → Command-line tool</span></span>
<span class="line"><span></span></span>
<span class="line"><span>ESSENTIAL COMMANDS:</span></span>
<span class="line"><span>  npm init              → Create package.json (asks questions)</span></span>
<span class="line"><span>  npm init -y           → Create with defaults (skip questions)</span></span>
<span class="line"><span>  npm install express   → Install package locally</span></span>
<span class="line"><span>  npm install -g nodemon → Install globally</span></span>
<span class="line"><span>  npm install           → Install all from package.json</span></span>
<span class="line"><span>  npm uninstall express → Remove package</span></span>
<span class="line"><span>  npm update            → Update all packages</span></span>
<span class="line"><span>  npm list              → List installed packages</span></span>
<span class="line"><span>  npm list --depth=0    → Top-level only</span></span>
<span class="line"><span>  npm start             → Run start script</span></span>
<span class="line"><span>  npm run dev           → Run custom script</span></span>
<span class="line"><span></span></span>
<span class="line"><span>SHORTHAND:</span></span>
<span class="line"><span>  npm i = npm install</span></span>
<span class="line"><span>  npm i -D = npm install --save-dev</span></span>
<span class="line"><span></span></span>
<span class="line"><span>LOCAL vs GLOBAL:</span></span>
<span class="line"><span>  Local:  npm install express → in ./node_modules/ (this project only)</span></span>
<span class="line"><span>  Global: npm install -g nodemon → system-wide (CLI tools)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>node_modules/</span></span>
<span class="line"><span>  → Contains all packages</span></span>
<span class="line"><span>  → Can be VERY large</span></span>
<span class="line"><span>  → NEVER commit to Git (.gitignore it)</span></span>
<span class="line"><span>  → Regenerate with: npm install</span></span></code></pre></div></div></pre>

---

## 5. npm init & package.json

<pre><div class="not-prose my-0 flex w-full flex-col overflow-clip border border-border text-text-primary rounded-lg not-prose relative" data-code-block="true"><div class="border-border flex items-center justify-between border-b px-4 py-2"><div class="flex items-center gap-2"><svg width="14" stroke-width="1.5" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="text-text-secondary"><path d="M9.00001 21L8.00001 21C6.89544 21 6.00001 20.1057 6.00001 19.0011C6.00001 17.4501 6.00001 15.3443 6 14C6 13 4.5 12 4.5 12C4.5 12 6.00001 11 6.00001 10C6.00001 8.827 6.00001 6.62207 6.00001 4.99914C6.00001 3.89457 6.89544 3 8.00001 3L9.00001 3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 21L16 21C17.1046 21 18 20.1057 18 19.0011C18 17.4501 18 15.3443 18 14C18 13 19.5 12 19.5 12C19.5 12 18 11 18 10C18 8.827 18 6.62207 18 4.99914C18 3.89457 17.1046 3 16 3L15 3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg><span class="text-text-secondary text-sm font-medium">JSON</span></div><button class="inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ring-offset-2 focus-visible:ring-offset-surface-primary disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 text-sm text-interactive-active hover:text-interactive-normal active:text-text-tertiary font-normal relative rounded-lg p-[6px]" type="button" data-state="closed" data-slot="tooltip-trigger"><svg width="16" height="16" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="text-interactive-positive absolute inset-0 m-auto rotate-90 opacity-0 transition-all duration-300"><path d="M5 13L9 17L19 7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg><svg width="16" height="16" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="absolute inset-0 m-auto opacity-100 transition-opacity duration-300"><path d="M19.4 20H9.6C9.26863 20 9 19.7314 9 19.4V9.6C9 9.26863 9.26863 9 9.6 9H19.4C19.7314 9 20 9.26863 20 9.6V19.4C20 19.7314 19.7314 20 19.4 20Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 9V4.6C15 4.26863 14.7314 4 14.4 4H4.6C4.26863 4 4 4.26863 4 4.6V14.4C4 14.7314 4.26863 15 4.6 15H9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg></button></div><div class="code-block_container__lbMX4"><pre class="shiki github-dark shiki-code-block" tabindex="0"><code class="whitespace-pre-wrap break-words"><span class="line"><span>// package.json — THE HEART OF EVERY NODE PROJECT</span></span>
<span class="line"><span>// Created by: npm init -y</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    "name"</span><span>: </span><span>"my-project"</span><span>,</span></span>
<span class="line"><span>    "version"</span><span>: </span><span>"1.0.0"</span><span>,</span></span>
<span class="line"><span>    "description"</span><span>: </span><span>"My Node.js project"</span><span>,</span></span>
<span class="line"><span>    "main"</span><span>: </span><span>"index.js"</span><span>,</span></span>
<span class="line"><span>    "type"</span><span>: </span><span>"module"</span><span>,</span></span>
<span class="line"><span>    "scripts"</span><span>: {</span></span>
<span class="line"><span>        "start"</span><span>: </span><span>"node index.js"</span><span>,</span></span>
<span class="line"><span>        "dev"</span><span>: </span><span>"nodemon index.js"</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    "dependencies"</span><span>: {</span></span>
<span class="line"><span>        "express"</span><span>: </span><span>"^4.18.2"</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    "devDependencies"</span><span>: {</span></span>
<span class="line"><span>        "nodemon"</span><span>: </span><span>"^3.0.1"</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div></div></pre>

<pre><div class="not-prose my-0 flex w-full flex-col overflow-clip border border-border text-text-primary rounded-lg not-prose relative" data-code-block="true"><div class="border-border flex items-center justify-between border-b px-4 py-2"><div class="flex items-center gap-2"><svg width="14" stroke-width="1.5" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="text-text-secondary"><path d="M9.00001 21L8.00001 21C6.89544 21 6.00001 20.1057 6.00001 19.0011C6.00001 17.4501 6.00001 15.3443 6 14C6 13 4.5 12 4.5 12C4.5 12 6.00001 11 6.00001 10C6.00001 8.827 6.00001 6.62207 6.00001 4.99914C6.00001 3.89457 6.89544 3 8.00001 3L9.00001 3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 21L16 21C17.1046 21 18 20.1057 18 19.0011C18 17.4501 18 15.3443 18 14C18 13 19.5 12 19.5 12C19.5 12 18 11 18 10C18 8.827 18 6.62207 18 4.99914C18 3.89457 17.1046 3 16 3L15 3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg><span class="text-text-secondary text-sm font-medium">text</span></div><button class="inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ring-offset-2 focus-visible:ring-offset-surface-primary disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 text-sm text-interactive-active hover:text-interactive-normal active:text-text-tertiary font-normal relative rounded-lg p-[6px]" type="button" data-state="closed" data-slot="tooltip-trigger"><svg width="16" height="16" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="text-interactive-positive absolute inset-0 m-auto rotate-90 opacity-0 transition-all duration-300"><path d="M5 13L9 17L19 7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg><svg width="16" height="16" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="absolute inset-0 m-auto opacity-100 transition-opacity duration-300"><path d="M19.4 20H9.6C9.26863 20 9 19.7314 9 19.4V9.6C9 9.26863 9.26863 9 9.6 9H19.4C19.7314 9 20 9.26863 20 9.6V19.4C20 19.7314 19.7314 20 19.4 20Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 9V4.6C15 4.26863 14.7314 4 14.4 4H4.6C4.26863 4 4 4.26863 4 4.6V14.4C4 14.7314 4.26863 15 4.6 15H9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg></button></div><div class="code-block_container__lbMX4"><pre class="shiki github-dark shiki-code-block" tabindex="0"><code class="whitespace-pre-wrap break-words"><span class="line"><span>KEY FIELDS:</span></span>
<span class="line"><span>"type": "module"   → CRITICAL! Enables import/export (ES Modules)</span></span>
<span class="line"><span>                     Without this, must use require() (CommonJS)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>"scripts"          → Custom commands</span></span>
<span class="line"><span>  "start" → npm start     "dev" → npm run dev</span></span>
<span class="line"><span></span></span>
<span class="line"><span>"dependencies"     → Needed in production (express, etc.)</span></span>
<span class="line"><span>"devDependencies"  → Needed only in development (nodemon, etc.)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>VERSION NUMBERS: ^4.18.2 (MAJOR.MINOR.PATCH)</span></span>
<span class="line"><span>  ^ (caret) → ^4.18.2 allows 4.x.x (minor+patch updates)</span></span>
<span class="line"><span>  ~ (tilde) → ~4.18.2 allows 4.18.x (patch updates only)</span></span>
<span class="line"><span>  exact     → 4.18.2 means exactly this version</span></span>
<span class="line"><span></span></span>
<span class="line"><span>package-lock.json</span></span>
<span class="line"><span>  → Auto-generated, locks exact versions</span></span>
<span class="line"><span>  → SHOULD be committed to Git</span></span></code></pre></div></div></pre>

---

## 6. NPM MODULES

### 6A. CORE MODULES (Built-in)

<pre><div class="not-prose my-0 flex w-full flex-col overflow-clip border border-border text-text-primary rounded-lg not-prose relative" data-code-block="true"><div class="border-border flex items-center justify-between border-b px-4 py-2"><div class="flex items-center gap-2"><svg width="14" stroke-width="1.5" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="text-text-secondary"><path d="M9.00001 21L8.00001 21C6.89544 21 6.00001 20.1057 6.00001 19.0011C6.00001 17.4501 6.00001 15.3443 6 14C6 13 4.5 12 4.5 12C4.5 12 6.00001 11 6.00001 10C6.00001 8.827 6.00001 6.62207 6.00001 4.99914C6.00001 3.89457 6.89544 3 8.00001 3L9.00001 3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 21L16 21C17.1046 21 18 20.1057 18 19.0011C18 17.4501 18 15.3443 18 14C18 13 19.5 12 19.5 12C19.5 12 18 11 18 10C18 8.827 18 6.62207 18 4.99914C18 3.89457 17.1046 3 16 3L15 3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg><span class="text-text-secondary text-sm font-medium">JavaScript</span></div><button class="inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ring-offset-2 focus-visible:ring-offset-surface-primary disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 text-sm text-interactive-active hover:text-interactive-normal active:text-text-tertiary font-normal relative rounded-lg p-[6px]" type="button" data-state="closed" data-slot="tooltip-trigger"><svg width="16" height="16" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="text-interactive-positive absolute inset-0 m-auto rotate-90 opacity-0 transition-all duration-300"><path d="M5 13L9 17L19 7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg><svg width="16" height="16" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="absolute inset-0 m-auto opacity-100 transition-opacity duration-300"><path d="M19.4 20H9.6C9.26863 20 9 19.7314 9 19.4V9.6C9 9.26863 9.26863 9 9.6 9H19.4C19.7314 9 20 9.26863 20 9.6V19.4C20 19.7314 19.7314 20 19.4 20Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 9V4.6C15 4.26863 14.7314 4 14.4 4H4.6C4.26863 4 4 4.26863 4 4.6V14.4C4 14.7314 4.26863 15 4.6 15H9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg></button></div><div class="code-block_container__lbMX4"><pre class="shiki github-dark shiki-code-block" tabindex="0"><code class="whitespace-pre-wrap break-words"><span class="line"><span>// Come pre-installed. No need to install.</span></span>
<span class="line"><span>// Just import them.</span></span>
<span class="line"><span>//</span></span>
<span class="line"><span>// IMPORTANT CORE MODULES:</span></span>
<span class="line"><span>// fs, http, path, os, events, stream, zlib, url, crypto, util</span></span>
<span class="line"></span>
<span class="line"><span>// ── os module ──</span></span>
<span class="line"><span>import</span><span> os </span><span>from</span><span> 'os'</span><span>;</span></span>
<span class="line"><span>console.</span><span>log</span><span>(</span><span>"Platform:"</span><span>, os.</span><span>platform</span><span>());    </span><span>// 'win32', 'linux', 'darwin'</span></span>
<span class="line"><span>console.</span><span>log</span><span>(</span><span>"Architecture:"</span><span>, os.</span><span>arch</span><span>());    </span><span>// 'x64'</span></span>
<span class="line"><span>console.</span><span>log</span><span>(</span><span>"CPUs:"</span><span>, os.</span><span>cpus</span><span>().</span><span>length</span><span>);     </span><span>// 8</span></span>
<span class="line"><span>console.</span><span>log</span><span>(</span><span>"Total Memory:"</span><span>, os.</span><span>totalmem</span><span>()); </span><span>// bytes</span></span>
<span class="line"><span>console.</span><span>log</span><span>(</span><span>"Free Memory:"</span><span>, os.</span><span>freemem</span><span>());  </span><span>// bytes</span></span>
<span class="line"><span>console.</span><span>log</span><span>(</span><span>"Home Dir:"</span><span>, os.</span><span>homedir</span><span>());     </span><span>// /home/user</span></span>
<span class="line"><span>console.</span><span>log</span><span>(</span><span>"Hostname:"</span><span>, os.</span><span>hostname</span><span>());    </span><span>// computer name</span></span>
<span class="line"></span>
<span class="line"><span>// ── path module ──</span></span>
<span class="line"><span>import</span><span> path </span><span>from</span><span> 'path'</span><span>;</span></span>
<span class="line"><span>import</span><span> { fileURLToPath } </span><span>from</span><span> 'url'</span><span>;</span></span>
<span class="line"></span>
<span class="line"><span>// __dirname workaround for ES Modules (IMPORTANT!)</span></span>
<span class="line"><span>const</span><span> __filename</span><span> =</span><span> fileURLToPath</span><span>(</span><span>import</span><span>.</span><span>meta</span><span>.url);</span></span>
<span class="line"><span>const</span><span> __dirname</span><span> =</span><span> path.</span><span>dirname</span><span>(__filename);</span></span>
<span class="line"></span>
<span class="line"><span>path.</span><span>join</span><span>(__dirname, </span><span>'data'</span><span>, </span><span>'file.txt'</span><span>);   </span><span>// Safe path joining</span></span>
<span class="line"><span>path.</span><span>resolve</span><span>(</span><span>'data'</span><span>, </span><span>'file.txt'</span><span>);           </span><span>// Absolute path</span></span>
<span class="line"><span>path.</span><span>basename</span><span>(</span><span>'/home/user/file.txt'</span><span>);       </span><span>// 'file.txt'</span></span>
<span class="line"><span>path.</span><span>extname</span><span>(</span><span>'index.html'</span><span>);                 </span><span>// '.html'</span></span>
<span class="line"><span>path.</span><span>dirname</span><span>(</span><span>'/home/user/file.txt'</span><span>);        </span><span>// '/home/user'</span></span>
<span class="line"><span>path.</span><span>parse</span><span>(</span><span>'/home/user/file.txt'</span><span>);</span></span>
<span class="line"><span>// { root:'/', dir:'/home/user', base:'file.txt', ext:'.txt', name:'file' }</span></span>
<span class="line"></span>
<span class="line"><span>// ── url module ──</span></span>
<span class="line"><span>const</span><span> myUrl</span><span> =</span><span> new</span><span> URL</span><span>(</span><span>'https://example.com:8080/page?name=Rahul#section'</span><span>);</span></span>
<span class="line"><span>myUrl.hostname;      </span><span>// 'example.com'</span></span>
<span class="line"><span>myUrl.port;          </span><span>// '8080'</span></span>
<span class="line"><span>myUrl.pathname;      </span><span>// '/page'</span></span>
<span class="line"><span>myUrl.search;        </span><span>// '?name=Rahul'</span></span>
<span class="line"><span>myUrl.hash;          </span><span>// '#section'</span></span>
<span class="line"><span>myUrl.searchParams.</span><span>get</span><span>(</span><span>'name'</span><span>);  </span><span>// 'Rahul'</span></span>
<span class="line"></span>
<span class="line"><span>// ── crypto module ──</span></span>
<span class="line"><span>import</span><span> crypto </span><span>from</span><span> 'crypto'</span><span>;</span></span>
<span class="line"><span>const</span><span> hash</span><span> =</span><span> crypto.</span><span>createHash</span><span>(</span><span>'sha256'</span><span>).</span><span>update</span><span>(</span><span>'password'</span><span>).</span><span>digest</span><span>(</span><span>'hex'</span><span>);</span></span>
<span class="line"><span>const</span><span> token</span><span> =</span><span> crypto.</span><span>randomBytes</span><span>(</span><span>32</span><span>).</span><span>toString</span><span>(</span><span>'hex'</span><span>);</span></span></code></pre></div></div></pre>

### 6B. LOCAL MODULES (Your Own)

<pre><div class="not-prose my-0 flex w-full flex-col overflow-clip border border-border text-text-primary rounded-lg not-prose relative" data-code-block="true"><div class="border-border flex items-center justify-between border-b px-4 py-2"><div class="flex items-center gap-2"><svg width="14" stroke-width="1.5" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="text-text-secondary"><path d="M9.00001 21L8.00001 21C6.89544 21 6.00001 20.1057 6.00001 19.0011C6.00001 17.4501 6.00001 15.3443 6 14C6 13 4.5 12 4.5 12C4.5 12 6.00001 11 6.00001 10C6.00001 8.827 6.00001 6.62207 6.00001 4.99914C6.00001 3.89457 6.89544 3 8.00001 3L9.00001 3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 21L16 21C17.1046 21 18 20.1057 18 19.0011C18 17.4501 18 15.3443 18 14C18 13 19.5 12 19.5 12C19.5 12 18 11 18 10C18 8.827 18 6.62207 18 4.99914C18 3.89457 17.1046 3 16 3L15 3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg><span class="text-text-secondary text-sm font-medium">JavaScript</span></div><button class="inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ring-offset-2 focus-visible:ring-offset-surface-primary disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 text-sm text-interactive-active hover:text-interactive-normal active:text-text-tertiary font-normal relative rounded-lg p-[6px]" type="button" data-state="closed" data-slot="tooltip-trigger"><svg width="16" height="16" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="text-interactive-positive absolute inset-0 m-auto rotate-90 opacity-0 transition-all duration-300"><path d="M5 13L9 17L19 7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg><svg width="16" height="16" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="absolute inset-0 m-auto opacity-100 transition-opacity duration-300"><path d="M19.4 20H9.6C9.26863 20 9 19.7314 9 19.4V9.6C9 9.26863 9.26863 9 9.6 9H19.4C19.7314 9 20 9.26863 20 9.6V19.4C20 19.7314 19.7314 20 19.4 20Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 9V4.6C15 4.26863 14.7314 4 14.4 4H4.6C4.26863 4 4 4.26863 4 4.6V14.4C4 14.7314 4.26863 15 4.6 15H9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg></button></div><div class="code-block_container__lbMX4"><pre class="shiki github-dark shiki-code-block" tabindex="0"><code class="whitespace-pre-wrap break-words"><span class="line"><span>// ── math.js (Your custom module) ──</span></span>
<span class="line"><span>// Named exports</span></span>
<span class="line"><span>export</span><span> const</span><span> add</span><span> =</span><span> (</span><span>a</span><span>, </span><span>b</span><span>) </span><span>=></span><span> a </span><span>+</span><span> b;</span></span>
<span class="line"><span>export</span><span> const</span><span> subtract</span><span> =</span><span> (</span><span>a</span><span>, </span><span>b</span><span>) </span><span>=></span><span> a </span><span>-</span><span> b;</span></span>
<span class="line"><span>export</span><span> const</span><span> multiply</span><span> =</span><span> (</span><span>a</span><span>, </span><span>b</span><span>) </span><span>=></span><span> a </span><span>*</span><span> b;</span></span>
<span class="line"></span>
<span class="line"><span>// ── User.js (Default export) ──</span></span>
<span class="line"><span>class</span><span> User</span><span> {</span></span>
<span class="line"><span>    constructor</span><span>(</span><span>name</span><span>, </span><span>email</span><span>) {</span></span>
<span class="line"><span>        this</span><span>.name </span><span>=</span><span> name;</span></span>
<span class="line"><span>        this</span><span>.email </span><span>=</span><span> email;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    greet</span><span>() {</span></span>
<span class="line"><span>        return</span><span> `Hello, I am ${</span><span>this</span><span>.</span><span>name</span><span>}`</span><span>;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>export</span><span> default</span><span> User;</span></span>
<span class="line"></span>
<span class="line"><span>// ── app.js (Import and use) ──</span></span>
<span class="line"><span>// Named imports (curly braces)</span></span>
<span class="line"><span>import</span><span> { add, subtract, multiply } </span><span>from</span><span> './math.js'</span><span>;</span></span>
<span class="line"><span>console.</span><span>log</span><span>(</span><span>add</span><span>(</span><span>5</span><span>, </span><span>3</span><span>));  </span><span>// 8</span></span>
<span class="line"></span>
<span class="line"><span>// Default import (no curly braces)</span></span>
<span class="line"><span>import</span><span> User </span><span>from</span><span> './User.js'</span><span>;</span></span>
<span class="line"><span>const</span><span> u</span><span> =</span><span> new</span><span> User</span><span>(</span><span>"Rahul"</span><span>, </span><span>"r@test.com"</span><span>);</span></span>
<span class="line"><span>console.</span><span>log</span><span>(u.</span><span>greet</span><span>());</span></span>
<span class="line"></span>
<span class="line"><span>// Import all as namespace</span></span>
<span class="line"><span>import</span><span> *</span><span> as</span><span> math </span><span>from</span><span> './math.js'</span><span>;</span></span>
<span class="line"><span>console.</span><span>log</span><span>(math.</span><span>add</span><span>(</span><span>2</span><span>, </span><span>3</span><span>));  </span><span>// 5</span></span>
<span class="line"></span>
<span class="line"><span>// ES Modules vs CommonJS:</span></span>
<span class="line"><span>// ES:     import x from 'x'    |  export default x</span></span>
<span class="line"><span>// CJS:    const x = require('x') | module.exports = x</span></span>
<span class="line"><span>// ES needs "type": "module" in package.json</span></span>
<span class="line"><span>// ES needs .js extension in imports</span></span></code></pre></div></div></pre>

### 6C. Third Party Modules

<pre><div class="not-prose my-0 flex w-full flex-col overflow-clip border border-border text-text-primary rounded-lg not-prose relative" data-code-block="true"><div class="border-border flex items-center justify-between border-b px-4 py-2"><div class="flex items-center gap-2"><svg width="14" stroke-width="1.5" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="text-text-secondary"><path d="M9.00001 21L8.00001 21C6.89544 21 6.00001 20.1057 6.00001 19.0011C6.00001 17.4501 6.00001 15.3443 6 14C6 13 4.5 12 4.5 12C4.5 12 6.00001 11 6.00001 10C6.00001 8.827 6.00001 6.62207 6.00001 4.99914C6.00001 3.89457 6.89544 3 8.00001 3L9.00001 3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 21L16 21C17.1046 21 18 20.1057 18 19.0011C18 17.4501 18 15.3443 18 14C18 13 19.5 12 19.5 12C19.5 12 18 11 18 10C18 8.827 18 6.62207 18 4.99914C18 3.89457 17.1046 3 16 3L15 3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg><span class="text-text-secondary text-sm font-medium">JavaScript</span></div><button class="inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ring-offset-2 focus-visible:ring-offset-surface-primary disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 text-sm text-interactive-active hover:text-interactive-normal active:text-text-tertiary font-normal relative rounded-lg p-[6px]" type="button" data-state="closed" data-slot="tooltip-trigger"><svg width="16" height="16" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="text-interactive-positive absolute inset-0 m-auto rotate-90 opacity-0 transition-all duration-300"><path d="M5 13L9 17L19 7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg><svg width="16" height="16" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="absolute inset-0 m-auto opacity-100 transition-opacity duration-300"><path d="M19.4 20H9.6C9.26863 20 9 19.7314 9 19.4V9.6C9 9.26863 9.26863 9 9.6 9H19.4C19.7314 9 20 9.26863 20 9.6V19.4C20 19.7314 19.7314 20 19.4 20Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 9V4.6C15 4.26863 14.7314 4 14.4 4H4.6C4.26863 4 4 4.26863 4 4.6V14.4C4 14.7314 4.26863 15 4.6 15H9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg></button></div><div class="code-block_container__lbMX4"><pre class="shiki github-dark shiki-code-block" tabindex="0"><code class="whitespace-pre-wrap break-words"><span class="line"><span>// Downloaded from npm registry</span></span>
<span class="line"><span>// Install: npm install <package-name></span></span>
<span class="line"></span>
<span class="line"><span>// ── lodash ──</span></span>
<span class="line"><span>import</span><span> _ </span><span>from</span><span> 'lodash'</span><span>;</span></span>
<span class="line"><span>_.</span><span>random</span><span>(</span><span>1</span><span>, </span><span>100</span><span>);                   </span><span>// Random number</span></span>
<span class="line"><span>_.</span><span>chunk</span><span>([</span><span>1</span><span>,</span><span>2</span><span>,</span><span>3</span><span>,</span><span>4</span><span>,</span><span>5</span><span>,</span><span>6</span><span>], </span><span>2</span><span>);         </span><span>// [[1,2],[3,4],[5,6]]</span></span>
<span class="line"><span>_.</span><span>uniq</span><span>([</span><span>1</span><span>,</span><span>1</span><span>,</span><span>2</span><span>,</span><span>2</span><span>,</span><span>3</span><span>]);               </span><span>// [1,2,3]</span></span>
<span class="line"></span>
<span class="line"><span>// ── dotenv (environment variables) ──</span></span>
<span class="line"><span>// .env file: PORT=3000</span></span>
<span class="line"><span>import</span><span> dotenv </span><span>from</span><span> 'dotenv'</span><span>;</span></span>
<span class="line"><span>dotenv.</span><span>config</span><span>();</span></span>
<span class="line"><span>console.</span><span>log</span><span>(process.env.</span><span>PORT</span><span>);      </span><span>// '3000'</span></span>
<span class="line"></span>
<span class="line"><span>// ── uuid (unique IDs) ──</span></span>
<span class="line"><span>import</span><span> { v4 </span><span>as</span><span> uuidv4 } </span><span>from</span><span> 'uuid'</span><span>;</span></span>
<span class="line"><span>console.</span><span>log</span><span>(</span><span>uuidv4</span><span>());  </span><span>// 'a1b2c3d4-e5f6-...'</span></span>
<span class="line"></span>
<span class="line"><span>// ── nodemon (auto-restart) ──</span></span>
<span class="line"><span>// npm install -D nodemon</span></span>
<span class="line"><span>// Run: npx nodemon app.js</span></span></code></pre></div></div></pre>

---

## 7. EVENTEMITTER

<pre><div class="not-prose my-0 flex w-full flex-col overflow-clip border border-border text-text-primary rounded-lg not-prose relative" data-code-block="true"><div class="border-border flex items-center justify-between border-b px-4 py-2"><div class="flex items-center gap-2"><svg width="14" stroke-width="1.5" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="text-text-secondary"><path d="M9.00001 21L8.00001 21C6.89544 21 6.00001 20.1057 6.00001 19.0011C6.00001 17.4501 6.00001 15.3443 6 14C6 13 4.5 12 4.5 12C4.5 12 6.00001 11 6.00001 10C6.00001 8.827 6.00001 6.62207 6.00001 4.99914C6.00001 3.89457 6.89544 3 8.00001 3L9.00001 3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 21L16 21C17.1046 21 18 20.1057 18 19.0011C18 17.4501 18 15.3443 18 14C18 13 19.5 12 19.5 12C19.5 12 18 11 18 10C18 8.827 18 6.62207 18 4.99914C18 3.89457 17.1046 3 16 3L15 3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg><span class="text-text-secondary text-sm font-medium">JavaScript</span></div><button class="inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ring-offset-2 focus-visible:ring-offset-surface-primary disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 text-sm text-interactive-active hover:text-interactive-normal active:text-text-tertiary font-normal relative rounded-lg p-[6px]" type="button" data-state="closed" data-slot="tooltip-trigger"><svg width="16" height="16" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="text-interactive-positive absolute inset-0 m-auto rotate-90 opacity-0 transition-all duration-300"><path d="M5 13L9 17L19 7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg><svg width="16" height="16" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="absolute inset-0 m-auto opacity-100 transition-opacity duration-300"><path d="M19.4 20H9.6C9.26863 20 9 19.7314 9 19.4V9.6C9 9.26863 9.26863 9 9.6 9H19.4C19.7314 9 20 9.26863 20 9.6V19.4C20 19.7314 19.7314 20 19.4 20Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 9V4.6C15 4.26863 14.7314 4 14.4 4H4.6C4.26863 4 4 4.26863 4 4.6V14.4C4 14.7314 4.26863 15 4.6 15H9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg></button></div><div class="code-block_container__lbMX4"><pre class="shiki github-dark shiki-code-block" tabindex="0"><code class="whitespace-pre-wrap break-words"><span class="line"><span>import</span><span> { EventEmitter } </span><span>from</span><span> 'events'</span><span>;</span></span>
<span class="line"><span>const</span><span> emitter</span><span> =</span><span> new</span><span> EventEmitter</span><span>();</span></span>
<span class="line"></span>
<span class="line"><span>// .on(event, listener) — Register listener (runs every time)</span></span>
<span class="line"><span>emitter.</span><span>on</span><span>(</span><span>'greet'</span><span>, (</span><span>name</span><span>) </span><span>=></span><span> {</span></span>
<span class="line"><span>    console.</span><span>log</span><span>(</span><span>`Hello, ${</span><span>name</span><span>}!`</span><span>);</span></span>
<span class="line"><span>});</span></span>
<span class="line"></span>
<span class="line"><span>// .emit(event, ...args) — Fire event with data</span></span>
<span class="line"><span>emitter.</span><span>emit</span><span>(</span><span>'greet'</span><span>, </span><span>'Rahul'</span><span>);    </span><span>// Hello, Rahul!</span></span>
<span class="line"><span>emitter.</span><span>emit</span><span>(</span><span>'greet'</span><span>, </span><span>'Priya'</span><span>);    </span><span>// Hello, Priya!</span></span>
<span class="line"></span>
<span class="line"><span>// .once(event, listener) — Runs ONLY first time</span></span>
<span class="line"><span>emitter.</span><span>once</span><span>(</span><span>'welcome'</span><span>, () </span><span>=></span><span> {</span></span>
<span class="line"><span>    console.</span><span>log</span><span>(</span><span>"Welcome! (only once)"</span><span>);</span></span>
<span class="line"><span>});</span></span>
<span class="line"><span>emitter.</span><span>emit</span><span>(</span><span>'welcome'</span><span>);  </span><span>// Welcome! (only once)</span></span>
<span class="line"><span>emitter.</span><span>emit</span><span>(</span><span>'welcome'</span><span>);  </span><span>// (nothing — already fired)</span></span>
<span class="line"></span>
<span class="line"><span>// Multiple listeners on same event (fire in order)</span></span>
<span class="line"><span>emitter.</span><span>on</span><span>(</span><span>'order'</span><span>, (</span><span>item</span><span>) </span><span>=></span><span> console.</span><span>log</span><span>(</span><span>`Email: ${</span><span>item</span><span>} ordered`</span><span>));</span></span>
<span class="line"><span>emitter.</span><span>on</span><span>(</span><span>'order'</span><span>, (</span><span>item</span><span>) </span><span>=></span><span> console.</span><span>log</span><span>(</span><span>`DB: ${</span><span>item</span><span>} saved`</span><span>));</span></span>
<span class="line"><span>emitter.</span><span>emit</span><span>(</span><span>'order'</span><span>, </span><span>'Laptop'</span><span>);</span></span>
<span class="line"><span>// Email: Laptop ordered</span></span>
<span class="line"><span>// DB: Laptop saved</span></span>
<span class="line"></span>
<span class="line"><span>// Remove listener</span></span>
<span class="line"><span>const</span><span> fn</span><span> =</span><span> (</span><span>data</span><span>) </span><span>=></span><span> console.</span><span>log</span><span>(data);</span></span>
<span class="line"><span>emitter.</span><span>on</span><span>(</span><span>'data'</span><span>, fn);</span></span>
<span class="line"><span>emitter.</span><span>removeListener</span><span>(</span><span>'data'</span><span>, fn);  </span><span>// or emitter.off('data', fn)</span></span>
<span class="line"></span>
<span class="line"><span>// Useful methods</span></span>
<span class="line"><span>emitter.</span><span>listenerCount</span><span>(</span><span>'greet'</span><span>);      </span><span>// Number of listeners</span></span>
<span class="line"><span>emitter.</span><span>eventNames</span><span>();                </span><span>// ['greet', 'order', ...]</span></span>
<span class="line"><span>emitter.</span><span>removeAllListeners</span><span>(</span><span>'greet'</span><span>); </span><span>// Remove all for event</span></span>
<span class="line"></span>
<span class="line"><span>// Extending EventEmitter (real-world pattern)</span></span>
<span class="line"><span>class</span><span> OrderSystem</span><span> extends</span><span> EventEmitter</span><span> {</span></span>
<span class="line"><span>    placeOrder</span><span>(</span><span>item</span><span>) {</span></span>
<span class="line"><span>        console.</span><span>log</span><span>(</span><span>`Order: ${</span><span>item</span><span>}`</span><span>);</span></span>
<span class="line"><span>        this</span><span>.</span><span>emit</span><span>(</span><span>'orderPlaced'</span><span>, { item, time: </span><span>new</span><span> Date</span><span>() });</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"></span>
<span class="line"><span>const</span><span> shop</span><span> =</span><span> new</span><span> OrderSystem</span><span>();</span></span>
<span class="line"><span>shop.</span><span>on</span><span>(</span><span>'orderPlaced'</span><span>, (</span><span>order</span><span>) </span><span>=></span><span> console.</span><span>log</span><span>(</span><span>`Email: ${</span><span>order</span><span>.</span><span>item</span><span>}`</span><span>));</span></span>
<span class="line"><span>shop.</span><span>placeOrder</span><span>(</span><span>'Laptop'</span><span>);</span></span>
<span class="line"></span>
<span class="line"><span>// IMPORTANT: Events are SYNCHRONOUS!</span></span>
<span class="line"><span>console.</span><span>log</span><span>(</span><span>"Before"</span><span>);</span></span>
<span class="line"><span>emitter.</span><span>emit</span><span>(</span><span>'greet'</span><span>, </span><span>'Test'</span><span>);  </span><span>// Runs immediately between logs</span></span>
<span class="line"><span>console.</span><span>log</span><span>(</span><span>"After"</span><span>);</span></span></code></pre></div></div></pre>

---

## 8. CALLBACKS

<pre><div class="not-prose my-0 flex w-full flex-col overflow-clip border border-border text-text-primary rounded-lg not-prose relative" data-code-block="true"><div class="border-border flex items-center justify-between border-b px-4 py-2"><div class="flex items-center gap-2"><svg width="14" stroke-width="1.5" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="text-text-secondary"><path d="M9.00001 21L8.00001 21C6.89544 21 6.00001 20.1057 6.00001 19.0011C6.00001 17.4501 6.00001 15.3443 6 14C6 13 4.5 12 4.5 12C4.5 12 6.00001 11 6.00001 10C6.00001 8.827 6.00001 6.62207 6.00001 4.99914C6.00001 3.89457 6.89544 3 8.00001 3L9.00001 3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 21L16 21C17.1046 21 18 20.1057 18 19.0011C18 17.4501 18 15.3443 18 14C18 13 19.5 12 19.5 12C19.5 12 18 11 18 10C18 8.827 18 6.62207 18 4.99914C18 3.89457 17.1046 3 16 3L15 3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg><span class="text-text-secondary text-sm font-medium">JavaScript</span></div><button class="inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ring-offset-2 focus-visible:ring-offset-surface-primary disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 text-sm text-interactive-active hover:text-interactive-normal active:text-text-tertiary font-normal relative rounded-lg p-[6px]" type="button" data-state="closed" data-slot="tooltip-trigger"><svg width="16" height="16" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="text-interactive-positive absolute inset-0 m-auto rotate-90 opacity-0 transition-all duration-300"><path d="M5 13L9 17L19 7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg><svg width="16" height="16" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="absolute inset-0 m-auto opacity-100 transition-opacity duration-300"><path d="M19.4 20H9.6C9.26863 20 9 19.7314 9 19.4V9.6C9 9.26863 9.26863 9 9.6 9H19.4C19.7314 9 20 9.26863 20 9.6V19.4C20 19.7314 19.7314 20 19.4 20Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 9V4.6C15 4.26863 14.7314 4 14.4 4H4.6C4.26863 4 4 4.26863 4 4.6V14.4C4 14.7314 4.26863 15 4.6 15H9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg></button></div><div class="code-block_container__lbMX4"><pre class="shiki github-dark shiki-code-block" tabindex="0"><code class="whitespace-pre-wrap break-words"><span class="line"><span>// Callback = function passed as argument, called later</span></span>
<span class="line"></span>
<span class="line"><span>// 1. Simple callback</span></span>
<span class="line"><span>function</span><span> greet</span><span>(</span><span>name</span><span>, </span><span>callback</span><span>) {</span></span>
<span class="line"><span>    console.</span><span>log</span><span>(</span><span>"Hello, "</span><span> +</span><span> name);</span></span>
<span class="line"><span>    callback</span><span>();</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>greet</span><span>(</span><span>"Rahul"</span><span>, () </span><span>=></span><span> console.</span><span>log</span><span>(</span><span>"Callback fired!"</span><span>));</span></span>
<span class="line"></span>
<span class="line"><span>// 2. Callback with data</span></span>
<span class="line"><span>function</span><span> calculate</span><span>(</span><span>a</span><span>, </span><span>b</span><span>, </span><span>callback</span><span>) {</span></span>
<span class="line"><span>    callback</span><span>(a </span><span>+</span><span> b);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>calculate</span><span>(</span><span>5</span><span>, </span><span>10</span><span>, (</span><span>sum</span><span>) </span><span>=></span><span> console.</span><span>log</span><span>(</span><span>"Sum:"</span><span>, sum));  </span><span>// 15</span></span>
<span class="line"></span>
<span class="line"><span>// 3. Asynchronous callback (non-blocking)</span></span>
<span class="line"><span>console.</span><span>log</span><span>(</span><span>"Step 1"</span><span>);</span></span>
<span class="line"><span>setTimeout</span><span>(() </span><span>=></span><span> console.</span><span>log</span><span>(</span><span>"Step 2 (after 2s)"</span><span>), </span><span>2000</span><span>);</span></span>
<span class="line"><span>console.</span><span>log</span><span>(</span><span>"Step 3"</span><span>);</span></span>
<span class="line"><span>// Output: Step 1, Step 3, Step 2</span></span>
<span class="line"><span>// Step 3 runs BEFORE Step 2 (non-blocking!)</span></span>
<span class="line"></span>
<span class="line"><span>// 4. ERROR-FIRST CALLBACK (Node.js convention)</span></span>
<span class="line"><span>// callback(error, data)</span></span>
<span class="line"><span>// error = null if success, Error object if failed</span></span>
<span class="line"><span>function</span><span> divide</span><span>(</span><span>a</span><span>, </span><span>b</span><span>, </span><span>callback</span><span>) {</span></span>
<span class="line"><span>    setTimeout</span><span>(() </span><span>=></span><span> {</span></span>
<span class="line"><span>        if</span><span> (b </span><span>===</span><span> 0</span><span>) {</span></span>
<span class="line"><span>            callback</span><span>(</span><span>new</span><span> Error</span><span>(</span><span>"Cannot divide by zero"</span><span>), </span><span>null</span><span>);</span></span>
<span class="line"><span>        } </span><span>else</span><span> {</span></span>
<span class="line"><span>            callback</span><span>(</span><span>null</span><span>, a </span><span>/</span><span> b);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }, </span><span>1000</span><span>);</span></span>
<span class="line"><span>}</span></span>
<span class="line"></span>
<span class="line"><span>divide</span><span>(</span><span>10</span><span>, </span><span>2</span><span>, (</span><span>err</span><span>, </span><span>result</span><span>) </span><span>=></span><span> {</span></span>
<span class="line"><span>    if</span><span> (err) </span><span>return</span><span> console.</span><span>log</span><span>(</span><span>"Error:"</span><span>, err.message);</span></span>
<span class="line"><span>    console.</span><span>log</span><span>(</span><span>"Result:"</span><span>, result);  </span><span>// 5</span></span>
<span class="line"><span>});</span></span>
<span class="line"></span>
<span class="line"><span>divide</span><span>(</span><span>10</span><span>, </span><span>0</span><span>, (</span><span>err</span><span>, </span><span>result</span><span>) </span><span>=></span><span> {</span></span>
<span class="line"><span>    if</span><span> (err) </span><span>return</span><span> console.</span><span>log</span><span>(</span><span>"Error:"</span><span>, err.message); </span><span>// Cannot divide by zero</span></span>
<span class="line"><span>    console.</span><span>log</span><span>(</span><span>"Result:"</span><span>, result);</span></span>
<span class="line"><span>});</span></span>
<span class="line"></span>
<span class="line"><span>// 5. fs.readFile with callback</span></span>
<span class="line"><span>import</span><span> fs </span><span>from</span><span> 'fs'</span><span>;</span></span>
<span class="line"><span>fs.</span><span>readFile</span><span>(</span><span>'file.txt'</span><span>, </span><span>'utf8'</span><span>, (</span><span>err</span><span>, </span><span>data</span><span>) </span><span>=></span><span> {</span></span>
<span class="line"><span>    if</span><span> (err) </span><span>return</span><span> console.</span><span>log</span><span>(err.message);</span></span>
<span class="line"><span>    console.</span><span>log</span><span>(data);</span></span>
<span class="line"><span>});</span></span>
<span class="line"><span>console.</span><span>log</span><span>(</span><span>"This runs BEFORE file is read!"</span><span>);</span></span>
<span class="line"></span>
<span class="line"><span>// 6. CALLBACK HELL (the problem)</span></span>
<span class="line"><span>fs.</span><span>readFile</span><span>(</span><span>'file1.txt'</span><span>, </span><span>'utf8'</span><span>, (</span><span>err1</span><span>, </span><span>data1</span><span>) </span><span>=></span><span> {</span></span>
<span class="line"><span>    fs.</span><span>readFile</span><span>(</span><span>'file2.txt'</span><span>, </span><span>'utf8'</span><span>, (</span><span>err2</span><span>, </span><span>data2</span><span>) </span><span>=></span><span> {</span></span>
<span class="line"><span>        fs.</span><span>writeFile</span><span>(</span><span>'out.txt'</span><span>, data1 </span><span>+</span><span> data2, (</span><span>err3</span><span>) </span><span>=></span><span> {</span></span>
<span class="line"><span>            // Gets deeper and deeper... unreadable!</span></span>
<span class="line"><span>        });</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>});</span></span>
<span class="line"><span>// SOLUTION: Promises or async/await</span></span></code></pre></div></div></pre>

---

## 9. WORKING WITH FS MODULE

<pre><div class="not-prose my-0 flex w-full flex-col overflow-clip border border-border text-text-primary rounded-lg not-prose relative" data-code-block="true"><div class="border-border flex items-center justify-between border-b px-4 py-2"><div class="flex items-center gap-2"><svg width="14" stroke-width="1.5" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="text-text-secondary"><path d="M9.00001 21L8.00001 21C6.89544 21 6.00001 20.1057 6.00001 19.0011C6.00001 17.4501 6.00001 15.3443 6 14C6 13 4.5 12 4.5 12C4.5 12 6.00001 11 6.00001 10C6.00001 8.827 6.00001 6.62207 6.00001 4.99914C6.00001 3.89457 6.89544 3 8.00001 3L9.00001 3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 21L16 21C17.1046 21 18 20.1057 18 19.0011C18 17.4501 18 15.3443 18 14C18 13 19.5 12 19.5 12C19.5 12 18 11 18 10C18 8.827 18 6.62207 18 4.99914C18 3.89457 17.1046 3 16 3L15 3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg><span class="text-text-secondary text-sm font-medium">JavaScript</span></div><button class="inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ring-offset-2 focus-visible:ring-offset-surface-primary disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 text-sm text-interactive-active hover:text-interactive-normal active:text-text-tertiary font-normal relative rounded-lg p-[6px]" type="button" data-state="closed" data-slot="tooltip-trigger"><svg width="16" height="16" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="text-interactive-positive absolute inset-0 m-auto rotate-90 opacity-0 transition-all duration-300"><path d="M5 13L9 17L19 7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg><svg width="16" height="16" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="absolute inset-0 m-auto opacity-100 transition-opacity duration-300"><path d="M19.4 20H9.6C9.26863 20 9 19.7314 9 19.4V9.6C9 9.26863 9.26863 9 9.6 9H19.4C19.7314 9 20 9.26863 20 9.6V19.4C20 19.7314 19.7314 20 19.4 20Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 9V4.6C15 4.26863 14.7314 4 14.4 4H4.6C4.26863 4 4 4.26863 4 4.6V14.4C4 14.7314 4.26863 15 4.6 15H9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg></button></div><div class="code-block_container__lbMX4"><pre class="shiki github-dark shiki-code-block" tabindex="0"><code class="whitespace-pre-wrap break-words"><span class="line"><span>import</span><span> fs </span><span>from</span><span> 'fs'</span><span>;</span></span>
<span class="line"><span>import</span><span> path </span><span>from</span><span> 'path'</span><span>;</span></span>
<span class="line"><span>import</span><span> { fileURLToPath } </span><span>from</span><span> 'url'</span><span>;</span></span>
<span class="line"></span>
<span class="line"><span>const</span><span> __filename</span><span> =</span><span> fileURLToPath</span><span>(</span><span>import</span><span>.</span><span>meta</span><span>.url);</span></span>
<span class="line"><span>const</span><span> __dirname</span><span> =</span><span> path.</span><span>dirname</span><span>(__filename);</span></span>
<span class="line"></span>
<span class="line"><span>// ══════ WRITING FILES ══════</span></span>
<span class="line"><span>// writeFile — creates new or OVERWRITES existing</span></span>
<span class="line"><span>fs.</span><span>writeFile</span><span>(</span><span>'hello.txt'</span><span>, </span><span>'Hello Node.js!'</span><span>, </span><span>'utf8'</span><span>, (</span><span>err</span><span>) </span><span>=></span><span> {</span></span>
<span class="line"><span>    if</span><span> (err) </span><span>return</span><span> console.</span><span>log</span><span>(err);</span></span>
<span class="line"><span>    console.</span><span>log</span><span>(</span><span>"Written!"</span><span>);</span></span>
<span class="line"><span>});</span></span>
<span class="line"></span>
<span class="line"><span>// Sync version</span></span>
<span class="line"><span>fs.</span><span>writeFileSync</span><span>(</span><span>'sync.txt'</span><span>, </span><span>'Sync write!'</span><span>);</span></span>
<span class="line"></span>
<span class="line"><span>// ══════ READING FILES ══════</span></span>
<span class="line"><span>// With encoding → returns string</span></span>
<span class="line"><span>fs.</span><span>readFile</span><span>(</span><span>'hello.txt'</span><span>, </span><span>'utf8'</span><span>, (</span><span>err</span><span>, </span><span>data</span><span>) </span><span>=></span><span> {</span></span>
<span class="line"><span>    if</span><span> (err) </span><span>return</span><span> console.</span><span>log</span><span>(err);</span></span>
<span class="line"><span>    console.</span><span>log</span><span>(</span><span>"Content:"</span><span>, data);</span></span>
<span class="line"><span>});</span></span>
<span class="line"></span>
<span class="line"><span>// Without encoding → returns Buffer</span></span>
<span class="line"><span>fs.</span><span>readFile</span><span>(</span><span>'hello.txt'</span><span>, (</span><span>err</span><span>, </span><span>data</span><span>) </span><span>=></span><span> {</span></span>
<span class="line"><span>    console.</span><span>log</span><span>(data);            </span><span>// <Buffer 48 65 6c ...></span></span>
<span class="line"><span>    console.</span><span>log</span><span>(data.</span><span>toString</span><span>()); </span><span>// Hello Node.js!</span></span>
<span class="line"><span>});</span></span>
<span class="line"></span>
<span class="line"><span>// Sync version</span></span>
<span class="line"><span>const</span><span> content</span><span> =</span><span> fs.</span><span>readFileSync</span><span>(</span><span>'hello.txt'</span><span>, </span><span>'utf8'</span><span>);</span></span>
<span class="line"></span>
<span class="line"><span>// ══════ APPENDING ══════</span></span>
<span class="line"><span>// Adds to END (doesn't overwrite)</span></span>
<span class="line"><span>fs.</span><span>appendFile</span><span>(</span><span>'hello.txt'</span><span>, </span><span>'</span><span>\n</span><span>Appended!'</span><span>, (</span><span>err</span><span>) </span><span>=></span><span> {</span></span>
<span class="line"><span>    if</span><span> (err) </span><span>return</span><span> console.</span><span>log</span><span>(err);</span></span>
<span class="line"><span>    console.</span><span>log</span><span>(</span><span>"Appended!"</span><span>);</span></span>
<span class="line"><span>});</span></span>
<span class="line"></span>
<span class="line"><span>// ══════ RENAMING ══════</span></span>
<span class="line"><span>fs.</span><span>rename</span><span>(</span><span>'old.txt'</span><span>, </span><span>'new.txt'</span><span>, (</span><span>err</span><span>) </span><span>=></span><span> {});</span></span>
<span class="line"></span>
<span class="line"><span>// ══════ DELETING ══════</span></span>
<span class="line"><span>fs.</span><span>unlink</span><span>(</span><span>'file.txt'</span><span>, (</span><span>err</span><span>) </span><span>=></span><span> {});</span></span>
<span class="line"></span>
<span class="line"><span>// ══════ EXISTS? ══════</span></span>
<span class="line"><span>if</span><span> (fs.</span><span>existsSync</span><span>(</span><span>'file.txt'</span><span>)) console.</span><span>log</span><span>(</span><span>"Exists!"</span><span>);</span></span>
<span class="line"></span>
<span class="line"><span>// ══════ FILE INFO ══════</span></span>
<span class="line"><span>fs.</span><span>stat</span><span>(</span><span>'file.txt'</span><span>, (</span><span>err</span><span>, </span><span>stats</span><span>) </span><span>=></span><span> {</span></span>
<span class="line"><span>    stats.</span><span>isFile</span><span>();        </span><span>// true</span></span>
<span class="line"><span>    stats.</span><span>isDirectory</span><span>();   </span><span>// false</span></span>
<span class="line"><span>    stats.size;            </span><span>// bytes</span></span>
<span class="line"><span>    stats.birthtime;       </span><span>// created</span></span>
<span class="line"><span>    stats.mtime;           </span><span>// modified</span></span>
<span class="line"><span>});</span></span>
<span class="line"></span>
<span class="line"><span>// ══════ DIRECTORIES ══════</span></span>
<span class="line"><span>fs.</span><span>mkdir</span><span>(</span><span>'folder'</span><span>, (</span><span>err</span><span>) </span><span>=></span><span> {});</span></span>
<span class="line"><span>fs.</span><span>mkdir</span><span>(</span><span>'a/b/c'</span><span>, { recursive: </span><span>true</span><span> }, (</span><span>err</span><span>) </span><span>=></span><span> {}); </span><span>// nested</span></span>
<span class="line"><span>fs.</span><span>readdir</span><span>(</span><span>'./'</span><span>, (</span><span>err</span><span>, </span><span>files</span><span>) </span><span>=></span><span> { console.</span><span>log</span><span>(files); });</span></span>
<span class="line"><span>fs.</span><span>rmdir</span><span>(</span><span>'folder'</span><span>, (</span><span>err</span><span>) </span><span>=></span><span> {});</span></span>
<span class="line"><span>fs.</span><span>rm</span><span>(</span><span>'folder'</span><span>, { recursive: </span><span>true</span><span>, force: </span><span>true</span><span> }, (</span><span>err</span><span>) </span><span>=></span><span> {});</span></span>
<span class="line"></span>
<span class="line"><span>// ══════ COPY ══════</span></span>
<span class="line"><span>fs.</span><span>copyFile</span><span>(</span><span>'src.txt'</span><span>, </span><span>'dest.txt'</span><span>, (</span><span>err</span><span>) </span><span>=></span><span> {});</span></span>
<span class="line"></span>
<span class="line"><span>// ══════ WATCH ══════</span></span>
<span class="line"><span>fs.</span><span>watch</span><span>(</span><span>'file.txt'</span><span>, (</span><span>eventType</span><span>, </span><span>filename</span><span>) </span><span>=></span><span> {</span></span>
<span class="line"><span>    console.</span><span>log</span><span>(</span><span>`${</span><span>filename</span><span>}: ${</span><span>eventType</span><span>}`</span><span>);</span></span>
<span class="line"><span>});</span></span></code></pre></div></div></pre>

---

## 10. WORKING WITH JSON

<pre><div class="not-prose my-0 flex w-full flex-col overflow-clip border border-border text-text-primary rounded-lg not-prose relative" data-code-block="true"><div class="border-border flex items-center justify-between border-b px-4 py-2"><div class="flex items-center gap-2"><svg width="14" stroke-width="1.5" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="text-text-secondary"><path d="M9.00001 21L8.00001 21C6.89544 21 6.00001 20.1057 6.00001 19.0011C6.00001 17.4501 6.00001 15.3443 6 14C6 13 4.5 12 4.5 12C4.5 12 6.00001 11 6.00001 10C6.00001 8.827 6.00001 6.62207 6.00001 4.99914C6.00001 3.89457 6.89544 3 8.00001 3L9.00001 3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 21L16 21C17.1046 21 18 20.1057 18 19.0011C18 17.4501 18 15.3443 18 14C18 13 19.5 12 19.5 12C19.5 12 18 11 18 10C18 8.827 18 6.62207 18 4.99914C18 3.89457 17.1046 3 16 3L15 3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg><span class="text-text-secondary text-sm font-medium">JavaScript</span></div><button class="inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ring-offset-2 focus-visible:ring-offset-surface-primary disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 text-sm text-interactive-active hover:text-interactive-normal active:text-text-tertiary font-normal relative rounded-lg p-[6px]" type="button" data-state="closed" data-slot="tooltip-trigger"><svg width="16" height="16" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="text-interactive-positive absolute inset-0 m-auto rotate-90 opacity-0 transition-all duration-300"><path d="M5 13L9 17L19 7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg><svg width="16" height="16" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="absolute inset-0 m-auto opacity-100 transition-opacity duration-300"><path d="M19.4 20H9.6C9.26863 20 9 19.7314 9 19.4V9.6C9 9.26863 9.26863 9 9.6 9H19.4C19.7314 9 20 9.26863 20 9.6V19.4C20 19.7314 19.7314 20 19.4 20Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 9V4.6C15 4.26863 14.7314 4 14.4 4H4.6C4.26863 4 4 4.26863 4 4.6V14.4C4 14.7314 4.26863 15 4.6 15H9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg></button></div><div class="code-block_container__lbMX4"><pre class="shiki github-dark shiki-code-block" tabindex="0"><code class="whitespace-pre-wrap break-words"><span class="line"><span>import</span><span> fs </span><span>from</span><span> 'fs'</span><span>;</span></span>
<span class="line"></span>
<span class="line"><span>// ══════ JSON.stringify() — Object → JSON String ══════</span></span>
<span class="line"><span>const</span><span> student</span><span> =</span><span> { name: </span><span>"Rahul"</span><span>, age: </span><span>21</span><span>, courses: [</span><span>"Node"</span><span>, </span><span>"React"</span><span>] };</span></span>
<span class="line"></span>
<span class="line"><span>JSON</span><span>.</span><span>stringify</span><span>(student);              </span><span>// '{"name":"Rahul",...}'</span></span>
<span class="line"><span>JSON</span><span>.</span><span>stringify</span><span>(student, </span><span>null</span><span>, </span><span>2</span><span>);     </span><span>// Pretty with 2-space indent</span></span>
<span class="line"></span>
<span class="line"><span>// ══════ JSON.parse() — JSON String → Object ══════</span></span>
<span class="line"><span>const</span><span> jsonStr</span><span> =</span><span> '{"name":"Priya","age":22}'</span><span>;</span></span>
<span class="line"><span>const</span><span> obj</span><span> =</span><span> JSON</span><span>.</span><span>parse</span><span>(jsonStr);</span></span>
<span class="line"><span>console.</span><span>log</span><span>(obj.name);               </span><span>// Priya</span></span>
<span class="line"></span>
<span class="line"><span>// ══════ WRITE JSON TO FILE ══════</span></span>
<span class="line"><span>const</span><span> users</span><span> =</span><span> [</span></span>
<span class="line"><span>    { id: </span><span>1</span><span>, name: </span><span>"Rahul"</span><span>, email: </span><span>"rahul@test.com"</span><span> },</span></span>
<span class="line"><span>    { id: </span><span>2</span><span>, name: </span><span>"Priya"</span><span>, email: </span><span>"priya@test.com"</span><span> }</span></span>
<span class="line"><span>];</span></span>
<span class="line"><span>fs.</span><span>writeFileSync</span><span>(</span><span>'users.json'</span><span>, </span><span>JSON</span><span>.</span><span>stringify</span><span>(users, </span><span>null</span><span>, </span><span>2</span><span>));</span></span>
<span class="line"></span>
<span class="line"><span>// ══════ READ JSON FROM FILE ══════</span></span>
<span class="line"><span>fs.</span><span>readFile</span><span>(</span><span>'users.json'</span><span>, </span><span>'utf8'</span><span>, (</span><span>err</span><span>, </span><span>data</span><span>) </span><span>=></span><span> {</span></span>
<span class="line"><span>    const</span><span> usersArray</span><span> =</span><span> JSON</span><span>.</span><span>parse</span><span>(data);  </span><span>// Parse string to array</span></span>
<span class="line"><span>    console.</span><span>log</span><span>(usersArray[</span><span>0</span><span>].name);       </span><span>// Rahul</span></span>
<span class="line"><span>});</span></span>
<span class="line"></span>
<span class="line"><span>// Sync</span></span>
<span class="line"><span>const</span><span> raw</span><span> =</span><span> fs.</span><span>readFileSync</span><span>(</span><span>'users.json'</span><span>, </span><span>'utf8'</span><span>);</span></span>
<span class="line"><span>const</span><span> parsed</span><span> =</span><span> JSON</span><span>.</span><span>parse</span><span>(raw);</span></span>
<span class="line"></span>
<span class="line"><span>// ══════ UPDATE JSON FILE ══════</span></span>
<span class="line"><span>fs.</span><span>readFile</span><span>(</span><span>'users.json'</span><span>, </span><span>'utf8'</span><span>, (</span><span>err</span><span>, </span><span>data</span><span>) </span><span>=></span><span> {</span></span>
<span class="line"><span>    const</span><span> arr</span><span> =</span><span> JSON</span><span>.</span><span>parse</span><span>(data);</span></span>
<span class="line"><span>    arr.</span><span>push</span><span>({ id: </span><span>3</span><span>, name: </span><span>"Amit"</span><span>, email: </span><span>"amit@test.com"</span><span> });</span></span>
<span class="line"><span>    fs.</span><span>writeFile</span><span>(</span><span>'users.json'</span><span>, </span><span>JSON</span><span>.</span><span>stringify</span><span>(arr, </span><span>null</span><span>, </span><span>2</span><span>), (</span><span>err</span><span>) </span><span>=></span><span> {});</span></span>
<span class="line"><span>});</span></span>
<span class="line"></span>
<span class="line"><span>// ══════ ERROR HANDLING ══════</span></span>
<span class="line"><span>try</span><span> {</span></span>
<span class="line"><span>    JSON</span><span>.</span><span>parse</span><span>(</span><span>"invalid json"</span><span>);</span></span>
<span class="line"><span>} </span><span>catch</span><span> (err) {</span></span>
<span class="line"><span>    console.</span><span>log</span><span>(</span><span>"Parse error:"</span><span>, err.message);</span></span>
<span class="line"><span>}</span></span>
<span class="line"></span>
<span class="line"><span>// ══════ TRICKY: What stringify removes ══════</span></span>
<span class="line"><span>// Functions  → REMOVED</span></span>
<span class="line"><span>// undefined  → REMOVED</span></span>
<span class="line"><span>// Date       → converted to string</span></span>
<span class="line"><span>// Infinity   → null</span></span>
<span class="line"><span>// NaN        → null</span></span>
<span class="line"><span>// RegExp     → {}</span></span></code></pre></div></div></pre>

---

## 11. STREAMS

<pre><div class="not-prose my-0 flex w-full flex-col overflow-clip border border-border text-text-primary rounded-lg not-prose relative" data-code-block="true"><div class="border-border flex items-center justify-between border-b px-4 py-2"><div class="flex items-center gap-2"><svg width="14" stroke-width="1.5" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="text-text-secondary"><path d="M9.00001 21L8.00001 21C6.89544 21 6.00001 20.1057 6.00001 19.0011C6.00001 17.4501 6.00001 15.3443 6 14C6 13 4.5 12 4.5 12C4.5 12 6.00001 11 6.00001 10C6.00001 8.827 6.00001 6.62207 6.00001 4.99914C6.00001 3.89457 6.89544 3 8.00001 3L9.00001 3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 21L16 21C17.1046 21 18 20.1057 18 19.0011C18 17.4501 18 15.3443 18 14C18 13 19.5 12 19.5 12C19.5 12 18 11 18 10C18 8.827 18 6.62207 18 4.99914C18 3.89457 17.1046 3 16 3L15 3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg><span class="text-text-secondary text-sm font-medium">JavaScript</span></div><button class="inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ring-offset-2 focus-visible:ring-offset-surface-primary disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 text-sm text-interactive-active hover:text-interactive-normal active:text-text-tertiary font-normal relative rounded-lg p-[6px]" type="button" data-state="closed" data-slot="tooltip-trigger"><svg width="16" height="16" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="text-interactive-positive absolute inset-0 m-auto rotate-90 opacity-0 transition-all duration-300"><path d="M5 13L9 17L19 7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg><svg width="16" height="16" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="absolute inset-0 m-auto opacity-100 transition-opacity duration-300"><path d="M19.4 20H9.6C9.26863 20 9 19.7314 9 19.4V9.6C9 9.26863 9.26863 9 9.6 9H19.4C19.7314 9 20 9.26863 20 9.6V19.4C20 19.7314 19.7314 20 19.4 20Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 9V4.6C15 4.26863 14.7314 4 14.4 4H4.6C4.26863 4 4 4.26863 4 4.6V14.4C4 14.7314 4.26863 15 4.6 15H9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg></button></div><div class="code-block_container__lbMX4"><pre class="shiki github-dark shiki-code-block" tabindex="0"><code class="whitespace-pre-wrap break-words"><span class="line"><span>import</span><span> fs </span><span>from</span><span> 'fs'</span><span>;</span></span>
<span class="line"><span>import</span><span> path </span><span>from</span><span> 'path'</span><span>;</span></span>
<span class="line"><span>import</span><span> { fileURLToPath } </span><span>from</span><span> 'url'</span><span>;</span></span>
<span class="line"></span>
<span class="line"><span>const</span><span> __filename</span><span> =</span><span> fileURLToPath</span><span>(</span><span>import</span><span>.</span><span>meta</span><span>.url);</span></span>
<span class="line"><span>const</span><span> __dirname</span><span> =</span><span> path.</span><span>dirname</span><span>(__filename);</span></span>
<span class="line"></span>
<span class="line"><span>// WHY STREAMS?</span></span>
<span class="line"><span>// fs.readFile() loads ENTIRE file into memory → bad for large files</span></span>
<span class="line"><span>// Streams read in CHUNKS (default 64KB) → memory efficient</span></span>
<span class="line"></span>
<span class="line"><span>// 4 TYPES: Readable, Writable, Duplex, Transform</span></span>
<span class="line"></span>
<span class="line"><span>// ══════ READABLE STREAM ══════</span></span>
<span class="line"><span>const</span><span> readstream</span><span> =</span><span> fs.</span><span>createReadStream</span><span>(</span></span>
<span class="line"><span>    path.</span><span>join</span><span>(__dirname, </span><span>'bigfile.txt'</span><span>),</span></span>
<span class="line"><span>    { encoding: </span><span>'utf8'</span><span>, highWaterMark: </span><span>1024</span><span> }  </span><span>// 1KB chunks</span></span>
<span class="line"><span>);</span></span>
<span class="line"></span>
<span class="line"><span>let</span><span> chunkCount </span><span>=</span><span> 0</span><span>;</span></span>
<span class="line"><span>readstream.</span><span>on</span><span>(</span><span>"data"</span><span>, (</span><span>chunk</span><span>) </span><span>=></span><span> {</span></span>
<span class="line"><span>    chunkCount</span><span>++</span><span>;</span></span>
<span class="line"><span>    console.</span><span>log</span><span>(</span><span>`Chunk ${</span><span>chunkCount</span><span>}: ${</span><span>chunk</span><span>.</span><span>length</span><span>} chars`</span><span>);</span></span>
<span class="line"><span>});</span></span>
<span class="line"></span>
<span class="line"><span>readstream.</span><span>on</span><span>(</span><span>"end"</span><span>, () </span><span>=></span><span> {</span></span>
<span class="line"><span>    console.</span><span>log</span><span>(</span><span>`Done! Total chunks: ${</span><span>chunkCount</span><span>}`</span><span>);</span></span>
<span class="line"><span>});</span></span>
<span class="line"></span>
<span class="line"><span>readstream.</span><span>on</span><span>(</span><span>"error"</span><span>, (</span><span>err</span><span>) </span><span>=></span><span> {</span></span>
<span class="line"><span>    console.</span><span>log</span><span>(</span><span>"Error:"</span><span>, err.message);</span></span>
<span class="line"><span>});</span></span>
<span class="line"></span>
<span class="line"><span>// ══════ WRITABLE STREAM ══════</span></span>
<span class="line"><span>const</span><span> writestream</span><span> =</span><span> fs.</span><span>createWriteStream</span><span>(</span><span>'output.txt'</span><span>);</span></span>
<span class="line"><span>writestream.</span><span>write</span><span>(</span><span>"Line 1</span><span>\n</span><span>"</span><span>);</span></span>
<span class="line"><span>writestream.</span><span>write</span><span>(</span><span>"Line 2</span><span>\n</span><span>"</span><span>);</span></span>
<span class="line"><span>writestream.</span><span>end</span><span>(</span><span>"Last line</span><span>\n</span><span>"</span><span>);  </span><span>// Must call end()!</span></span>
<span class="line"></span>
<span class="line"><span>writestream.</span><span>on</span><span>(</span><span>'finish'</span><span>, () </span><span>=></span><span> console.</span><span>log</span><span>(</span><span>"All written!"</span><span>));</span></span>
<span class="line"></span>
<span class="line"><span>// ══════ PIPING (connect readable → writable) ══════</span></span>
<span class="line"><span>const</span><span> src</span><span> =</span><span> fs.</span><span>createReadStream</span><span>(</span><span>'source.txt'</span><span>);</span></span>
<span class="line"><span>const</span><span> dest</span><span> =</span><span> fs.</span><span>createWriteStream</span><span>(</span><span>'copy.txt'</span><span>);</span></span>
<span class="line"><span>src.</span><span>pipe</span><span>(dest);  </span><span>// Copies file</span></span>
<span class="line"></span>
<span class="line"><span>// ══════ PIPE CHAINING ══════</span></span>
<span class="line"><span>import</span><span> zlib </span><span>from</span><span> 'zlib'</span><span>;</span></span>
<span class="line"><span>fs.</span><span>createReadStream</span><span>(</span><span>'file.txt'</span><span>)</span></span>
<span class="line"><span>    .</span><span>pipe</span><span>(zlib.</span><span>createGzip</span><span>())</span></span>
<span class="line"><span>    .</span><span>pipe</span><span>(fs.</span><span>createWriteStream</span><span>(</span><span>'file.txt.gz'</span><span>))</span></span>
<span class="line"><span>    .</span><span>on</span><span>(</span><span>'finish'</span><span>, () </span><span>=></span><span> console.</span><span>log</span><span>(</span><span>"Compressed!"</span><span>));</span></span></code></pre></div></div></pre>

---

## 12. ZLIB (Compression/Decompression)

<pre><div class="not-prose my-0 flex w-full flex-col overflow-clip border border-border text-text-primary rounded-lg not-prose relative" data-code-block="true"><div class="border-border flex items-center justify-between border-b px-4 py-2"><div class="flex items-center gap-2"><svg width="14" stroke-width="1.5" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="text-text-secondary"><path d="M9.00001 21L8.00001 21C6.89544 21 6.00001 20.1057 6.00001 19.0011C6.00001 17.4501 6.00001 15.3443 6 14C6 13 4.5 12 4.5 12C4.5 12 6.00001 11 6.00001 10C6.00001 8.827 6.00001 6.62207 6.00001 4.99914C6.00001 3.89457 6.89544 3 8.00001 3L9.00001 3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 21L16 21C17.1046 21 18 20.1057 18 19.0011C18 17.4501 18 15.3443 18 14C18 13 19.5 12 19.5 12C19.5 12 18 11 18 10C18 8.827 18 6.62207 18 4.99914C18 3.89457 17.1046 3 16 3L15 3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg><span class="text-text-secondary text-sm font-medium">JavaScript</span></div><button class="inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ring-offset-2 focus-visible:ring-offset-surface-primary disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 text-sm text-interactive-active hover:text-interactive-normal active:text-text-tertiary font-normal relative rounded-lg p-[6px]" type="button" data-state="closed" data-slot="tooltip-trigger"><svg width="16" height="16" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="text-interactive-positive absolute inset-0 m-auto rotate-90 opacity-0 transition-all duration-300"><path d="M5 13L9 17L19 7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg><svg width="16" height="16" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="absolute inset-0 m-auto opacity-100 transition-opacity duration-300"><path d="M19.4 20H9.6C9.26863 20 9 19.7314 9 19.4V9.6C9 9.26863 9.26863 9 9.6 9H19.4C19.7314 9 20 9.26863 20 9.6V19.4C20 19.7314 19.7314 20 19.4 20Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 9V4.6C15 4.26863 14.7314 4 14.4 4H4.6C4.26863 4 4 4.26863 4 4.6V14.4C4 14.7314 4.26863 15 4.6 15H9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg></button></div><div class="code-block_container__lbMX4"><pre class="shiki github-dark shiki-code-block" tabindex="0"><code class="whitespace-pre-wrap break-words"><span class="line"><span>import</span><span> fs </span><span>from</span><span> 'fs'</span><span>;</span></span>
<span class="line"><span>import</span><span> zlib </span><span>from</span><span> 'zlib'</span><span>;</span></span>
<span class="line"><span>import</span><span> path </span><span>from</span><span> 'path'</span><span>;</span></span>
<span class="line"><span>import</span><span> { fileURLToPath } </span><span>from</span><span> 'url'</span><span>;</span></span>
<span class="line"></span>
<span class="line"><span>const</span><span> __filename</span><span> =</span><span> fileURLToPath</span><span>(</span><span>import</span><span>.</span><span>meta</span><span>.url);</span></span>
<span class="line"><span>const</span><span> __dirname</span><span> =</span><span> path.</span><span>dirname</span><span>(__filename);</span></span>
<span class="line"></span>
<span class="line"><span>// 🚨 CRITICAL: Decompress AFTER compress finishes!</span></span>
<span class="line"><span>// Otherwise → Z_BUF_ERROR (file incomplete)</span></span>
<span class="line"></span>
<span class="line"><span>// ══════ COMPRESS (gzip) ══════</span></span>
<span class="line"><span>const</span><span> input</span><span> =</span><span> path.</span><span>join</span><span>(__dirname, </span><span>'sample.txt'</span><span>);</span></span>
<span class="line"><span>const</span><span> compressed</span><span> =</span><span> path.</span><span>join</span><span>(__dirname, </span><span>'sample.txt.gz'</span><span>);</span></span>
<span class="line"><span>const</span><span> restored</span><span> =</span><span> path.</span><span>join</span><span>(__dirname, </span><span>'sample_restored.txt'</span><span>);</span></span>
<span class="line"></span>
<span class="line"><span>const</span><span> readStream</span><span> =</span><span> fs.</span><span>createReadStream</span><span>(input);</span></span>
<span class="line"><span>const</span><span> writeStream</span><span> =</span><span> fs.</span><span>createWriteStream</span><span>(compressed);</span></span>
<span class="line"><span>const</span><span> gzip</span><span> =</span><span> zlib.</span><span>createGzip</span><span>();</span></span>
<span class="line"></span>
<span class="line"><span>readStream.</span><span>pipe</span><span>(gzip).</span><span>pipe</span><span>(writeStream);</span></span>
<span class="line"></span>
<span class="line"><span>// ══════ DECOMPRESS — INSIDE finish callback! ══════</span></span>
<span class="line"><span>writeStream.</span><span>on</span><span>(</span><span>'finish'</span><span>, () </span><span>=></span><span> {</span></span>
<span class="line"><span>    console.</span><span>log</span><span>(</span><span>"Compression done!"</span><span>);</span></span>
<span class="line"></span>
<span class="line"><span>    // NOW decompress (compression is DONE)</span></span>
<span class="line"><span>    fs.</span><span>createReadStream</span><span>(compressed)</span></span>
<span class="line"><span>        .</span><span>pipe</span><span>(zlib.</span><span>createGunzip</span><span>())</span></span>
<span class="line"><span>        .</span><span>pipe</span><span>(fs.</span><span>createWriteStream</span><span>(restored))</span></span>
<span class="line"><span>        .</span><span>on</span><span>(</span><span>'finish'</span><span>, () </span><span>=></span><span> console.</span><span>log</span><span>(</span><span>"Decompression done!"</span><span>));</span></span>
<span class="line"><span>});</span></span>
<span class="line"></span>
<span class="line"><span>// ❌ WRONG: Both at same time → Z_BUF_ERROR!</span></span>
<span class="line"><span>// readStream.pipe(gzip).pipe(writeStream);</span></span>
<span class="line"><span>// fs.createReadStream(compressed).pipe(gunzip).pipe(writeDecompressed);</span></span>
<span class="line"></span>
<span class="line"><span>// ══════ BUFFER-BASED (for strings) ══════</span></span>
<span class="line"><span>zlib.</span><span>gzip</span><span>(</span><span>"Hello World!"</span><span>, (</span><span>err</span><span>, </span><span>result</span><span>) </span><span>=></span><span> {</span></span>
<span class="line"><span>    console.</span><span>log</span><span>(</span><span>"Compressed:"</span><span>, result.</span><span>length</span><span>);</span></span>
<span class="line"><span>    zlib.</span><span>gunzip</span><span>(result, (</span><span>err</span><span>, </span><span>original</span><span>) </span><span>=></span><span> {</span></span>
<span class="line"><span>        console.</span><span>log</span><span>(</span><span>"Decompressed:"</span><span>, original.</span><span>toString</span><span>());</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>});</span></span>
<span class="line"></span>
<span class="line"><span>// Sync</span></span>
<span class="line"><span>const</span><span> comp</span><span> =</span><span> zlib.</span><span>gzipSync</span><span>(</span><span>"Hello"</span><span>);</span></span>
<span class="line"><span>const</span><span> decomp</span><span> =</span><span> zlib.</span><span>gunzipSync</span><span>(comp);</span></span>
<span class="line"></span>
<span class="line"><span>// METHODS:</span></span>
<span class="line"><span>// Stream: createGzip/createGunzip, createDeflate/createInflate</span></span>
<span class="line"><span>// Buffer: gzip/gunzip, deflate/inflate</span></span>
<span class="line"><span>// Sync:   gzipSync/gunzipSync, deflateSync/inflateSync</span></span></code></pre></div></div></pre>

---

## 13. PROMISES AND ASYNC/AWAIT

<pre><div class="not-prose my-0 flex w-full flex-col overflow-clip border border-border text-text-primary rounded-lg not-prose relative" data-code-block="true"><div class="border-border flex items-center justify-between border-b px-4 py-2"><div class="flex items-center gap-2"><svg width="14" stroke-width="1.5" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="text-text-secondary"><path d="M9.00001 21L8.00001 21C6.89544 21 6.00001 20.1057 6.00001 19.0011C6.00001 17.4501 6.00001 15.3443 6 14C6 13 4.5 12 4.5 12C4.5 12 6.00001 11 6.00001 10C6.00001 8.827 6.00001 6.62207 6.00001 4.99914C6.00001 3.89457 6.89544 3 8.00001 3L9.00001 3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 21L16 21C17.1046 21 18 20.1057 18 19.0011C18 17.4501 18 15.3443 18 14C18 13 19.5 12 19.5 12C19.5 12 18 11 18 10C18 8.827 18 6.62207 18 4.99914C18 3.89457 17.1046 3 16 3L15 3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg><span class="text-text-secondary text-sm font-medium">JavaScript</span></div><button class="inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ring-offset-2 focus-visible:ring-offset-surface-primary disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 text-sm text-interactive-active hover:text-interactive-normal active:text-text-tertiary font-normal relative rounded-lg p-[6px]" type="button" data-state="closed" data-slot="tooltip-trigger"><svg width="16" height="16" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="text-interactive-positive absolute inset-0 m-auto rotate-90 opacity-0 transition-all duration-300"><path d="M5 13L9 17L19 7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg><svg width="16" height="16" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="absolute inset-0 m-auto opacity-100 transition-opacity duration-300"><path d="M19.4 20H9.6C9.26863 20 9 19.7314 9 19.4V9.6C9 9.26863 9.26863 9 9.6 9H19.4C19.7314 9 20 9.26863 20 9.6V19.4C20 19.7314 19.7314 20 19.4 20Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 9V4.6C15 4.26863 14.7314 4 14.4 4H4.6C4.26863 4 4 4.26863 4 4.6V14.4C4 14.7314 4.26863 15 4.6 15H9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg></button></div><div class="code-block_container__lbMX4"><pre class="shiki github-dark shiki-code-block" tabindex="0"><code class="whitespace-pre-wrap break-words"><span class="line"><span>// PROMISE = Object representing a FUTURE value</span></span>
<span class="line"><span>// States: Pending → Resolved (success) OR Rejected (error)</span></span>
<span class="line"></span>
<span class="line"><span>// ══════ CREATING A PROMISE ══════</span></span>
<span class="line"><span>const</span><span> myPromise</span><span> =</span><span> new</span><span> Promise</span><span>((</span><span>resolve</span><span>, </span><span>reject</span><span>) </span><span>=></span><span> {</span></span>
<span class="line"><span>    setTimeout</span><span>(() </span><span>=></span><span> {</span></span>
<span class="line"><span>        const</span><span> success</span><span> =</span><span> true</span><span>;</span></span>
<span class="line"><span>        if</span><span> (success) </span><span>resolve</span><span>(</span><span>"Done! ✅"</span><span>);</span></span>
<span class="line"><span>        else</span><span> reject</span><span>(</span><span>"Failed! ❌"</span><span>);</span></span>
<span class="line"><span>    }, </span><span>1000</span><span>);</span></span>
<span class="line"><span>});</span></span>
<span class="line"></span>
<span class="line"><span>// ══════ CONSUMING: .then() .catch() .finally() ══════</span></span>
<span class="line"><span>myPromise</span></span>
<span class="line"><span>    .</span><span>then</span><span>(</span><span>result</span><span> =></span><span> console.</span><span>log</span><span>(</span><span>"Success:"</span><span>, result))</span></span>
<span class="line"><span>    .</span><span>catch</span><span>(</span><span>error</span><span> =></span><span> console.</span><span>log</span><span>(</span><span>"Error:"</span><span>, error))</span></span>
<span class="line"><span>    .</span><span>finally</span><span>(() </span><span>=></span><span> console.</span><span>log</span><span>(</span><span>"Always runs"</span><span>));</span></span>
<span class="line"></span>
<span class="line"><span>// ══════ REAL EXAMPLE ══════</span></span>
<span class="line"><span>function</span><span> fetchUser</span><span>(</span><span>id</span><span>) {</span></span>
<span class="line"><span>    return</span><span> new</span><span> Promise</span><span>((</span><span>resolve</span><span>, </span><span>reject</span><span>) </span><span>=></span><span> {</span></span>
<span class="line"><span>        setTimeout</span><span>(() </span><span>=></span><span> {</span></span>
<span class="line"><span>            const</span><span> users</span><span> =</span><span> { </span><span>1</span><span>: { name: </span><span>"Rahul"</span><span> }, </span><span>2</span><span>: { name: </span><span>"Priya"</span><span> } };</span></span>
<span class="line"><span>            const</span><span> user</span><span> =</span><span> users[id];</span></span>
<span class="line"><span>            if</span><span> (user) </span><span>resolve</span><span>(user);</span></span>
<span class="line"><span>            else</span><span> reject</span><span>(</span><span>new</span><span> Error</span><span>(</span><span>`User ${</span><span>id</span><span>} not found`</span><span>));</span></span>
<span class="line"><span>        }, </span><span>1000</span><span>);</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>}</span></span>
<span class="line"></span>
<span class="line"><span>fetchUser</span><span>(</span><span>1</span><span>).</span><span>then</span><span>(</span><span>u</span><span> =></span><span> console.</span><span>log</span><span>(u)).</span><span>catch</span><span>(</span><span>e</span><span> =></span><span> console.</span><span>log</span><span>(e.message));</span></span>
<span class="line"></span>
<span class="line"><span>// ══════ PROMISE CHAINING ══════</span></span>
<span class="line"><span>fetchUser</span><span>(</span><span>1</span><span>)</span></span>
<span class="line"><span>    .</span><span>then</span><span>(</span><span>user</span><span> =></span><span> { console.</span><span>log</span><span>(user); </span><span>return</span><span> getOrders</span><span>(user.name); })</span></span>
<span class="line"><span>    .</span><span>then</span><span>(</span><span>orders</span><span> =></span><span> { console.</span><span>log</span><span>(orders); </span><span>return</span><span> getDetails</span><span>(orders[</span><span>0</span><span>]); })</span></span>
<span class="line"><span>    .</span><span>then</span><span>(</span><span>details</span><span> =></span><span> console.</span><span>log</span><span>(details))</span></span>
<span class="line"><span>    .</span><span>catch</span><span>(</span><span>err</span><span> =></span><span> console.</span><span>log</span><span>(err.message));  </span><span>// Catches any error</span></span>
<span class="line"></span>
<span class="line"><span>// ══════ STATIC METHODS ══════</span></span>
<span class="line"><span>// Promise.all — ALL must resolve (rejects if ANY fails)</span></span>
<span class="line"><span>Promise</span><span>.</span><span>all</span><span>([</span><span>fetchUser</span><span>(</span><span>1</span><span>), </span><span>fetchUser</span><span>(</span><span>2</span><span>)])</span></span>
<span class="line"><span>    .</span><span>then</span><span>(([</span><span>u1</span><span>, </span><span>u2</span><span>]) </span><span>=></span><span> console.</span><span>log</span><span>(u1, u2));</span></span>
<span class="line"></span>
<span class="line"><span>// Promise.race — First to settle wins</span></span>
<span class="line"><span>Promise</span><span>.</span><span>race</span><span>([p1, p2]).</span><span>then</span><span>(</span><span>winner</span><span> =></span><span> console.</span><span>log</span><span>(winner));</span></span>
<span class="line"></span>
<span class="line"><span>// Promise.allSettled — Wait for ALL (never rejects)</span></span>
<span class="line"><span>Promise</span><span>.</span><span>allSettled</span><span>([p1, p2]).</span><span>then</span><span>(</span><span>results</span><span> =></span><span> {</span></span>
<span class="line"><span>    results.</span><span>forEach</span><span>(</span><span>r</span><span> =></span><span> {</span></span>
<span class="line"><span>        if</span><span> (r.status </span><span>===</span><span> 'fulfilled'</span><span>) console.</span><span>log</span><span>(r.value);</span></span>
<span class="line"><span>        else</span><span> console.</span><span>log</span><span>(r.reason.message);</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>});</span></span>
<span class="line"></span>
<span class="line"><span>// ══════ ASYNC/AWAIT — Sugar over Promises ══════</span></span>
<span class="line"><span>// async function always returns Promise</span></span>
<span class="line"><span>// await pauses until Promise resolves</span></span>
<span class="line"><span>// try/catch handles errors</span></span>
<span class="line"></span>
<span class="line"><span>async</span><span> function</span><span> getUserData</span><span>() {</span></span>
<span class="line"><span>    try</span><span> {</span></span>
<span class="line"><span>        const</span><span> user</span><span> =</span><span> await</span><span> fetchUser</span><span>(</span><span>1</span><span>);</span></span>
<span class="line"><span>        console.</span><span>log</span><span>(</span><span>"User:"</span><span>, user);</span></span>
<span class="line"><span>        const</span><span> orders</span><span> =</span><span> await</span><span> getOrders</span><span>(user.name);</span></span>
<span class="line"><span>        console.</span><span>log</span><span>(</span><span>"Orders:"</span><span>, orders);</span></span>
<span class="line"><span>    } </span><span>catch</span><span> (err) {</span></span>
<span class="line"><span>        console.</span><span>log</span><span>(</span><span>"Error:"</span><span>, err.message);</span></span>
<span class="line"><span>    } </span><span>finally</span><span> {</span></span>
<span class="line"><span>        console.</span><span>log</span><span>(</span><span>"Done"</span><span>);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>getUserData</span><span>();</span></span>
<span class="line"></span>
<span class="line"><span>// ══════ ASYNC/AWAIT with fs ══════</span></span>
<span class="line"><span>import</span><span> fsPromises </span><span>from</span><span> 'fs/promises'</span><span>;</span></span>
<span class="line"></span>
<span class="line"><span>async</span><span> function</span><span> fileOps</span><span>() {</span></span>
<span class="line"><span>    try</span><span> {</span></span>
<span class="line"><span>        await</span><span> fsPromises.</span><span>writeFile</span><span>(</span><span>'test.txt'</span><span>, </span><span>'Hello!'</span><span>);</span></span>
<span class="line"><span>        const</span><span> data</span><span> =</span><span> await</span><span> fsPromises.</span><span>readFile</span><span>(</span><span>'test.txt'</span><span>, </span><span>'utf8'</span><span>);</span></span>
<span class="line"><span>        console.</span><span>log</span><span>(data);</span></span>
<span class="line"><span>        await</span><span> fsPromises.</span><span>unlink</span><span>(</span><span>'test.txt'</span><span>);</span></span>
<span class="line"><span>    } </span><span>catch</span><span> (err) {</span></span>
<span class="line"><span>        console.</span><span>log</span><span>(err.message);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>fileOps</span><span>();</span></span>
<span class="line"></span>
<span class="line"><span>// Parallel with async/await</span></span>
<span class="line"><span>const</span><span> [</span><span>u1</span><span>, </span><span>u2</span><span>] </span><span>=</span><span> await</span><span> Promise</span><span>.</span><span>all</span><span>([</span><span>fetchUser</span><span>(</span><span>1</span><span>), </span><span>fetchUser</span><span>(</span><span>2</span><span>)]);</span></span>
<span class="line"></span>
<span class="line"><span>// CALLBACK vs PROMISE vs ASYNC/AWAIT — same operation:</span></span>
<span class="line"><span>// Callback:   fs.readFile('f.txt', 'utf8', (err, data) => {});</span></span>
<span class="line"><span>// Promise:    fsPromises.readFile('f.txt','utf8').then(d => {}).catch(e => {});</span></span>
<span class="line"><span>// Async:      const d = await fsPromises.readFile('f.txt', 'utf8');</span></span></code></pre></div></div></pre>

---

---

# UNIT II — Express, HTTP Services, Middleware

---

## 14. HTTP MODULE — Basic Server

<pre><div class="not-prose my-0 flex w-full flex-col overflow-clip border border-border text-text-primary rounded-lg not-prose relative" data-code-block="true"><div class="border-border flex items-center justify-between border-b px-4 py-2"><div class="flex items-center gap-2"><svg width="14" stroke-width="1.5" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="text-text-secondary"><path d="M9.00001 21L8.00001 21C6.89544 21 6.00001 20.1057 6.00001 19.0011C6.00001 17.4501 6.00001 15.3443 6 14C6 13 4.5 12 4.5 12C4.5 12 6.00001 11 6.00001 10C6.00001 8.827 6.00001 6.62207 6.00001 4.99914C6.00001 3.89457 6.89544 3 8.00001 3L9.00001 3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 21L16 21C17.1046 21 18 20.1057 18 19.0011C18 17.4501 18 15.3443 18 14C18 13 19.5 12 19.5 12C19.5 12 18 11 18 10C18 8.827 18 6.62207 18 4.99914C18 3.89457 17.1046 3 16 3L15 3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg><span class="text-text-secondary text-sm font-medium">JavaScript</span></div><button class="inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ring-offset-2 focus-visible:ring-offset-surface-primary disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 text-sm text-interactive-active hover:text-interactive-normal active:text-text-tertiary font-normal relative rounded-lg p-[6px]" type="button" data-state="closed" data-slot="tooltip-trigger"><svg width="16" height="16" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="text-interactive-positive absolute inset-0 m-auto rotate-90 opacity-0 transition-all duration-300"><path d="M5 13L9 17L19 7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg><svg width="16" height="16" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="absolute inset-0 m-auto opacity-100 transition-opacity duration-300"><path d="M19.4 20H9.6C9.26863 20 9 19.7314 9 19.4V9.6C9 9.26863 9.26863 9 9.6 9H19.4C19.7314 9 20 9.26863 20 9.6V19.4C20 19.7314 19.7314 20 19.4 20Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 9V4.6C15 4.26863 14.7314 4 14.4 4H4.6C4.26863 4 4 4.26863 4 4.6V14.4C4 14.7314 4.26863 15 4.6 15H9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg></button></div><div class="code-block_container__lbMX4"><pre class="shiki github-dark shiki-code-block" tabindex="0"><code class="whitespace-pre-wrap break-words"><span class="line"><span>import</span><span> http </span><span>from</span><span> 'http'</span><span>;</span></span>
<span class="line"></span>
<span class="line"><span>// SIMPLEST SERVER</span></span>
<span class="line"><span>const</span><span> server</span><span> =</span><span> http.</span><span>createServer</span><span>((</span><span>req</span><span>, </span><span>res</span><span>) </span><span>=></span><span> {</span></span>
<span class="line"><span>    res.</span><span>writeHead</span><span>(</span><span>200</span><span>, { </span><span>'Content-Type'</span><span>: </span><span>'text/plain'</span><span> });</span></span>
<span class="line"><span>    res.</span><span>end</span><span>(</span><span>"Hello World"</span><span>);</span></span>
<span class="line"><span>});</span></span>
<span class="line"><span>server.</span><span>listen</span><span>(</span><span>3000</span><span>, () </span><span>=></span><span> console.</span><span>log</span><span>(</span><span>"Server on port 3000"</span><span>));</span></span>
<span class="line"></span>
<span class="line"><span>// WITH ROUTING</span></span>
<span class="line"><span>const</span><span> server2</span><span> =</span><span> http.</span><span>createServer</span><span>((</span><span>req</span><span>, </span><span>res</span><span>) </span><span>=></span><span> {</span></span>
<span class="line"><span>    if</span><span> (req.url </span><span>===</span><span> '/'</span><span> &&</span><span> req.method </span><span>===</span><span> 'GET'</span><span>) {</span></span>
<span class="line"><span>        res.</span><span>writeHead</span><span>(</span><span>200</span><span>, { </span><span>'Content-Type'</span><span>: </span><span>'text/html'</span><span> });</span></span>
<span class="line"><span>        res.</span><span>end</span><span>(</span><span>"<h1>Home</h1>"</span><span>);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    else</span><span> if</span><span> (req.url </span><span>===</span><span> '/api/data'</span><span> &&</span><span> req.method </span><span>===</span><span> 'GET'</span><span>) {</span></span>
<span class="line"><span>        res.</span><span>writeHead</span><span>(</span><span>200</span><span>, { </span><span>'Content-Type'</span><span>: </span><span>'application/json'</span><span> });</span></span>
<span class="line"><span>        res.</span><span>end</span><span>(</span><span>JSON</span><span>.</span><span>stringify</span><span>({ message: </span><span>"Hello"</span><span> }));</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    else</span><span> if</span><span> (req.url </span><span>===</span><span> '/api/data'</span><span> &&</span><span> req.method </span><span>===</span><span> 'POST'</span><span>) {</span></span>
<span class="line"><span>        let</span><span> body </span><span>=</span><span> ''</span><span>;</span></span>
<span class="line"><span>        req.</span><span>on</span><span>(</span><span>'data'</span><span>, </span><span>chunk</span><span> =></span><span> { body </span><span>+=</span><span> chunk.</span><span>toString</span><span>(); });</span></span>
<span class="line"><span>        req.</span><span>on</span><span>(</span><span>'end'</span><span>, () </span><span>=></span><span> {</span></span>
<span class="line"><span>            res.</span><span>writeHead</span><span>(</span><span>201</span><span>, { </span><span>'Content-Type'</span><span>: </span><span>'application/json'</span><span> });</span></span>
<span class="line"><span>            res.</span><span>end</span><span>(</span><span>JSON</span><span>.</span><span>stringify</span><span>({ received: </span><span>JSON</span><span>.</span><span>parse</span><span>(body) }));</span></span>
<span class="line"><span>        });</span></span>
<span class="line"><span>        return</span><span>;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    else</span><span> {</span></span>
<span class="line"><span>        res.</span><span>writeHead</span><span>(</span><span>404</span><span>);</span></span>
<span class="line"><span>        res.</span><span>end</span><span>(</span><span>JSON</span><span>.</span><span>stringify</span><span>({ error: </span><span>"Not Found"</span><span> }));</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>});</span></span></code></pre></div></div></pre>

---

## 15. REQUEST, RESPONSE & SERVER OBJECTS

<pre><div class="not-prose my-0 flex w-full flex-col overflow-clip border border-border text-text-primary rounded-lg not-prose relative" data-code-block="true"><div class="border-border flex items-center justify-between border-b px-4 py-2"><div class="flex items-center gap-2"><svg width="14" stroke-width="1.5" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="text-text-secondary"><path d="M9.00001 21L8.00001 21C6.89544 21 6.00001 20.1057 6.00001 19.0011C6.00001 17.4501 6.00001 15.3443 6 14C6 13 4.5 12 4.5 12C4.5 12 6.00001 11 6.00001 10C6.00001 8.827 6.00001 6.62207 6.00001 4.99914C6.00001 3.89457 6.89544 3 8.00001 3L9.00001 3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 21L16 21C17.1046 21 18 20.1057 18 19.0011C18 17.4501 18 15.3443 18 14C18 13 19.5 12 19.5 12C19.5 12 18 11 18 10C18 8.827 18 6.62207 18 4.99914C18 3.89457 17.1046 3 16 3L15 3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg><span class="text-text-secondary text-sm font-medium">JavaScript</span></div><button class="inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ring-offset-2 focus-visible:ring-offset-surface-primary disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 text-sm text-interactive-active hover:text-interactive-normal active:text-text-tertiary font-normal relative rounded-lg p-[6px]" type="button" data-state="closed" data-slot="tooltip-trigger"><svg width="16" height="16" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="text-interactive-positive absolute inset-0 m-auto rotate-90 opacity-0 transition-all duration-300"><path d="M5 13L9 17L19 7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg><svg width="16" height="16" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="absolute inset-0 m-auto opacity-100 transition-opacity duration-300"><path d="M19.4 20H9.6C9.26863 20 9 19.7314 9 19.4V9.6C9 9.26863 9.26863 9 9.6 9H19.4C19.7314 9 20 9.26863 20 9.6V19.4C20 19.7314 19.7314 20 19.4 20Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 9V4.6C15 4.26863 14.7314 4 14.4 4H4.6C4.26863 4 4 4.26863 4 4.6V14.4C4 14.7314 4.26863 15 4.6 15H9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg></button></div><div class="code-block_container__lbMX4"><pre class="shiki github-dark shiki-code-block" tabindex="0"><code class="whitespace-pre-wrap break-words"><span class="line"><span>import</span><span> http </span><span>from</span><span> 'http'</span><span>;</span></span>
<span class="line"></span>
<span class="line"><span>const</span><span> server</span><span> =</span><span> http.</span><span>createServer</span><span>((</span><span>req</span><span>, </span><span>res</span><span>) </span><span>=></span><span> {</span></span>
<span class="line"></span>
<span class="line"><span>    // ══ REQUEST (req) — IncomingMessage ══</span></span>
<span class="line"><span>    req.method;          </span><span>// 'GET', 'POST', etc.</span></span>
<span class="line"><span>    req.url;             </span><span>// '/path?query=value'</span></span>
<span class="line"><span>    req.httpVersion;     </span><span>// '1.1'</span></span>
<span class="line"><span>    req.headers;         </span><span>// { host, content-type, user-agent, ... }</span></span>
<span class="line"><span>    req.headers.host;    </span><span>// 'localhost:3000'</span></span>
<span class="line"></span>
<span class="line"><span>    // Reading body (POST)</span></span>
<span class="line"><span>    let</span><span> body </span><span>=</span><span> ''</span><span>;</span></span>
<span class="line"><span>    req.</span><span>on</span><span>(</span><span>'data'</span><span>, </span><span>chunk</span><span> =></span><span> { body </span><span>+=</span><span> chunk.</span><span>toString</span><span>(); });</span></span>
<span class="line"><span>    req.</span><span>on</span><span>(</span><span>'end'</span><span>, () </span><span>=></span><span> { console.</span><span>log</span><span>(</span><span>"Body:"</span><span>, body); });</span></span>
<span class="line"></span>
<span class="line"><span>    // ══ RESPONSE (res) — ServerResponse ══</span></span>
<span class="line"><span>    // Method 1: writeHead (status + headers at once)</span></span>
<span class="line"><span>    res.</span><span>writeHead</span><span>(</span><span>200</span><span>, {</span></span>
<span class="line"><span>        'Content-Type'</span><span>: </span><span>'application/json'</span><span>,</span></span>
<span class="line"><span>        'X-Custom'</span><span>: </span><span>'value'</span></span>
<span class="line"><span>    });</span></span>
<span class="line"></span>
<span class="line"><span>    // Method 2: Individual</span></span>
<span class="line"><span>    res.statusCode </span><span>=</span><span> 200</span><span>;</span></span>
<span class="line"><span>    res.</span><span>setHeader</span><span>(</span><span>'Content-Type'</span><span>, </span><span>'text/html'</span><span>);</span></span>
<span class="line"></span>
<span class="line"><span>    res.</span><span>write</span><span>(</span><span>"partial "</span><span>);     </span><span>// Write partial data</span></span>
<span class="line"><span>    res.</span><span>write</span><span>(</span><span>"response"</span><span>);</span></span>
<span class="line"><span>    res.</span><span>end</span><span>(</span><span>" done"</span><span>);          </span><span>// MUST call end()!</span></span>
<span class="line"></span>
<span class="line"><span>    // Other methods</span></span>
<span class="line"><span>    res.</span><span>getHeader</span><span>(</span><span>'Content-Type'</span><span>);</span></span>
<span class="line"><span>    res.</span><span>hasHeader</span><span>(</span><span>'X-Custom'</span><span>);</span></span>
<span class="line"><span>    res.</span><span>removeHeader</span><span>(</span><span>'X-Custom'</span><span>);</span></span>
<span class="line"><span>});</span></span>
<span class="line"></span>
<span class="line"><span>// ══ SERVER ══</span></span>
<span class="line"><span>server.</span><span>listen</span><span>(</span><span>3000</span><span>, </span><span>'127.0.0.1'</span><span>, () </span><span>=></span><span> {</span></span>
<span class="line"><span>    console.</span><span>log</span><span>(server.</span><span>address</span><span>());  </span><span>// { address, port, family }</span></span>
<span class="line"><span>});</span></span>
<span class="line"><span>server.</span><span>on</span><span>(</span><span>'error'</span><span>, (</span><span>err</span><span>) </span><span>=></span><span> {</span></span>
<span class="line"><span>    if</span><span> (err.code </span><span>===</span><span> 'EADDRINUSE'</span><span>) console.</span><span>log</span><span>(</span><span>"Port in use!"</span><span>);</span></span>
<span class="line"><span>});</span></span></code></pre></div></div></pre>

---

## 16. STATUS CODES & HEADERS

<pre><div class="not-prose my-0 flex w-full flex-col overflow-clip border border-border text-text-primary rounded-lg not-prose relative" data-code-block="true"><div class="border-border flex items-center justify-between border-b px-4 py-2"><div class="flex items-center gap-2"><svg width="14" stroke-width="1.5" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="text-text-secondary"><path d="M9.00001 21L8.00001 21C6.89544 21 6.00001 20.1057 6.00001 19.0011C6.00001 17.4501 6.00001 15.3443 6 14C6 13 4.5 12 4.5 12C4.5 12 6.00001 11 6.00001 10C6.00001 8.827 6.00001 6.62207 6.00001 4.99914C6.00001 3.89457 6.89544 3 8.00001 3L9.00001 3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 21L16 21C17.1046 21 18 20.1057 18 19.0011C18 17.4501 18 15.3443 18 14C18 13 19.5 12 19.5 12C19.5 12 18 11 18 10C18 8.827 18 6.62207 18 4.99914C18 3.89457 17.1046 3 16 3L15 3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg><span class="text-text-secondary text-sm font-medium">text</span></div><button class="inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ring-offset-2 focus-visible:ring-offset-surface-primary disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 text-sm text-interactive-active hover:text-interactive-normal active:text-text-tertiary font-normal relative rounded-lg p-[6px]" type="button" data-state="closed" data-slot="tooltip-trigger"><svg width="16" height="16" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="text-interactive-positive absolute inset-0 m-auto rotate-90 opacity-0 transition-all duration-300"><path d="M5 13L9 17L19 7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg><svg width="16" height="16" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="absolute inset-0 m-auto opacity-100 transition-opacity duration-300"><path d="M19.4 20H9.6C9.26863 20 9 19.7314 9 19.4V9.6C9 9.26863 9.26863 9 9.6 9H19.4C19.7314 9 20 9.26863 20 9.6V19.4C20 19.7314 19.7314 20 19.4 20Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 9V4.6C15 4.26863 14.7314 4 14.4 4H4.6C4.26863 4 4 4.26863 4 4.6V14.4C4 14.7314 4.26863 15 4.6 15H9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg></button></div><div class="code-block_container__lbMX4"><pre class="shiki github-dark shiki-code-block" tabindex="0"><code class="whitespace-pre-wrap break-words"><span class="line"><span>STATUS CODES:</span></span>
<span class="line"><span>  2xx SUCCESS:     200 OK, 201 Created, 204 No Content</span></span>
<span class="line"><span>  3xx REDIRECT:    301 Moved Permanently, 302 Found</span></span>
<span class="line"><span>  4xx CLIENT ERR:  400 Bad Request, 401 Unauthorized,</span></span>
<span class="line"><span>                   403 Forbidden, 404 Not Found,</span></span>
<span class="line"><span>                   422 Unprocessable, 429 Too Many Requests</span></span>
<span class="line"><span>  5xx SERVER ERR:  500 Internal Server Error, 503 Unavailable</span></span>
<span class="line"><span></span></span>
<span class="line"><span>COMMON CONTENT-TYPES:</span></span>
<span class="line"><span>  'text/plain'           — Plain text</span></span>
<span class="line"><span>  'text/html'            — HTML</span></span>
<span class="line"><span>  'application/json'     — JSON</span></span>
<span class="line"><span>  'image/png'            — PNG image</span></span>
<span class="line"><span>  'application/octet-stream' — Binary data</span></span></code></pre></div></div></pre>

---

## 17. MICROSERVICES VS MONOLITHS

<pre><div class="not-prose my-0 flex w-full flex-col overflow-clip border border-border text-text-primary rounded-lg not-prose relative" data-code-block="true"><div class="border-border flex items-center justify-between border-b px-4 py-2"><div class="flex items-center gap-2"><svg width="14" stroke-width="1.5" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="text-text-secondary"><path d="M9.00001 21L8.00001 21C6.89544 21 6.00001 20.1057 6.00001 19.0011C6.00001 17.4501 6.00001 15.3443 6 14C6 13 4.5 12 4.5 12C4.5 12 6.00001 11 6.00001 10C6.00001 8.827 6.00001 6.62207 6.00001 4.99914C6.00001 3.89457 6.89544 3 8.00001 3L9.00001 3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 21L16 21C17.1046 21 18 20.1057 18 19.0011C18 17.4501 18 15.3443 18 14C18 13 19.5 12 19.5 12C19.5 12 18 11 18 10C18 8.827 18 6.62207 18 4.99914C18 3.89457 17.1046 3 16 3L15 3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg><span class="text-text-secondary text-sm font-medium">text</span></div><button class="inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ring-offset-2 focus-visible:ring-offset-surface-primary disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 text-sm text-interactive-active hover:text-interactive-normal active:text-text-tertiary font-normal relative rounded-lg p-[6px]" type="button" data-state="closed" data-slot="tooltip-trigger"><svg width="16" height="16" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="text-interactive-positive absolute inset-0 m-auto rotate-90 opacity-0 transition-all duration-300"><path d="M5 13L9 17L19 7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg><svg width="16" height="16" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="absolute inset-0 m-auto opacity-100 transition-opacity duration-300"><path d="M19.4 20H9.6C9.26863 20 9 19.7314 9 19.4V9.6C9 9.26863 9.26863 9 9.6 9H19.4C19.7314 9 20 9.26863 20 9.6V19.4C20 19.7314 19.7314 20 19.4 20Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 9V4.6C15 4.26863 14.7314 4 14.4 4H4.6C4.26863 4 4 4.26863 4 4.6V14.4C4 14.7314 4.26863 15 4.6 15H9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg></button></div><div class="code-block_container__lbMX4"><pre class="shiki github-dark shiki-code-block" tabindex="0"><code class="whitespace-pre-wrap break-words"><span class="line"><span>MONOLITH:</span></span>
<span class="line"><span>  • ONE codebase, ONE database, ONE deployment</span></span>
<span class="line"><span>  • All modules tightly coupled</span></span>
<span class="line"><span>  ✅ Simple to develop, test, deploy (small apps)</span></span>
<span class="line"><span>  ❌ One bug crashes EVERYTHING</span></span>
<span class="line"><span>  ❌ Can't scale individual parts</span></span>
<span class="line"><span>  ❌ Technology lock-in</span></span>
<span class="line"><span></span></span>
<span class="line"><span>MICROSERVICES:</span></span>
<span class="line"><span>  • SEPARATE services, SEPARATE databases</span></span>
<span class="line"><span>  • Services communicate via APIs</span></span>
<span class="line"><span>  • Can use DIFFERENT languages per service</span></span>
<span class="line"><span>  ✅ Independent scaling, deployment, fault isolation</span></span>
<span class="line"><span>  ✅ Technology flexibility</span></span>
<span class="line"><span>  ❌ Complex infrastructure (Docker, Kubernetes)</span></span>
<span class="line"><span>  ❌ Network latency, debugging harder</span></span>
<span class="line"><span></span></span>
<span class="line"><span>WHEN TO USE:</span></span>
<span class="line"><span>  Monolith → Small teams, startups, MVPs</span></span>
<span class="line"><span>  Microservices → Large teams, complex apps, high scale</span></span></code></pre></div></div></pre>

---

## 18. EXPRESS — Setup & Routing

<pre><div class="not-prose my-0 flex w-full flex-col overflow-clip border border-border text-text-primary rounded-lg not-prose relative" data-code-block="true"><div class="border-border flex items-center justify-between border-b px-4 py-2"><div class="flex items-center gap-2"><svg width="14" stroke-width="1.5" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="text-text-secondary"><path d="M9.00001 21L8.00001 21C6.89544 21 6.00001 20.1057 6.00001 19.0011C6.00001 17.4501 6.00001 15.3443 6 14C6 13 4.5 12 4.5 12C4.5 12 6.00001 11 6.00001 10C6.00001 8.827 6.00001 6.62207 6.00001 4.99914C6.00001 3.89457 6.89544 3 8.00001 3L9.00001 3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 21L16 21C17.1046 21 18 20.1057 18 19.0011C18 17.4501 18 15.3443 18 14C18 13 19.5 12 19.5 12C19.5 12 18 11 18 10C18 8.827 18 6.62207 18 4.99914C18 3.89457 17.1046 3 16 3L15 3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg><span class="text-text-secondary text-sm font-medium">JavaScript</span></div><button class="inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ring-offset-2 focus-visible:ring-offset-surface-primary disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 text-sm text-interactive-active hover:text-interactive-normal active:text-text-tertiary font-normal relative rounded-lg p-[6px]" type="button" data-state="closed" data-slot="tooltip-trigger"><svg width="16" height="16" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="text-interactive-positive absolute inset-0 m-auto rotate-90 opacity-0 transition-all duration-300"><path d="M5 13L9 17L19 7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg><svg width="16" height="16" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="absolute inset-0 m-auto opacity-100 transition-opacity duration-300"><path d="M19.4 20H9.6C9.26863 20 9 19.7314 9 19.4V9.6C9 9.26863 9.26863 9 9.6 9H19.4C19.7314 9 20 9.26863 20 9.6V19.4C20 19.7314 19.7314 20 19.4 20Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 9V4.6C15 4.26863 14.7314 4 14.4 4H4.6C4.26863 4 4 4.26863 4 4.6V14.4C4 14.7314 4.26863 15 4.6 15H9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg></button></div><div class="code-block_container__lbMX4"><pre class="shiki github-dark shiki-code-block" tabindex="0"><code class="whitespace-pre-wrap break-words"><span class="line"><span>// Install: npm install express</span></span>
<span class="line"><span>// package.json: "type": "module"</span></span>
<span class="line"></span>
<span class="line"><span>import</span><span> express </span><span>from</span><span> 'express'</span><span>;</span></span>
<span class="line"><span>import</span><span> path </span><span>from</span><span> 'path'</span><span>;</span></span>
<span class="line"><span>import</span><span> { fileURLToPath } </span><span>from</span><span> 'url'</span><span>;</span></span>
<span class="line"></span>
<span class="line"><span>const</span><span> __filename</span><span> =</span><span> fileURLToPath</span><span>(</span><span>import</span><span>.</span><span>meta</span><span>.url);</span></span>
<span class="line"><span>const</span><span> __dirname</span><span> =</span><span> path.</span><span>dirname</span><span>(__filename);</span></span>
<span class="line"></span>
<span class="line"><span>const</span><span> app</span><span> =</span><span> express</span><span>();</span></span>
<span class="line"></span>
<span class="line"><span>// ══════ MIDDLEWARE ══════</span></span>
<span class="line"><span>app.</span><span>use</span><span>(express.</span><span>json</span><span>());                          </span><span>// Parse JSON bodies</span></span>
<span class="line"><span>app.</span><span>use</span><span>(express.</span><span>urlencoded</span><span>({ extended: </span><span>true</span><span> }));  </span><span>// Parse form data</span></span>
<span class="line"><span>app.</span><span>use</span><span>(express.</span><span>static</span><span>(</span><span>'public'</span><span>));                 </span><span>// Serve static files</span></span>
<span class="line"></span>
<span class="line"><span>// ══════ RESPONSE METHODS ══════</span></span>
<span class="line"><span>// res.send()     → string, HTML, object</span></span>
<span class="line"><span>// res.json()     → JSON (auto Content-Type)</span></span>
<span class="line"><span>// res.sendFile() → file</span></span>
<span class="line"></span>
<span class="line"><span>// ══════ IN-MEMORY DATA ══════</span></span>
<span class="line"><span>let</span><span> users </span><span>=</span><span> [</span></span>
<span class="line"><span>    { id: </span><span>1</span><span>, name: </span><span>"Rahul"</span><span>, email: </span><span>"rahul@test.com"</span><span> },</span></span>
<span class="line"><span>    { id: </span><span>2</span><span>, name: </span><span>"Priya"</span><span>, email: </span><span>"priya@test.com"</span><span> }</span></span>
<span class="line"><span>];</span></span>
<span class="line"></span>
<span class="line"><span>// ══════ GET ══════</span></span>
<span class="line"><span>app.</span><span>get</span><span>(</span><span>'/api/users'</span><span>, (</span><span>req</span><span>, </span><span>res</span><span>) </span><span>=></span><span> {</span></span>
<span class="line"><span>    res.</span><span>json</span><span>(users);</span></span>
<span class="line"><span>});</span></span>
<span class="line"></span>
<span class="line"><span>// Route parameter (:id)</span></span>
<span class="line"><span>app.</span><span>get</span><span>(</span><span>'/api/users/:id'</span><span>, (</span><span>req</span><span>, </span><span>res</span><span>) </span><span>=></span><span> {</span></span>
<span class="line"><span>    // req.params.id → string from URL</span></span>
<span class="line"><span>    const</span><span> user</span><span> =</span><span> users.</span><span>find</span><span>(</span><span>u</span><span> =></span><span> u.id </span><span>===</span><span> parseInt</span><span>(req.params.id));</span></span>
<span class="line"><span>    if</span><span> (</span><span>!</span><span>user) </span><span>return</span><span> res.</span><span>status</span><span>(</span><span>404</span><span>).</span><span>json</span><span>({ error: </span><span>"Not found"</span><span> });</span></span>
<span class="line"><span>    res.</span><span>json</span><span>(user);</span></span>
<span class="line"><span>});</span></span>
<span class="line"></span>
<span class="line"><span>// Query parameters (?key=value)</span></span>
<span class="line"><span>// URL: /api/search?name=Rahul&age=25</span></span>
<span class="line"><span>app.</span><span>get</span><span>(</span><span>'/api/search'</span><span>, (</span><span>req</span><span>, </span><span>res</span><span>) </span><span>=></span><span> {</span></span>
<span class="line"><span>    // req.query → { name: 'Rahul', age: '25' }</span></span>
<span class="line"><span>    res.</span><span>json</span><span>({ query: req.query });</span></span>
<span class="line"><span>});</span></span>
<span class="line"></span>
<span class="line"><span>// ══════ POST ══════</span></span>
<span class="line"><span>app.</span><span>post</span><span>(</span><span>'/api/users'</span><span>, (</span><span>req</span><span>, </span><span>res</span><span>) </span><span>=></span><span> {</span></span>
<span class="line"><span>    // req.body → data from client (needs express.json())</span></span>
<span class="line"><span>    const</span><span> { </span><span>name</span><span>, </span><span>email</span><span> } </span><span>=</span><span> req.body;</span></span>
<span class="line"><span>    if</span><span> (</span><span>!</span><span>name </span><span>||</span><span> !</span><span>email) </span><span>return</span><span> res.</span><span>status</span><span>(</span><span>400</span><span>).</span><span>json</span><span>({ error: </span><span>"Required"</span><span> });</span></span>
<span class="line"><span>    const</span><span> newUser</span><span> =</span><span> { id: users.</span><span>length</span><span> +</span><span> 1</span><span>, name, email };</span></span>
<span class="line"><span>    users.</span><span>push</span><span>(newUser);</span></span>
<span class="line"><span>    res.</span><span>status</span><span>(</span><span>201</span><span>).</span><span>json</span><span>({ message: </span><span>"Created!"</span><span>, user: newUser });</span></span>
<span class="line"><span>});</span></span>
<span class="line"></span>
<span class="line"><span>// ══════ PUT ══════</span></span>
<span class="line"><span>app.</span><span>put</span><span>(</span><span>'/api/users/:id'</span><span>, (</span><span>req</span><span>, </span><span>res</span><span>) </span><span>=></span><span> {</span></span>
<span class="line"><span>    const</span><span> user</span><span> =</span><span> users.</span><span>find</span><span>(</span><span>u</span><span> =></span><span> u.id </span><span>===</span><span> parseInt</span><span>(req.params.id));</span></span>
<span class="line"><span>    if</span><span> (</span><span>!</span><span>user) </span><span>return</span><span> res.</span><span>status</span><span>(</span><span>404</span><span>).</span><span>json</span><span>({ error: </span><span>"Not found"</span><span> });</span></span>
<span class="line"><span>    user.name </span><span>=</span><span> req.body.name </span><span>||</span><span> user.name;</span></span>
<span class="line"><span>    user.email </span><span>=</span><span> req.body.email </span><span>||</span><span> user.email;</span></span>
<span class="line"><span>    res.</span><span>json</span><span>({ message: </span><span>"Updated!"</span><span>, user });</span></span>
<span class="line"><span>});</span></span>
<span class="line"></span>
<span class="line"><span>// ══════ DELETE ══════</span></span>
<span class="line"><span>app.</span><span>delete</span><span>(</span><span>'/api/users/:id'</span><span>, (</span><span>req</span><span>, </span><span>res</span><span>) </span><span>=></span><span> {</span></span>
<span class="line"><span>    const</span><span> idx</span><span> =</span><span> users.</span><span>findIndex</span><span>(</span><span>u</span><span> =></span><span> u.id </span><span>===</span><span> parseInt</span><span>(req.params.id));</span></span>
<span class="line"><span>    if</span><span> (idx </span><span>===</span><span> -</span><span>1</span><span>) </span><span>return</span><span> res.</span><span>status</span><span>(</span><span>404</span><span>).</span><span>json</span><span>({ error: </span><span>"Not found"</span><span> });</span></span>
<span class="line"><span>    const</span><span> deleted</span><span> =</span><span> users.</span><span>splice</span><span>(idx, </span><span>1</span><span>);</span></span>
<span class="line"><span>    res.</span><span>json</span><span>({ message: </span><span>"Deleted!"</span><span>, user: deleted[</span><span>0</span><span>] });</span></span>
<span class="line"><span>});</span></span>
<span class="line"></span>
<span class="line"><span>// req properties: .params, .query, .body, .headers, .method, .url, .ip</span></span>
<span class="line"><span>app.</span><span>listen</span><span>(</span><span>3000</span><span>, () </span><span>=></span><span> console.</span><span>log</span><span>(</span><span>"Server on port 3000"</span><span>));</span></span></code></pre></div></div></pre>

---

## 19. EXPRESS ROUTER

<pre><div class="not-prose my-0 flex w-full flex-col overflow-clip border border-border text-text-primary rounded-lg not-prose relative" data-code-block="true"><div class="border-border flex items-center justify-between border-b px-4 py-2"><div class="flex items-center gap-2"><svg width="14" stroke-width="1.5" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="text-text-secondary"><path d="M9.00001 21L8.00001 21C6.89544 21 6.00001 20.1057 6.00001 19.0011C6.00001 17.4501 6.00001 15.3443 6 14C6 13 4.5 12 4.5 12C4.5 12 6.00001 11 6.00001 10C6.00001 8.827 6.00001 6.62207 6.00001 4.99914C6.00001 3.89457 6.89544 3 8.00001 3L9.00001 3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 21L16 21C17.1046 21 18 20.1057 18 19.0011C18 17.4501 18 15.3443 18 14C18 13 19.5 12 19.5 12C19.5 12 18 11 18 10C18 8.827 18 6.62207 18 4.99914C18 3.89457 17.1046 3 16 3L15 3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg><span class="text-text-secondary text-sm font-medium">JavaScript</span></div><button class="inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ring-offset-2 focus-visible:ring-offset-surface-primary disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 text-sm text-interactive-active hover:text-interactive-normal active:text-text-tertiary font-normal relative rounded-lg p-[6px]" type="button" data-state="closed" data-slot="tooltip-trigger"><svg width="16" height="16" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="text-interactive-positive absolute inset-0 m-auto rotate-90 opacity-0 transition-all duration-300"><path d="M5 13L9 17L19 7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg><svg width="16" height="16" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="absolute inset-0 m-auto opacity-100 transition-opacity duration-300"><path d="M19.4 20H9.6C9.26863 20 9 19.7314 9 19.4V9.6C9 9.26863 9.26863 9 9.6 9H19.4C19.7314 9 20 9.26863 20 9.6V19.4C20 19.7314 19.7314 20 19.4 20Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 9V4.6C15 4.26863 14.7314 4 14.4 4H4.6C4.26863 4 4 4.26863 4 4.6V14.4C4 14.7314 4.26863 15 4.6 15H9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg></button></div><div class="code-block_container__lbMX4"><pre class="shiki github-dark shiki-code-block" tabindex="0"><code class="whitespace-pre-wrap break-words"><span class="line"><span>// Split routes into separate files</span></span>
<span class="line"></span>
<span class="line"><span>// ──── routes/foodroutes.js ────</span></span>
<span class="line"><span>import</span><span> express </span><span>from</span><span> 'express'</span><span>;</span></span>
<span class="line"><span>const</span><span> router</span><span> =</span><span> express.</span><span>Router</span><span>();</span></span>
<span class="line"></span>
<span class="line"><span>let</span><span> foods </span><span>=</span><span> [</span></span>
<span class="line"><span>    { id: </span><span>1</span><span>, name: </span><span>"Pizza"</span><span>, price: </span><span>299</span><span> },</span></span>
<span class="line"><span>    { id: </span><span>2</span><span>, name: </span><span>"Burger"</span><span>, price: </span><span>149</span><span> }</span></span>
<span class="line"><span>];</span></span>
<span class="line"></span>
<span class="line"><span>router.</span><span>get</span><span>(</span><span>'/food'</span><span>, (</span><span>req</span><span>, </span><span>res</span><span>) </span><span>=></span><span> { res.</span><span>json</span><span>(foods); });</span></span>
<span class="line"></span>
<span class="line"><span>router.</span><span>get</span><span>(</span><span>'/food/:id'</span><span>, (</span><span>req</span><span>, </span><span>res</span><span>) </span><span>=></span><span> {</span></span>
<span class="line"><span>    const</span><span> food</span><span> =</span><span> foods.</span><span>find</span><span>(</span><span>f</span><span> =></span><span> f.id </span><span>===</span><span> parseInt</span><span>(req.params.id));</span></span>
<span class="line"><span>    if</span><span> (</span><span>!</span><span>food) </span><span>return</span><span> res.</span><span>status</span><span>(</span><span>404</span><span>).</span><span>json</span><span>({ error: </span><span>"Not found"</span><span> });</span></span>
<span class="line"><span>    res.</span><span>json</span><span>(food);</span></span>
<span class="line"><span>});</span></span>
<span class="line"></span>
<span class="line"><span>router.</span><span>post</span><span>(</span><span>'/food'</span><span>, (</span><span>req</span><span>, </span><span>res</span><span>) </span><span>=></span><span> {</span></span>
<span class="line"><span>    const</span><span> newFood</span><span> =</span><span> { id: foods.</span><span>length</span><span> +</span><span> 1</span><span>, </span><span>...</span><span>req.body };</span></span>
<span class="line"><span>    foods.</span><span>push</span><span>(newFood);</span></span>
<span class="line"><span>    res.</span><span>status</span><span>(</span><span>201</span><span>).</span><span>json</span><span>(newFood);</span></span>
<span class="line"><span>});</span></span>
<span class="line"></span>
<span class="line"><span>router.</span><span>delete</span><span>(</span><span>'/food/:id'</span><span>, (</span><span>req</span><span>, </span><span>res</span><span>) </span><span>=></span><span> {</span></span>
<span class="line"><span>    foods </span><span>=</span><span> foods.</span><span>filter</span><span>(</span><span>f</span><span> =></span><span> f.id </span><span>!==</span><span> parseInt</span><span>(req.params.id));</span></span>
<span class="line"><span>    res.</span><span>json</span><span>({ message: </span><span>"Deleted!"</span><span> });</span></span>
<span class="line"><span>});</span></span>
<span class="line"></span>
<span class="line"><span>export</span><span> default</span><span> router;  </span><span>// ES Module export!</span></span>
<span class="line"></span>
<span class="line"><span>// ──── index.js (Main file) ────</span></span>
<span class="line"><span>import</span><span> express </span><span>from</span><span> 'express'</span><span>;</span></span>
<span class="line"><span>import</span><span> foodRoutes </span><span>from</span><span> './routes/foodroutes.js'</span><span>;</span></span>
<span class="line"></span>
<span class="line"><span>const</span><span> app</span><span> =</span><span> express</span><span>();</span></span>
<span class="line"><span>app.</span><span>use</span><span>(express.</span><span>json</span><span>());</span></span>
<span class="line"></span>
<span class="line"><span>// Mount router with prefix</span></span>
<span class="line"><span>app.</span><span>use</span><span>(</span><span>'/api'</span><span>, foodRoutes);  </span><span>// /api/food, /api/food/:id</span></span>
<span class="line"></span>
<span class="line"><span>app.</span><span>listen</span><span>(</span><span>3000</span><span>);</span></span></code></pre></div></div></pre>

---

## 20. EXPRESS VALIDATOR

<pre><div class="not-prose my-0 flex w-full flex-col overflow-clip border border-border text-text-primary rounded-lg not-prose relative" data-code-block="true"><div class="border-border flex items-center justify-between border-b px-4 py-2"><div class="flex items-center gap-2"><svg width="14" stroke-width="1.5" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="text-text-secondary"><path d="M9.00001 21L8.00001 21C6.89544 21 6.00001 20.1057 6.00001 19.0011C6.00001 17.4501 6.00001 15.3443 6 14C6 13 4.5 12 4.5 12C4.5 12 6.00001 11 6.00001 10C6.00001 8.827 6.00001 6.62207 6.00001 4.99914C6.00001 3.89457 6.89544 3 8.00001 3L9.00001 3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 21L16 21C17.1046 21 18 20.1057 18 19.0011C18 17.4501 18 15.3443 18 14C18 13 19.5 12 19.5 12C19.5 12 18 11 18 10C18 8.827 18 6.62207 18 4.99914C18 3.89457 17.1046 3 16 3L15 3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg><span class="text-text-secondary text-sm font-medium">JavaScript</span></div><button class="inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ring-offset-2 focus-visible:ring-offset-surface-primary disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 text-sm text-interactive-active hover:text-interactive-normal active:text-text-tertiary font-normal relative rounded-lg p-[6px]" type="button" data-state="closed" data-slot="tooltip-trigger"><svg width="16" height="16" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="text-interactive-positive absolute inset-0 m-auto rotate-90 opacity-0 transition-all duration-300"><path d="M5 13L9 17L19 7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg><svg width="16" height="16" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="absolute inset-0 m-auto opacity-100 transition-opacity duration-300"><path d="M19.4 20H9.6C9.26863 20 9 19.7314 9 19.4V9.6C9 9.26863 9.26863 9 9.6 9H19.4C19.7314 9 20 9.26863 20 9.6V19.4C20 19.7314 19.7314 20 19.4 20Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 9V4.6C15 4.26863 14.7314 4 14.4 4H4.6C4.26863 4 4 4.26863 4 4.6V14.4C4 14.7314 4.26863 15 4.6 15H9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg></button></div><div class="code-block_container__lbMX4"><pre class="shiki github-dark shiki-code-block" tabindex="0"><code class="whitespace-pre-wrap break-words"><span class="line"><span>// Install: npm install express-validator</span></span>
<span class="line"></span>
<span class="line"><span>import</span><span> express </span><span>from</span><span> 'express'</span><span>;</span></span>
<span class="line"><span>import</span><span> { body, param, query, validationResult } </span><span>from</span><span> 'express-validator'</span><span>;</span></span>
<span class="line"></span>
<span class="line"><span>const</span><span> app</span><span> =</span><span> express</span><span>();</span></span>
<span class="line"><span>app.</span><span>use</span><span>(express.</span><span>json</span><span>());</span></span>
<span class="line"></span>
<span class="line"><span>// Validation rules go as MIDDLEWARE ARRAY</span></span>
<span class="line"><span>app.</span><span>post</span><span>(</span><span>"/submit"</span><span>,</span></span>
<span class="line"><span>    [</span></span>
<span class="line"><span>        body</span><span>(</span><span>'name'</span><span>).</span><span>notEmpty</span><span>().</span><span>withMessage</span><span>(</span><span>'Name required'</span><span>)</span></span>
<span class="line"><span>                    .</span><span>isLength</span><span>({ min: </span><span>3</span><span> }).</span><span>withMessage</span><span>(</span><span>'Min 3 chars'</span><span>)</span></span>
<span class="line"><span>                    .</span><span>trim</span><span>(),</span></span>
<span class="line"></span>
<span class="line"><span>        body</span><span>(</span><span>'email'</span><span>).</span><span>isEmail</span><span>().</span><span>withMessage</span><span>(</span><span>'Invalid Email'</span><span>)</span></span>
<span class="line"><span>                     .</span><span>normalizeEmail</span><span>(),</span></span>
<span class="line"></span>
<span class="line"><span>        body</span><span>(</span><span>'password'</span><span>).</span><span>isLength</span><span>({ min: </span><span>6</span><span> }).</span><span>withMessage</span><span>(</span><span>'Min 6 chars'</span><span>)</span></span>
<span class="line"><span>                        .</span><span>matches</span><span>(</span><span>/</span><span>[A-Z]</span><span>/</span><span>).</span><span>withMessage</span><span>(</span><span>'Need uppercase'</span><span>)</span></span>
<span class="line"><span>                        .</span><span>matches</span><span>(</span><span>/</span><span>[0-9]</span><span>/</span><span>).</span><span>withMessage</span><span>(</span><span>'Need number'</span><span>),</span></span>
<span class="line"></span>
<span class="line"><span>        body</span><span>(</span><span>'age'</span><span>).</span><span>optional</span><span>()</span></span>
<span class="line"><span>                   .</span><span>isInt</span><span>({ min: </span><span>18</span><span>, max: </span><span>100</span><span> }).</span><span>withMessage</span><span>(</span><span>'18-100'</span><span>)</span></span>
<span class="line"><span>    ],</span></span>
<span class="line"><span>    (</span><span>req</span><span>, </span><span>res</span><span>) </span><span>=></span><span> {</span></span>
<span class="line"><span>        const</span><span> errors</span><span> =</span><span> validationResult</span><span>(req);</span></span>
<span class="line"><span>        if</span><span> (</span><span>!</span><span>errors.</span><span>isEmpty</span><span>()) {</span></span>
<span class="line"><span>            return</span><span> res.</span><span>status</span><span>(</span><span>400</span><span>).</span><span>json</span><span>({ errors: errors.</span><span>array</span><span>() });</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        res.</span><span>json</span><span>({ message: </span><span>"Valid!"</span><span>, data: req.body });</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>);</span></span>
<span class="line"></span>
<span class="line"><span>// Validate route params</span></span>
<span class="line"><span>app.</span><span>get</span><span>(</span><span>'/users/:id'</span><span>,</span></span>
<span class="line"><span>    [</span><span>param</span><span>(</span><span>'id'</span><span>).</span><span>isInt</span><span>({ min: </span><span>1</span><span> }).</span><span>withMessage</span><span>(</span><span>'Positive integer'</span><span>)],</span></span>
<span class="line"><span>    (</span><span>req</span><span>, </span><span>res</span><span>) </span><span>=></span><span> {</span></span>
<span class="line"><span>        const</span><span> errors</span><span> =</span><span> validationResult</span><span>(req);</span></span>
<span class="line"><span>        if</span><span> (</span><span>!</span><span>errors.</span><span>isEmpty</span><span>()) </span><span>return</span><span> res.</span><span>status</span><span>(</span><span>400</span><span>).</span><span>json</span><span>({ errors: errors.</span><span>array</span><span>() });</span></span>
<span class="line"><span>        res.</span><span>json</span><span>({ userId: req.params.id });</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>);</span></span>
<span class="line"></span>
<span class="line"><span>// Validate query params</span></span>
<span class="line"><span>app.</span><span>get</span><span>(</span><span>'/search'</span><span>,</span></span>
<span class="line"><span>    [</span><span>query</span><span>(</span><span>'sort'</span><span>).</span><span>optional</span><span>().</span><span>isIn</span><span>([</span><span>'asc'</span><span>, </span><span>'desc'</span><span>]).</span><span>withMessage</span><span>(</span><span>'asc or desc'</span><span>)],</span></span>
<span class="line"><span>    (</span><span>req</span><span>, </span><span>res</span><span>) </span><span>=></span><span> {</span></span>
<span class="line"><span>        const</span><span> errors</span><span> =</span><span> validationResult</span><span>(req);</span></span>
<span class="line"><span>        if</span><span> (</span><span>!</span><span>errors.</span><span>isEmpty</span><span>()) </span><span>return</span><span> res.</span><span>status</span><span>(</span><span>400</span><span>).</span><span>json</span><span>({ errors: errors.</span><span>array</span><span>() });</span></span>
<span class="line"><span>        res.</span><span>json</span><span>({ query: req.query });</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>);</span></span>
<span class="line"></span>
<span class="line"><span>// Custom validator</span></span>
<span class="line"><span>app.</span><span>post</span><span>(</span><span>'/register'</span><span>,</span></span>
<span class="line"><span>    [</span><span>body</span><span>(</span><span>'confirmPassword'</span><span>).</span><span>custom</span><span>((</span><span>value</span><span>, { </span><span>req</span><span> }) </span><span>=></span><span> {</span></span>
<span class="line"><span>        if</span><span> (value </span><span>!==</span><span> req.body.password) </span><span>throw</span><span> new</span><span> Error</span><span>(</span><span>'Passwords must match'</span><span>);</span></span>
<span class="line"><span>        return</span><span> true</span><span>;</span></span>
<span class="line"><span>    })],</span></span>
<span class="line"><span>    (</span><span>req</span><span>, </span><span>res</span><span>) </span><span>=></span><span> { </span><span>/* ... */</span><span> }</span></span>
<span class="line"><span>);</span></span>
<span class="line"></span>
<span class="line"><span>// COMMON VALIDATORS:</span></span>
<span class="line"><span>// .notEmpty(), .isEmail(), .isLength({min,max}), .isInt({min,max})</span></span>
<span class="line"><span>// .isFloat(), .isAlpha(), .isURL(), .isIn([]), .matches(/regex/)</span></span>
<span class="line"><span>// .optional(), .custom(fn), .withMessage('msg')</span></span>
<span class="line"><span>// SANITIZERS: .trim(), .escape(), .normalizeEmail(), .toInt()</span></span>
<span class="line"></span>
<span class="line"><span>app.</span><span>listen</span><span>(</span><span>3000</span><span>);</span></span></code></pre></div></div></pre>

---

## 21. ERROR HANDLING

<pre><div class="not-prose my-0 flex w-full flex-col overflow-clip border border-border text-text-primary rounded-lg not-prose relative" data-code-block="true"><div class="border-border flex items-center justify-between border-b px-4 py-2"><div class="flex items-center gap-2"><svg width="14" stroke-width="1.5" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="text-text-secondary"><path d="M9.00001 21L8.00001 21C6.89544 21 6.00001 20.1057 6.00001 19.0011C6.00001 17.4501 6.00001 15.3443 6 14C6 13 4.5 12 4.5 12C4.5 12 6.00001 11 6.00001 10C6.00001 8.827 6.00001 6.62207 6.00001 4.99914C6.00001 3.89457 6.89544 3 8.00001 3L9.00001 3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 21L16 21C17.1046 21 18 20.1057 18 19.0011C18 17.4501 18 15.3443 18 14C18 13 19.5 12 19.5 12C19.5 12 18 11 18 10C18 8.827 18 6.62207 18 4.99914C18 3.89457 17.1046 3 16 3L15 3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg><span class="text-text-secondary text-sm font-medium">JavaScript</span></div><button class="inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ring-offset-2 focus-visible:ring-offset-surface-primary disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 text-sm text-interactive-active hover:text-interactive-normal active:text-text-tertiary font-normal relative rounded-lg p-[6px]" type="button" data-state="closed" data-slot="tooltip-trigger"><svg width="16" height="16" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="text-interactive-positive absolute inset-0 m-auto rotate-90 opacity-0 transition-all duration-300"><path d="M5 13L9 17L19 7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg><svg width="16" height="16" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="absolute inset-0 m-auto opacity-100 transition-opacity duration-300"><path d="M19.4 20H9.6C9.26863 20 9 19.7314 9 19.4V9.6C9 9.26863 9.26863 9 9.6 9H19.4C19.7314 9 20 9.26863 20 9.6V19.4C20 19.7314 19.7314 20 19.4 20Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 9V4.6C15 4.26863 14.7314 4 14.4 4H4.6C4.26863 4 4 4.26863 4 4.6V14.4C4 14.7314 4.26863 15 4.6 15H9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg></button></div><div class="code-block_container__lbMX4"><pre class="shiki github-dark shiki-code-block" tabindex="0"><code class="whitespace-pre-wrap break-words"><span class="line"><span>import</span><span> express </span><span>from</span><span> 'express'</span><span>;</span></span>
<span class="line"><span>const</span><span> app</span><span> =</span><span> express</span><span>();</span></span>
<span class="line"><span>app.</span><span>use</span><span>(express.</span><span>json</span><span>());</span></span>
<span class="line"></span>
<span class="line"><span>// 1. Handle errors IN routes</span></span>
<span class="line"><span>app.</span><span>get</span><span>(</span><span>'/api/users/:id'</span><span>, (</span><span>req</span><span>, </span><span>res</span><span>) </span><span>=></span><span> {</span></span>
<span class="line"><span>    if</span><span> (</span><span>isNaN</span><span>(req.params.id))</span></span>
<span class="line"><span>        return</span><span> res.</span><span>status</span><span>(</span><span>400</span><span>).</span><span>json</span><span>({ error: </span><span>"Invalid ID"</span><span> });</span></span>
<span class="line"><span>    res.</span><span>json</span><span>({ id: req.params.id });</span></span>
<span class="line"><span>});</span></span>
<span class="line"></span>
<span class="line"><span>// 2. Using next(error) to pass to error handler</span></span>
<span class="line"><span>app.</span><span>get</span><span>(</span><span>'/risky'</span><span>, (</span><span>req</span><span>, </span><span>res</span><span>, </span><span>next</span><span>) </span><span>=></span><span> {</span></span>
<span class="line"><span>    try</span><span> {</span></span>
<span class="line"><span>        throw</span><span> new</span><span> Error</span><span>(</span><span>"Something broke!"</span><span>);</span></span>
<span class="line"><span>    } </span><span>catch</span><span> (err) {</span></span>
<span class="line"><span>        next</span><span>(err);  </span><span>// Skips to error handler</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>});</span></span>
<span class="line"></span>
<span class="line"><span>// 3. 404 Handler — AFTER all routes</span></span>
<span class="line"><span>app.</span><span>use</span><span>((</span><span>req</span><span>, </span><span>res</span><span>) </span><span>=></span><span> {</span></span>
<span class="line"><span>    res.</span><span>status</span><span>(</span><span>404</span><span>).</span><span>json</span><span>({ error: </span><span>`Cannot ${</span><span>req</span><span>.</span><span>method</span><span>} ${</span><span>req</span><span>.</span><span>url</span><span>}`</span><span> });</span></span>
<span class="line"><span>});</span></span>
<span class="line"></span>
<span class="line"><span>// 4. Error Handler — MUST have 4 params, MUST be LAST</span></span>
<span class="line"><span>app.</span><span>use</span><span>((</span><span>err</span><span>, </span><span>req</span><span>, </span><span>res</span><span>, </span><span>next</span><span>) </span><span>=></span><span> {</span></span>
<span class="line"><span>    console.</span><span>error</span><span>(</span><span>"Error:"</span><span>, err.message);</span></span>
<span class="line"><span>    res.</span><span>status</span><span>(err.status </span><span>||</span><span> 500</span><span>).</span><span>json</span><span>({ error: err.message });</span></span>
<span class="line"><span>});</span></span>
<span class="line"></span>
<span class="line"><span>app.</span><span>listen</span><span>(</span><span>3000</span><span>);</span></span></code></pre></div></div></pre>

---

## 22. MIDDLEWARE

<pre><div class="not-prose my-0 flex w-full flex-col overflow-clip border border-border text-text-primary rounded-lg not-prose relative" data-code-block="true"><div class="border-border flex items-center justify-between border-b px-4 py-2"><div class="flex items-center gap-2"><svg width="14" stroke-width="1.5" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="text-text-secondary"><path d="M9.00001 21L8.00001 21C6.89544 21 6.00001 20.1057 6.00001 19.0011C6.00001 17.4501 6.00001 15.3443 6 14C6 13 4.5 12 4.5 12C4.5 12 6.00001 11 6.00001 10C6.00001 8.827 6.00001 6.62207 6.00001 4.99914C6.00001 3.89457 6.89544 3 8.00001 3L9.00001 3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 21L16 21C17.1046 21 18 20.1057 18 19.0011C18 17.4501 18 15.3443 18 14C18 13 19.5 12 19.5 12C19.5 12 18 11 18 10C18 8.827 18 6.62207 18 4.99914C18 3.89457 17.1046 3 16 3L15 3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg><span class="text-text-secondary text-sm font-medium">JavaScript</span></div><button class="inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ring-offset-2 focus-visible:ring-offset-surface-primary disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 text-sm text-interactive-active hover:text-interactive-normal active:text-text-tertiary font-normal relative rounded-lg p-[6px]" type="button" data-state="closed" data-slot="tooltip-trigger"><svg width="16" height="16" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="text-interactive-positive absolute inset-0 m-auto rotate-90 opacity-0 transition-all duration-300"><path d="M5 13L9 17L19 7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg><svg width="16" height="16" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="absolute inset-0 m-auto opacity-100 transition-opacity duration-300"><path d="M19.4 20H9.6C9.26863 20 9 19.7314 9 19.4V9.6C9 9.26863 9.26863 9 9.6 9H19.4C19.7314 9 20 9.26863 20 9.6V19.4C20 19.7314 19.7314 20 19.4 20Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 9V4.6C15 4.26863 14.7314 4 14.4 4H4.6C4.26863 4 4 4.26863 4 4.6V14.4C4 14.7314 4.26863 15 4.6 15H9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg></button></div><div class="code-block_container__lbMX4"><pre class="shiki github-dark shiki-code-block" tabindex="0"><code class="whitespace-pre-wrap break-words"><span class="line"><span>import</span><span> express </span><span>from</span><span> 'express'</span><span>;</span></span>
<span class="line"><span>const</span><span> app</span><span> =</span><span> express</span><span>();</span></span>
<span class="line"></span>
<span class="line"><span>// WHAT: Functions between request and response</span></span>
<span class="line"><span>// Flow: Request → MW1 → MW2 → Route → Response</span></span>
<span class="line"><span>// Must call next() OR send response!</span></span>
<span class="line"></span>
<span class="line"><span>// ══════ BUILT-IN MIDDLEWARE ══════</span></span>
<span class="line"><span>app.</span><span>use</span><span>(express.</span><span>json</span><span>());</span></span>
<span class="line"><span>app.</span><span>use</span><span>(express.</span><span>urlencoded</span><span>({ extended: </span><span>true</span><span> }));</span></span>
<span class="line"><span>app.</span><span>use</span><span>(express.</span><span>static</span><span>(</span><span>'public'</span><span>));</span></span>
<span class="line"></span>
<span class="line"><span>// ══════ CUSTOM: Logger ══════</span></span>
<span class="line"><span>app.</span><span>use</span><span>((</span><span>req</span><span>, </span><span>res</span><span>, </span><span>next</span><span>) </span><span>=></span><span> {</span></span>
<span class="line"><span>    console.</span><span>log</span><span>(</span><span>`${</span><span>req</span><span>.</span><span>method</span><span>} ${</span><span>req</span><span>.</span><span>url</span><span>}`</span><span>);</span></span>
<span class="line"><span>    next</span><span>();  </span><span>// MUST call next()!</span></span>
<span class="line"><span>});</span></span>
<span class="line"></span>
<span class="line"><span>// ══════ CUSTOM: Auth ══════</span></span>
<span class="line"><span>const</span><span> authenticate</span><span> =</span><span> (</span><span>req</span><span>, </span><span>res</span><span>, </span><span>next</span><span>) </span><span>=></span><span> {</span></span>
<span class="line"><span>    const</span><span> token</span><span> =</span><span> req.headers[</span><span>'authorization'</span><span>];</span></span>
<span class="line"><span>    if</span><span> (</span><span>!</span><span>token) </span><span>return</span><span> res.</span><span>status</span><span>(</span><span>401</span><span>).</span><span>json</span><span>({ error: </span><span>"No token"</span><span> });</span></span>
<span class="line"><span>    if</span><span> (token </span><span>!==</span><span> 'Bearer secret'</span><span>) </span><span>return</span><span> res.</span><span>status</span><span>(</span><span>403</span><span>).</span><span>json</span><span>({ error: </span><span>"Invalid"</span><span> });</span></span>
<span class="line"><span>    req.user </span><span>=</span><span> { id: </span><span>1</span><span>, name: </span><span>"Rahul"</span><span>, role: </span><span>"admin"</span><span> };</span></span>
<span class="line"><span>    next</span><span>();</span></span>
<span class="line"><span>};</span></span>
<span class="line"></span>
<span class="line"><span>// ══════ CUSTOM: Role check (returns middleware) ══════</span></span>
<span class="line"><span>const</span><span> authorize</span><span> =</span><span> (</span><span>...</span><span>roles</span><span>) </span><span>=></span><span> {</span></span>
<span class="line"><span>    return</span><span> (</span><span>req</span><span>, </span><span>res</span><span>, </span><span>next</span><span>) </span><span>=></span><span> {</span></span>
<span class="line"><span>        if</span><span> (</span><span>!</span><span>roles.</span><span>includes</span><span>(req.user.role))</span></span>
<span class="line"><span>            return</span><span> res.</span><span>status</span><span>(</span><span>403</span><span>).</span><span>json</span><span>({ error: </span><span>"Not authorized"</span><span> });</span></span>
<span class="line"><span>        next</span><span>();</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span>};</span></span>
<span class="line"></span>
<span class="line"><span>// Apply to specific routes</span></span>
<span class="line"><span>app.</span><span>get</span><span>(</span><span>'/profile'</span><span>, authenticate, (</span><span>req</span><span>, </span><span>res</span><span>) </span><span>=></span><span> {</span></span>
<span class="line"><span>    res.</span><span>json</span><span>({ user: req.user });</span></span>
<span class="line"><span>});</span></span>
<span class="line"></span>
<span class="line"><span>app.</span><span>get</span><span>(</span><span>'/admin'</span><span>, authenticate, </span><span>authorize</span><span>(</span><span>'admin'</span><span>), (</span><span>req</span><span>, </span><span>res</span><span>) </span><span>=></span><span> {</span></span>
<span class="line"><span>    res.</span><span>json</span><span>({ message: </span><span>"Admin page"</span><span> });</span></span>
<span class="line"><span>});</span></span>
<span class="line"></span>
<span class="line"><span>// ══════ MIDDLEWARE ORDER ══════</span></span>
<span class="line"><span>// 1. Built-in (express.json, static)</span></span>
<span class="line"><span>// 2. Third-party (cookieParser, session)</span></span>
<span class="line"><span>// 3. Custom global (logger)</span></span>
<span class="line"><span>// 4. Routes (app.get, app.post)</span></span>
<span class="line"><span>// 5. 404 handler</span></span>
<span class="line"><span>// 6. Error handler (4 params — LAST!)</span></span>
<span class="line"></span>
<span class="line"><span>app.</span><span>listen</span><span>(</span><span>3000</span><span>);</span></span></code></pre></div></div></pre>

---

## 23. COOKIE-PARSER

<pre><div class="not-prose my-0 flex w-full flex-col overflow-clip border border-border text-text-primary rounded-lg not-prose relative" data-code-block="true"><div class="border-border flex items-center justify-between border-b px-4 py-2"><div class="flex items-center gap-2"><svg width="14" stroke-width="1.5" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="text-text-secondary"><path d="M9.00001 21L8.00001 21C6.89544 21 6.00001 20.1057 6.00001 19.0011C6.00001 17.4501 6.00001 15.3443 6 14C6 13 4.5 12 4.5 12C4.5 12 6.00001 11 6.00001 10C6.00001 8.827 6.00001 6.62207 6.00001 4.99914C6.00001 3.89457 6.89544 3 8.00001 3L9.00001 3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 21L16 21C17.1046 21 18 20.1057 18 19.0011C18 17.4501 18 15.3443 18 14C18 13 19.5 12 19.5 12C19.5 12 18 11 18 10C18 8.827 18 6.62207 18 4.99914C18 3.89457 17.1046 3 16 3L15 3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg><span class="text-text-secondary text-sm font-medium">JavaScript</span></div><button class="inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ring-offset-2 focus-visible:ring-offset-surface-primary disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 text-sm text-interactive-active hover:text-interactive-normal active:text-text-tertiary font-normal relative rounded-lg p-[6px]" type="button" data-state="closed" data-slot="tooltip-trigger"><svg width="16" height="16" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="text-interactive-positive absolute inset-0 m-auto rotate-90 opacity-0 transition-all duration-300"><path d="M5 13L9 17L19 7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg><svg width="16" height="16" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="absolute inset-0 m-auto opacity-100 transition-opacity duration-300"><path d="M19.4 20H9.6C9.26863 20 9 19.7314 9 19.4V9.6C9 9.26863 9.26863 9 9.6 9H19.4C19.7314 9 20 9.26863 20 9.6V19.4C20 19.7314 19.7314 20 19.4 20Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 9V4.6C15 4.26863 14.7314 4 14.4 4H4.6C4.26863 4 4 4.26863 4 4.6V14.4C4 14.7314 4.26863 15 4.6 15H9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg></button></div><div class="code-block_container__lbMX4"><pre class="shiki github-dark shiki-code-block" tabindex="0"><code class="whitespace-pre-wrap break-words"><span class="line"><span>// Install: npm install cookie-parser</span></span>
<span class="line"><span>import</span><span> express </span><span>from</span><span> 'express'</span><span>;</span></span>
<span class="line"><span>import</span><span> cookieParser </span><span>from</span><span> 'cookie-parser'</span><span>;</span></span>
<span class="line"></span>
<span class="line"><span>const</span><span> app</span><span> =</span><span> express</span><span>();</span></span>
<span class="line"><span>app.</span><span>use</span><span>(</span><span>cookieParser</span><span>(</span><span>'mySecret'</span><span>));  </span><span>// Secret for signed cookies</span></span>
<span class="line"></span>
<span class="line"><span>// SET cookies</span></span>
<span class="line"><span>app.</span><span>get</span><span>(</span><span>'/set-cookies'</span><span>, (</span><span>req</span><span>, </span><span>res</span><span>) </span><span>=></span><span> {</span></span>
<span class="line"><span>    res.</span><span>cookie</span><span>(</span><span>'username'</span><span>, </span><span>'Rahul'</span><span>);</span></span>
<span class="line"><span>    res.</span><span>cookie</span><span>(</span><span>'theme'</span><span>, </span><span>'dark'</span><span>, {</span></span>
<span class="line"><span>        maxAge: </span><span>86400000</span><span>,     </span><span>// 1 day in ms</span></span>
<span class="line"><span>        httpOnly: </span><span>true</span><span>,       </span><span>// JS can't access</span></span>
<span class="line"><span>        secure: </span><span>false</span><span>,        </span><span>// HTTPS only (true in production)</span></span>
<span class="line"><span>        sameSite: </span><span>'strict'</span><span>    // CSRF protection</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>    res.</span><span>cookie</span><span>(</span><span>'userId'</span><span>, </span><span>'123'</span><span>, { signed: </span><span>true</span><span> }); </span><span>// Signed cookie</span></span>
<span class="line"><span>    res.</span><span>json</span><span>({ message: </span><span>"Cookies set!"</span><span> });</span></span>
<span class="line"><span>});</span></span>
<span class="line"></span>
<span class="line"><span>// READ cookies</span></span>
<span class="line"><span>app.</span><span>get</span><span>(</span><span>'/get-cookies'</span><span>, (</span><span>req</span><span>, </span><span>res</span><span>) </span><span>=></span><span> {</span></span>
<span class="line"><span>    res.</span><span>json</span><span>({</span></span>
<span class="line"><span>        cookies: req.cookies,            </span><span>// { username, theme }</span></span>
<span class="line"><span>        signedCookies: req.signedCookies  </span><span>// { userId }</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>});</span></span>
<span class="line"></span>
<span class="line"><span>// DELETE cookies</span></span>
<span class="line"><span>app.</span><span>get</span><span>(</span><span>'/clear-cookies'</span><span>, (</span><span>req</span><span>, </span><span>res</span><span>) </span><span>=></span><span> {</span></span>
<span class="line"><span>    res.</span><span>clearCookie</span><span>(</span><span>'username'</span><span>);</span></span>
<span class="line"><span>    res.</span><span>clearCookie</span><span>(</span><span>'theme'</span><span>);</span></span>
<span class="line"><span>    res.</span><span>json</span><span>({ message: </span><span>"Cleared!"</span><span> });</span></span>
<span class="line"><span>});</span></span>
<span class="line"></span>
<span class="line"><span>// OPTIONS: maxAge, expires, httpOnly, secure, signed, sameSite, path, domain</span></span>
<span class="line"><span>app.</span><span>listen</span><span>(</span><span>3000</span><span>);</span></span></code></pre></div></div></pre>

---

## 24. COOKIE-SESSION

<pre><div class="not-prose my-0 flex w-full flex-col overflow-clip border border-border text-text-primary rounded-lg not-prose relative" data-code-block="true"><div class="border-border flex items-center justify-between border-b px-4 py-2"><div class="flex items-center gap-2"><svg width="14" stroke-width="1.5" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="text-text-secondary"><path d="M9.00001 21L8.00001 21C6.89544 21 6.00001 20.1057 6.00001 19.0011C6.00001 17.4501 6.00001 15.3443 6 14C6 13 4.5 12 4.5 12C4.5 12 6.00001 11 6.00001 10C6.00001 8.827 6.00001 6.62207 6.00001 4.99914C6.00001 3.89457 6.89544 3 8.00001 3L9.00001 3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 21L16 21C17.1046 21 18 20.1057 18 19.0011C18 17.4501 18 15.3443 18 14C18 13 19.5 12 19.5 12C19.5 12 18 11 18 10C18 8.827 18 6.62207 18 4.99914C18 3.89457 17.1046 3 16 3L15 3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg><span class="text-text-secondary text-sm font-medium">JavaScript</span></div><button class="inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ring-offset-2 focus-visible:ring-offset-surface-primary disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 text-sm text-interactive-active hover:text-interactive-normal active:text-text-tertiary font-normal relative rounded-lg p-[6px]" type="button" data-state="closed" data-slot="tooltip-trigger"><svg width="16" height="16" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="text-interactive-positive absolute inset-0 m-auto rotate-90 opacity-0 transition-all duration-300"><path d="M5 13L9 17L19 7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg><svg width="16" height="16" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="absolute inset-0 m-auto opacity-100 transition-opacity duration-300"><path d="M19.4 20H9.6C9.26863 20 9 19.7314 9 19.4V9.6C9 9.26863 9.26863 9 9.6 9H19.4C19.7314 9 20 9.26863 20 9.6V19.4C20 19.7314 19.7314 20 19.4 20Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 9V4.6C15 4.26863 14.7314 4 14.4 4H4.6C4.26863 4 4 4.26863 4 4.6V14.4C4 14.7314 4.26863 15 4.6 15H9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg></button></div><div class="code-block_container__lbMX4"><pre class="shiki github-dark shiki-code-block" tabindex="0"><code class="whitespace-pre-wrap break-words"><span class="line"><span>// Install: npm install cookie-session</span></span>
<span class="line"><span>// Data stored IN the cookie (client-side, ~4KB limit)</span></span>
<span class="line"><span>import</span><span> express </span><span>from</span><span> 'express'</span><span>;</span></span>
<span class="line"><span>import</span><span> cookieSession </span><span>from</span><span> 'cookie-session'</span><span>;</span></span>
<span class="line"></span>
<span class="line"><span>const</span><span> app</span><span> =</span><span> express</span><span>();</span></span>
<span class="line"><span>app.</span><span>use</span><span>(express.</span><span>json</span><span>());</span></span>
<span class="line"></span>
<span class="line"><span>app.</span><span>use</span><span>(</span><span>cookieSession</span><span>({</span></span>
<span class="line"><span>    name: </span><span>'session'</span><span>,</span></span>
<span class="line"><span>    keys: [</span><span>'secret1'</span><span>, </span><span>'secret2'</span><span>],       </span><span>// Encryption keys</span></span>
<span class="line"><span>    maxAge: </span><span>24</span><span> *</span><span> 60</span><span> *</span><span> 60</span><span> *</span><span> 1000</span><span>         // 24 hours</span></span>
<span class="line"><span>}));</span></span>
<span class="line"></span>
<span class="line"><span>// SET session</span></span>
<span class="line"><span>app.</span><span>post</span><span>(</span><span>'/login'</span><span>, (</span><span>req</span><span>, </span><span>res</span><span>) </span><span>=></span><span> {</span></span>
<span class="line"><span>    req.session.userId </span><span>=</span><span> 1</span><span>;</span></span>
<span class="line"><span>    req.session.username </span><span>=</span><span> req.body.username;</span></span>
<span class="line"><span>    res.</span><span>json</span><span>({ message: </span><span>"Logged in!"</span><span> });</span></span>
<span class="line"><span>});</span></span>
<span class="line"></span>
<span class="line"><span>// READ session</span></span>
<span class="line"><span>app.</span><span>get</span><span>(</span><span>'/profile'</span><span>, (</span><span>req</span><span>, </span><span>res</span><span>) </span><span>=></span><span> {</span></span>
<span class="line"><span>    if</span><span> (req.session.userId) {</span></span>
<span class="line"><span>        res.</span><span>json</span><span>({ user: req.session.username });</span></span>
<span class="line"><span>    } </span><span>else</span><span> {</span></span>
<span class="line"><span>        res.</span><span>status</span><span>(</span><span>401</span><span>).</span><span>json</span><span>({ error: </span><span>"Not logged in"</span><span> });</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>});</span></span>
<span class="line"></span>
<span class="line"><span>// DESTROY session</span></span>
<span class="line"><span>app.</span><span>post</span><span>(</span><span>'/logout'</span><span>, (</span><span>req</span><span>, </span><span>res</span><span>) </span><span>=></span><span> {</span></span>
<span class="line"><span>    req.session </span><span>=</span><span> null</span><span>;  </span><span>// Destroy</span></span>
<span class="line"><span>    res.</span><span>json</span><span>({ message: </span><span>"Logged out!"</span><span> });</span></span>
<span class="line"><span>});</span></span>
<span class="line"></span>
<span class="line"><span>app.</span><span>listen</span><span>(</span><span>3000</span><span>);</span></span></code></pre></div></div></pre>

---

## 25. EXPRESS-SESSION

<pre><div class="not-prose my-0 flex w-full flex-col overflow-clip border border-border text-text-primary rounded-lg not-prose relative" data-code-block="true"><div class="border-border flex items-center justify-between border-b px-4 py-2"><div class="flex items-center gap-2"><svg width="14" stroke-width="1.5" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="text-text-secondary"><path d="M9.00001 21L8.00001 21C6.89544 21 6.00001 20.1057 6.00001 19.0011C6.00001 17.4501 6.00001 15.3443 6 14C6 13 4.5 12 4.5 12C4.5 12 6.00001 11 6.00001 10C6.00001 8.827 6.00001 6.62207 6.00001 4.99914C6.00001 3.89457 6.89544 3 8.00001 3L9.00001 3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 21L16 21C17.1046 21 18 20.1057 18 19.0011C18 17.4501 18 15.3443 18 14C18 13 19.5 12 19.5 12C19.5 12 18 11 18 10C18 8.827 18 6.62207 18 4.99914C18 3.89457 17.1046 3 16 3L15 3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg><span class="text-text-secondary text-sm font-medium">JavaScript</span></div><button class="inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ring-offset-2 focus-visible:ring-offset-surface-primary disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 text-sm text-interactive-active hover:text-interactive-normal active:text-text-tertiary font-normal relative rounded-lg p-[6px]" type="button" data-state="closed" data-slot="tooltip-trigger"><svg width="16" height="16" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="text-interactive-positive absolute inset-0 m-auto rotate-90 opacity-0 transition-all duration-300"><path d="M5 13L9 17L19 7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg><svg width="16" height="16" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="absolute inset-0 m-auto opacity-100 transition-opacity duration-300"><path d="M19.4 20H9.6C9.26863 20 9 19.7314 9 19.4V9.6C9 9.26863 9.26863 9 9.6 9H19.4C19.7314 9 20 9.26863 20 9.6V19.4C20 19.7314 19.7314 20 19.4 20Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 9V4.6C15 4.26863 14.7314 4 14.4 4H4.6C4.26863 4 4 4.26863 4 4.6V14.4C4 14.7314 4.26863 15 4.6 15H9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg></button></div><div class="code-block_container__lbMX4"><pre class="shiki github-dark shiki-code-block" tabindex="0"><code class="whitespace-pre-wrap break-words"><span class="line"><span>// Install: npm install express-session</span></span>
<span class="line"><span>// Only session ID in cookie, data on SERVER (unlimited)</span></span>
<span class="line"><span>import</span><span> express </span><span>from</span><span> 'express'</span><span>;</span></span>
<span class="line"><span>import</span><span> session </span><span>from</span><span> 'express-session'</span><span>;</span></span>
<span class="line"></span>
<span class="line"><span>const</span><span> app</span><span> =</span><span> express</span><span>();</span></span>
<span class="line"><span>app.</span><span>use</span><span>(express.</span><span>json</span><span>());</span></span>
<span class="line"></span>
<span class="line"><span>app.</span><span>use</span><span>(</span><span>session</span><span>({</span></span>
<span class="line"><span>    secret: </span><span>'my-secret-key'</span><span>,           </span><span>// Signs session ID cookie</span></span>
<span class="line"><span>    resave: </span><span>false</span><span>,                       </span><span>// Don't resave unchanged sessions</span></span>
<span class="line"><span>    saveUninitialized: </span><span>false</span><span>,            </span><span>// Don't create empty sessions</span></span>
<span class="line"><span>    cookie: { maxAge: </span><span>1000</span><span> *</span><span> 60</span><span> *</span><span> 30</span><span> }  </span><span>// 30 minutes</span></span>
<span class="line"><span>}));</span></span>
<span class="line"></span>
<span class="line"><span>// SET session</span></span>
<span class="line"><span>app.</span><span>post</span><span>(</span><span>'/login'</span><span>, (</span><span>req</span><span>, </span><span>res</span><span>) </span><span>=></span><span> {</span></span>
<span class="line"><span>    req.session.isAuthenticated </span><span>=</span><span> true</span><span>;</span></span>
<span class="line"><span>    req.session.user </span><span>=</span><span> { name: req.body.username, role: </span><span>'admin'</span><span> };</span></span>
<span class="line"><span>    res.</span><span>json</span><span>({ message: </span><span>"Logged in!"</span><span>, sessionId: req.session.id });</span></span>
<span class="line"><span>});</span></span>
<span class="line"></span>
<span class="line"><span>// Auth middleware</span></span>
<span class="line"><span>const</span><span> isLoggedIn</span><span> =</span><span> (</span><span>req</span><span>, </span><span>res</span><span>, </span><span>next</span><span>) </span><span>=></span><span> {</span></span>
<span class="line"><span>    if</span><span> (req.session </span><span>&&</span><span> req.session.isAuthenticated) </span><span>return</span><span> next</span><span>();</span></span>
<span class="line"><span>    res.</span><span>status</span><span>(</span><span>401</span><span>).</span><span>json</span><span>({ error: </span><span>"Login first"</span><span> });</span></span>
<span class="line"><span>};</span></span>
<span class="line"></span>
<span class="line"><span>// Protected route</span></span>
<span class="line"><span>app.</span><span>get</span><span>(</span><span>'/dashboard'</span><span>, isLoggedIn, (</span><span>req</span><span>, </span><span>res</span><span>) </span><span>=></span><span> {</span></span>
<span class="line"><span>    res.</span><span>json</span><span>({ message: </span><span>`Welcome ${</span><span>req</span><span>.</span><span>session</span><span>.</span><span>user</span><span>.</span><span>name</span><span>}!`</span><span> });</span></span>
<span class="line"><span>});</span></span>
<span class="line"></span>
<span class="line"><span>// DESTROY session</span></span>
<span class="line"><span>app.</span><span>post</span><span>(</span><span>'/logout'</span><span>, (</span><span>req</span><span>, </span><span>res</span><span>) </span><span>=></span><span> {</span></span>
<span class="line"><span>    req.session.</span><span>destroy</span><span>((</span><span>err</span><span>) </span><span>=></span><span> {    </span><span>// Takes callback!</span></span>
<span class="line"><span>        res.</span><span>clearCookie</span><span>(</span><span>'connect.sid'</span><span>);</span></span>
<span class="line"><span>        res.</span><span>json</span><span>({ message: </span><span>"Logged out!"</span><span> });</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>});</span></span>
<span class="line"></span>
<span class="line"><span>// DIFFERENCE:</span></span>
<span class="line"><span>// cookie-session:  data IN cookie, destroy: req.session = null</span></span>
<span class="line"><span>// express-session: data on SERVER, destroy: req.session.destroy(cb)</span></span>
<span class="line"></span>
<span class="line"><span>app.</span><span>listen</span><span>(</span><span>3000</span><span>);</span></span></code></pre></div></div></pre>

---

## 26. APP.USE() vs APP.ALL()

<pre><div class="not-prose my-0 flex w-full flex-col overflow-clip border border-border text-text-primary rounded-lg not-prose relative" data-code-block="true"><div class="border-border flex items-center justify-between border-b px-4 py-2"><div class="flex items-center gap-2"><svg width="14" stroke-width="1.5" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="text-text-secondary"><path d="M9.00001 21L8.00001 21C6.89544 21 6.00001 20.1057 6.00001 19.0011C6.00001 17.4501 6.00001 15.3443 6 14C6 13 4.5 12 4.5 12C4.5 12 6.00001 11 6.00001 10C6.00001 8.827 6.00001 6.62207 6.00001 4.99914C6.00001 3.89457 6.89544 3 8.00001 3L9.00001 3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 21L16 21C17.1046 21 18 20.1057 18 19.0011C18 17.4501 18 15.3443 18 14C18 13 19.5 12 19.5 12C19.5 12 18 11 18 10C18 8.827 18 6.62207 18 4.99914C18 3.89457 17.1046 3 16 3L15 3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg><span class="text-text-secondary text-sm font-medium">JavaScript</span></div><button class="inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ring-offset-2 focus-visible:ring-offset-surface-primary disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 text-sm text-interactive-active hover:text-interactive-normal active:text-text-tertiary font-normal relative rounded-lg p-[6px]" type="button" data-state="closed" data-slot="tooltip-trigger"><svg width="16" height="16" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="text-interactive-positive absolute inset-0 m-auto rotate-90 opacity-0 transition-all duration-300"><path d="M5 13L9 17L19 7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg><svg width="16" height="16" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="absolute inset-0 m-auto opacity-100 transition-opacity duration-300"><path d="M19.4 20H9.6C9.26863 20 9 19.7314 9 19.4V9.6C9 9.26863 9.26863 9 9.6 9H19.4C19.7314 9 20 9.26863 20 9.6V19.4C20 19.7314 19.7314 20 19.4 20Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 9V4.6C15 4.26863 14.7314 4 14.4 4H4.6C4.26863 4 4 4.26863 4 4.6V14.4C4 14.7314 4.26863 15 4.6 15H9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg></button></div><div class="code-block_container__lbMX4"><pre class="shiki github-dark shiki-code-block" tabindex="0"><code class="whitespace-pre-wrap break-words"><span class="line"><span>import</span><span> express </span><span>from</span><span> 'express'</span><span>;</span></span>
<span class="line"><span>const</span><span> app</span><span> =</span><span> express</span><span>();</span></span>
<span class="line"></span>
<span class="line"><span>// ══════ app.use() ══════</span></span>
<span class="line"><span>// ALL HTTP methods + PREFIX path matching</span></span>
<span class="line"><span>app.</span><span>use</span><span>((</span><span>req</span><span>, </span><span>res</span><span>, </span><span>next</span><span>) </span><span>=></span><span> { </span><span>next</span><span>(); });           </span><span>// All routes</span></span>
<span class="line"><span>app.</span><span>use</span><span>(</span><span>'/api'</span><span>, (</span><span>req</span><span>, </span><span>res</span><span>, </span><span>next</span><span>) </span><span>=></span><span> { </span><span>next</span><span>(); });   </span><span>// /api, /api/x, /api/x/y</span></span>
<span class="line"><span>app.</span><span>use</span><span>(express.</span><span>json</span><span>());                             </span><span>// Built-in middleware</span></span>
<span class="line"><span>app.</span><span>use</span><span>(</span><span>'/api'</span><span>, myRouter);                           </span><span>// Mount router</span></span>
<span class="line"></span>
<span class="line"><span>// ══════ app.all() ══════</span></span>
<span class="line"><span>// ALL HTTP methods + EXACT path matching</span></span>
<span class="line"><span>app.</span><span>all</span><span>(</span><span>'/api/test'</span><span>, (</span><span>req</span><span>, </span><span>res</span><span>) </span><span>=></span><span> {</span></span>
<span class="line"><span>    res.</span><span>json</span><span>({ method: req.method });  </span><span>// Any method works</span></span>
<span class="line"><span>});</span></span>
<span class="line"><span>app.</span><span>all</span><span>(</span><span>'*'</span><span>, (</span><span>req</span><span>, </span><span>res</span><span>) </span><span>=></span><span> {</span></span>
<span class="line"><span>    res.</span><span>status</span><span>(</span><span>404</span><span>).</span><span>json</span><span>({ error: </span><span>"Not Found"</span><span> });  </span><span>// Catch-all 404</span></span>
<span class="line"><span>});</span></span>
<span class="line"></span>
<span class="line"><span>// COMPARISON:</span></span>
<span class="line"><span>// app.use('/api')  → ALL methods, /api AND /api/anything (PREFIX)</span></span>
<span class="line"><span>// app.all('/api')  → ALL methods, ONLY /api              (EXACT)</span></span>
<span class="line"><span>// app.get('/api')  → GET only,    ONLY /api              (EXACT)</span></span></code></pre></div></div></pre>

---

# COMPLETE SYNTAX REFERENCE

## Express Methods

<pre><div class="not-prose my-0 flex w-full flex-col overflow-clip border border-border text-text-primary rounded-lg not-prose relative" data-code-block="true"><div class="border-border flex items-center justify-between border-b px-4 py-2"><div class="flex items-center gap-2"><svg width="14" stroke-width="1.5" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="text-text-secondary"><path d="M9.00001 21L8.00001 21C6.89544 21 6.00001 20.1057 6.00001 19.0011C6.00001 17.4501 6.00001 15.3443 6 14C6 13 4.5 12 4.5 12C4.5 12 6.00001 11 6.00001 10C6.00001 8.827 6.00001 6.62207 6.00001 4.99914C6.00001 3.89457 6.89544 3 8.00001 3L9.00001 3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 21L16 21C17.1046 21 18 20.1057 18 19.0011C18 17.4501 18 15.3443 18 14C18 13 19.5 12 19.5 12C19.5 12 18 11 18 10C18 8.827 18 6.62207 18 4.99914C18 3.89457 17.1046 3 16 3L15 3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg><span class="text-text-secondary text-sm font-medium">JavaScript</span></div><button class="inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ring-offset-2 focus-visible:ring-offset-surface-primary disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 text-sm text-interactive-active hover:text-interactive-normal active:text-text-tertiary font-normal relative rounded-lg p-[6px]" type="button" data-state="closed" data-slot="tooltip-trigger"><svg width="16" height="16" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="text-interactive-positive absolute inset-0 m-auto rotate-90 opacity-0 transition-all duration-300"><path d="M5 13L9 17L19 7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg><svg width="16" height="16" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="absolute inset-0 m-auto opacity-100 transition-opacity duration-300"><path d="M19.4 20H9.6C9.26863 20 9 19.7314 9 19.4V9.6C9 9.26863 9.26863 9 9.6 9H19.4C19.7314 9 20 9.26863 20 9.6V19.4C20 19.7314 19.7314 20 19.4 20Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 9V4.6C15 4.26863 14.7314 4 14.4 4H4.6C4.26863 4 4 4.26863 4 4.6V14.4C4 14.7314 4.26863 15 4.6 15H9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg></button></div><div class="code-block_container__lbMX4"><pre class="shiki github-dark shiki-code-block" tabindex="0"><code class="whitespace-pre-wrap break-words"><span class="line"><span>// ══════ app.listen() ══════</span></span>
<span class="line"><span>app.</span><span>listen</span><span>(port, [host], [callback]);</span></span>
<span class="line"><span>app.</span><span>listen</span><span>(</span><span>3000</span><span>, () </span><span>=></span><span> console.</span><span>log</span><span>(</span><span>"Running"</span><span>));</span></span>
<span class="line"></span>
<span class="line"><span>// ══════ app.get/post/put/delete() ══════</span></span>
<span class="line"><span>app.</span><span>METHOD</span><span>(path, [</span><span>...</span><span>middleware], handler);</span></span>
<span class="line"><span>app.</span><span>get</span><span>(</span><span>'/path'</span><span>, (</span><span>req</span><span>, </span><span>res</span><span>) </span><span>=></span><span> {});</span></span>
<span class="line"><span>app.</span><span>post</span><span>(</span><span>'/path'</span><span>, middleware1, (</span><span>req</span><span>, </span><span>res</span><span>) </span><span>=></span><span> {});</span></span>
<span class="line"></span>
<span class="line"><span>// ══════ express.json() ══════</span></span>
<span class="line"><span>app.</span><span>use</span><span>(express.</span><span>json</span><span>({ limit: </span><span>'10mb'</span><span>, strict: </span><span>true</span><span> }));</span></span>
<span class="line"></span>
<span class="line"><span>// ══════ express.urlencoded() ══════</span></span>
<span class="line"><span>app.</span><span>use</span><span>(express.</span><span>urlencoded</span><span>({ extended: </span><span>true</span><span>, limit: </span><span>'10mb'</span><span> }));</span></span>
<span class="line"></span>
<span class="line"><span>// ══════ express.static() ══════</span></span>
<span class="line"><span>app.</span><span>use</span><span>(express.</span><span>static</span><span>(</span><span>'public'</span><span>, { maxAge: </span><span>'1d'</span><span>, index: </span><span>'index.html'</span><span> }));</span></span>
<span class="line"></span>
<span class="line"><span>// ══════ express.Router() ══════</span></span>
<span class="line"><span>const</span><span> router</span><span> =</span><span> express.</span><span>Router</span><span>({ caseSensitive: </span><span>false</span><span>, mergeParams: </span><span>false</span><span> });</span></span></code></pre></div></div></pre>

## Request Object

<pre><div class="not-prose my-0 flex w-full flex-col overflow-clip border border-border text-text-primary rounded-lg not-prose relative" data-code-block="true"><div class="border-border flex items-center justify-between border-b px-4 py-2"><div class="flex items-center gap-2"><svg width="14" stroke-width="1.5" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="text-text-secondary"><path d="M9.00001 21L8.00001 21C6.89544 21 6.00001 20.1057 6.00001 19.0011C6.00001 17.4501 6.00001 15.3443 6 14C6 13 4.5 12 4.5 12C4.5 12 6.00001 11 6.00001 10C6.00001 8.827 6.00001 6.62207 6.00001 4.99914C6.00001 3.89457 6.89544 3 8.00001 3L9.00001 3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 21L16 21C17.1046 21 18 20.1057 18 19.0011C18 17.4501 18 15.3443 18 14C18 13 19.5 12 19.5 12C19.5 12 18 11 18 10C18 8.827 18 6.62207 18 4.99914C18 3.89457 17.1046 3 16 3L15 3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg><span class="text-text-secondary text-sm font-medium">JavaScript</span></div><button class="inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ring-offset-2 focus-visible:ring-offset-surface-primary disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 text-sm text-interactive-active hover:text-interactive-normal active:text-text-tertiary font-normal relative rounded-lg p-[6px]" type="button" data-state="closed" data-slot="tooltip-trigger"><svg width="16" height="16" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="text-interactive-positive absolute inset-0 m-auto rotate-90 opacity-0 transition-all duration-300"><path d="M5 13L9 17L19 7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg><svg width="16" height="16" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="absolute inset-0 m-auto opacity-100 transition-opacity duration-300"><path d="M19.4 20H9.6C9.26863 20 9 19.7314 9 19.4V9.6C9 9.26863 9.26863 9 9.6 9H19.4C19.7314 9 20 9.26863 20 9.6V19.4C20 19.7314 19.7314 20 19.4 20Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 9V4.6C15 4.26863 14.7314 4 14.4 4H4.6C4.26863 4 4 4.26863 4 4.6V14.4C4 14.7314 4.26863 15 4.6 15H9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg></button></div><div class="code-block_container__lbMX4"><pre class="shiki github-dark shiki-code-block" tabindex="0"><code class="whitespace-pre-wrap break-words"><span class="line"><span>req.params;          </span><span>// Route params: /users/:id → { id: '1' }</span></span>
<span class="line"><span>req.query;           </span><span>// Query string: ?a=1&b=2 → { a:'1', b:'2' }</span></span>
<span class="line"><span>req.body;            </span><span>// POST/PUT body (needs express.json())</span></span>
<span class="line"><span>req.headers;         </span><span>// All headers</span></span>
<span class="line"><span>req.method;          </span><span>// 'GET', 'POST', etc.</span></span>
<span class="line"><span>req.url;             </span><span>// Full URL with query</span></span>
<span class="line"><span>req.path;            </span><span>// URL without query</span></span>
<span class="line"><span>req.ip;              </span><span>// Client IP</span></span>
<span class="line"><span>req.cookies;         </span><span>// Unsigned cookies (needs cookie-parser)</span></span>
<span class="line"><span>req.signedCookies;   </span><span>// Signed cookies</span></span>
<span class="line"><span>req.session;         </span><span>// Session data</span></span>
<span class="line"><span>req.</span><span>get</span><span>(</span><span>'Header'</span><span>);   </span><span>// Get specific header</span></span></code></pre></div></div></pre>

## Response Object

<pre><div class="not-prose my-0 flex w-full flex-col overflow-clip border border-border text-text-primary rounded-lg not-prose relative" data-code-block="true"><div class="border-border flex items-center justify-between border-b px-4 py-2"><div class="flex items-center gap-2"><svg width="14" stroke-width="1.5" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="text-text-secondary"><path d="M9.00001 21L8.00001 21C6.89544 21 6.00001 20.1057 6.00001 19.0011C6.00001 17.4501 6.00001 15.3443 6 14C6 13 4.5 12 4.5 12C4.5 12 6.00001 11 6.00001 10C6.00001 8.827 6.00001 6.62207 6.00001 4.99914C6.00001 3.89457 6.89544 3 8.00001 3L9.00001 3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 21L16 21C17.1046 21 18 20.1057 18 19.0011C18 17.4501 18 15.3443 18 14C18 13 19.5 12 19.5 12C19.5 12 18 11 18 10C18 8.827 18 6.62207 18 4.99914C18 3.89457 17.1046 3 16 3L15 3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg><span class="text-text-secondary text-sm font-medium">JavaScript</span></div><button class="inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ring-offset-2 focus-visible:ring-offset-surface-primary disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 text-sm text-interactive-active hover:text-interactive-normal active:text-text-tertiary font-normal relative rounded-lg p-[6px]" type="button" data-state="closed" data-slot="tooltip-trigger"><svg width="16" height="16" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="text-interactive-positive absolute inset-0 m-auto rotate-90 opacity-0 transition-all duration-300"><path d="M5 13L9 17L19 7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg><svg width="16" height="16" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="absolute inset-0 m-auto opacity-100 transition-opacity duration-300"><path d="M19.4 20H9.6C9.26863 20 9 19.7314 9 19.4V9.6C9 9.26863 9.26863 9 9.6 9H19.4C19.7314 9 20 9.26863 20 9.6V19.4C20 19.7314 19.7314 20 19.4 20Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 9V4.6C15 4.26863 14.7314 4 14.4 4H4.6C4.26863 4 4 4.26863 4 4.6V14.4C4 14.7314 4.26863 15 4.6 15H9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg></button></div><div class="code-block_container__lbMX4"><pre class="shiki github-dark shiki-code-block" tabindex="0"><code class="whitespace-pre-wrap break-words"><span class="line"><span>res.</span><span>send</span><span>(data);           </span><span>// Send string/HTML/object</span></span>
<span class="line"><span>res.</span><span>json</span><span>(obj);            </span><span>// Send JSON</span></span>
<span class="line"><span>res.</span><span>sendFile</span><span>(absPath);    </span><span>// Send file</span></span>
<span class="line"><span>res.</span><span>redirect</span><span>([code], url);</span><span>// Redirect (default 302)</span></span>
<span class="line"><span>res.</span><span>status</span><span>(code);         </span><span>// Set status (chainable)</span></span>
<span class="line"><span>res.</span><span>sendStatus</span><span>(code);     </span><span>// Send status text as body</span></span>
<span class="line"><span>res.</span><span>set</span><span>(name, value);     </span><span>// Set header</span></span>
<span class="line"><span>res.</span><span>type</span><span>(</span><span>'html'</span><span>);         </span><span>// Set Content-Type</span></span>
<span class="line"><span>res.</span><span>cookie</span><span>(n, v, opts);   </span><span>// Set cookie</span></span>
<span class="line"><span>res.</span><span>clearCookie</span><span>(name);    </span><span>// Delete cookie</span></span>
<span class="line"><span>res.</span><span>download</span><span>(path);       </span><span>// Trigger file download</span></span>
<span class="line"><span>res.</span><span>end</span><span>();                </span><span>// End response</span></span></code></pre></div></div></pre>

## Cookie Options

<pre><div class="not-prose my-0 flex w-full flex-col overflow-clip border border-border text-text-primary rounded-lg not-prose relative" data-code-block="true"><div class="border-border flex items-center justify-between border-b px-4 py-2"><div class="flex items-center gap-2"><svg width="14" stroke-width="1.5" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="text-text-secondary"><path d="M9.00001 21L8.00001 21C6.89544 21 6.00001 20.1057 6.00001 19.0011C6.00001 17.4501 6.00001 15.3443 6 14C6 13 4.5 12 4.5 12C4.5 12 6.00001 11 6.00001 10C6.00001 8.827 6.00001 6.62207 6.00001 4.99914C6.00001 3.89457 6.89544 3 8.00001 3L9.00001 3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 21L16 21C17.1046 21 18 20.1057 18 19.0011C18 17.4501 18 15.3443 18 14C18 13 19.5 12 19.5 12C19.5 12 18 11 18 10C18 8.827 18 6.62207 18 4.99914C18 3.89457 17.1046 3 16 3L15 3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg><span class="text-text-secondary text-sm font-medium">JavaScript</span></div><button class="inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ring-offset-2 focus-visible:ring-offset-surface-primary disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 text-sm text-interactive-active hover:text-interactive-normal active:text-text-tertiary font-normal relative rounded-lg p-[6px]" type="button" data-state="closed" data-slot="tooltip-trigger"><svg width="16" height="16" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="text-interactive-positive absolute inset-0 m-auto rotate-90 opacity-0 transition-all duration-300"><path d="M5 13L9 17L19 7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg><svg width="16" height="16" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="absolute inset-0 m-auto opacity-100 transition-opacity duration-300"><path d="M19.4 20H9.6C9.26863 20 9 19.7314 9 19.4V9.6C9 9.26863 9.26863 9 9.6 9H19.4C19.7314 9 20 9.26863 20 9.6V19.4C20 19.7314 19.7314 20 19.4 20Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 9V4.6C15 4.26863 14.7314 4 14.4 4H4.6C4.26863 4 4 4.26863 4 4.6V14.4C4 14.7314 4.26863 15 4.6 15H9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg></button></div><div class="code-block_container__lbMX4"><pre class="shiki github-dark shiki-code-block" tabindex="0"><code class="whitespace-pre-wrap break-words"><span class="line"><span>res.</span><span>cookie</span><span>(</span><span>'name'</span><span>, </span><span>'value'</span><span>, {</span></span>
<span class="line"><span>    maxAge: </span><span>86400000</span><span>,        </span><span>// Lifetime in ms</span></span>
<span class="line"><span>    expires: </span><span>new</span><span> Date</span><span>(),     </span><span>// Expiration date</span></span>
<span class="line"><span>    httpOnly: </span><span>true</span><span>,          </span><span>// JS can't access</span></span>
<span class="line"><span>    secure: </span><span>false</span><span>,           </span><span>// HTTPS only</span></span>
<span class="line"><span>    signed: </span><span>true</span><span>,            </span><span>// Tamper-proof (needs secret)</span></span>
<span class="line"><span>    sameSite: </span><span>'strict'</span><span>,      </span><span>// 'strict' | 'lax' | 'none'</span></span>
<span class="line"><span>    path: </span><span>'/'</span><span>,               </span><span>// Valid path</span></span>
<span class="line"><span>    domain: </span><span>'example.com'</span><span>    // Valid domain</span></span>
<span class="line"><span>});</span></span></code></pre></div></div></pre>

## Validator Methods

<pre><div class="not-prose my-0 flex w-full flex-col overflow-clip border border-border text-text-primary rounded-lg not-prose relative" data-code-block="true"><div class="border-border flex items-center justify-between border-b px-4 py-2"><div class="flex items-center gap-2"><svg width="14" stroke-width="1.5" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="text-text-secondary"><path d="M9.00001 21L8.00001 21C6.89544 21 6.00001 20.1057 6.00001 19.0011C6.00001 17.4501 6.00001 15.3443 6 14C6 13 4.5 12 4.5 12C4.5 12 6.00001 11 6.00001 10C6.00001 8.827 6.00001 6.62207 6.00001 4.99914C6.00001 3.89457 6.89544 3 8.00001 3L9.00001 3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 21L16 21C17.1046 21 18 20.1057 18 19.0011C18 17.4501 18 15.3443 18 14C18 13 19.5 12 19.5 12C19.5 12 18 11 18 10C18 8.827 18 6.62207 18 4.99914C18 3.89457 17.1046 3 16 3L15 3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg><span class="text-text-secondary text-sm font-medium">JavaScript</span></div><button class="inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ring-offset-2 focus-visible:ring-offset-surface-primary disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 text-sm text-interactive-active hover:text-interactive-normal active:text-text-tertiary font-normal relative rounded-lg p-[6px]" type="button" data-state="closed" data-slot="tooltip-trigger"><svg width="16" height="16" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="text-interactive-positive absolute inset-0 m-auto rotate-90 opacity-0 transition-all duration-300"><path d="M5 13L9 17L19 7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg><svg width="16" height="16" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="absolute inset-0 m-auto opacity-100 transition-opacity duration-300"><path d="M19.4 20H9.6C9.26863 20 9 19.7314 9 19.4V9.6C9 9.26863 9.26863 9 9.6 9H19.4C19.7314 9 20 9.26863 20 9.6V19.4C20 19.7314 19.7314 20 19.4 20Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 9V4.6C15 4.26863 14.7314 4 14.4 4H4.6C4.26863 4 4 4.26863 4 4.6V14.4C4 14.7314 4.26863 15 4.6 15H9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg></button></div><div class="code-block_container__lbMX4"><pre class="shiki github-dark shiki-code-block" tabindex="0"><code class="whitespace-pre-wrap break-words"><span class="line"><span>// VALIDATORS:</span></span>
<span class="line"><span>.</span><span>notEmpty</span><span>()  .</span><span>isEmpty</span><span>()  .</span><span>isEmail</span><span>()  .</span><span>isURL</span><span>()</span></span>
<span class="line"><span>.</span><span>isLength</span><span>({ min, max })  .</span><span>isInt</span><span>({ min, max })  .</span><span>isFloat</span><span>()</span></span>
<span class="line"><span>.</span><span>isAlpha</span><span>()  .</span><span>isAlphanumeric</span><span>()  .</span><span>isBoolean</span><span>()  .</span><span>isDate</span><span>()</span></span>
<span class="line"><span>.</span><span>isIn</span><span>([</span><span>'a'</span><span>,</span><span>'b'</span><span>])  .</span><span>matches</span><span>(</span><span>/</span><span>regex</span><span>/</span><span>)  .</span><span>contains</span><span>(</span><span>'text'</span><span>)</span></span>
<span class="line"><span>.</span><span>optional</span><span>()  .</span><span>custom</span><span>(fn)  .</span><span>withMessage</span><span>(</span><span>'msg'</span><span>)</span></span>
<span class="line"></span>
<span class="line"><span>// SANITIZERS:</span></span>
<span class="line"><span>.</span><span>trim</span><span>()  .</span><span>escape</span><span>()  .</span><span>normalizeEmail</span><span>()</span></span>
<span class="line"><span>.</span><span>toInt</span><span>()  .</span><span>toFloat</span><span>()  .</span><span>toBoolean</span><span>()</span></span>
<span class="line"><span>.</span><span>toLowerCase</span><span>()  .</span><span>toUpperCase</span><span>()</span></span>
<span class="line"></span>
<span class="line"><span>// CHECK RESULTS:</span></span>
<span class="line"><span>const</span><span> errors</span><span> =</span><span> validationResult</span><span>(req);</span></span>
<span class="line"><span>errors.</span><span>isEmpty</span><span>();   </span><span>// true if no errors</span></span>
<span class="line"><span>errors.</span><span>array</span><span>();     </span><span>// Array of error objects</span></span></code></pre></div></div></pre>

## fs Methods

<pre><div class="not-prose my-0 flex w-full flex-col overflow-clip border border-border text-text-primary rounded-lg not-prose relative" data-code-block="true"><div class="border-border flex items-center justify-between border-b px-4 py-2"><div class="flex items-center gap-2"><svg width="14" stroke-width="1.5" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="text-text-secondary"><path d="M9.00001 21L8.00001 21C6.89544 21 6.00001 20.1057 6.00001 19.0011C6.00001 17.4501 6.00001 15.3443 6 14C6 13 4.5 12 4.5 12C4.5 12 6.00001 11 6.00001 10C6.00001 8.827 6.00001 6.62207 6.00001 4.99914C6.00001 3.89457 6.89544 3 8.00001 3L9.00001 3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 21L16 21C17.1046 21 18 20.1057 18 19.0011C18 17.4501 18 15.3443 18 14C18 13 19.5 12 19.5 12C19.5 12 18 11 18 10C18 8.827 18 6.62207 18 4.99914C18 3.89457 17.1046 3 16 3L15 3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg><span class="text-text-secondary text-sm font-medium">JavaScript</span></div><button class="inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ring-offset-2 focus-visible:ring-offset-surface-primary disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 text-sm text-interactive-active hover:text-interactive-normal active:text-text-tertiary font-normal relative rounded-lg p-[6px]" type="button" data-state="closed" data-slot="tooltip-trigger"><svg width="16" height="16" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="text-interactive-positive absolute inset-0 m-auto rotate-90 opacity-0 transition-all duration-300"><path d="M5 13L9 17L19 7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg><svg width="16" height="16" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="absolute inset-0 m-auto opacity-100 transition-opacity duration-300"><path d="M19.4 20H9.6C9.26863 20 9 19.7314 9 19.4V9.6C9 9.26863 9.26863 9 9.6 9H19.4C19.7314 9 20 9.26863 20 9.6V19.4C20 19.7314 19.7314 20 19.4 20Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 9V4.6C15 4.26863 14.7314 4 14.4 4H4.6C4.26863 4 4 4.26863 4 4.6V14.4C4 14.7314 4.26863 15 4.6 15H9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg></button></div><div class="code-block_container__lbMX4"><pre class="shiki github-dark shiki-code-block" tabindex="0"><code class="whitespace-pre-wrap break-words"><span class="line"><span>// ASYNC:</span></span>
<span class="line"><span>fs.</span><span>readFile</span><span>(path, encoding, callback);</span></span>
<span class="line"><span>fs.</span><span>writeFile</span><span>(path, data, encoding, callback);</span></span>
<span class="line"><span>fs.</span><span>appendFile</span><span>(path, data, callback);</span></span>
<span class="line"><span>fs.</span><span>unlink</span><span>(path, callback);           </span><span>// Delete file</span></span>
<span class="line"><span>fs.</span><span>rename</span><span>(old, </span><span>new</span><span>, callback);</span></span>
<span class="line"><span>fs.</span><span>mkdir</span><span>(path, { recursive }, callback);</span></span>
<span class="line"><span>fs.</span><span>readdir</span><span>(path, callback);</span></span>
<span class="line"><span>fs.</span><span>stat</span><span>(path, callback);</span></span>
<span class="line"><span>fs.</span><span>copyFile</span><span>(src, dest, callback);</span></span>
<span class="line"><span>fs.</span><span>rm</span><span>(path, { recursive, force }, callback);</span></span>
<span class="line"></span>
<span class="line"><span>// SYNC: readFileSync, writeFileSync, existsSync, etc.</span></span>
<span class="line"><span>// STREAMS: createReadStream, createWriteStream</span></span>
<span class="line"><span>// Stream events: 'data', 'end', 'error', 'finish'</span></span>
<span class="line"><span>// Piping: readable.pipe(writable)</span></span></code></pre></div></div></pre>

## EventEmitter Methods

<pre><div class="not-prose my-0 flex w-full flex-col overflow-clip border border-border text-text-primary rounded-lg not-prose relative" data-code-block="true"><div class="border-border flex items-center justify-between border-b px-4 py-2"><div class="flex items-center gap-2"><svg width="14" stroke-width="1.5" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="text-text-secondary"><path d="M9.00001 21L8.00001 21C6.89544 21 6.00001 20.1057 6.00001 19.0011C6.00001 17.4501 6.00001 15.3443 6 14C6 13 4.5 12 4.5 12C4.5 12 6.00001 11 6.00001 10C6.00001 8.827 6.00001 6.62207 6.00001 4.99914C6.00001 3.89457 6.89544 3 8.00001 3L9.00001 3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 21L16 21C17.1046 21 18 20.1057 18 19.0011C18 17.4501 18 15.3443 18 14C18 13 19.5 12 19.5 12C19.5 12 18 11 18 10C18 8.827 18 6.62207 18 4.99914C18 3.89457 17.1046 3 16 3L15 3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg><span class="text-text-secondary text-sm font-medium">JavaScript</span></div><button class="inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ring-offset-2 focus-visible:ring-offset-surface-primary disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 text-sm text-interactive-active hover:text-interactive-normal active:text-text-tertiary font-normal relative rounded-lg p-[6px]" type="button" data-state="closed" data-slot="tooltip-trigger"><svg width="16" height="16" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="text-interactive-positive absolute inset-0 m-auto rotate-90 opacity-0 transition-all duration-300"><path d="M5 13L9 17L19 7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg><svg width="16" height="16" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="absolute inset-0 m-auto opacity-100 transition-opacity duration-300"><path d="M19.4 20H9.6C9.26863 20 9 19.7314 9 19.4V9.6C9 9.26863 9.26863 9 9.6 9H19.4C19.7314 9 20 9.26863 20 9.6V19.4C20 19.7314 19.7314 20 19.4 20Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 9V4.6C15 4.26863 14.7314 4 14.4 4H4.6C4.26863 4 4 4.26863 4 4.6V14.4C4 14.7314 4.26863 15 4.6 15H9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg></button></div><div class="code-block_container__lbMX4"><pre class="shiki github-dark shiki-code-block" tabindex="0"><code class="whitespace-pre-wrap break-words"><span class="line"><span>emitter.</span><span>on</span><span>(event, fn);           </span><span>// Listen (every time)</span></span>
<span class="line"><span>emitter.</span><span>once</span><span>(event, fn);         </span><span>// Listen (first time only)</span></span>
<span class="line"><span>emitter.</span><span>emit</span><span>(event, </span><span>...</span><span>args);    </span><span>// Fire event</span></span>
<span class="line"><span>emitter.</span><span>off</span><span>(event, fn);          </span><span>// Remove listener</span></span>
<span class="line"><span>emitter.</span><span>removeAllListeners</span><span>();    </span><span>// Remove all</span></span>
<span class="line"><span>emitter.</span><span>listenerCount</span><span>(event);    </span><span>// Count listeners</span></span>
<span class="line"><span>emitter.</span><span>eventNames</span><span>();            </span><span>// All event names</span></span></code></pre></div></div></pre>

## Promise & Async

<pre><div class="not-prose my-0 flex w-full flex-col overflow-clip border border-border text-text-primary rounded-lg not-prose relative" data-code-block="true"><div class="border-border flex items-center justify-between border-b px-4 py-2"><div class="flex items-center gap-2"><svg width="14" stroke-width="1.5" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="text-text-secondary"><path d="M9.00001 21L8.00001 21C6.89544 21 6.00001 20.1057 6.00001 19.0011C6.00001 17.4501 6.00001 15.3443 6 14C6 13 4.5 12 4.5 12C4.5 12 6.00001 11 6.00001 10C6.00001 8.827 6.00001 6.62207 6.00001 4.99914C6.00001 3.89457 6.89544 3 8.00001 3L9.00001 3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 21L16 21C17.1046 21 18 20.1057 18 19.0011C18 17.4501 18 15.3443 18 14C18 13 19.5 12 19.5 12C19.5 12 18 11 18 10C18 8.827 18 6.62207 18 4.99914C18 3.89457 17.1046 3 16 3L15 3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg><span class="text-text-secondary text-sm font-medium">JavaScript</span></div><button class="inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ring-offset-2 focus-visible:ring-offset-surface-primary disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 text-sm text-interactive-active hover:text-interactive-normal active:text-text-tertiary font-normal relative rounded-lg p-[6px]" type="button" data-state="closed" data-slot="tooltip-trigger"><svg width="16" height="16" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="text-interactive-positive absolute inset-0 m-auto rotate-90 opacity-0 transition-all duration-300"><path d="M5 13L9 17L19 7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg><svg width="16" height="16" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="absolute inset-0 m-auto opacity-100 transition-opacity duration-300"><path d="M19.4 20H9.6C9.26863 20 9 19.7314 9 19.4V9.6C9 9.26863 9.26863 9 9.6 9H19.4C19.7314 9 20 9.26863 20 9.6V19.4C20 19.7314 19.7314 20 19.4 20Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 9V4.6C15 4.26863 14.7314 4 14.4 4H4.6C4.26863 4 4 4.26863 4 4.6V14.4C4 14.7314 4.26863 15 4.6 15H9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg></button></div><div class="code-block_container__lbMX4"><pre class="shiki github-dark shiki-code-block" tabindex="0"><code class="whitespace-pre-wrap break-words"><span class="line"><span>new</span><span> Promise</span><span>((</span><span>resolve</span><span>, </span><span>reject</span><span>) </span><span>=></span><span> {});</span></span>
<span class="line"><span>.</span><span>then</span><span>(</span><span>val</span><span> =></span><span> {})  .</span><span>catch</span><span>(</span><span>err</span><span> =></span><span> {})  .</span><span>finally</span><span>(() </span><span>=></span><span> {})</span></span>
<span class="line"><span>Promise</span><span>.</span><span>all</span><span>([])  </span><span>Promise</span><span>.</span><span>race</span><span>([])  </span><span>Promise</span><span>.</span><span>allSettled</span><span>([])</span></span>
<span class="line"><span>async</span><span> function</span><span> fn</span><span>() { </span><span>const</span><span> x</span><span> =</span><span> await</span><span> promise; }</span></span>
<span class="line"><span>try</span><span> { </span><span>await</span><span> ...</span><span> } </span><span>catch</span><span>(err) { } </span><span>finally</span><span> { }</span></span></code></pre></div></div></pre>

---

# COMBINED PROGRAM (All Topics)

<pre><div class="not-prose my-0 flex w-full flex-col overflow-clip border border-border text-text-primary rounded-lg not-prose relative" data-code-block="true"><div class="border-border flex items-center justify-between border-b px-4 py-2"><div class="flex items-center gap-2"><svg width="14" stroke-width="1.5" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="text-text-secondary"><path d="M9.00001 21L8.00001 21C6.89544 21 6.00001 20.1057 6.00001 19.0011C6.00001 17.4501 6.00001 15.3443 6 14C6 13 4.5 12 4.5 12C4.5 12 6.00001 11 6.00001 10C6.00001 8.827 6.00001 6.62207 6.00001 4.99914C6.00001 3.89457 6.89544 3 8.00001 3L9.00001 3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 21L16 21C17.1046 21 18 20.1057 18 19.0011C18 17.4501 18 15.3443 18 14C18 13 19.5 12 19.5 12C19.5 12 18 11 18 10C18 8.827 18 6.62207 18 4.99914C18 3.89457 17.1046 3 16 3L15 3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg><span class="text-text-secondary text-sm font-medium">JavaScript</span></div><button class="inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ring-offset-2 focus-visible:ring-offset-surface-primary disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 text-sm text-interactive-active hover:text-interactive-normal active:text-text-tertiary font-normal relative rounded-lg p-[6px]" type="button" data-state="closed" data-slot="tooltip-trigger"><svg width="16" height="16" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="text-interactive-positive absolute inset-0 m-auto rotate-90 opacity-0 transition-all duration-300"><path d="M5 13L9 17L19 7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg><svg width="16" height="16" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="absolute inset-0 m-auto opacity-100 transition-opacity duration-300"><path d="M19.4 20H9.6C9.26863 20 9 19.7314 9 19.4V9.6C9 9.26863 9.26863 9 9.6 9H19.4C19.7314 9 20 9.26863 20 9.6V19.4C20 19.7314 19.7314 20 19.4 20Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 9V4.6C15 4.26863 14.7314 4 14.4 4H4.6C4.26863 4 4 4.26863 4 4.6V14.4C4 14.7314 4.26863 15 4.6 15H9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg></button></div><div class="code-block_container__lbMX4"><pre class="shiki github-dark shiki-code-block" tabindex="0"><code class="whitespace-pre-wrap break-words"><span class="line"><span>// ══════ routes/itemRoutes.js ══════</span></span>
<span class="line"><span>import</span><span> express </span><span>from</span><span> 'express'</span><span>;</span></span>
<span class="line"><span>import</span><span> { body, param, validationResult } </span><span>from</span><span> 'express-validator'</span><span>;</span></span>
<span class="line"><span>const</span><span> router</span><span> =</span><span> express.</span><span>Router</span><span>();</span></span>
<span class="line"></span>
<span class="line"><span>let</span><span> items </span><span>=</span><span> [</span></span>
<span class="line"><span>    { id: </span><span>1</span><span>, name: </span><span>"Laptop"</span><span>, price: </span><span>50000</span><span> },</span></span>
<span class="line"><span>    { id: </span><span>2</span><span>, name: </span><span>"Phone"</span><span>, price: </span><span>20000</span><span> }</span></span>
<span class="line"><span>];</span></span>
<span class="line"><span>let</span><span> nextId </span><span>=</span><span> 3</span><span>;</span></span>
<span class="line"></span>
<span class="line"><span>router.</span><span>get</span><span>(</span><span>'/items'</span><span>, (</span><span>req</span><span>, </span><span>res</span><span>) </span><span>=></span><span> {</span></span>
<span class="line"><span>    let</span><span> result </span><span>=</span><span> [</span><span>...</span><span>items];</span></span>
<span class="line"><span>    if</span><span> (req.query.sort </span><span>===</span><span> 'price'</span><span>) result.</span><span>sort</span><span>((</span><span>a</span><span>, </span><span>b</span><span>) </span><span>=></span><span> a.price </span><span>-</span><span> b.price);</span></span>
<span class="line"><span>    res.</span><span>json</span><span>({ count: result.</span><span>length</span><span>, items: result });</span></span>
<span class="line"><span>});</span></span>
<span class="line"></span>
<span class="line"><span>router.</span><span>get</span><span>(</span><span>'/items/:id'</span><span>,</span></span>
<span class="line"><span>    [</span><span>param</span><span>(</span><span>'id'</span><span>).</span><span>isInt</span><span>({ min: </span><span>1</span><span> }).</span><span>withMessage</span><span>(</span><span>'Positive integer'</span><span>)],</span></span>
<span class="line"><span>    (</span><span>req</span><span>, </span><span>res</span><span>) </span><span>=></span><span> {</span></span>
<span class="line"><span>        const</span><span> errors</span><span> =</span><span> validationResult</span><span>(req);</span></span>
<span class="line"><span>        if</span><span> (</span><span>!</span><span>errors.</span><span>isEmpty</span><span>()) </span><span>return</span><span> res.</span><span>status</span><span>(</span><span>400</span><span>).</span><span>json</span><span>({ errors: errors.</span><span>array</span><span>() });</span></span>
<span class="line"><span>        const</span><span> item</span><span> =</span><span> items.</span><span>find</span><span>(</span><span>i</span><span> =></span><span> i.id </span><span>===</span><span> parseInt</span><span>(req.params.id));</span></span>
<span class="line"><span>        if</span><span> (</span><span>!</span><span>item) </span><span>return</span><span> res.</span><span>status</span><span>(</span><span>404</span><span>).</span><span>json</span><span>({ error: </span><span>"Not found"</span><span> });</span></span>
<span class="line"><span>        res.</span><span>json</span><span>(item);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>);</span></span>
<span class="line"></span>
<span class="line"><span>router.</span><span>post</span><span>(</span><span>'/items'</span><span>,</span></span>
<span class="line"><span>    [</span></span>
<span class="line"><span>        body</span><span>(</span><span>'name'</span><span>).</span><span>notEmpty</span><span>().</span><span>withMessage</span><span>(</span><span>'Name required'</span><span>).</span><span>trim</span><span>(),</span></span>
<span class="line"><span>        body</span><span>(</span><span>'price'</span><span>).</span><span>isFloat</span><span>({ min: </span><span>0</span><span> }).</span><span>withMessage</span><span>(</span><span>'Price must be positive'</span><span>)</span></span>
<span class="line"><span>    ],</span></span>
<span class="line"><span>    (</span><span>req</span><span>, </span><span>res</span><span>) </span><span>=></span><span> {</span></span>
<span class="line"><span>        const</span><span> errors</span><span> =</span><span> validationResult</span><span>(req);</span></span>
<span class="line"><span>        if</span><span> (</span><span>!</span><span>errors.</span><span>isEmpty</span><span>()) </span><span>return</span><span> res.</span><span>status</span><span>(</span><span>400</span><span>).</span><span>json</span><span>({ errors: errors.</span><span>array</span><span>() });</span></span>
<span class="line"><span>        const</span><span> newItem</span><span> =</span><span> { id: nextId</span><span>++</span><span>, name: req.body.name, price: req.body.price };</span></span>
<span class="line"><span>        items.</span><span>push</span><span>(newItem);</span></span>
<span class="line"><span>        res.</span><span>status</span><span>(</span><span>201</span><span>).</span><span>json</span><span>({ message: </span><span>"Created!"</span><span>, item: newItem });</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>);</span></span>
<span class="line"></span>
<span class="line"><span>router.</span><span>put</span><span>(</span><span>'/items/:id'</span><span>, (</span><span>req</span><span>, </span><span>res</span><span>) </span><span>=></span><span> {</span></span>
<span class="line"><span>    const</span><span> item</span><span> =</span><span> items.</span><span>find</span><span>(</span><span>i</span><span> =></span><span> i.id </span><span>===</span><span> parseInt</span><span>(req.params.id));</span></span>
<span class="line"><span>    if</span><span> (</span><span>!</span><span>item) </span><span>return</span><span> res.</span><span>status</span><span>(</span><span>404</span><span>).</span><span>json</span><span>({ error: </span><span>"Not found"</span><span> });</span></span>
<span class="line"><span>    item.name </span><span>=</span><span> req.body.name </span><span>||</span><span> item.name;</span></span>
<span class="line"><span>    item.price </span><span>=</span><span> req.body.price </span><span>||</span><span> item.price;</span></span>
<span class="line"><span>    res.</span><span>json</span><span>({ message: </span><span>"Updated!"</span><span>, item });</span></span>
<span class="line"><span>});</span></span>
<span class="line"></span>
<span class="line"><span>router.</span><span>delete</span><span>(</span><span>'/items/:id'</span><span>, (</span><span>req</span><span>, </span><span>res</span><span>) </span><span>=></span><span> {</span></span>
<span class="line"><span>    const</span><span> idx</span><span> =</span><span> items.</span><span>findIndex</span><span>(</span><span>i</span><span> =></span><span> i.id </span><span>===</span><span> parseInt</span><span>(req.params.id));</span></span>
<span class="line"><span>    if</span><span> (idx </span><span>===</span><span> -</span><span>1</span><span>) </span><span>return</span><span> res.</span><span>status</span><span>(</span><span>404</span><span>).</span><span>json</span><span>({ error: </span><span>"Not found"</span><span> });</span></span>
<span class="line"><span>    const</span><span> deleted</span><span> =</span><span> items.</span><span>splice</span><span>(idx, </span><span>1</span><span>);</span></span>
<span class="line"><span>    res.</span><span>json</span><span>({ message: </span><span>"Deleted!"</span><span>, item: deleted[</span><span>0</span><span>] });</span></span>
<span class="line"><span>});</span></span>
<span class="line"></span>
<span class="line"><span>export</span><span> default</span><span> router;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span>// ══════ index.js (Main Application) ══════</span></span>
<span class="line"><span>import</span><span> express </span><span>from</span><span> 'express'</span><span>;</span></span>
<span class="line"><span>import</span><span> path </span><span>from</span><span> 'path'</span><span>;</span></span>
<span class="line"><span>import</span><span> { fileURLToPath } </span><span>from</span><span> 'url'</span><span>;</span></span>
<span class="line"><span>import</span><span> cookieParser </span><span>from</span><span> 'cookie-parser'</span><span>;</span></span>
<span class="line"><span>import</span><span> session </span><span>from</span><span> 'express-session'</span><span>;</span></span>
<span class="line"><span>import</span><span> itemRoutes </span><span>from</span><span> './routes/itemRoutes.js'</span><span>;</span></span>
<span class="line"></span>
<span class="line"><span>const</span><span> __filename</span><span> =</span><span> fileURLToPath</span><span>(</span><span>import</span><span>.</span><span>meta</span><span>.url);</span></span>
<span class="line"><span>const</span><span> __dirname</span><span> =</span><span> path.</span><span>dirname</span><span>(__filename);</span></span>
<span class="line"><span>const</span><span> app</span><span> =</span><span> express</span><span>();</span></span>
<span class="line"></span>
<span class="line"><span>// 1. Built-in middleware</span></span>
<span class="line"><span>app.</span><span>use</span><span>(express.</span><span>json</span><span>());</span></span>
<span class="line"><span>app.</span><span>use</span><span>(express.</span><span>urlencoded</span><span>({ extended: </span><span>true</span><span> }));</span></span>
<span class="line"><span>app.</span><span>use</span><span>(express.</span><span>static</span><span>(path.</span><span>join</span><span>(__dirname, </span><span>'public'</span><span>)));</span></span>
<span class="line"></span>
<span class="line"><span>// 2. Third-party middleware</span></span>
<span class="line"><span>app.</span><span>use</span><span>(</span><span>cookieParser</span><span>(</span><span>'secret123'</span><span>));</span></span>
<span class="line"><span>app.</span><span>use</span><span>(</span><span>session</span><span>({</span></span>
<span class="line"><span>    secret: </span><span>'session-secret'</span><span>, resave: </span><span>false</span><span>,</span></span>
<span class="line"><span>    saveUninitialized: </span><span>false</span><span>, cookie: { maxAge: </span><span>30</span><span> *</span><span> 60</span><span> *</span><span> 1000</span><span> }</span></span>
<span class="line"><span>}));</span></span>
<span class="line"></span>
<span class="line"><span>// 3. Custom middleware: Logger</span></span>
<span class="line"><span>app.</span><span>use</span><span>((</span><span>req</span><span>, </span><span>res</span><span>, </span><span>next</span><span>) </span><span>=></span><span> {</span></span>
<span class="line"><span>    console.</span><span>log</span><span>(</span><span>`${</span><span>req</span><span>.</span><span>method</span><span>} ${</span><span>req</span><span>.</span><span>url</span><span>}`</span><span>);</span></span>
<span class="line"><span>    next</span><span>();</span></span>
<span class="line"><span>});</span></span>
<span class="line"></span>
<span class="line"><span>// 4. Mount router</span></span>
<span class="line"><span>app.</span><span>use</span><span>(</span><span>'/api'</span><span>, itemRoutes);</span></span>
<span class="line"></span>
<span class="line"><span>// Cookie routes</span></span>
<span class="line"><span>app.</span><span>get</span><span>(</span><span>'/set-cookie'</span><span>, (</span><span>req</span><span>, </span><span>res</span><span>) </span><span>=></span><span> {</span></span>
<span class="line"><span>    res.</span><span>cookie</span><span>(</span><span>'theme'</span><span>, </span><span>'dark'</span><span>, { maxAge: </span><span>86400000</span><span> });</span></span>
<span class="line"><span>    res.</span><span>json</span><span>({ message: </span><span>"Cookie set!"</span><span> });</span></span>
<span class="line"><span>});</span></span>
<span class="line"><span>app.</span><span>get</span><span>(</span><span>'/get-cookies'</span><span>, (</span><span>req</span><span>, </span><span>res</span><span>) </span><span>=></span><span> {</span></span>
<span class="line"><span>    res.</span><span>json</span><span>({ cookies: req.cookies, signed: req.signedCookies });</span></span>
<span class="line"><span>});</span></span>
<span class="line"><span>app.</span><span>get</span><span>(</span><span>'/clear-cookies'</span><span>, (</span><span>req</span><span>, </span><span>res</span><span>) </span><span>=></span><span> {</span></span>
<span class="line"><span>    res.</span><span>clearCookie</span><span>(</span><span>'theme'</span><span>);</span></span>
<span class="line"><span>    res.</span><span>json</span><span>({ message: </span><span>"Cleared!"</span><span> });</span></span>
<span class="line"><span>});</span></span>
<span class="line"></span>
<span class="line"><span>// Session routes</span></span>
<span class="line"><span>app.</span><span>post</span><span>(</span><span>'/login'</span><span>, (</span><span>req</span><span>, </span><span>res</span><span>) </span><span>=></span><span> {</span></span>
<span class="line"><span>    const</span><span> { </span><span>username</span><span>, </span><span>password</span><span> } </span><span>=</span><span> req.body;</span></span>
<span class="line"><span>    if</span><span> (username </span><span>===</span><span> 'admin'</span><span> &&</span><span> password </span><span>===</span><span> 'pass'</span><span>) {</span></span>
<span class="line"><span>        req.session.user </span><span>=</span><span> { name: username, role: </span><span>'admin'</span><span> };</span></span>
<span class="line"><span>        req.session.isLoggedIn </span><span>=</span><span> true</span><span>;</span></span>
<span class="line"><span>        res.</span><span>json</span><span>({ message: </span><span>`Welcome ${</span><span>username</span><span>}!`</span><span> });</span></span>
<span class="line"><span>    } </span><span>else</span><span> {</span></span>
<span class="line"><span>        res.</span><span>status</span><span>(</span><span>401</span><span>).</span><span>json</span><span>({ error: </span><span>"Invalid credentials"</span><span> });</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>});</span></span>
<span class="line"><span>app.</span><span>get</span><span>(</span><span>'/profile'</span><span>, (</span><span>req</span><span>, </span><span>res</span><span>) </span><span>=></span><span> {</span></span>
<span class="line"><span>    if</span><span> (req.session.isLoggedIn) res.</span><span>json</span><span>({ user: req.session.user });</span></span>
<span class="line"><span>    else</span><span> res.</span><span>status</span><span>(</span><span>401</span><span>).</span><span>json</span><span>({ error: </span><span>"Login first!"</span><span> });</span></span>
<span class="line"><span>});</span></span>
<span class="line"><span>app.</span><span>post</span><span>(</span><span>'/logout'</span><span>, (</span><span>req</span><span>, </span><span>res</span><span>) </span><span>=></span><span> {</span></span>
<span class="line"><span>    req.session.</span><span>destroy</span><span>(() </span><span>=></span><span> {</span></span>
<span class="line"><span>        res.</span><span>clearCookie</span><span>(</span><span>'connect.sid'</span><span>);</span></span>
<span class="line"><span>        res.</span><span>json</span><span>({ message: </span><span>"Logged out!"</span><span> });</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>});</span></span>
<span class="line"><span>app.</span><span>get</span><span>(</span><span>'/counter'</span><span>, (</span><span>req</span><span>, </span><span>res</span><span>) </span><span>=></span><span> {</span></span>
<span class="line"><span>    req.session.views </span><span>=</span><span> (req.session.views </span><span>||</span><span> 0</span><span>) </span><span>+</span><span> 1</span><span>;</span></span>
<span class="line"><span>    res.</span><span>json</span><span>({ views: req.session.views });</span></span>
<span class="line"><span>});</span></span>
<span class="line"></span>
<span class="line"><span>// app.all() example</span></span>
<span class="line"><span>app.</span><span>all</span><span>(</span><span>'/api/echo'</span><span>, (</span><span>req</span><span>, </span><span>res</span><span>) </span><span>=></span><span> {</span></span>
<span class="line"><span>    res.</span><span>json</span><span>({ method: req.method, body: req.body, query: req.query });</span></span>
<span class="line"><span>});</span></span>
<span class="line"></span>
<span class="line"><span>// Home</span></span>
<span class="line"><span>app.</span><span>get</span><span>(</span><span>'/'</span><span>, (</span><span>req</span><span>, </span><span>res</span><span>) </span><span>=></span><span> {</span></span>
<span class="line"><span>    res.</span><span>json</span><span>({ message: </span><span>"INT222 API"</span><span>, endpoints: [</span></span>
<span class="line"><span>        "GET/POST /api/items"</span><span>, </span><span>"GET/PUT/DELETE /api/items/:id"</span><span>,</span></span>
<span class="line"><span>        "POST /login"</span><span>, </span><span>"GET /profile"</span><span>, </span><span>"POST /logout"</span><span>,</span></span>
<span class="line"><span>        "GET /set-cookie"</span><span>, </span><span>"GET /get-cookies"</span><span>, </span><span>"GET /counter"</span></span>
<span class="line"><span>    ]});</span></span>
<span class="line"><span>});</span></span>
<span class="line"></span>
<span class="line"><span>// 5. 404 handler</span></span>
<span class="line"><span>app.</span><span>use</span><span>((</span><span>req</span><span>, </span><span>res</span><span>) </span><span>=></span><span> {</span></span>
<span class="line"><span>    res.</span><span>status</span><span>(</span><span>404</span><span>).</span><span>json</span><span>({ error: </span><span>`Cannot ${</span><span>req</span><span>.</span><span>method</span><span>} ${</span><span>req</span><span>.</span><span>url</span><span>}`</span><span> });</span></span>
<span class="line"><span>});</span></span>
<span class="line"></span>
<span class="line"><span>// 6. Error handler (4 params, LAST!)</span></span>
<span class="line"><span>app.</span><span>use</span><span>((</span><span>err</span><span>, </span><span>req</span><span>, </span><span>res</span><span>, </span><span>next</span><span>) </span><span>=></span><span> {</span></span>
<span class="line"><span>    console.</span><span>error</span><span>(err.message);</span></span>
<span class="line"><span>    res.</span><span>status</span><span>(err.status </span><span>||</span><span> 500</span><span>).</span><span>json</span><span>({ error: err.message });</span></span>
<span class="line"><span>});</span></span>
<span class="line"></span>
<span class="line"><span>app.</span><span>listen</span><span>(</span><span>3000</span><span>, () </span><span>=></span><span> console.</span><span>log</span><span>(</span><span>"Server on http://localhost:3000"</span><span>));</span></span></code></pre></div></div></pre>

---

# TRICKY CONCEPTS

<pre><div class="not-prose my-0 flex w-full flex-col overflow-clip border border-border text-text-primary rounded-lg not-prose relative" data-code-block="true"><div class="border-border flex items-center justify-between border-b px-4 py-2"><div class="flex items-center gap-2"><svg width="14" stroke-width="1.5" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="text-text-secondary"><path d="M9.00001 21L8.00001 21C6.89544 21 6.00001 20.1057 6.00001 19.0011C6.00001 17.4501 6.00001 15.3443 6 14C6 13 4.5 12 4.5 12C4.5 12 6.00001 11 6.00001 10C6.00001 8.827 6.00001 6.62207 6.00001 4.99914C6.00001 3.89457 6.89544 3 8.00001 3L9.00001 3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 21L16 21C17.1046 21 18 20.1057 18 19.0011C18 17.4501 18 15.3443 18 14C18 13 19.5 12 19.5 12C19.5 12 18 11 18 10C18 8.827 18 6.62207 18 4.99914C18 3.89457 17.1046 3 16 3L15 3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg><span class="text-text-secondary text-sm font-medium">JavaScript</span></div><button class="inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ring-offset-2 focus-visible:ring-offset-surface-primary disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 text-sm text-interactive-active hover:text-interactive-normal active:text-text-tertiary font-normal relative rounded-lg p-[6px]" type="button" data-state="closed" data-slot="tooltip-trigger"><svg width="16" height="16" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="text-interactive-positive absolute inset-0 m-auto rotate-90 opacity-0 transition-all duration-300"><path d="M5 13L9 17L19 7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg><svg width="16" height="16" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="absolute inset-0 m-auto opacity-100 transition-opacity duration-300"><path d="M19.4 20H9.6C9.26863 20 9 19.7314 9 19.4V9.6C9 9.26863 9.26863 9 9.6 9H19.4C19.7314 9 20 9.26863 20 9.6V19.4C20 19.7314 19.7314 20 19.4 20Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 9V4.6C15 4.26863 14.7314 4 14.4 4H4.6C4.26863 4 4 4.26863 4 4.6V14.4C4 14.7314 4.26863 15 4.6 15H9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg></button></div><div class="code-block_container__lbMX4"><pre class="shiki github-dark shiki-code-block" tabindex="0"><code class="whitespace-pre-wrap break-words"><span class="line"><span>// 1. Middleware order matters!</span></span>
<span class="line"><span>// Define middleware BEFORE routes. If route sends response first,</span></span>
<span class="line"><span>// middleware after it won't run.</span></span>
<span class="line"></span>
<span class="line"><span>// 2. next() with argument = ERROR</span></span>
<span class="line"><span>app.</span><span>get</span><span>(</span><span>'/test'</span><span>, (</span><span>req</span><span>, </span><span>res</span><span>, </span><span>next</span><span>) </span><span>=></span><span> {</span></span>
<span class="line"><span>    next</span><span>(</span><span>new</span><span> Error</span><span>(</span><span>"Oops!"</span><span>));  </span><span>// Skips to error handler</span></span>
<span class="line"><span>});</span></span>
<span class="line"></span>
<span class="line"><span>// 3. Don't call BOTH next() AND res.send()</span></span>
<span class="line"><span>// Either send response OR call next(), NOT both!</span></span>
<span class="line"></span>
<span class="line"><span>// 4. app.use() does PREFIX matching, app.all() does EXACT matching</span></span>
<span class="line"></span>
<span class="line"><span>// 5. ES Modules: __dirname doesn't exist!</span></span>
<span class="line"><span>// Use: fileURLToPath(import.meta.url) + path.dirname()</span></span>
<span class="line"></span>
<span class="line"><span>// 6. express.json() is REQUIRED for req.body to work!</span></span>
<span class="line"><span>// Without it: req.body = undefined</span></span>
<span class="line"></span>
<span class="line"><span>// 7. Events are SYNCHRONOUS</span></span>
<span class="line"><span>console.</span><span>log</span><span>(</span><span>"Before"</span><span>);</span></span>
<span class="line"><span>emitter.</span><span>emit</span><span>(</span><span>'test'</span><span>);  </span><span>// Runs immediately</span></span>
<span class="line"><span>console.</span><span>log</span><span>(</span><span>"After"</span><span>);</span></span>
<span class="line"><span>// Output: Before, (event handler), After</span></span>
<span class="line"></span>
<span class="line"><span>// 8. Zlib: Decompress AFTER compress finishes → Z_BUF_ERROR</span></span>
<span class="line"></span>
<span class="line"><span>// 9. req.params values are always STRINGS</span></span>
<span class="line"><span>// /users/42 → req.params.id = "42" (string, not number!)</span></span>
<span class="line"><span>// Use parseInt(req.params.id) to convert</span></span>
<span class="line"></span>
<span class="line"><span>// 10. Output order question:</span></span>
<span class="line"><span>console.</span><span>log</span><span>(</span><span>"1"</span><span>);</span></span>
<span class="line"><span>setTimeout</span><span>(() </span><span>=></span><span> console.</span><span>log</span><span>(</span><span>"2"</span><span>), </span><span>0</span><span>);</span></span>
<span class="line"><span>Promise</span><span>.</span><span>resolve</span><span>().</span><span>then</span><span>(() </span><span>=></span><span> console.</span><span>log</span><span>(</span><span>"3"</span><span>));</span></span>
<span class="line"><span>console.</span><span>log</span><span>(</span><span>"4"</span><span>);</span></span>
<span class="line"><span>// Output: 1, 4, 3, 2</span></span>
<span class="line"><span>// Sync first, then microtasks (Promise), then macrotasks (setTimeout)</span></span></code></pre></div></div></pre>

---

# FINAL CHEAT SHEET

<pre><div class="not-prose my-0 flex w-full flex-col overflow-clip border border-border text-text-primary rounded-lg not-prose relative" data-code-block="true"><div class="border-border flex items-center justify-between border-b px-4 py-2"><div class="flex items-center gap-2"><svg width="14" stroke-width="1.5" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="text-text-secondary"><path d="M9.00001 21L8.00001 21C6.89544 21 6.00001 20.1057 6.00001 19.0011C6.00001 17.4501 6.00001 15.3443 6 14C6 13 4.5 12 4.5 12C4.5 12 6.00001 11 6.00001 10C6.00001 8.827 6.00001 6.62207 6.00001 4.99914C6.00001 3.89457 6.89544 3 8.00001 3L9.00001 3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 21L16 21C17.1046 21 18 20.1057 18 19.0011C18 17.4501 18 15.3443 18 14C18 13 19.5 12 19.5 12C19.5 12 18 11 18 10C18 8.827 18 6.62207 18 4.99914C18 3.89457 17.1046 3 16 3L15 3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg><span class="text-text-secondary text-sm font-medium">text</span></div><button class="inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ring-offset-2 focus-visible:ring-offset-surface-primary disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 text-sm text-interactive-active hover:text-interactive-normal active:text-text-tertiary font-normal relative rounded-lg p-[6px]" type="button" data-state="closed" data-slot="tooltip-trigger"><svg width="16" height="16" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="text-interactive-positive absolute inset-0 m-auto rotate-90 opacity-0 transition-all duration-300"><path d="M5 13L9 17L19 7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg><svg width="16" height="16" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="absolute inset-0 m-auto opacity-100 transition-opacity duration-300"><path d="M19.4 20H9.6C9.26863 20 9 19.7314 9 19.4V9.6C9 9.26863 9.26863 9 9.6 9H19.4C19.7314 9 20 9.26863 20 9.6V19.4C20 19.7314 19.7314 20 19.4 20Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 9V4.6C15 4.26863 14.7314 4 14.4 4H4.6C4.26863 4 4 4.26863 4 4.6V14.4C4 14.7314 4.26863 15 4.6 15H9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg></button></div><div class="code-block_container__lbMX4"><pre class="shiki github-dark shiki-code-block" tabindex="0"><code class="whitespace-pre-wrap break-words"><span class="line"><span>ES MODULES:  import x from 'x'  |  export default x</span></span>
<span class="line"><span>             "type": "module" in package.json</span></span>
<span class="line"><span>             __dirname: fileURLToPath(import.meta.url) + path.dirname</span></span>
<span class="line"><span></span></span>
<span class="line"><span>HTTP:        http.createServer((req,res) => { res.end("Hi") })</span></span>
<span class="line"><span>             req: .method .url .headers | res: .writeHead() .end()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>FS:          readFile, writeFile, appendFile, unlink, mkdir, readdir</span></span>
<span class="line"><span>             createReadStream, createWriteStream</span></span>
<span class="line"><span></span></span>
<span class="line"><span>STREAMS:     .on('data') .on('end') .on('error') .pipe()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>ZLIB:        createGzip/createGunzip — decompress AFTER compress!</span></span>
<span class="line"><span></span></span>
<span class="line"><span>PROMISE:     new Promise((resolve, reject) => {})</span></span>
<span class="line"><span>             .then() .catch() | Promise.all/race/allSettled</span></span>
<span class="line"><span></span></span>
<span class="line"><span>ASYNC:       async function() { const x = await promise; }</span></span>
<span class="line"><span>             try/catch for errors</span></span>
<span class="line"><span></span></span>
<span class="line"><span>EXPRESS:     app.get/post/put/delete(path, handler)</span></span>
<span class="line"><span>             res.send() | res.json() | res.sendFile()</span></span>
<span class="line"><span>             req.params | req.query | req.body</span></span>
<span class="line"><span></span></span>
<span class="line"><span>ROUTER:      const router = express.Router()</span></span>
<span class="line"><span>             export default router | app.use('/api', router)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>VALIDATOR:   body('f').isEmail().withMessage('msg')</span></span>
<span class="line"><span>             validationResult(req).isEmpty() / .array()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>COOKIES:     app.use(cookieParser('secret'))</span></span>
<span class="line"><span>             res.cookie(n,v,opts) | req.cookies | res.clearCookie()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>SESSIONS:    cookie-session: data IN cookie, req.session = null</span></span>
<span class="line"><span>             express-session: data on SERVER, req.session.destroy(cb)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>MIDDLEWARE:  app.use(fn) → all methods, PREFIX match</span></span>
<span class="line"><span>             app.all(path,fn) → all methods, EXACT match</span></span>
<span class="line"><span>             Must call next() or send response!</span></span>
<span class="line"><span>             Error MW: (err,req,res,next) → 4 params, LAST!</span></span>
<span class="line"><span></span></span>
<span class="line"><span>ORDER:       Built-in → Third-party → Custom → Routes → 404 → Error</span></span>
<span class="line"><span></span></span>
<span class="line"><span>STATUS:      200 OK | 201 Created | 400 Bad Request</span></span>
<span class="line"><span>             401 Unauthorized | 403 Forbidden | 404 Not Found</span></span>
<span class="line"><span>             500 Internal Server Error</span></span>
<span class="line"><span></span></span>
<span class="line"><span>STATIC:      app.use(express.static('public'))</span></span>
<span class="line"><span>JSON:        app.use(express.json())</span></span>
<span class="line"><span>FORM:        app.use(express.urlencoded({ extended: true }))</span></span></code></pre></div></div></pre>
