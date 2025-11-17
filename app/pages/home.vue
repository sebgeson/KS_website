<template>
    <main class="page">
        <header class="hero">
            <div class="container">
                <h1 class="title">Komplett Sprinkler — Reliable Fire Protection</h1>
                <p class="subtitle">
                    Design, installation and maintenance of automatic sprinkler systems for homes and businesses.
                </p>

                <div class="cta-row">
                    <button class="btn primary" @click="scrollTo('#contact')">Get a free quote</button>
                    <button class="btn ghost" @click="scrollTo('#features')">See features</button>
                </div>

                <ul class="quick-stats">
                    <li>
                        <strong>24/7</strong>
                        <span>Emergency support</span>
                    </li>
                    <li>
                        <strong>ISO</strong>
                        <span>Standard compliant</span>
                    </li>
                    <li>
                        <strong>10+ yrs</strong>
                        <span>Local experience</span>
                    </li>
                </ul>
            </div>
        </header>

        <section id="features" class="container features">
            <h2>What we do</h2>
            <p class="lead">Full lifecycle support — from inspection to long-term maintenance.</p>

            <div class="grid">
                <article class="card">
                    <svg class="icon" viewBox="0 0 24 24" aria-hidden><path d="M12 2v10l4 4"/></svg>
                    <h3>Design & Consultation</h3>
                    <p>Site-specific system design using up-to-date codes and good engineering practice.</p>
                </article>

                <article class="card">
                    <svg class="icon" viewBox="0 0 24 24" aria-hidden><path d="M3 12h18"/></svg>
                    <h3>Installation</h3>
                    <p>Certified installers, careful project management and tested systems on handover.</p>
                </article>

                <article class="card">
                    <svg class="icon" viewBox="0 0 24 24" aria-hidden><path d="M5 12h14v8H5z"/></svg>
                    <h3>Service & Maintenance</h3>
                    <p>Scheduled inspections, fast repairs and documentation so your insurance stays valid.</p>
                </article>
            </div>
        </section>

          

        <section class="how-it-works container">
            <h2>How it works</h2>
            <ol class="steps">
                <li>Request a site visit</li>
                <li>We provide a tailored sprinkler layout and estimate</li>
                <li>Installation and final acceptance tests</li>
            </ol>
        </section>

        <section id="contact" class="container contact">
            <h2>Contact us</h2>
            <p class="lead">Quick question? Leave your details and we'll get back to you within one business day.</p>

            <form class="contact-form" @submit.prevent="onSubmit">
                <label>
                    Name
                    <input v-model="form.name" required />
                </label>

                <label>
                    Email
                    <input v-model="form.email" type="email" required />
                </label>

                <label>
                    Message
                    <textarea v-model="form.message" rows="4"></textarea>
                </label>

                <div class="form-actions">
                    <button class="btn primary" :disabled="submitting">
                        {{ submitting ? 'Sending…' : 'Send message' }}
                    </button>

                    <button type="button" class="btn ghost" @click="resetForm" :disabled="submitting">
                        Reset
                    </button>
                </div>

                <p v-if="sent" class="notice success">Thanks! We'll contact you shortly.</p>
                <p v-if="error" class="notice error">Network error. Try again later.</p>
            </form>
        </section>

        <footer class="site-footer">
            <div class="container">
                <p>&copy; {{ new Date().getFullYear() }} Komplett Sprinkler. All rights reserved.</p>
            </div>
        </footer>
    </main>
</template>

<script setup>
// Add to your <script setup> (also update the existing import to:
// import { ref, onMounted, onUnmounted } from 'vue')
import { ref, onMounted, onUnmounted } from 'vue'
import { useHead } from '#imports'

useHead({
    title: 'KomplettSprinkler — Home',
    meta: [
        { name: 'description', content: 'KomplettSprinkler provides professional sprinkler installation and maintenance services.' }
    ]
})




const _heroMinimized = ref(false)
let _ticking = false
const SCROLL_THRESHOLD = 120

function _updateHeroState() {
    const should = window.scrollY > SCROLL_THRESHOLD
    if (should === _heroMinimized.value) return
    _heroMinimized.value = should
    const hero = document.querySelector('.hero')
    const pageEl = document.querySelector('.page')
    if (hero) hero.classList.toggle('minimized', should)
    if (pageEl) pageEl.classList.toggle('header-minimized', should)
}

function _onScroll() {
    if (_ticking) return
    _ticking = true
    requestAnimationFrame(() => {
        _updateHeroState()
        _ticking = false
    })
}

onMounted(() => {
    _updateHeroState()
    window.addEventListener('scroll', _onScroll, { passive: true })
})

onUnmounted(() => {
    window.removeEventListener('scroll', _onScroll)
})

const form = ref({
    name: '',
    email: '',
    message: ''
})
const submitting = ref(false)
const sent = ref(false)
const error = ref(false)

function resetForm() {
    form.value = { name: '', email: '', message: '' }
    sent.value = false
    error.value = false
}

async function onSubmit() {
    submitting.value = true
    error.value = false
    sent.value = false

    try {
        // Example: post to an API route /api/contact
        // Adjust the endpoint to your server implementation
        await $fetch('/api/contact', {
            method: 'POST',
            body: form.value
        })
        sent.value = true
        resetForm()
    } catch (e) {
        console.error(e)
        error.value = true
    } finally {
        submitting.value = false
    }
}

function scrollTo(selector) {
    const el = document.querySelector(selector)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>

:root {
    --bg: #f8fafc;
    --accent: #0ea5e9;
    --muted: #6b7280;
    --card: #fff;
    --radius: 10px;
    --hero-expanded-height: 260px;
    --hero-collapsed-height: 56px;
    --hero-transition: 260ms cubic-bezier(.2,.8,.2,1);
}

.page {
    font-family: Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
    color: #0f172a;
    background: linear-gradient(180deg, #fff 0%, var(--bg) 100%);
    min-height: 100vh;
}

.container {
    max-width: 1024px;
    margin: 0 auto;
    padding: 2rem;
}



.cta-row { display: inline-flex; gap: 0.75rem; margin-bottom: 1rem; }

.quick-stats {
    margin-top: 1rem;
    display: flex;
    gap: 1.2rem;
    justify-content: center;
    list-style: none;
    padding: 0;
    color: var(--muted);
}

.quick-stats strong { display:block; color: #111827; }

.features { padding: 2rem 0; }

.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
}

.card {
    background: var(--card);
    border-radius: var(--radius);
    padding: 1rem;
    box-shadow: 0 1px 6px rgba(2,6,23,0.06);
}

.icon { width: 36px; height: 36px; fill: none; stroke: var(--accent); stroke-width: 1.5; margin-bottom: 0.5rem; }

.how-it-works { padding: 2rem 0; background: linear-gradient(90deg, rgba(14,165,233,0.04), transparent); border-radius: var(--radius); }

.steps { padding-left: 1.25rem; color: var(--muted); margin-top: 0.5rem; }

.contact { padding: 2rem 0; }

.contact-form {
    display: grid;
    gap: 0.75rem;
    max-width: 640px;
}

.contact-form label { display:block; color: var(--muted); }
.contact-form input, .contact-form textarea {
    width: 100%;
    border-radius: 8px;
    border: 1px solid #e6e9ee;
    padding: 0.6rem;
    font-size: 0.95rem;
}

.form-actions { display:flex; gap:0.5rem; margin-top: 0.5rem; }

.btn {
    padding: 0.55rem 0.9rem;
    border-radius: 8px;
    font-weight: 600;
    border: none;
    cursor: pointer;
}

.btn.primary {
    background: var(--accent);
    color: white;
}

.btn.ghost {
    background: transparent;
    color: var(--accent);
    border: 1px solid rgba(14,165,233,0.15);
}

.notice { margin-top: .5rem; font-weight: 600; }
.notice.success { color: #16a34a; }
.notice.error { color: #dc2626; }

.site-footer {
    padding: 1.25rem 0;
    text-align: center;
    color: var(--muted);
    border-top: 1px solid rgba(2,6,23,0.04);
}



/* make hero animate smoothly between expanded and compact states */
.hero {

    margin-bottom: var(--hero-expanded-height);
    padding: 2rem 1rem;
    transition: padding var(--hero-transition), height var(--hero-transition), background-color var(--hero-transition), box-shadow var(--hero-transition);
    height: var(--hero-expanded-height);
    overflow: hidden;
    z-index: 40;
       
}

/* container layout inside hero adapts when compacted */
.hero .container {
    transition: transform var(--hero-transition), width var(--hero-transition);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
}


.hero.minimized {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: var(--hero-collapsed-height);
    margin-bottom: var(--hero-collapsed-height);
    padding: 0.4rem 1rem;
    background-color: rgba(255,255,255,0.98);
    box-shadow: 0 6px 18px rgba(2,6,23,0.08);
}

/* when minimized, arrange content horizontally and tighten spacing */
.hero.minimized .container {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 1200px;
}

/* shrink title and hide less important items */
.hero.minimized .title {
    font-size: 1rem;
    margin: 0;
    line-height: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.hero.minimized .subtitle,
.hero.minimized .cta-row,
.hero.minimized .quick-stats {
    opacity: 0;
    transform: translateY(-6px);
    pointer-events: none;
    height: 0;
    margin: 0;
    transition: opacity var(--hero-transition), transform var(--hero-transition);
}

/* ensure quick visual consistency for icons/cards below header */
.page.header-minimized {
    /* add top padding equal to collapsed header height when you set this class on .page */
    padding-top: var(--hero-collapsed-height);
}
</style>