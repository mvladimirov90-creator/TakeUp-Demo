import React, { useState, useEffect } from 'react';

/* =========================================================================
 * DESIGN TOKENS
 * Single source of truth for color, spacing, type, radius, shadow.
 * Injected once via <style> so the rest of the file can reference vars.
 * ========================================================================= */
const TOKENS_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700;9..144,800&family=Manrope:wght@400;500;600;700;800&display=swap');

:root {
  /* Typography — Fraunces (expressive serif display) + Manrope (warm geometric body) */
  --font-display: 'Fraunces', Georgia, 'Times New Roman', serif;
  --font-body:    'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

  /* Color — confident blue primary, warm coral accent */
  --color-primary:        #2563eb;
  --color-primary-hover:  #1d4ed8;
  --color-primary-soft:   #eff6ff;
  --color-primary-border: #bfdbfe;

  --color-accent:         #ea580c;
  --color-accent-hover:   #c2410c;
  --color-accent-soft:    #fff7ed;
  --color-accent-border:  #fed7aa;

  --color-success:        #059669;
  --color-success-soft:   #ecfdf5;
  --color-success-border: #a7f3d0;

  --color-danger:         #dc2626;
  --color-danger-hover:   #b91c1c;
  --color-danger-soft:    #fef2f2;
  --color-danger-border:  #fecaca;

  --color-warning:        #d97706;
  --color-warning-soft:   #fffbeb;
  --color-warning-border: #fde68a;

  --color-info:           #0369a1;
  --color-info-soft:      #f0f9ff;
  --color-info-border:    #bae6fd;

  /* Warm stone neutrals (not cool slate — this is where "sterile" usually lives) */
  --color-ink:            #1c1917;
  --color-ink-2:          #44403c;
  --color-ink-3:          #78716c;
  --color-line:           #e7e5e4;
  --color-line-2:         #d6d3d1;
  --color-surface:        #ffffff;
  --color-bg:             #fafaf9;
  --color-bg-warm:        #fdfbf7;

  /* Spacing — 4px scale */
  --space-1: 4px; --space-2: 8px; --space-3: 12px; --space-4: 16px;
  --space-5: 24px; --space-6: 32px; --space-7: 48px; --space-8: 64px;

  /* Radius */
  --radius-sm: 6px;
  --radius-md: 12px;
  --radius-lg: 20px;
  --radius-pill: 9999px;

  /* Type scale */
  --text-xs: 12px; --text-sm: 14px; --text-base: 16px; --text-lg: 18px;
  --text-xl: 22px; --text-2xl: 28px; --text-3xl: 36px; --text-4xl: 56px;

  --lh-tight: 1.05;
  --lh-snug:  1.2;
  --lh-body:  1.55;

  /* Shadows — softer, warmer cast */
  --shadow-1: 0 1px 2px rgba(28, 25, 23, 0.05), 0 1px 3px rgba(28, 25, 23, 0.06);
  --shadow-2: 0 4px 12px -2px rgba(28, 25, 23, 0.08), 0 2px 4px -2px rgba(28, 25, 23, 0.04);
  --shadow-3: 0 20px 40px -10px rgba(28, 25, 23, 0.15), 0 8px 16px -8px rgba(28, 25, 23, 0.08);

  --focus-ring: 0 0 0 3px rgba(37, 99, 235, 0.35);
}

.tu-root, .tu-root * { box-sizing: border-box; }
.tu-root {
  font-family: var(--font-body);
  color: var(--color-ink);
  font-size: var(--text-base);
  line-height: var(--lh-body);
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

/* Focus visibility — applies to every interactive element */
.tu-root :focus-visible {
  outline: none;
  box-shadow: var(--focus-ring);
  border-radius: var(--radius-sm);
}

/* Buttons */
.tu-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  font-family: inherit;
  font-size: var(--text-base);
  font-weight: 600;
  line-height: 1;
  padding: 12px 20px;
  border-radius: var(--radius-md);
  border: 1px solid transparent;
  cursor: pointer;
  transition: background 0.15s ease, border-color 0.15s ease, transform 0.05s ease;
}
.tu-btn:active { transform: translateY(1px); }
.tu-btn[disabled] { cursor: not-allowed; opacity: 0.5; }

.tu-btn--primary {
  background: var(--color-primary);
  color: white;
}
.tu-btn--primary:hover:not([disabled]) { background: var(--color-primary-hover); }

.tu-btn--secondary {
  background: var(--color-surface);
  color: var(--color-ink);
  border-color: var(--color-line-2);
}
.tu-btn--secondary:hover:not([disabled]) { background: var(--color-bg); }

.tu-btn--danger {
  background: var(--color-danger);
  color: white;
}
.tu-btn--danger:hover:not([disabled]) { background: var(--color-danger-hover); }

.tu-btn--ghost {
  background: transparent;
  color: var(--color-primary);
  padding: 8px 12px;
}
.tu-btn--ghost:hover:not([disabled]) { background: var(--color-primary-soft); }

.tu-btn--block { width: 100%; }
.tu-btn--lg { font-size: var(--text-lg); padding: 16px 24px; }

/* Card-style tappable rows (used for size select, method select, role select) */
.tu-tap {
  display: block;
  width: 100%;
  text-align: left;
  background: var(--color-surface);
  border: 1.5px solid var(--color-line);
  border-radius: var(--radius-md);
  padding: var(--space-4);
  cursor: pointer;
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  transition: border-color 0.15s ease, background 0.15s ease, box-shadow 0.15s ease;
}
.tu-tap:hover { border-color: var(--color-primary); }
.tu-tap[aria-pressed="true"] {
  border-color: var(--color-primary);
  background: var(--color-primary-soft);
  box-shadow: var(--shadow-2);
}
.tu-tap[disabled] { cursor: not-allowed; opacity: 0.55; }
.tu-tap[disabled]:hover { border-color: var(--color-line); }

/* Mission-themed tap cards on welcome — lift + accent on hover */
.tu-tap--mission {
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
  background: var(--color-surface);
}
.tu-tap--mission:hover {
  transform: translateY(-3px);
  border-color: var(--color-accent);
  box-shadow: var(--shadow-2);
}

/* Inputs */
.tu-input, .tu-textarea {
  width: 100%;
  font-family: inherit;
  font-size: var(--text-base);
  color: var(--color-ink);
  background: var(--color-surface);
  border: 1px solid var(--color-line-2);
  border-radius: var(--radius-md);
  padding: 12px 14px;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}
.tu-input:focus, .tu-textarea:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: var(--focus-ring);
}
.tu-input--error, .tu-textarea--error {
  border-color: var(--color-danger);
}
.tu-textarea { resize: vertical; min-height: 80px; }

.tu-label {
  display: block;
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-ink-2);
  margin-bottom: var(--space-2);
}

/* Notice / alert system — three levels */
.tu-notice {
  display: flex;
  gap: var(--space-3);
  align-items: flex-start;
  padding: var(--space-4);
  border-radius: var(--radius-md);
  border: 1px solid;
  font-size: var(--text-sm);
  line-height: var(--lh-body);
}
.tu-notice__icon { flex-shrink: 0; font-size: 18px; line-height: 1; margin-top: 2px; }
.tu-notice__title { font-weight: 700; margin-bottom: 2px; }

.tu-notice--blocker {
  background: var(--color-danger-soft);
  border-color: var(--color-danger-border);
  color: #7f1d1d;
}
.tu-notice--caution {
  background: var(--color-warning-soft);
  border-color: var(--color-warning-border);
  color: #78350f;
}
.tu-notice--info {
  background: var(--color-info-soft);
  border-color: var(--color-info-border);
  color: #0c4a6e;
}

/* Page shells */
.tu-page { min-height: 100vh; background: var(--color-bg); padding: var(--space-6) var(--space-5); }
.tu-page--hero {
  background:
    radial-gradient(ellipse 80% 60% at 50% 0%, var(--color-accent-soft) 0%, transparent 55%),
    linear-gradient(180deg, var(--color-primary-soft) 0%, var(--color-bg-warm) 60%);
}
.tu-container { max-width: 960px; margin: 0 auto; }
.tu-container--narrow { max-width: 640px; margin: 0 auto; }
.tu-container--wide { max-width: 1120px; margin: 0 auto; }

/* Chat layout — grid stretches both columns to equal height */
.tu-chat-layout {
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
  gap: var(--space-5);
  align-items: stretch;
}
.tu-chat-sidebar {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}
.tu-chat-main {
  display: flex;
  flex-direction: column;
  min-height: 600px;
}
@media (max-width: 860px) {
  .tu-chat-layout { grid-template-columns: 1fr; }
  .tu-chat-main { min-height: 500px; }
}

.tu-h1 {
  font-family: var(--font-body);
  font-size: var(--text-3xl);
  line-height: var(--lh-tight);
  font-weight: 800;
  letter-spacing: -0.02em;
  margin: 0 0 var(--space-3);
  color: var(--color-ink);
}
.tu-h2 {
  font-family: var(--font-body);
  font-size: var(--text-2xl);
  line-height: var(--lh-snug);
  font-weight: 800;
  letter-spacing: -0.015em;
  margin: 0 0 var(--space-3);
  color: var(--color-ink);
}
.tu-h3 {
  font-family: var(--font-body);
  font-size: var(--text-xl);
  line-height: var(--lh-snug);
  font-weight: 700;
  letter-spacing: -0.005em;
  margin: 0 0 var(--space-2);
  color: var(--color-ink);
}
.tu-lede {
  font-size: var(--text-lg);
  color: var(--color-ink-2);
  margin: 0 0 var(--space-6);
  line-height: 1.5;
}
.tu-muted { color: var(--color-ink-3); font-size: var(--text-sm); }

/* Mission patch — small coral badge for mission-themed moments */
.tu-patch {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: var(--color-accent-soft);
  color: var(--color-accent);
  border: 1px solid var(--color-accent-border);
  padding: 4px 10px;
  border-radius: var(--radius-pill);
  font-family: var(--font-body);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.tu-patch__dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--color-accent);
}

/* Modal */
.tu-modal-backdrop {
  position: fixed; inset: 0;
  background: rgba(15, 23, 42, 0.5);
  display: flex; align-items: center; justify-content: center;
  z-index: 1000;
  padding: var(--space-5);
}
.tu-modal {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  max-width: 560px;
  width: 100%;
  max-height: 85vh;
  overflow: auto;
  padding: var(--space-6);
  box-shadow: var(--shadow-3);
}
.tu-modal--wide { max-width: 720px; }

/* Slider */
.tu-range {
  -webkit-appearance: none;
  width: 100%;
  height: 6px;
  background: var(--color-line);
  border-radius: var(--radius-pill);
  outline: none;
}
.tu-range::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 22px; height: 22px;
  background: var(--color-primary);
  border-radius: 50%;
  cursor: pointer;
  box-shadow: var(--shadow-2);
}
.tu-range::-moz-range-thumb {
  width: 22px; height: 22px;
  background: var(--color-primary);
  border-radius: 50%;
  cursor: pointer;
  border: none;
  box-shadow: var(--shadow-2);
}

/* Selected size header — compact row replacing the 5-option list */
.tu-size-header {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  background: var(--color-primary-soft);
  border: 1.5px solid var(--color-primary-border);
  border-radius: var(--radius-md);
  padding: var(--space-3) var(--space-4);
}
.tu-size-header__check {
  width: 24px; height: 24px;
  border-radius: 50%;
  background: var(--color-primary);
  color: white;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.tu-size-header__label {
  flex: 1;
  font-weight: 700;
  font-size: var(--text-base);
}
.tu-size-header__range {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-primary);
}

/* Euro-prefixed input — number field with persistent € sign */
.tu-euro-input {
  display: flex;
  align-items: center;
  background: var(--color-surface);
  border: 1px solid var(--color-line-2);
  border-radius: var(--radius-md);
  height: 48px;
  overflow: hidden;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}
.tu-euro-input:focus-within {
  border-color: var(--color-primary);
  box-shadow: var(--focus-ring);
}
.tu-euro-input__symbol {
  padding: 0 0 0 14px;
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--color-primary);
  user-select: none;
  flex-shrink: 0;
  line-height: 1;
}
.tu-euro-input__field {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-family: var(--font-body);
  font-size: var(--text-lg);
  font-weight: 700;
  color: var(--color-primary);
  padding: 0 14px 0 4px;
  height: 100%;
  width: 100%;
  font-variant-numeric: tabular-nums;
  -moz-appearance: textfield;
}
.tu-euro-input__field::-webkit-outer-spin-button,
.tu-euro-input__field::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.tu-euro-input__field::placeholder {
  color: var(--color-ink-3);
  font-weight: 400;
}

/* Date-time group */
.tu-datetime-row {
  display: flex;
  gap: var(--space-2);
  margin-top: var(--space-2);
}
.tu-datetime-row .tu-input {
  font-size: var(--text-sm);
  padding: 8px 10px;
}

/* Checkbox row */
.tu-check-row {
  display: flex; align-items: flex-start; gap: var(--space-3);
  padding: var(--space-3);
  border-radius: var(--radius-md);
  cursor: pointer;
}
.tu-check-row:hover { background: var(--color-bg); }
.tu-check-row input[type="checkbox"] {
  width: 18px; height: 18px; margin-top: 2px;
  accent-color: var(--color-primary);
  cursor: pointer;
  flex-shrink: 0;
}
.tu-check-row label { font-size: var(--text-sm); color: var(--color-ink-2); cursor: pointer; flex: 1; }

/* Toast */
.tu-toast {
  position: fixed;
  bottom: var(--space-6);
  left: 50%;
  transform: translateX(-50%);
  background: var(--color-ink);
  color: white;
  padding: var(--space-3) var(--space-5);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-3);
  z-index: 2000;
  font-size: var(--text-sm);
  max-width: 90vw;
}

/* Delivery lifecycle stepper */
.tu-stepper {
  display: flex;
  align-items: flex-start;
  gap: 0;
  position: relative;
  padding: 0;
}
.tu-step {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;
.tu-route-strip {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: var(--space-3);
  margin-bottom: var(--space-5);
}
.tu-route-chip {
  background: var(--color-surface);
  border: 1px solid var(--color-line);
  border-radius: var(--radius-md);
  padding: var(--space-3) var(--space-4);
  box-shadow: var(--shadow-1);
}
.tu-route-chip__label {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-weight: 700;
  color: var(--color-ink-3);
  margin-bottom: 2px;
}
.tu-route-chip__value {
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-ink);
  line-height: 1.35;
}
.tu-route-chip__meta {
  margin-top: 2px;
  font-size: var(--text-xs);
  color: var(--color-ink-3);
}
.tu-tracking-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.6fr) minmax(320px, 0.95fr);
  gap: var(--space-4);
  align-items: start;
}
.tu-activity-card {
  background: var(--color-surface);
  border: 1px solid var(--color-line);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
  box-shadow: var(--shadow-1);
}
.tu-activity-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}
.tu-activity-item {
  display: grid;
  grid-template-columns: 10px minmax(0, 1fr);
  gap: var(--space-3);
  align-items: start;
}
.tu-activity-item__dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-top: 5px;
  background: var(--color-primary);
  box-shadow: 0 0 0 4px var(--color-primary-soft);
}
.tu-activity-item__title {
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-ink);
  margin-bottom: 2px;
}
.tu-activity-item__detail {
  font-size: var(--text-sm);
  color: var(--color-ink-2);
  line-height: 1.45;
}
.tu-activity-item__time {
  font-size: var(--text-xs);
  color: var(--color-ink-3);
  margin-top: 3px;
}
}
.tu-step__dot {
  width: 32px; height: 32px;
  .tu-tracking-grid { grid-template-columns: 1fr; }
  border-radius: 50%;
  border: 2px solid var(--color-line-2);
  background: var(--color-surface);
  display: flex; align-items: center; justify-content: center;
  color: var(--color-ink-3);
  font-size: 14px;
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;
}
.tu-step--done .tu-step__dot {
  background: var(--color-success);
  border-color: var(--color-success);
  color: white;
}
.tu-step--active .tu-step__dot {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: white;
  box-shadow: 0 0 0 4px var(--color-primary-soft);
}
.tu-step--failed .tu-step__dot {
  background: var(--color-danger);
  border-color: var(--color-danger);
  color: white;
}
.tu-step__label {
  margin-top: var(--space-2);
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-ink-3);
  text-align: center;
  max-width: 80px;
}
.tu-step--done .tu-step__label,
.tu-step--active .tu-step__label { color: var(--color-ink); }
.tu-step__line {
  position: absolute;
  top: 16px;
  left: calc(50% + 16px);
  right: calc(-50% + 16px);
  height: 2px;
  background: var(--color-line);
  z-index: 0;
}
.tu-step--done .tu-step__line { background: var(--color-success); }

/* Phase action card */
.tu-phase-card {
  background: var(--color-surface);
  border: 1px solid var(--color-line);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  box-shadow: var(--shadow-2);
}
.tu-phase-card--accent {
  border-color: var(--color-accent-border);
  background: var(--color-bg-warm);
}
.tu-phase-card--success {
  border-color: var(--color-success-border);
  background: var(--color-success-soft);
}
.tu-phase-card--danger {
  border-color: var(--color-danger-border);
  background: var(--color-danger-soft);
}

/* Audit log display */
.tu-log {
  font-family: 'SF Mono', 'Fira Code', 'Consolas', monospace;
  font-size: 12px;
  line-height: 1.6;
  background: #1c1917;
  color: #a8a29e;
  border-radius: var(--radius-md);
  padding: var(--space-4);
  max-height: 200px;
  overflow-y: auto;
}
.tu-log__entry { padding: 2px 0; }
.tu-log__time { color: #78716c; }
.tu-log__event { color: #fbbf24; }
.tu-log__detail { color: #d6d3d1; }
`;

const PRICING_TABLE = {
  envelope: { label: 'Envelope or document', shortLabel: 'Envelope or document', basePrice: 5, maxPrice: 15 },
  small:    { label: 'Small box (shoebox)',  shortLabel: 'Small box',            basePrice: 10, maxPrice: 25 },
  medium:   { label: 'Medium box (microwave)', shortLabel: 'Medium box',         basePrice: 20, maxPrice: 50 },
  large:    { label: 'Large box (TV)',       shortLabel: 'Large box',            basePrice: 35, maxPrice: 80 },
  xlarge:   { label: 'Extra large (furniture)', shortLabel: 'Extra large',       basePrice: 60, maxPrice: 150 },
};

const PLATFORM_FEE = 0.15;

const INITIAL_SHIPMENT = {
  size: '',
  pickupAddress: '',
  pickupCommitment: '',
  deliveryAddress: '',
  deliveryCommitment: '',
  suggestedPrice: 0,
  description: '',
  declaredValue: 0,
  requiresPhotoVerification: false,
  photoVerificationProvided: false,
};

const INITIAL_HANDOFF_PLAN = {
  pickupDate: '',
  pickupWindow: '10_13',
  deliveryDate: '',
  deliveryWindow: '13_16',
};

const INITIAL_CARRIER_PROFILE = {
  deliveryMethod: '',
  availability: '',
  dateOfBirth: '',
  agreeToNoSubcontracting: false,
  accountState: 'guest',
  verificationStatus: 'not_started',
  signedInProvider: '',
  fullName: '',
  email: '',
  origin: '',
  destination: '',
  departureWindow: 'morning',
  arrivalWindow: 'evening',
  maxDetour: '15',
  capacity: 'medium',
  allowsFragile: false,
  preferredMatchLayer: 'all',
};

const createInitialShipment = () => ({ ...INITIAL_SHIPMENT });
const createInitialCarrierProfile = () => ({ ...INITIAL_CARRIER_PROFILE });
const createInitialHandoffPlan = () => ({ ...INITIAL_HANDOFF_PLAN });

const getAddressLabel = (address) => address.split(',')[0]?.trim() || 'your route';

const PICKUP_COMMITMENT_OPTIONS = [
  { id: 'today', label: 'Today' },
  { id: 'tomorrow', label: 'Tomorrow' },
  { id: 'within_3_days', label: 'Within 3 days' },
  { id: 'flexible', label: 'Flexible' },
];

const CARRIER_AVAILABILITY_OPTIONS = ['Now', 'Today', 'Tomorrow', 'This week', 'Flexible'];

const CARRIER_DEPARTURE_WINDOWS = [
  { id: 'early', label: 'Early morning' },
  { id: 'morning', label: 'Morning' },
  { id: 'midday', label: 'Midday' },
  { id: 'afternoon', label: 'Afternoon' },
  { id: 'evening', label: 'Evening' },
  { id: 'flexible', label: 'Flexible' },
];

const CARRIER_ARRIVAL_WINDOWS = [
  { id: 'midday', label: 'By midday' },
  { id: 'afternoon', label: 'By afternoon' },
  { id: 'evening', label: 'By evening' },
  { id: 'night', label: 'By night' },
  { id: 'flexible', label: 'Flexible arrival' },
];

const CARRIER_DETOUR_OPTIONS = [
  { id: '0', label: 'No detour' },
  { id: '15', label: 'Up to 15 min' },
  { id: '30', label: 'Up to 30 min' },
  { id: '60', label: 'Up to 60 min' },
];

const CARRIER_CAPACITY_OPTIONS = [
  { id: 'small', label: 'Documents and small items' },
  { id: 'medium', label: 'Small and medium boxes' },
  { id: 'large', label: 'Large boxes and luggage' },
];

const getOptionLabel = (options, value, fallback = 'Not set') => (
  options.find((option) => option.id === value)?.label || fallback
);

const getCarrierVerificationMeta = (status) => ({
  not_started: {
    label: 'Not started',
    tone: 'var(--color-warning-soft)',
    border: 'var(--color-warning-border)',
    color: '#92400e',
    description: 'Create your account and start identity verification before you can respond to missions.',
  },
  pending: {
    label: 'Pending review',
    tone: 'var(--color-primary-soft)',
    border: 'var(--color-primary-border)',
    color: 'var(--color-primary)',
    description: 'Your KYC partner review is in progress. Mission previews stay available while checks complete.',
  },
  more_info_required: {
    label: 'More info required',
    tone: 'var(--color-warning-soft)',
    border: 'var(--color-warning-border)',
    color: '#92400e',
    description: 'The partner needs an updated document or clearer photo before access can be unlocked.',
  },
  verified: {
    label: 'Verified',
    tone: 'var(--color-success-soft)',
    border: 'var(--color-success-border)',
    color: 'var(--color-success)',
    description: 'Identity verified. You can act on available missions and move into negotiation when selected.',
  },
  rejected: {
    label: 'Rejected',
    tone: 'var(--color-danger-soft)',
    border: 'var(--color-danger-border)',
    color: 'var(--color-danger)',
    description: 'Verification could not be completed. Manual review or a new submission is required.',
  },
}[status] || {
  label: 'Unknown',
  tone: 'var(--color-bg)',
  border: 'var(--color-line)',
  color: 'var(--color-ink-2)',
  description: 'Verification status unavailable.',
});

const getPickupCommitmentLabel = (commitment) => (
  PICKUP_COMMITMENT_OPTIONS.find((option) => option.id === commitment)?.label || 'Not set'
);

const DELIVERY_COMMITMENT_OPTIONS = [
  { id: 'same_day', label: 'Same day' },
  { id: 'next_day', label: 'Next day' },
  { id: 'within_5_days', label: 'Within 5 days' },
  { id: 'flexible', label: 'Flexible' },
];

const getDeliveryCommitmentLabel = (commitment) => (
  DELIVERY_COMMITMENT_OPTIONS.find((option) => option.id === commitment)?.label || 'Not set'
);

const HANDOFF_WINDOW_OPTIONS = [
  { id: '08_10', label: '08:00-10:00' },
  { id: '10_13', label: '10:00-13:00' },
  { id: '13_16', label: '13:00-16:00' },
  { id: '16_19', label: '16:00-19:00' },
  { id: '19_21', label: '19:00-21:00' },
];

const getHandoffWindowLabel = (windowId) => (
  HANDOFF_WINDOW_OPTIONS.find((option) => option.id === windowId)?.label || 'Window not set'
);

const toDateInputValue = (date) => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const buildSuggestedHandoffPlan = (currentShipment) => {
  const today = new Date();
  const pickupOffsets = {
    today: 0,
    tomorrow: 1,
    within_3_days: 3,
    flexible: 1,
  };
  const deliveryOffsets = {
    same_day: 0,
    next_day: 1,
    within_5_days: 5,
    flexible: 2,
  };

  const pickupDate = toDateInputValue(addDays(today, pickupOffsets[currentShipment.pickupCommitment] ?? 0));
  let deliveryDate = toDateInputValue(addDays(today, deliveryOffsets[currentShipment.deliveryCommitment] ?? 1));

  if (deliveryDate < pickupDate) {
    deliveryDate = pickupDate;
  }

  return {
    pickupDate,
    pickupWindow: '10_13',
    deliveryDate,
    deliveryWindow: deliveryDate === pickupDate ? '16_19' : '13_16',
  };
};

const formatHandoffSlot = (date, windowId) => {
  if (!date) return 'Not locked yet';
  return `${date} / ${getHandoffWindowLabel(windowId)}`;
};

/* =========================================================================
 * ROLE TERMINOLOGY — the canonical naming rule for the entire project
 *
 * This constant is the single source of truth for how the two sides of a
 * mission are named throughout the platform. Every user-facing string, every
 * GTC clause, every tooltip, and every future feature should reference this
 * mapping. Internal code identifiers (carrierProfile, sender: 'shipper')
 * may keep their short forms for brevity, but ALL user-facing copy must use
 * the canonical terms below.
 *
 * WHY THIS MATTERS:
 *  - Legal clarity:  "Assigner" and "Contractor" establish the contractual
 *    relationship (assignment of a mission, independent contractor status).
 *  - Platform branding: "Shipper" and "Carrier" are the friendly, everyday
 *    words users see in buttons, headings, and chat.
 *  - EU compliance: Clearly distinguishing the assigner/contractor
 *    relationship avoids misclassification as employer/employee under the
 *    Platform Work Directive (COM/2021/762) and national labour laws.
 *  - Consistency: Any new screen, modal, notification, or email template
 *    must use these terms. When introducing a role for the first time on a
 *    page, use the full form: "Assigner (Shipper)". After first mention,
 *    either form is acceptable.
 *
 * RULE: If you add a new feature that names either role, check this map.
 * ========================================================================= */
const ROLE_TERMINOLOGY = {
  assigner: {
    legalName:    'Assigner',
    platformName: 'Shipper',
    fullForm:     'Assigner ("Shipper")',
    definition:   'The User who creates and assigns a mission — specifying the item, pickup/delivery addresses, and offered price. The Assigner initiates the contractual relationship by posting a mission to the platform.',
    codeAliases:  ['shipper', 'sender'],   // internal variable names — do NOT rename
  },
  contractor: {
    legalName:    'Contractor',
    platformName: 'Carrier',
    fullForm:     'Contractor ("Carrier")',
    definition:   'The User who accepts a mission and personally performs the delivery. The Contractor is an independent service provider, not an employee of TakeUp or the Assigner. Sub-contracting or delegation is prohibited.',
    codeAliases:  ['carrier', 'carrierProfile'], // internal variable names — do NOT rename
  },
  platform: {
    legalName:    'TakeUp',
    definition:   'The digital marketplace facilitating connections between Assigners and Contractors. TakeUp acts as an intermediary; it does not transport items itself.',
  },
};

/* =========================================================================
 * DELIVERY LIFECYCLE — the state machine the GTC describes (Sections 5, 6)
 *
 * booked → carrier_en_route → picked_up → in_transit → delivered
 *        → pod_submitted → completed
 *
 * Failure branch: any pre-delivery state → delivery_failed
 *   Sub-reasons: force_majeure | recipient_unavailable | carrier_abandoned
 *
 * Disputed branch: completed → disputed → resolved
 * ========================================================================= */

const DELIVERY_PHASES = {
  booked:           { order: 0, label: 'Booked',       shortLabel: 'Booked',     canCancel: true,  cancelFee: 5 },
  carrier_en_route: { order: 1, label: 'Carrier en route', shortLabel: 'En route', canCancel: false, cancelFee: null },
  picked_up:        { order: 2, label: 'Picked up',    shortLabel: 'Picked up',  canCancel: false, cancelFee: null },
  in_transit:       { order: 3, label: 'In transit',    shortLabel: 'In transit', canCancel: false, cancelFee: null },
  delivered:        { order: 4, label: 'Delivered',     shortLabel: 'Delivered',  canCancel: false, cancelFee: null },
  pod_submitted:    { order: 5, label: 'POD submitted', shortLabel: 'POD',        canCancel: false, cancelFee: null },
  completed:        { order: 6, label: 'Completed',     shortLabel: 'Done',       canCancel: false, cancelFee: null },
  delivery_failed:  { order: -1, label: 'Failed',       shortLabel: 'Failed',     canCancel: false, cancelFee: null },
  disputed:         { order: -2, label: 'Disputed',     shortLabel: 'Disputed',   canCancel: false, cancelFee: null },
};

const getCancellationPolicy = (currentStep, currentPhase) => {
  if (currentStep === 'chat-room' || currentStep === 'shipper-requests') {
    return {
      type: 'pre_acceptance',
      stageLabel: currentStep === 'chat-room' ? 'Negotiation open' : 'Requests inbox',
      canCancel: true,
      fee: 0,
      description: 'Before Contractor acceptance, the mission can be withdrawn with no fee.',
    };
  }

  const phase = DELIVERY_PHASES[currentPhase];
  if (phase?.canCancel) {
    const fee = phase.cancelFee || 0;
    return {
      type: 'accepted_before_pickup',
      stageLabel: phase.label,
      canCancel: true,
      fee,
      description: fee > 0
        ? `After acceptance and before pickup, cancellation carries a €${fee} administrative fee.`
        : 'This mission can still be cancelled without a fee.',
    };
  }

  return {
    type: 'locked',
    stageLabel: phase?.label || 'In progress',
    canCancel: false,
    fee: null,
    description: 'After pickup, cancellation is not permitted. Use Report Issue instead.',
  };
};

const FAILURE_REASONS = {
  force_majeure:         { label: 'Force majeure',         carrierPenalty: false, carrierPay: 0,   senderRefund: 1.0, evidenceRequired: true },
  vehicle_breakdown:     { label: 'Vehicle breakdown',     carrierPenalty: false, carrierPay: 0,   senderRefund: 1.0, evidenceRequired: true },
  medical_emergency:     { label: 'Medical emergency',     carrierPenalty: false, carrierPay: 0,   senderRefund: 1.0, evidenceRequired: true },
  recipient_unavailable: { label: 'Recipient unavailable', carrierPenalty: false, carrierPay: 0.5, senderRefund: 0.5, evidenceRequired: true },
  address_incorrect:     { label: 'Address incorrect',     carrierPenalty: false, carrierPay: 0.5, senderRefund: 0.5, evidenceRequired: true },
  safety_concern:        { label: 'Safety concern',        carrierPenalty: false, carrierPay: 0,   senderRefund: 1.0, evidenceRequired: true },
  carrier_abandoned:     { label: 'Carrier abandoned',     carrierPenalty: true,  carrierPay: 0,   senderRefund: 1.0, evidenceRequired: false },
};

const PROHIBITED_KEYWORDS = {
  dangerous_goods: {
    keywords: ['explosive', 'firework', 'ammunition', 'gunpowder', 'gas', 'cylinder', 'petrol', 'diesel', 'kerosene', 'paint thinner', 'solvent', 'matches', 'lighter', 'bleach', 'peroxide', 'poison', 'pesticide', 'toxic', 'radioactive', 'acid', 'battery acid', 'mercury', 'asbestos', 'dry ice'],
    severity: 'blocker',
    title: 'Dangerous goods prohibited',
    message: 'This appears to contain hazardous materials, which are not permitted on TakeUp. Transport may result in account termination and legal action.',
  },
  weapons: {
    keywords: ['gun', 'firearm', 'weapon', 'knife', 'sword', 'taser', 'stun gun'],
    severity: 'blocker',
    title: 'Weapons prohibited',
    message: 'Weapons and military items, including firearms and ammunition, are not permitted on TakeUp.',
  },
  illegal: {
    keywords: ['drug', 'narcotic', 'cannabis', 'marijuana', 'cocaine', 'heroin', 'meth', 'mdma', 'ecstasy'],
    severity: 'blocker',
    title: 'Illegal substances prohibited',
    message: 'Controlled substances are not permitted. Violations are reported to the relevant authorities.',
  },
  vague_suspicious: {
    keywords: ['scientific equipment', 'research materials', 'samples', 'laboratory', 'chemicals', 'specimens'],
    severity: 'caution',
    title: 'Description may be too vague',
    message: 'Please describe the actual item — vague descriptions slow down Carrier matching and may require photo verification before pickup.',
  },
  valuables: {
    keywords: ['cash', 'money', 'banknote', 'bullion', 'gold', 'silver', 'diamond', 'gemstone', 'jewelry'],
    severity: 'caution',
    title: 'High-value items',
    message: 'Cash, precious metals, and jewelry are not covered by insurance. Transport is at your own risk.',
  },
  perishable: {
    keywords: ['food', 'meat', 'fish', 'dairy', 'frozen', 'refrigerated', 'ice cream'],
    severity: 'info',
    title: 'Perishable item',
    message: 'Make sure your Carrier can keep the item at the right temperature for the journey.',
  },
};

const PAYMENT_KEYWORDS = ['revolut', 'klarna', 'wise', 'transferwise', 'paypal', 'venmo', 'cash app', 'cashapp', 'zelle', 'sepa', 'bank transfer', 'wire transfer', 'crypto', 'bitcoin', 'cash only', 'pay me directly', 'outside the app', 'off platform', 'off-platform'];
const CONTACT_KEYWORDS = ['phone', 'email', 'whatsapp', 'telegram', 'instagram', 'facebook', '@', '.com', 'call me', 'text me', 'dm me'];

const TRANSPORT_WARNINGS = {
  transit: {
    title: 'Bus and rail transport restrictions',
    points: [
      'Maximum 2–3 large items per person (varies by operator).',
      'Typical size limit: 70–90 cm longest dimension.',
      'Typical weight limit: 25–30 kg per item.',
      'Items must fit in luggage racks and not block aisles or exits.',
      'You are responsible for any operator fines.',
    ],
    recommendation: 'Verify the specific operator policies for your route before accepting.',
  },
  bike: {
    title: 'Bicycle transport considerations',
    points: [
      'Load must not affect bike stability or control.',
      'Secure items so they cannot interfere with handling.',
      'Do not obstruct lights or signals.',
      'Observe local laws on load dimensions.',
    ],
    recommendation: 'A backpack or secure cargo rack works best.',
  },
  walk: {
    title: 'On-foot transport tips',
    points: [
      'Consider distance and item weight carefully.',
      'Make sure you can carry the item safely the whole way.',
      'Plan for the weather.',
    ],
    recommendation: 'Best for documents and small items under 5 kg.',
  },
  car: {
    title: 'Vehicle transport requirements',
    points: [
      "Valid driver's license required.",
      'Vehicle insurance must be current.',
      'Secure items to prevent movement.',
      'Observe vehicle weight limits.',
      'Consider commercial-use insurance if you transport regularly.',
    ],
    recommendation: 'The most flexible option for larger items.',
  },
};

/* =========================================================================
 * Reusable bits
 * ========================================================================= */

/* Inline SVG icon set. Sized via em so it scales with surrounding text. */
const ICON_PATHS = {
  arrowLeft: <path d="M19 12H5M12 19l-7-7 7-7" />,
  check:     <path d="M20 6L9 17l-5-5" />,
  x:         <path d="M18 6L6 18M6 6l12 12" />,
  package:   <><path d="M16.5 9.4L7.5 4.21M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"/></>,
  mapPin:    <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></>,
  clock:     <><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></>,
  shield:    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>,
  alert:     <><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><path d="M12 9v4M12 17h.01"/></>,
  info:      <><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></>,
  ban:       <><circle cx="12" cy="12" r="10"/><path d="M4.93 4.93l14.14 14.14"/></>,
  compass:   <><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></>,
  truck:     <><path d="M1 3h15v13H1z"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></>,
  sparkle:   <><path d="M12 3l1.9 5.8a2 2 0 001.3 1.3L21 12l-5.8 1.9a2 2 0 00-1.3 1.3L12 21l-1.9-5.8a2 2 0 00-1.3-1.3L3 12l5.8-1.9a2 2 0 001.3-1.3L12 3z"/></>,
};

function Icon({ name, size = '1em', strokeWidth = 2, style }) {
  const path = ICON_PATHS[name];
  if (!path) return null;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ flexShrink: 0, ...style }}
    >
      {path}
    </svg>
  );
}

function Notice({ severity = 'info', title, children }) {
  const iconName = severity === 'blocker' ? 'ban' : severity === 'caution' ? 'alert' : 'info';
  return (
    <div className={`tu-notice tu-notice--${severity}`} role={severity === 'blocker' ? 'alert' : 'status'}>
      <span className="tu-notice__icon" aria-hidden="true">
        <Icon name={iconName} size="18px" />
      </span>
      <div>
        {title && <div className="tu-notice__title">{title}</div>}
        <div>{children}</div>
      </div>
    </div>
  );
}

function Modal({ children, onClose, wide = false, labelledBy }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose?.(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="tu-modal-backdrop" onClick={onClose}>
      <div
        className={`tu-modal${wide ? ' tu-modal--wide' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

function Toast({ message }) {
  if (!message) return null;
  return <div className="tu-toast" role="status">{message}</div>;
}

/* =========================================================================
 * Main component
 * ========================================================================= */

function DeliveryMarketplace() {
  const [step, setStep] = useState('welcome');
  const [shipment, setShipment] = useState(createInitialShipment);
  const [handoffPlan, setHandoffPlan] = useState(createInitialHandoffPlan);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [agreedPrice, setAgreedPrice] = useState(null);
  const [carrierRequests, setCarrierRequests] = useState([]);
  const [selectedCarrierRequest, setSelectedCarrierRequest] = useState(null);
  const [requestInboxTab, setRequestInboxTab] = useState('preferred');
  const [requestInboxPage, setRequestInboxPage] = useState(0);
  const [carrierProfile, setCarrierProfile] = useState(createInitialCarrierProfile);
  const [prohibitedWarning, setProhibitedWarning] = useState(null);
  const [showGTC, setShowGTC] = useState(false);
  const [acceptedGTC, setAcceptedGTC] = useState(false);
  const [showInsuranceReminder, setShowInsuranceReminder] = useState(false);
  const [negotiationStartTime, setNegotiationStartTime] = useState(null);
  const [negotiationTimeRemaining, setNegotiationTimeRemaining] = useState(30 * 60);
  const [chatWarning, setChatWarning] = useState(null);
  const [negotiationDeclined, setNegotiationDeclined] = useState(false);
  const [activeNegotiations, setActiveNegotiations] = useState(0);
  const [showCancellationModal, setShowCancellationModal] = useState(false);
  const [showAgeVerificationError, setShowAgeVerificationError] = useState(false);
  const [showTransportWarning, setShowTransportWarning] = useState(null);
  const [toast, setToast] = useState('');
  const [blockingModal, setBlockingModal] = useState(null); // {title, message}

  // === SPRINT 1: Delivery lifecycle state ===
  const [deliveryPhase, setDeliveryPhase] = useState('booked');
  const [deliveryFailure, setDeliveryFailure] = useState(null); // { reason, evidence, timestamp }
  const [podData, setPodData] = useState(null); // { photoTaken, gpsLat, gpsLng, timestamp, notes }
  const [escrowStatus, setEscrowStatus] = useState('none'); // none | held | released | refunded
  const [failureReportTime, setFailureReportTime] = useState(null); // when 2hr window started
  const [showReportIssueModal, setShowReportIssueModal] = useState(false);
  const [showAuditLog, setShowAuditLog] = useState(false);

  // === Audit log — GTC Section 8 / GDPR Art 5(2) accountability ===
  // Persistent record of every legally significant action.
  // In production this calls an API; here it accumulates in state as a stub.
  const [auditEntries, setAuditEntries] = useState([]);
  const auditLog = (eventType, payload = {}, actor = 'system') => {
    const entry = {
      id: Date.now() + Math.random(),
      timestamp: new Date().toISOString(),
      event: eventType,
      actor,
      payload,
    };
    setAuditEntries((prev) => [...prev, entry]);
    // In production: POST /api/audit-log { entry }
    console.log('[AUDIT]', entry.event, entry.payload);
  };

  // === Escrow stubs — GTC Section 5.6 ===
  const escrowHold = (grossAmount) => {
    setEscrowStatus('held');
    auditLog('ESCROW_HOLD', { grossAmount, currency: 'EUR' }, 'platform');
    // In production: POST /api/escrow/hold { missionId, amount }
  };

  const escrowRelease = (toCarrier, grossAmount) => {
    const platformFee = grossAmount * PLATFORM_FEE;
    const netAmount = grossAmount - platformFee;
    setEscrowStatus('released');
    auditLog('ESCROW_RELEASE', { toCarrier, grossAmount, platformFee, netAmount }, 'platform');
    // In production: POST /api/escrow/release { missionId, carrierId, amount }
  };

  const escrowRefund = (toSender, amount, reason) => {
    setEscrowStatus('refunded');
    auditLog('ESCROW_REFUND', { toSender, amount, reason }, 'platform');
    // In production: POST /api/escrow/refund { missionId, senderId, amount, reason }
  };

  // === Lifecycle transitions — the code that proves the contract ===
  const advancePhase = (toPhase, detail = '', actor = 'system') => {
    const from = deliveryPhase;
    setDeliveryPhase(toPhase);
    auditLog('PHASE_TRANSITION', { from, to: toPhase, detail }, actor);
  };

  const reportDeliveryFailure = (reasonKey, notes = '') => {
    const reason = FAILURE_REASONS[reasonKey];
    if (!reason) return;
    const finalPrice = agreedPrice || shipment.suggestedPrice;
    const failure = {
      reason: reasonKey,
      label: reason.label,
      notes,
      timestamp: new Date().toISOString(),
      evidenceProvided: false, // toggled when carrier uploads evidence
    };
    setDeliveryFailure(failure);
    setDeliveryPhase('delivery_failed');
    setFailureReportTime(Date.now());
    auditLog('DELIVERY_FAILURE', { ...failure, carrierPenalty: reason.carrierPenalty }, 'carrier');

    // GTC Section 6.2 consequences
    if (reason.senderRefund > 0) {
      escrowRefund('shipper', finalPrice * reason.senderRefund, reasonKey);
    }
    if (reason.carrierPay > 0) {
      // Carrier gets partial compensation for attempted delivery
      auditLog('CARRIER_PARTIAL_PAY', { amount: finalPrice * reason.carrierPay, reason: reasonKey }, 'platform');
    }
    if (reason.carrierPenalty) {
      auditLog('CARRIER_PENALTY', { type: 'account_review', reason: 'abandonment_no_notification' }, 'platform');
    }
  };

  const submitPOD = () => {
    const pod = {
      photoTaken: true, // In production: actual photo file reference
      gpsLat: 42.6977 + (Math.random() * 0.01), // Simulated GPS
      gpsLng: 23.3219 + (Math.random() * 0.01),
      timestamp: new Date().toISOString(),
      notes: 'Delivered to recipient at door.',
    };
    setPodData(pod);
    advancePhase('pod_submitted', 'POD submitted by carrier', 'carrier');
    auditLog('POD_SUBMITTED', pod, 'carrier');

    // Auto-advance to completed after POD review (simulated 2s delay)
    setTimeout(() => {
      const finalPrice = agreedPrice || shipment.suggestedPrice;
      advancePhase('completed', 'POD accepted, escrow released', 'platform');
      escrowRelease(carrierName, finalPrice);
    }, 2000);
  };

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(''), 4000);
  };

  const deliveryMethods = [
    { id: 'walk',    title: 'On foot',          subtitle: 'For nearby drops and small items',                                                       disabled: false },
    { id: 'bike',    title: 'Two wheels',       subtitle: 'Quick across town with small to medium packages',                                        disabled: false },
    { id: 'car',     title: 'Four wheels',      subtitle: 'Larger items and longer distances',                                                      disabled: false },
    { id: 'transit', title: 'Bus or rail',      subtitle: 'Deliver along your route. Earn back your ticket — and more.',                            disabled: false },
    { id: 'plane',   title: 'Wings',            subtitle: 'Coming soon — flying somewhere? Take a package along.',                                  disabled: true  },
  ];

  const verificationMeta = getCarrierVerificationMeta(carrierProfile.verificationStatus);
  const isCarrierVerified = carrierProfile.verificationStatus === 'verified';
  const isCarrierGuest = carrierProfile.accountState === 'guest';
  const hasCarrierRouteIntent = carrierProfile.origin && carrierProfile.destination && carrierProfile.availability;

  const carrierMissionSamples = [
    {
      id: 'city-direct',
      lane: 'direct',
      title: `${getAddressLabel(carrierProfile.origin || 'Sofia center')} to ${getAddressLabel(carrierProfile.destination || 'Plovdiv center')}`,
      offer: 22,
      packageType: 'Medium box',
      pickupZone: getAddressLabel(carrierProfile.origin || 'Sofia center'),
      deliveryZone: getAddressLabel(carrierProfile.destination || 'Plovdiv center'),
      timing: `${carrierProfile.availability || 'Today'} · Pickup ${getOptionLabel(CARRIER_DEPARTURE_WINDOWS, carrierProfile.departureWindow, 'Morning')} · Arrival ${getOptionLabel(CARRIER_ARRIVAL_WINDOWS, carrierProfile.arrivalWindow, 'By evening')}`,
      routeFit: 'Direct match',
      explanation: 'Pickup and drop-off align with the route you declared in Mission control.',
      note: 'Shipper wants a same-day response and can release the mission to one carrier at a time.',
    },
    {
      id: 'route-flex',
      lane: 'transit',
      title: `${getAddressLabel(carrierProfile.origin || 'Sofia')} corridor stop`,
      offer: 18,
      packageType: 'Small box',
      pickupZone: `${getAddressLabel(carrierProfile.origin || 'Sofia')} pickup`,
      deliveryZone: `${getAddressLabel(carrierProfile.destination || 'Pazardzhik')} transit stop`,
      timing: `${carrierProfile.availability || 'Flexible'} · Extra ${getOptionLabel(CARRIER_DETOUR_OPTIONS, carrierProfile.maxDetour, 'Up to 15 min')} detour`,
      routeFit: 'Transit option',
      explanation: 'This mission sits near your route but may need some timing flexibility from both sides.',
      note: 'Good fallback lane when you want to fill extra capacity without committing to a full detour.',
    },
  ].filter((mission) => carrierProfile.preferredMatchLayer === 'direct_only' ? mission.lane === 'direct' : true);

  const openCarrierGuestPreview = () => {
    setCarrierProfile((prev) => ({ ...prev, accountState: 'guest' }));
    setStep('carrier-preview');
  };

  const signInCarrierWithGoogle = () => {
    setCarrierProfile((prev) => ({
      ...prev,
      accountState: prev.verificationStatus === 'verified' ? 'carrier_ready' : 'account_created',
      signedInProvider: 'google',
      fullName: prev.fullName || 'Alex Martin',
      email: prev.email || 'alex.carrier@takeup.app',
    }));
    setStep('carrier-form');
    showToast('Google sign-in completed for the prototype. Finish your Carrier profile to continue.');
  };

  const resumeVerifiedCarrier = () => {
    setCarrierProfile((prev) => ({
      ...prev,
      accountState: 'carrier_ready',
      verificationStatus: 'verified',
      signedInProvider: prev.signedInProvider || 'google',
      fullName: prev.fullName || 'Verified Carrier',
      email: prev.email || 'verified.carrier@takeup.app',
      deliveryMethod: prev.deliveryMethod || 'car',
      availability: prev.availability || 'Today',
      origin: prev.origin || 'Sofia center',
      destination: prev.destination || 'Plovdiv center',
    }));
    setStep('carrier-availability');
    showToast('Verified Carrier session restored. Mission control is ready.');
  };

  const startCarrierVerification = () => {
    setCarrierProfile((prev) => ({ ...prev, verificationStatus: 'pending', accountState: 'kyc_pending' }));
    showToast('KYC session created with the verification partner placeholder. Review is now pending.');
  };

  const requestCarrierMoreInfo = () => {
    setCarrierProfile((prev) => ({ ...prev, verificationStatus: 'more_info_required', accountState: 'profile_completed' }));
    showToast('Prototype update: the partner requested a clearer ID photo or an updated document.');
  };

  const completeCarrierVerification = () => {
    setCarrierProfile((prev) => ({ ...prev, verificationStatus: 'verified', accountState: 'carrier_ready' }));
    setStep('carrier-availability');
    showToast('Carrier verified. You can now act on available missions.');
  };

  const sendCarrierStructuredRequest = (mission, action) => {
    const actionLabel = action === 'accept'
      ? 'accepted the current price'
      : action === 'counter'
        ? 'suggested a counter-offer'
        : 'sent one clarifying question';
    showToast(`Structured request sent: you ${actionLabel} for ${mission.title}.`);
  };

  const carrierName = selectedCarrierRequest?.name || 'Alex M.';

  const createCarrierRequests = (currentShipment) => {
    const pricing = PRICING_TABLE[currentShipment.size] || { basePrice: 10, maxPrice: 25 };
    const pickupLabel = getAddressLabel(currentShipment.pickupAddress);
    const deliveryLabel = getAddressLabel(currentShipment.deliveryAddress);
    const basePrice = currentShipment.suggestedPrice || pricing.basePrice;
    const boundedHigherPrice = Math.min(pricing.maxPrice, basePrice + 4);
    const transitPrice = Math.min(pricing.maxPrice, basePrice + 2);

    return [
      {
        id: 'direct-alex',
        name: 'Alex M.',
        vehicle: 'Car',
        rating: 4.8,
        completedMissions: 142,
        trustScore: 97,
        routeType: 'preferred',
        routeTitle: 'Final destination match',
        routeDetail: `${deliveryLabel} is this carrier's final stop today.`,
        pickupEta: 'Pickup in 30 min',
        intentType: 'accept_price',
        proposedPrice: basePrice,
        note: `Already driving from ${pickupLabel} directly to ${deliveryLabel}.`,
        badges: ['Verified ID', 'On-time 98%'],
        status: 'new',
      },
      {
        id: 'direct-mila',
        name: 'Mila P.',
        vehicle: 'Car',
        rating: 4.9,
        completedMissions: 89,
        trustScore: 95,
        routeType: 'preferred',
        routeTitle: 'Final destination match',
        routeDetail: `${deliveryLabel} is on this carrier's scheduled route end.`,
        pickupEta: 'Pickup in 50 min',
        intentType: 'counter_offer',
        proposedPrice: boundedHigherPrice,
        note: 'Can take the mission today with a small pricing adjustment for timing.',
        badges: ['Verified ID', 'Fragile items experience'],
        status: 'new',
      },
      {
        id: 'transit-ivan',
        name: 'Ivan T.',
        vehicle: 'Rail',
        rating: 4.7,
        completedMissions: 54,
        trustScore: 91,
        routeType: 'transit',
        routeTitle: 'Transit route option',
        routeDetail: `${deliveryLabel} is a mid-route stop, so timing may need flexibility.`,
        pickupEta: 'Pickup in 1 h 10 min',
        intentType: 'question',
        proposedPrice: transitPrice,
        note: 'Can likely deliver during a scheduled stop.',
        question: 'Would a station-area pickup and a 30-minute delivery window work for you?',
        badges: ['Verified ID', 'Rail route verified'],
        status: 'new',
      },
      {
        id: 'transit-nadia',
        name: 'Nadia S.',
        vehicle: 'Car',
        rating: 4.6,
        completedMissions: 61,
        trustScore: 89,
        routeType: 'transit',
        routeTitle: 'Transit route option',
        routeDetail: `${deliveryLabel} requires a short detour from the planned route.`,
        pickupEta: 'Pickup in 1 h 25 min',
        intentType: 'counter_offer',
        proposedPrice: transitPrice,
        note: 'Can make the drop-off as a transit stop if timing remains flexible.',
        badges: ['Verified ID', 'Good response time'],
        status: 'new',
      },
    ];
  };

  const buildNegotiationMessages = (request, mode = 'open') => {
    const systemText = mode === 'accept'
      ? `You approved ${request.name}'s proposal. You can confirm the booking or continue negotiating inside the platform.`
      : `You allowed ${request.name} to enter negotiation. Personal contact details remain hidden until booking is confirmed.`;

    let carrierText = '';
    if (request.intentType === 'accept_price') {
      carrierText = `Hi! ${request.note} Your offer of €${request.proposedPrice} works for me.`;
    } else if (request.intentType === 'counter_offer') {
      carrierText = `Hi! ${request.note} I can do this mission for €${request.proposedPrice}.`;
    } else {
      carrierText = `Hi! ${request.note} Before I commit, ${request.question}`;
    }

    return [
      {
        sender: 'system',
        text: systemText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
      {
        sender: 'carrier',
        text: carrierText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ];
  };

  const openNegotiationWithCarrier = (request, mode = 'open') => {
    if (request.status === 'negotiating' && selectedCarrierRequest?.id === request.id && messages.length > 0) {
      setStep('chat-room');
      return;
    }

    if (!canStartNewNegotiation()) return;

    setCarrierRequests((prev) => prev.map((entry) => (
      entry.id === request.id ? { ...entry, status: 'negotiating' } : entry
    )));
    setSelectedCarrierRequest(request);
    setActiveNegotiations((prev) => prev + (request.status === 'negotiating' ? 0 : 1));
    setNegotiationDeclined(false);
    setNegotiationStartTime(Date.now());
    setNegotiationTimeRemaining(30 * 60);
    setChatWarning(null);
    setAgreedPrice(request.intentType === 'counter_offer' || mode === 'accept' ? request.proposedPrice : shipment.suggestedPrice);
    setMessages(buildNegotiationMessages(request, mode));
    setStep('chat-room');
  };

  const declineCarrierRequest = (requestId) => {
    setCarrierRequests((prev) => prev.filter((request) => request.id !== requestId));
    showToast('Request declined. The carrier will not enter negotiation.');
  };

  const toggleSavedCarrierRequest = (requestId) => {
    setCarrierRequests((prev) => prev.map((request) => (
      request.id === requestId ? { ...request, saved: !request.saved } : request
    )));
  };

  const handleSizeSelect = (size) => {
    const pricing = PRICING_TABLE[size];
    setShipment({ ...shipment, size, suggestedPrice: pricing.basePrice });
  };

  const checkProhibitedItems = (text) => {
    const lowerText = text.toLowerCase();
    for (const [category, data] of Object.entries(PROHIBITED_KEYWORDS)) {
      for (const keyword of data.keywords) {
        if (lowerText.includes(keyword)) return { category, ...data };
      }
    }
    return null;
  };

  const handleDescriptionChange = (text) => {
    const warning = checkProhibitedItems(text);
    setProhibitedWarning(warning);
    setShipment((prev) => ({
      ...prev,
      description: text,
      requiresPhotoVerification: warning?.category === 'vague_suspicious',
      photoVerificationProvided: warning?.category === 'vague_suspicious' ? prev.photoVerificationProvided : false,
    }));
  };

  const filterChatMessage = (text) => {
    const lowerText = text.toLowerCase();
    for (const keyword of PAYMENT_KEYWORDS) {
      if (lowerText.includes(keyword)) {
        return { blocked: true, severity: 'blocker', title: 'Off-platform payment blocked', message: 'Arranging payments outside TakeUp is not allowed and may result in account termination. All payments must go through the platform.' };
      }
    }
    for (const keyword of CONTACT_KEYWORDS) {
      if (lowerText.includes(keyword)) {
        return { blocked: true, severity: 'caution', title: 'Contact info blocked', message: 'Please keep all communication on the platform until delivery is complete.' };
      }
    }
    if (/\d{3}[-.\s]?\d{3}[-.\s]?\d{4}/.test(text)) {
      return { blocked: true, severity: 'caution', title: 'Phone number blocked', message: 'Please keep all communication on the platform until delivery is complete.' };
    }
    return { blocked: false };
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) age--;
    return age;
  };

  const canStartNewNegotiation = () => {
    if (activeNegotiations >= 2) {
      setBlockingModal({
        title: 'Negotiation limit reached',
        message: 'You can have up to 2 active negotiations at once. Complete or close one before starting a new one.',
      });
      return false;
    }
    return true;
  };

  const publishMission = () => {
    if (prohibitedWarning && prohibitedWarning.severity === 'blocker') {
      setBlockingModal({
        title: 'Cannot proceed',
        message: 'This item appears to be prohibited. Please review our Terms & Conditions or edit your description.',
      });
      return;
    }

    setNegotiationDeclined(false);
    setNegotiationStartTime(null);
    setChatWarning(null);
    setSelectedCarrierRequest(null);
    setRequestInboxTab('preferred');
    setRequestInboxPage(0);
    setCarrierRequests(createCarrierRequests(shipment));
    auditLog('MISSION_PUBLISHED', {
      size: shipment.size,
      price: shipment.suggestedPrice,
      pickupAddress: '[MASKED]',
      deliveryAddress: '[MASKED]',
      requestCount: 4,
    }, 'shipper');
    setStep('shipper-requests');
  };

  const sendMessage = () => {
    const messageText = newMessage.trim();
    if (!messageText) return;
    const filterResult = filterChatMessage(messageText);
    if (filterResult.blocked) {
      setChatWarning(filterResult);
      setTimeout(() => setChatWarning(null), 5000);
      setNewMessage('');
      return;
    }

    const userMsg = { sender: 'shipper', text: messageText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages((prev) => [...prev, userMsg]);
    setNewMessage('');

    setTimeout(() => {
      let response = '';
      const lowerMsg = messageText.toLowerCase();
      if (lowerMsg.includes('lower') || lowerMsg.includes('reduce') || lowerMsg.includes('less')) {
        const currentPrice = agreedPrice || shipment.suggestedPrice;
        const newPrice = Math.max(PRICING_TABLE[shipment.size].basePrice, currentPrice - 3);
        response = `How about €${newPrice}? That's the best I can do.`;
        setAgreedPrice(newPrice);
      } else if (lowerMsg.includes('when') || lowerMsg.includes('time') || lowerMsg.includes('pickup')) {
        response = "I can pick it up in the next 30 minutes — I'm nearby.";
      } else if (lowerMsg.includes('yes') || lowerMsg.includes('ok') || lowerMsg.includes('deal') || lowerMsg.includes('agree')) {
        response = `Perfect — let's lock it in at €${agreedPrice || shipment.suggestedPrice}.`;
      } else if (lowerMsg.includes('higher') || lowerMsg.includes('more')) {
        response = `Appreciated! €${agreedPrice || shipment.suggestedPrice} works for me.`;
      } else if (lowerMsg.match(/\d+/)) {
        const proposedPrice = parseInt(messageText.match(/\d+/)[0], 10);
        if (proposedPrice >= PRICING_TABLE[shipment.size].basePrice && proposedPrice <= PRICING_TABLE[shipment.size].maxPrice) {
          response = `€${proposedPrice} sounds fair. Deal.`;
          setAgreedPrice(proposedPrice);
        } else if (proposedPrice < PRICING_TABLE[shipment.size].basePrice) {
          response = `€${proposedPrice} is a bit low for this one. Could we meet at €${PRICING_TABLE[shipment.size].basePrice}?`;
        } else {
          response = `Generous — happy to do it for €${proposedPrice}.`;
          setAgreedPrice(proposedPrice);
        }
      } else {
        response = `Current price is €${agreedPrice || shipment.suggestedPrice}. Let me know if you'd like to suggest a different amount.`;
      }
      setMessages((prev) => [...prev, { sender: 'carrier', text: response, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    }, 1000);
  };

  const declineNegotiation = (reason) => {
    setNegotiationDeclined(true);
    setActiveNegotiations((prev) => Math.max(0, prev - 1));
    if (selectedCarrierRequest) {
      setCarrierRequests((prev) => prev.map((request) => (
        request.id === selectedCarrierRequest.id ? { ...request, status: 'reviewed' } : request
      )));
    }
    setMessages([]);
    setNewMessage('');
    setNegotiationStartTime(null);
    setChatWarning(null);
    setSelectedCarrierRequest(null);
    setStep('shipper-requests');
    showToast(`Negotiation closed. Reason: ${reason}.`);
  };

  const startHandoffConfirmation = () => {
    setHandoffPlan((prev) => (
      prev.pickupDate && prev.deliveryDate ? prev : buildSuggestedHandoffPlan(shipment)
    ));
    setStep('confirm-handoff');
  };

  const finalizeBooking = () => {
    const finalPrice = agreedPrice || shipment.suggestedPrice;
    setActiveNegotiations((prev) => Math.max(0, prev - 1));
    setNegotiationDeclined(false);
    setNegotiationStartTime(null);
    setChatWarning(null);
    setDeliveryPhase('booked');
    setEscrowStatus('none');
    setPodData(null);
    setDeliveryFailure(null);
    setFailureReportTime(null);
    if (selectedCarrierRequest) {
      setCarrierRequests((prev) => prev.map((request) => (
        request.id === selectedCarrierRequest.id ? { ...request, status: 'booked' } : request
      )));
    }

    // Hold escrow — GTC Section 5.6
    escrowHold(finalPrice);

    // Audit — legally significant: contract formed
    auditLog('BOOKING_CONFIRMED', {
      size: shipment.size,
      price: finalPrice,
      carrier: carrierName,
      pickupAddress: '[MASKED]', // GDPR Art 5(1)(c) — full address only in backend
      deliveryAddress: '[MASKED]',
      pickupGoal: shipment.pickupCommitment,
      deliveryGoal: shipment.deliveryCommitment,
      pickupSlot: handoffPlan.pickupDate ? formatHandoffSlot(handoffPlan.pickupDate, handoffPlan.pickupWindow) : 'not_set',
      deliverySlot: handoffPlan.deliveryDate ? formatHandoffSlot(handoffPlan.deliveryDate, handoffPlan.deliveryWindow) : 'not_set',
      declaredValue: shipment.declaredValue,
    }, 'shipper');

    auditLog('HANDOFF_CONFIRMED', {
      pickupDate: handoffPlan.pickupDate,
      pickupWindow: handoffPlan.pickupWindow,
      deliveryDate: handoffPlan.deliveryDate,
      deliveryWindow: handoffPlan.deliveryWindow,
    }, 'shipper');

    setStep('tracking');

    // Simulate carrier accepting and moving (demo progression)
    setTimeout(() => advancePhase('carrier_en_route', 'Carrier confirmed and heading to pickup', 'carrier'), 3000);
  };

  const handleCancellation = () => setShowCancellationModal(true);

  // GTC Section 5.5 — Graduated cancellation, lifecycle-aware
  const processCancellation = () => {
    const cancellationPolicy = getCancellationPolicy(step, deliveryPhase);
    const finalPrice = agreedPrice || shipment.suggestedPrice;

    if (!cancellationPolicy.canCancel) {
      setBlockingModal({
        title: 'Cancellation not permitted',
        message: `Your mission is in "${cancellationPolicy.stageLabel}" stage. ${cancellationPolicy.description}`,
      });
      setShowCancellationModal(false);
      return;
    }

    const fee = cancellationPolicy.fee || 0;
    const refundAmount = finalPrice - fee;

    auditLog('CANCELLATION', {
      phase: cancellationPolicy.stageLabel,
      fee,
      refundAmount,
      reason: 'sender_initiated',
    }, 'shipper');

    if (cancellationPolicy.type === 'pre_acceptance') {
      showToast('Mission withdrawn before Contractor acceptance. No fee charged.');
      setShowCancellationModal(false);
      resetMissionFlow();
      setStep('welcome');
      return;
    }

    // Refund with graduated fee
    if (fee > 0) {
      escrowRefund('shipper', refundAmount, `Cancellation at ${deliveryPhase} phase, €${fee} admin fee`);
      auditLog('CARRIER_COMPENSATION', { amount: fee, reason: 'cancellation_preparation_time' }, 'platform');
    } else {
      escrowRefund('shipper', finalPrice, 'Cancellation before Contractor acceptance');
    }

    showToast(`Mission cancelled. ${fee > 0 ? `€${refundAmount} refunded (€${fee} admin fee).` : 'Full refund issued.'} Processed within 14 days per EU CRD.`);
    resetMissionFlow();
    setStep('welcome');
  };

  const proceedToAvailability = () => {
    if (!acceptedGTC) {
      setBlockingModal({ title: 'Terms & Conditions required', message: 'Please accept the Terms & Conditions to continue.' });
      return;
    }
    if (!carrierProfile.dateOfBirth) {
      setShowAgeVerificationError(true);
      return;
    }
    const age = calculateAge(carrierProfile.dateOfBirth);
    if (age < 18) {
      setBlockingModal({
        title: 'Must be 18 or older',
        message: 'You must be 18 or older to register as a Contractor (Carrier) on TakeUp. This is for your safety and legal protection.',
      });
      return;
    }
    if (!carrierProfile.agreeToNoSubcontracting) {
      setBlockingModal({
        title: 'Agreement required',
        message: 'As a Contractor (Carrier), you must agree to personally perform all missions (no sub-contracting) to continue.',
      });
      return;
    }
    setCarrierProfile((prev) => ({ ...prev, accountState: 'profile_completed' }));
    setShowInsuranceReminder(true);
  };

  const acknowledgeInsurance = () => {
    setShowInsuranceReminder(false);
    setStep('carrier-verification');
  };

  // Negotiation timer
  useEffect(() => {
    if (step === 'chat-room' && negotiationStartTime && !negotiationDeclined) {
      const interval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - negotiationStartTime) / 1000);
        const remaining = 30 * 60 - elapsed;
        if (remaining <= 0) {
          clearInterval(interval);
          declineNegotiation('30-minute timeout expired');
        } else {
          setNegotiationTimeRemaining(remaining);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [step, negotiationStartTime, negotiationDeclined]);

  useEffect(() => {
    if (step !== 'tracking') return undefined;
    if (deliveryPhase === 'booked' || deliveryPhase === 'pod_submitted' || deliveryPhase === 'completed' || deliveryPhase === 'delivery_failed') {
      return undefined;
    }

    const phaseTimers = {
      carrier_en_route: 3200,
      picked_up: 3200,
      in_transit: 3600,
      delivered: 2400,
    };

    const timer = setTimeout(() => {
      if (deliveryPhase === 'carrier_en_route') {
        advancePhase('picked_up', 'Carrier confirmed pickup', 'carrier');
        return;
      }
      if (deliveryPhase === 'picked_up') {
        advancePhase('in_transit', 'Carrier en route to delivery address', 'carrier');
        return;
      }
      if (deliveryPhase === 'in_transit') {
        advancePhase('delivered', 'Carrier arrived at delivery location', 'carrier');
        return;
      }
      if (deliveryPhase === 'delivered') {
        submitPOD();
      }
    }, phaseTimers[deliveryPhase] || 3000);

    return () => clearTimeout(timer);
  }, [step, deliveryPhase]);

  const handleMethodSelect = (methodId) => {
    if (deliveryMethods.find((m) => m.id === methodId)?.disabled) return;
    setCarrierProfile({ ...carrierProfile, deliveryMethod: methodId });
    setShowTransportWarning(methodId);
  };

  /* ----------------------------- Sub-views ----------------------------- */

  const GTCModal = () => (
    <Modal onClose={() => setShowGTC(false)} wide labelledBy="gtc-title">
      <h2 id="gtc-title" className="tu-h2">General Terms and Conditions</h2>
      <p className="tu-muted" style={{ marginBottom: 'var(--space-5)' }}>
        TakeUp Platform — Crowdship Logistics Services. Last updated: March 9, 2026.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)', fontSize: 'var(--text-sm)', color: 'var(--color-ink-2)' }}>

        <section>
          <h3 className="tu-h3">1. Introduction and definitions</h3>
          <p style={{ marginBottom: 'var(--space-3)' }}>These Terms govern the use of the TakeUp platform ("Platform"), a crowdship logistics marketplace operating within and between European Union member states. TakeUp acts as an intermediary — it facilitates connections, payments, and dispute resolution but does not transport items itself.</p>

          <div style={{ background: 'var(--color-bg-warm)', border: '1px solid var(--color-accent-border)', borderRadius: 'var(--radius-md)', padding: 'var(--space-4)', marginBottom: 'var(--space-3)' }}>
            <div style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 'var(--text-lg)', marginBottom: 'var(--space-3)' }}>Role definitions</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <div>
                <div style={{ fontWeight: 700, color: 'var(--color-accent)' }}>Assigner <span style={{ fontWeight: 500, color: 'var(--color-ink-3)' }}>(referred to on the Platform as "Shipper")</span></div>
                <div>The User who creates and assigns a mission — specifying the item, pickup and delivery addresses, and offered price. The Assigner initiates the contractual relationship by posting a mission to the Platform.</div>
              </div>
              <div>
                <div style={{ fontWeight: 700, color: 'var(--color-primary)' }}>Contractor <span style={{ fontWeight: 500, color: 'var(--color-ink-3)' }}>(referred to on the Platform as "Carrier")</span></div>
                <div>The User who accepts a mission and personally performs the delivery. The Contractor is an independent service provider — not an employee of TakeUp or the Assigner. Sub-contracting or delegation to third parties is prohibited.</div>
              </div>
              <div>
                <div style={{ fontWeight: 700 }}>Mission</div>
                <div>A delivery request created by an Assigner and accepted by a Contractor, forming a binding agreement between both parties with the Platform as intermediary.</div>
              </div>
            </div>
          </div>

          <Notice severity="info" title="Terminology rule">
            Throughout these Terms and across the Platform, "Assigner" and "Shipper" are interchangeable, as are "Contractor" and "Carrier." The legal names (Assigner, Contractor) define the contractual relationship; the platform names (Shipper, Carrier) appear in the interface for readability.
          </Notice>
        </section>

        <section>
          <h3 className="tu-h3">2. Eligibility</h3>
          <p style={{ marginBottom: 'var(--space-3)' }}>All Users must be at least 18 years of age, have legal capacity to enter binding contracts, and provide accurate registration information. Contractors (Carriers) must personally perform all accepted missions — sub-contracting or delegation is not permitted.</p>
          <Notice severity="caution" title="Sub-contracting prohibited">
            Using un-vetted third parties voids insurance coverage and constitutes a material breach by the Contractor.
          </Notice>
        </section>

        <section>
          <h3 className="tu-h3">3. Prohibited items</h3>
          <p style={{ marginBottom: 'var(--space-3)' }}>The following are not permitted: explosives, gases, flammable liquids, toxic substances, weapons, narcotics, and other controlled substances. Transport of prohibited items may result in account termination, forfeiture of payments, and reporting to authorities.</p>
          <Notice severity="caution" title="Vague descriptions">
            Generic descriptions like "scientific equipment" or "samples" intended to bypass safety checks may trigger mandatory photo verification.
          </Notice>
        </section>

        <section>
          <h3 className="tu-h3">4. Transactions</h3>
          <p style={{ marginBottom: 'var(--space-3)' }}>Assigners (Shippers) may maintain up to 2 active negotiations at once. Negotiations time out after 30 minutes. Payment is held by the Platform in escrow until the Contractor completes delivery with satisfactory proof of delivery; the Platform deducts a 15% service fee before releasing funds to the Contractor.</p>
        </section>

        <section>
          <h3 className="tu-h3">5. Cancellation</h3>
          <ul style={{ paddingLeft: '20px', margin: 0 }}>
            <li><strong>Before Contractor (Carrier) acceptance:</strong> full refund, no fee.</li>
            <li><strong>After acceptance, before pickup:</strong> €5 administrative fee to compensate Contractor preparation time.</li>
            <li><strong>After pickup:</strong> cancellation not permitted — mission must proceed to completion.</li>
          </ul>
          <p style={{ marginTop: 'var(--space-3)' }}>Refunds are processed within 14 days per the EU Consumer Rights Directive.</p>
        </section>

        <section>
          <h3 className="tu-h3">6. Proof of delivery</h3>
          <p>Contractors (Carriers) must provide a photograph at the delivery location, GPS confirmation, timestamp, and recipient confirmation where available. Failure to deliver must be reported within 2 hours via the in-app reporting flow.</p>
        </section>

        <section>
          <h3 className="tu-h3">7. Liability and Contractor protection</h3>
          <p style={{ marginBottom: 'var(--space-3)' }}>If a Contractor unknowingly transports prohibited items due to Assigner fraud, TakeUp will cooperate with law enforcement to establish Contractor innocence and provides a legal support fund of up to €5,000 per incident for innocent Contractors.</p>
          <Notice severity="info" title="Insurance">
            TakeUp does not provide insurance. Contractors (Carriers) are strongly advised to carry public liability and goods-in-transit insurance.
          </Notice>
        </section>

        <section>
          <h3 className="tu-h3">8. Prohibited conduct</h3>
          <p>Off-platform payments, sharing contact information before delivery completion, sub-contracting, and deliberately vague descriptions are immediate-termination offenses. The platform monitors for these automatically.</p>
        </section>

        <section>
          <h3 className="tu-h3">9. Force majeure</h3>
          <p>Events beyond reasonable control (natural disasters, medical emergencies, vehicle breakdown with evidence, strikes, government restrictions) excuse non-performance. Affected parties must notify the platform within 1 hour with supporting evidence.</p>
        </section>

        <section>
          <h3 className="tu-h3">10. Data protection</h3>
          <p>Personal data is processed in accordance with GDPR. Transaction data is retained for 2 years post-completion. Users may request account deletion via Settings after all active transactions complete.</p>
        </section>

        <Notice severity="blocker" title="Important">
          By using TakeUp, you acknowledge that you have read and agree to these Terms. Transport of prohibited items, age falsification, off-platform payments, or sub-contracting may result in immediate account termination and reporting to authorities.
        </Notice>
      </div>

      <button className="tu-btn tu-btn--primary tu-btn--block" style={{ marginTop: 'var(--space-5)' }} onClick={() => setShowGTC(false)}>
        I have read and understand
      </button>
    </Modal>
  );

  const InsuranceReminderModal = () => (
    <Modal onClose={() => setShowInsuranceReminder(false)} labelledBy="ins-title">
      <h2 id="ins-title" className="tu-h2">Insurance reminder</h2>
      <p style={{ marginBottom: 'var(--space-4)' }}>
        TakeUp <strong>does not provide insurance</strong> for items you transport. As a Contractor (Carrier), you are strongly advised to maintain:
      </p>
      <ul style={{ paddingLeft: '20px', marginBottom: 'var(--space-4)', color: 'var(--color-ink-2)' }}>
        <li>Public liability insurance</li>
        <li>Goods-in-transit insurance covering item values</li>
        <li>Appropriate vehicle insurance for commercial use</li>
      </ul>
      <Notice severity="caution">
        You are personally liable for loss, damage, or theft during transport.
      </Notice>
      <button className="tu-btn tu-btn--primary tu-btn--block" style={{ marginTop: 'var(--space-5)' }} onClick={acknowledgeInsurance}>
        I understand — continue
      </button>
    </Modal>
  );

  const TransportWarningModal = ({ method }) => {
    const warning = TRANSPORT_WARNINGS[method];
    if (!warning) return null;
    return (
      <Modal
        onClose={() => { setShowTransportWarning(null); setCarrierProfile({ ...carrierProfile, deliveryMethod: '' }); }}
        labelledBy="tw-title"
      >
        <h2 id="tw-title" className="tu-h2">{warning.title}</h2>
        <ul style={{ paddingLeft: '20px', color: 'var(--color-ink-2)', marginBottom: 'var(--space-4)' }}>
          {warning.points.map((p, i) => <li key={i} style={{ marginBottom: 'var(--space-1)' }}>{p}</li>)}
        </ul>
        <Notice severity="info">{warning.recommendation}</Notice>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)', marginTop: 'var(--space-5)' }}>
          <button
            className="tu-btn tu-btn--secondary"
            onClick={() => { setShowTransportWarning(null); setCarrierProfile({ ...carrierProfile, deliveryMethod: '' }); }}
          >
            Choose different
          </button>
          <button className="tu-btn tu-btn--primary" onClick={() => setShowTransportWarning(null)}>
            I understand
          </button>
        </div>
      </Modal>
    );
  };

  const CancellationModal = () => (
    <Modal onClose={() => setShowCancellationModal(false)} labelledBy="cancel-title">
      {(() => {
        const cancellationPolicy = getCancellationPolicy(step, deliveryPhase);
        return (
          <>
            <h2 id="cancel-title" className="tu-h2">Cancel mission?</h2>
            <p style={{ marginBottom: 'var(--space-2)' }}>Current stage: <strong>{cancellationPolicy.stageLabel}</strong></p>
            <p style={{ marginBottom: 'var(--space-3)' }}>Cancellation policy:</p>
            <ul style={{ paddingLeft: '20px', color: 'var(--color-ink-2)', marginBottom: 'var(--space-4)' }}>
              <li><strong>Before Contractor accepts:</strong> full refund, no fee.</li>
              <li><strong>After acceptance, before pickup:</strong> €5 fee.</li>
              <li><strong>After pickup:</strong> cancellation not permitted.</li>
            </ul>
            <Notice severity={cancellationPolicy.canCancel ? 'info' : 'blocker'} title={cancellationPolicy.canCancel ? 'Current rule' : 'Cancellation locked'}>
              {cancellationPolicy.description}
            </Notice>
            <Notice severity="info">
              Per the EU Consumer Rights Directive, refunds are processed within 14 days.
            </Notice>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)', marginTop: 'var(--space-5)' }}>
              <button className="tu-btn tu-btn--secondary" onClick={() => setShowCancellationModal(false)}>Keep mission</button>
              <button className="tu-btn tu-btn--danger" disabled={!cancellationPolicy.canCancel} onClick={processCancellation}>
                {cancellationPolicy.type === 'pre_acceptance' ? 'Withdraw mission' : 'Confirm cancellation'}
              </button>
            </div>
          </>
        );
      })()}
    </Modal>
  );

  const BlockingModal = () => {
    if (!blockingModal) return null;
    return (
      <Modal onClose={() => setBlockingModal(null)} labelledBy="block-title">
        <h2 id="block-title" className="tu-h2">{blockingModal.title}</h2>
        <p style={{ color: 'var(--color-ink-2)', marginBottom: 'var(--space-5)' }}>{blockingModal.message}</p>
        <button className="tu-btn tu-btn--primary tu-btn--block" onClick={() => setBlockingModal(null)}>OK</button>
      </Modal>
    );
  };

  // Report Issue modal — GTC Section 6.2 + Section 13 (Force Majeure)
  const [reportIssueReason, setReportIssueReason] = useState('');
  const [reportIssueNotes, setReportIssueNotes] = useState('');
  const [reportIssueEvidence, setReportIssueEvidence] = useState(false);

  const resetMissionFlow = () => {
    setShipment(createInitialShipment());
    setHandoffPlan(createInitialHandoffPlan());
    setMessages([]);
    setNewMessage('');
    setAgreedPrice(null);
    setCarrierRequests([]);
    setSelectedCarrierRequest(null);
    setRequestInboxTab('preferred');
    setRequestInboxPage(0);
    setProhibitedWarning(null);
    setNegotiationStartTime(null);
    setNegotiationTimeRemaining(30 * 60);
    setChatWarning(null);
    setNegotiationDeclined(false);
    setActiveNegotiations(0);
    setShowCancellationModal(false);
    setDeliveryPhase('booked');
    setDeliveryFailure(null);
    setPodData(null);
    setEscrowStatus('none');
    setFailureReportTime(null);
    setShowReportIssueModal(false);
    setShowAuditLog(false);
    setAuditEntries([]);
    setReportIssueReason('');
    setReportIssueNotes('');
    setReportIssueEvidence(false);
  };

  const ReportIssueModal = () => (
    <Modal onClose={() => setShowReportIssueModal(false)} wide labelledBy="ri-title">
      <h2 id="ri-title" className="tu-h2">Report delivery issue</h2>
      <p style={{ color: 'var(--color-ink-2)', marginBottom: 'var(--space-4)' }}>
        Per GTC Section 6.2, you must report within <strong>2 hours</strong> of the incident. Photo evidence and GPS timestamp are required.
      </p>

      <div style={{ marginBottom: 'var(--space-4)' }}>
        <span className="tu-label">What happened? *</span>
        <div style={{ display: 'grid', gap: 'var(--space-2)' }}>
          {Object.entries(FAILURE_REASONS).map(([key, reason]) => (
            <button
              key={key}
              className="tu-tap"
              aria-pressed={reportIssueReason === key}
              onClick={() => setReportIssueReason(key)}
              style={{ padding: 'var(--space-3)' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 600 }}>{reason.label}</span>
                <span className="tu-muted" style={{ fontSize: 'var(--text-xs)' }}>
                  {reason.carrierPenalty ? 'Penalty applies' : 'No penalty'}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {reportIssueReason && (
        <>
          <div style={{ marginBottom: 'var(--space-4)' }}>
            <label htmlFor="ri-notes" className="tu-label">Details</label>
            <textarea
              id="ri-notes"
              className="tu-textarea"
              rows={3}
              placeholder="Describe what happened…"
              value={reportIssueNotes}
              onChange={(e) => setReportIssueNotes(e.target.value)}
            />
          </div>

          {FAILURE_REASONS[reportIssueReason]?.evidenceRequired && (
            <div style={{ marginBottom: 'var(--space-4)' }}>
              <span className="tu-label">Evidence required</span>
              <label className="tu-check-row" htmlFor="ri-evidence">
                <input
                  id="ri-evidence"
                  type="checkbox"
                  checked={reportIssueEvidence}
                  onChange={(e) => setReportIssueEvidence(e.target.checked)}
                />
                <span>I have photo evidence and GPS timestamp to submit (simulated for prototype)</span>
              </label>
            </div>
          )}

          <Notice severity="info" title="What happens next">
            {FAILURE_REASONS[reportIssueReason]?.carrierPenalty
              ? 'Carrier abandonment with no prior notification results in no payment and account review.'
              : `Assigner (Shipper) receives a ${Math.round(FAILURE_REASONS[reportIssueReason].senderRefund * 100)}% refund. ${FAILURE_REASONS[reportIssueReason].carrierPay > 0 ? `Carrier receives ${Math.round(FAILURE_REASONS[reportIssueReason].carrierPay * 100)}% compensation for the attempt.` : 'No Carrier penalty with valid evidence.'}`
            }
          </Notice>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)', marginTop: 'var(--space-5)' }}>
            <button className="tu-btn tu-btn--secondary" onClick={() => setShowReportIssueModal(false)}>
              Go back
            </button>
            <button
              className="tu-btn tu-btn--danger"
              disabled={FAILURE_REASONS[reportIssueReason]?.evidenceRequired && !reportIssueEvidence}
              onClick={() => {
                reportDeliveryFailure(reportIssueReason, reportIssueNotes);
                setShowReportIssueModal(false);
                setReportIssueReason('');
                setReportIssueNotes('');
                setReportIssueEvidence(false);
              }}
            >
              Submit report
            </button>
          </div>
        </>
      )}
    </Modal>
  );

  // Audit log display panel
  const AuditLogPanel = () => (
    <div style={{ marginTop: 'var(--space-4)' }}>
      <button
        className="tu-btn tu-btn--ghost"
        style={{ fontSize: 'var(--text-xs)', color: 'var(--color-ink-3)' }}
        onClick={() => setShowAuditLog(!showAuditLog)}
      >
        {showAuditLog ? 'Hide' : 'Show'} audit log ({auditEntries.length} entries)
      </button>
      {showAuditLog && auditEntries.length > 0 && (
        <div className="tu-log" style={{ marginTop: 'var(--space-2)' }}>
          {auditEntries.map((e) => (
            <div key={e.id} className="tu-log__entry">
              <span className="tu-log__time">{e.timestamp.split('T')[1]?.slice(0, 8)}</span>
              {' '}
              <span className="tu-log__event">{e.event}</span>
              {' '}
              <span className="tu-log__detail">{JSON.stringify(e.payload)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // Stepper component for tracking screen
  const STEPPER_PHASES = ['booked', 'carrier_en_route', 'picked_up', 'in_transit', 'delivered', 'pod_submitted', 'completed'];

  const DeliveryStepper = () => {
    const currentOrder = DELIVERY_PHASES[deliveryPhase]?.order ?? -1;
    const isFailed = deliveryPhase === 'delivery_failed' || deliveryPhase === 'disputed';
    return (
      <div className="tu-stepper" style={{ marginBottom: 'var(--space-6)' }}>
        {STEPPER_PHASES.map((phase, idx) => {
          const phaseOrder = DELIVERY_PHASES[phase].order;
          const isDone = !isFailed && currentOrder > phaseOrder;
          const isActive = !isFailed && deliveryPhase === phase;
          const cls = isFailed && idx === 0 ? 'tu-step tu-step--failed' : isDone ? 'tu-step tu-step--done' : isActive ? 'tu-step tu-step--active' : 'tu-step';
          return (
            <div key={phase} className={cls}>
              {idx < STEPPER_PHASES.length - 1 && <div className="tu-step__line" />}
              <div className="tu-step__dot">
                {isDone ? <Icon name="check" size="16px" /> : isFailed && idx === 0 ? <Icon name="x" size="16px" /> : (idx + 1)}
              </div>
              <div className="tu-step__label">{DELIVERY_PHASES[phase].shortLabel}</div>
            </div>
          );
        })}
      </div>
    );
  };

  /* ------------------------------ Screens ------------------------------ */

  // Welcome
  if (step === 'welcome') {
    return (
      <div className="tu-root">
        <style>{TOKENS_CSS}</style>
        <div className="tu-page tu-page--hero">
          <div className="tu-container">
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-7)', paddingTop: 'var(--space-6)' }}>
              <div style={{ marginBottom: 'var(--space-5)' }}>
                <span className="tu-patch">
                  <span className="tu-patch__dot" />
                  TAKEUP
                  <span className="tu-patch__dot" />
                </span>
              </div>
              <h1 className="tu-h1" style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-4xl)', maxWidth: '14ch', margin: '0 auto var(--space-4)' }}>
                Choose or create a <em style={{ fontStyle: 'italic', color: 'var(--color-accent)' }}>mission</em>.
              </h1>
              <p className="tu-lede" style={{ maxWidth: '52ch', margin: '0 auto var(--space-6)' }}>
                TakeUp connects people sending things with people already going that way. On foot, by bike, by car, or by train — someone is already headed your way.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-5)', maxWidth: '720px', margin: '0 auto' }}>
              <button
                className="tu-tap tu-tap--mission"
                onClick={() => setStep('shipper-form')}
                style={{ padding: 'var(--space-6)', textAlign: 'left' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-3)', color: 'var(--color-primary)' }}>
                  <Icon name="package" size="28px" strokeWidth={1.75} />
                  <span className="tu-patch" style={{ background: 'var(--color-primary-soft)', color: 'var(--color-primary)', borderColor: 'var(--color-primary-border)' }}>
                    Create
                  </span>
                </div>
                <div className="tu-h3" style={{ marginBottom: 'var(--space-2)' }}>I need to ship</div>
                <div className="tu-muted">Post a mission — where it starts, where it goes, what it's worth to you.</div>
              </button>

              <button
                className="tu-tap tu-tap--mission"
                onClick={() => setStep('carrier-entry')}
                style={{ padding: 'var(--space-6)', textAlign: 'left' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-3)', color: 'var(--color-accent)' }}>
                  <Icon name="compass" size="28px" strokeWidth={1.75} />
                  <span className="tu-patch">Choose</span>
                </div>
                <div className="tu-h3" style={{ marginBottom: 'var(--space-2)' }}>I can deliver</div>
                <div className="tu-muted">Pick a mission that's already on your way. Earn back your trip — and more.</div>
              </button>
            </div>

            <div style={{ textAlign: 'center', marginTop: 'var(--space-7)', paddingTop: 'var(--space-5)', borderTop: '1px solid var(--color-line)' }}>
              <button className="tu-btn tu-btn--ghost" onClick={() => setShowGTC(true)}>Terms & Conditions</button>
              <span style={{ margin: '0 8px', color: 'var(--color-ink-3)' }}>·</span>
              <span className="tu-muted">Privacy Policy</span>
            </div>
          </div>
        </div>
        {showGTC && <GTCModal />}
        <BlockingModal />
        <Toast message={toast} />
      </div>
    );
  }

  // Shipper form — inline step transition
  if (step === 'shipper-form') {
    const needsPhoto = shipment.requiresPhotoVerification;
    const canSubmit = shipment.pickupAddress && shipment.deliveryAddress && shipment.description &&
      shipment.pickupCommitment && shipment.deliveryCommitment &&
      (!prohibitedWarning || prohibitedWarning.severity !== 'blocker') &&
      (!needsPhoto || shipment.photoVerificationProvided);

    const sizeSelected = !!shipment.size;
    const pricing = sizeSelected ? PRICING_TABLE[shipment.size] : null;

    const handleChangeSize = () => {
      // Go back to size selection — preserve form state, only clear size and price
      setShipment((prev) => ({ ...prev, size: '', suggestedPrice: 0 }));
    };

    return (
      <div className="tu-root">
        <style>{TOKENS_CSS}</style>
        <div className="tu-page">
          <div className="tu-container--narrow">
            <button className="tu-btn tu-btn--ghost" onClick={() => setStep('welcome')} style={{ marginBottom: 'var(--space-4)' }}>
              <Icon name="arrowLeft" size="16px" /> Back
            </button>

            <div style={{ marginBottom: 'var(--space-5)' }}>
              <span className="tu-patch"><span className="tu-patch__dot" />New mission</span>
            </div>
            <h2 className="tu-h2">Create a mission</h2>

            {/* ---- Step 1: Size selection (visible when no size chosen) ---- */}
            {!sizeSelected && (
              <>
                <p className="tu-lede">What needs to move, and where's it going?</p>
                <div style={{ display: 'grid', gap: 'var(--space-2)' }}>
                  {Object.entries(PRICING_TABLE).map(([key, value]) => (
                    <button
                      key={key}
                      className="tu-tap"
                      onClick={() => handleSizeSelect(key)}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-3)' }}>
                        <div style={{ fontWeight: 600 }}>{value.label}</div>
                        <div style={{ textAlign: 'right' }}>
                          <div className="tu-muted" style={{ fontSize: 'var(--text-xs)' }}>Suggested range</div>
                          <div style={{ fontWeight: 700, color: 'var(--color-primary)' }}>€{value.basePrice}–€{value.maxPrice}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* ---- Step 2: Mission details (replaces size list in place) ---- */}
            {sizeSelected && pricing && (
              <>
                {/* Compact selected-size header */}
                <div className="tu-size-header" style={{ marginBottom: 'var(--space-4)' }}>
                  <div className="tu-size-header__check">
                    <Icon name="check" size="14px" strokeWidth={3} />
                  </div>
                  <div className="tu-size-header__label">{pricing.shortLabel}</div>
                  <div className="tu-size-header__range">€{pricing.basePrice}–€{pricing.maxPrice}</div>
                  <button
                    className="tu-btn tu-btn--ghost"
                    style={{ padding: '4px 10px', fontSize: 'var(--text-sm)' }}
                    onClick={handleChangeSize}
                  >
                    Change
                  </button>
                </div>

                {/* Item description */}
                <div style={{ marginBottom: 'var(--space-4)' }}>
                  <label htmlFor="desc" className="tu-label">Item description *</label>
                  <textarea
                    id="desc"
                    className={`tu-textarea${prohibitedWarning?.severity === 'blocker' ? ' tu-textarea--error' : ''}`}
                    placeholder="Be specific: 'Winter jacket', 'Dell laptop', 'Textbooks'. Avoid vague terms."
                    value={shipment.description}
                    onChange={(e) => handleDescriptionChange(e.target.value)}
                    rows={2}
                  />
                  {prohibitedWarning && (
                    <div style={{ marginTop: 'var(--space-3)' }}>
                      <Notice severity={prohibitedWarning.severity} title={prohibitedWarning.title}>
                        {prohibitedWarning.message}
                        {prohibitedWarning.severity === 'blocker' && (
                          <>
                            {' '}
                            <button className="tu-btn tu-btn--ghost" style={{ padding: 0, fontSize: 'var(--text-sm)' }} onClick={() => setShowGTC(true)}>
                              Review prohibited items
                            </button>
                          </>
                        )}
                      </Notice>
                    </div>
                  )}
                </div>

                {needsPhoto && (
                  <div style={{ marginBottom: 'var(--space-4)' }}>
                    <Notice severity="caution" title="Photo verification required">
                      This description needs extra verification. Confirm that you can provide clear item photos before Carrier pickup.
                    </Notice>
                    <label className="tu-check-row" htmlFor="photoVerification" style={{ marginTop: 'var(--space-2)', background: 'var(--color-bg-warm)', border: '1px solid var(--color-accent-border)' }}>
                      <input
                        id="photoVerification"
                        type="checkbox"
                        checked={shipment.photoVerificationProvided}
                        onChange={(e) => setShipment((prev) => ({ ...prev, photoVerificationProvided: e.target.checked }))}
                      />
                      <span>I can provide clear item photos for review before the mission starts.</span>
                    </label>
                  </div>
                )}

                {/* Pickup & Delivery — address + rough timing goals, side by side */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
                  <div>
                    <label htmlFor="pickup" className="tu-label">Pickup address</label>
                    <input id="pickup" className="tu-input" placeholder="123 Main St, City"
                      value={shipment.pickupAddress}
                      onChange={(e) => setShipment({ ...shipment, pickupAddress: e.target.value })} />
                    <div style={{ marginTop: 'var(--space-2)' }}>
                      <span className="tu-label" style={{ marginBottom: 'var(--space-2)' }}>Pickup goal</span>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 'var(--space-2)' }}>
                        {PICKUP_COMMITMENT_OPTIONS.map((option) => (
                          <button
                            key={option.id}
                            type="button"
                            className="tu-tap"
                            aria-pressed={shipment.pickupCommitment === option.id}
                            onClick={() => setShipment({ ...shipment, pickupCommitment: option.id })}
                            style={{ padding: '10px 12px', fontSize: 'var(--text-sm)', fontWeight: 600 }}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="delivery" className="tu-label">Delivery address</label>
                    <input id="delivery" className="tu-input" placeholder="456 Oak Ave, Town"
                      value={shipment.deliveryAddress}
                      onChange={(e) => setShipment({ ...shipment, deliveryAddress: e.target.value })} />
                    <div style={{ marginTop: 'var(--space-2)' }}>
                      <span className="tu-label" style={{ marginBottom: 'var(--space-2)' }}>Delivery goal</span>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 'var(--space-2)' }}>
                        {DELIVERY_COMMITMENT_OPTIONS.map((option) => (
                          <button
                            key={option.id}
                            type="button"
                            className="tu-tap"
                            aria-pressed={shipment.deliveryCommitment === option.id}
                            onClick={() => setShipment({ ...shipment, deliveryCommitment: option.id })}
                            style={{ padding: '10px 12px', fontSize: 'var(--text-sm)', fontWeight: 600 }}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Declared value & Your offer — side by side, matching address grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
                  <div>
                    <label htmlFor="value" className="tu-label">Declared value (optional)</label>
                    <input
                      id="value"
                      type="number"
                      className="tu-input"
                      placeholder="Estimated value in €"
                      value={shipment.declaredValue || ''}
                      onChange={(e) => setShipment({ ...shipment, declaredValue: parseInt(e.target.value, 10) || 0 })}
                    />
                    <p className="tu-muted" style={{ marginTop: 'var(--space-1)', marginBottom: 0 }}>
                      Helps Carriers assess risk.
                    </p>
                  </div>
                  <div>
                    <label htmlFor="offer" className="tu-label">Your offer <span className="tu-muted" style={{ fontWeight: 400 }}>(suggested €{pricing.basePrice}–€{pricing.maxPrice})</span></label>
                    <div className="tu-euro-input">
                      <span className="tu-euro-input__symbol">€</span>
                      <input
                        id="offer"
                        type="number"
                        className="tu-euro-input__field"
                        value={shipment.suggestedPrice || ''}
                        placeholder={String(pricing.basePrice)}
                        min={1}
                        onChange={(e) => {
                          const val = parseInt(e.target.value, 10);
                          setShipment({ ...shipment, suggestedPrice: isNaN(val) ? 0 : val });
                        }}
                      />
                    </div>
                    <p className="tu-muted" style={{ marginTop: 'var(--space-1)', marginBottom: 0 }}>
                      You can negotiate in chat.
                    </p>
                  </div>
                </div>

                {shipment.declaredValue > 500 && (
                  <div style={{ marginBottom: 'var(--space-4)' }}>
                    <Notice severity="caution" title="High-value item">
                      Consider requesting Carrier insurance proof. Photo verification may be required.
                    </Notice>
                  </div>
                )}

                {/* Submit */}
                <button className="tu-btn tu-btn--primary tu-btn--lg tu-btn--block" disabled={!canSubmit} onClick={publishMission}>
                  <Icon name="compass" size="18px" /> Publish mission & review carrier requests
                </button>
              </>
            )}
          </div>
        </div>
        {showGTC && <GTCModal />}
        <BlockingModal />
        <Toast message={toast} />
      </div>
    );
  }

  if (step === 'shipper-requests') {
    const preferredRequests = carrierRequests.filter((request) => request.routeType === 'preferred');
    const transitRequests = carrierRequests.filter((request) => request.routeType === 'transit');
    const activeTab = requestInboxTab === 'transit' && transitRequests.length ? 'transit' : preferredRequests.length ? 'preferred' : 'transit';
    const activeRequests = activeTab === 'preferred' ? preferredRequests : transitRequests;
    const safeRequestPage = Math.min(requestInboxPage, Math.max(activeRequests.length - 1, 0));
    const currentRequest = activeRequests[safeRequestPage] || null;
    const requestCountLabel = `${activeRequests.length ? safeRequestPage + 1 : 0}/${activeRequests.length}`;

    const renderRequestCard = (request) => {
      const acceptLabel = request.intentType === 'accept_price'
        ? `Accept €${request.proposedPrice}`
        : request.intentType === 'counter_offer'
          ? `Accept €${request.proposedPrice}`
          : null;
      const primaryLabel = request.status === 'negotiating' && selectedCarrierRequest?.id === request.id
        ? 'Continue negotiation'
        : 'Open negotiation';

      return (
        <div key={request.id} style={{ background: 'var(--color-surface)', border: `1px solid ${request.routeType === 'preferred' ? 'var(--color-primary-border)' : 'var(--color-accent-border)'}`, borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)', boxShadow: 'var(--shadow-1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 'var(--space-3)', marginBottom: 'var(--space-3)', flexWrap: 'wrap' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-1)' }}>
                <div style={{ fontWeight: 700, fontSize: 'var(--text-lg)' }}>{request.name}</div>
                <span className="tu-patch" style={{ background: request.routeType === 'preferred' ? 'var(--color-primary-soft)' : 'var(--color-accent-soft)', color: request.routeType === 'preferred' ? 'var(--color-primary)' : 'var(--color-accent)', borderColor: request.routeType === 'preferred' ? 'var(--color-primary-border)' : 'var(--color-accent-border)' }}>
                  {request.routeTitle}
                </span>
              </div>
              <div className="tu-muted">{request.vehicle} · ★ {request.rating} · {request.completedMissions} missions · Trust {request.trustScore}/100</div>
            </div>
            <div style={{ textAlign: 'right', minWidth: 110 }}>
              <div className="tu-muted" style={{ fontSize: 'var(--text-xs)' }}>Current proposal</div>
              <div style={{ fontWeight: 800, fontSize: 'var(--text-xl)', color: request.routeType === 'preferred' ? 'var(--color-primary)' : 'var(--color-accent)', fontVariantNumeric: 'tabular-nums' }}>
                €{request.proposedPrice}
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
            <div style={{ background: 'var(--color-bg)', border: '1px solid var(--color-line)', borderRadius: 'var(--radius-md)', padding: '10px 12px' }}>
              <div className="tu-muted" style={{ fontSize: 'var(--text-xs)', marginBottom: 2 }}>Pickup</div>
              <div style={{ fontWeight: 700, fontSize: 'var(--text-sm)' }}>{request.pickupEta}</div>
            </div>
            <div style={{ background: 'var(--color-bg)', border: '1px solid var(--color-line)', borderRadius: 'var(--radius-md)', padding: '10px 12px' }}>
              <div className="tu-muted" style={{ fontSize: 'var(--text-xs)', marginBottom: 2 }}>Intent</div>
              <div style={{ fontWeight: 700, fontSize: 'var(--text-sm)' }}>{request.intentType === 'accept_price' ? 'Accepts your price' : request.intentType === 'counter_offer' ? `Counter at €${request.proposedPrice}` : 'Question before commit'}</div>
            </div>
            <div style={{ background: 'var(--color-bg)', border: '1px solid var(--color-line)', borderRadius: 'var(--radius-md)', padding: '10px 12px' }}>
              <div className="tu-muted" style={{ fontSize: 'var(--text-xs)', marginBottom: 2 }}>Route fit</div>
              <div style={{ fontWeight: 700, fontSize: 'var(--text-sm)' }}>{request.routeType === 'preferred' ? 'Direct route end' : 'Transit-compatible stop'}</div>
            </div>
          </div>

          <div style={{ display: 'grid', gap: 'var(--space-2)', marginBottom: 'var(--space-3)', fontSize: 'var(--text-sm)' }}>
            <div><strong>Route detail:</strong> {request.routeDetail}</div>
            <div><strong>Note:</strong> {request.note}{request.question ? ` ${request.question}` : ''}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
              {request.badges.map((badge) => (
                <span key={badge} style={{ background: 'var(--color-bg)', border: '1px solid var(--color-line)', borderRadius: 'var(--radius-pill)', padding: '4px 10px', fontSize: 'var(--text-xs)', fontWeight: 600 }}>{badge}</span>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: acceptLabel ? 'repeat(4, minmax(0, 1fr))' : 'repeat(3, minmax(0, 1fr))', gap: 'var(--space-2)' }}>
            <button className="tu-btn tu-btn--primary" onClick={() => openNegotiationWithCarrier(request, 'open')}>
              {primaryLabel}
            </button>
            {acceptLabel && (
              <button className="tu-btn tu-btn--secondary" onClick={() => openNegotiationWithCarrier(request, 'accept')}>
                {acceptLabel}
              </button>
            )}
            <button className="tu-btn tu-btn--ghost" onClick={() => toggleSavedCarrierRequest(request.id)}>
              {request.saved ? 'Saved' : 'Save'}
            </button>
            <button className="tu-btn tu-btn--secondary" style={{ color: 'var(--color-danger)', borderColor: 'var(--color-danger-border)' }} onClick={() => declineCarrierRequest(request.id)}>
              Decline
            </button>
          </div>
        </div>
      );
    };

    return (
      <div className="tu-root">
        <style>{TOKENS_CSS}</style>
        <div className="tu-page">
          <div className="tu-container">
            <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
              <button className="tu-btn tu-btn--ghost" onClick={() => setStep('shipper-form')}>
                <Icon name="arrowLeft" size="16px" /> Edit mission
              </button>
              <button className="tu-btn tu-btn--secondary" style={{ marginLeft: 'auto', color: 'var(--color-danger)', borderColor: 'var(--color-danger-border)' }} onClick={handleCancellation}>
                Withdraw mission
              </button>
            </div>

            <div style={{ marginBottom: 'var(--space-5)' }}>
              <span className="tu-patch"><span className="tu-patch__dot" />Requests inbox</span>
            </div>
            <h2 className="tu-h2">Compatible carriers are responding</h2>
            <p className="tu-lede" style={{ maxWidth: '56ch', marginBottom: 'var(--space-4)' }}>
              Review one structured match at a time. Final-destination carriers come first, and you decide who gets into negotiation.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
              <div style={{ background: 'var(--color-bg-warm)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)', border: '1px solid var(--color-accent-border)', minHeight: 204 }}>
                <div style={{ marginBottom: 'var(--space-2)' }}>
                  <span className="tu-patch"><span className="tu-patch__dot" />Mission summary</span>
                </div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-lg)', fontWeight: 800, lineHeight: 'var(--lh-snug)', marginBottom: 'var(--space-3)' }}>
                  {PRICING_TABLE[shipment.size]?.shortLabel || 'Shipment'}
                </div>
                <div style={{ display: 'grid', gap: 'var(--space-3)', fontSize: 'var(--text-sm)', color: 'var(--color-ink-2)' }}>
                  <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--color-accent)', marginTop: 2 }}><Icon name="mapPin" size="14px" /></span>
                    <div>
                      <div className="tu-muted" style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>Pickup</div>
                      <div style={{ fontWeight: 700, color: 'var(--color-ink)' }}>{shipment.pickupAddress || '—'}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--color-primary)', marginTop: 2 }}><Icon name="mapPin" size="14px" /></span>
                    <div>
                      <div className="tu-muted" style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>Delivery</div>
                      <div style={{ fontWeight: 700, color: 'var(--color-ink)' }}>{shipment.deliveryAddress || '—'}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--space-3)' }}>
                    <span className="tu-muted">Timing intent</span>
                    <span style={{ fontWeight: 700 }}>{getPickupCommitmentLabel(shipment.pickupCommitment)} pickup · {getDeliveryCommitmentLabel(shipment.deliveryCommitment)} delivery</span>
                  </div>
                </div>
              </div>

              <div style={{ background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)', border: '1px solid var(--color-line)', minHeight: 204 }}>
                <div style={{ marginBottom: 'var(--space-2)' }}>
                  <span className="tu-patch" style={{ background: 'var(--color-primary-soft)', color: 'var(--color-primary)', borderColor: 'var(--color-primary-border)' }}><span className="tu-patch__dot" style={{ background: 'var(--color-primary)' }} />Matching overview</span>
                </div>
                <div style={{ display: 'grid', gap: 'var(--space-3)', fontSize: 'var(--text-sm)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 'var(--space-3)' }}>
                    <span className="tu-muted">Your offer</span>
                    <span style={{ fontWeight: 800, fontSize: 'var(--text-2xl)', fontVariantNumeric: 'tabular-nums' }}>€{shipment.suggestedPrice}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--space-3)' }}>
                    <span className="tu-muted">Total requests</span>
                    <span style={{ fontWeight: 700 }}>{carrierRequests.length}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--space-3)' }}>
                    <span className="tu-muted">Final-destination matches</span>
                    <span style={{ fontWeight: 700 }}>{preferredRequests.length}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--space-3)' }}>
                    <span className="tu-muted">Transit options</span>
                    <span style={{ fontWeight: 700 }}>{transitRequests.length}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--space-3)' }}>
                    <span className="tu-muted">Review mode</span>
                    <span style={{ fontWeight: 700 }}>{activeTab === 'preferred' ? 'Final-destination first' : 'Transit options'}</span>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)', border: '1px solid var(--color-line)', boxShadow: 'var(--shadow-1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 'var(--space-3)', marginBottom: 'var(--space-3)', flexWrap: 'wrap' }}>
                <div>
                  <h3 className="tu-h3" style={{ marginBottom: 'var(--space-1)' }}>Compatible carriers</h3>
                  <div className="tu-muted">
                    {activeTab === 'preferred'
                      ? 'Final-destination matches are shown one at a time for faster review.'
                      : 'Transit options stay available, but they may need more timing flexibility.'}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center', flexWrap: 'wrap' }}>
                  <button
                    className="tu-btn tu-btn--secondary"
                    style={{ padding: '8px 14px', background: activeTab === 'preferred' ? 'var(--color-primary-soft)' : undefined, borderColor: activeTab === 'preferred' ? 'var(--color-primary-border)' : undefined, color: activeTab === 'preferred' ? 'var(--color-primary)' : undefined }}
                    onClick={() => {
                      setRequestInboxTab('preferred');
                      setRequestInboxPage(0);
                    }}
                  >
                    Best matches ({preferredRequests.length})
                  </button>
                  <button
                    className="tu-btn tu-btn--secondary"
                    style={{ padding: '8px 14px', background: activeTab === 'transit' ? 'var(--color-accent-soft)' : undefined, borderColor: activeTab === 'transit' ? 'var(--color-accent-border)' : undefined, color: activeTab === 'transit' ? 'var(--color-accent)' : undefined }}
                    onClick={() => {
                      setRequestInboxTab('transit');
                      setRequestInboxPage(0);
                    }}
                    disabled={!transitRequests.length}
                  >
                    Transit ({transitRequests.length})
                  </button>
                </div>
              </div>

              {currentRequest ? (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-3)', flexWrap: 'wrap' }}>
                    <div className="tu-muted">Reviewing {requestCountLabel}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                      <button className="tu-btn tu-btn--ghost" style={{ padding: '6px 10px' }} onClick={() => setRequestInboxPage((prev) => Math.max(0, prev - 1))} disabled={safeRequestPage === 0}>
                        Prev
                      </button>
                      <div style={{ display: 'flex', gap: 6 }}>
                        {activeRequests.map((request, index) => (
                          <button
                            key={request.id}
                            type="button"
                            aria-label={`Open request ${index + 1}`}
                            onClick={() => setRequestInboxPage(index)}
                            style={{
                              width: 8,
                              height: 8,
                              borderRadius: '50%',
                              border: 'none',
                              background: index === safeRequestPage ? (activeTab === 'preferred' ? 'var(--color-primary)' : 'var(--color-accent)') : 'var(--color-line-2)',
                              cursor: 'pointer',
                              padding: 0,
                            }}
                          />
                        ))}
                      </div>
                      <button className="tu-btn tu-btn--ghost" style={{ padding: '6px 10px' }} onClick={() => setRequestInboxPage((prev) => Math.min(activeRequests.length - 1, prev + 1))} disabled={safeRequestPage === activeRequests.length - 1}>
                        Next
                      </button>
                    </div>
                  </div>

                  {renderRequestCard(currentRequest)}
                </>
              ) : (
                <div style={{ background: 'var(--color-bg)', borderRadius: 'var(--radius-md)', padding: 'var(--space-5)', textAlign: 'center', border: '1px dashed var(--color-line-2)' }}>
                  <h3 className="tu-h3">No carriers in this lane right now</h3>
                  <p className="tu-muted" style={{ marginBottom: 0 }}>
                    Try the other lane or edit your mission details to widen the match pool.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        {showCancellationModal && <CancellationModal />}
        <BlockingModal />
        <Toast message={toast} />
      </div>
    );
  }

  if (step === 'carrier-entry') {
    return (
      <div className="tu-root">
        <style>{TOKENS_CSS}</style>
        <div className="tu-page">
          <div className="tu-container">
            <button className="tu-btn tu-btn--ghost" onClick={() => setStep('welcome')} style={{ marginBottom: 'var(--space-4)' }}>
              <Icon name="arrowLeft" size="16px" /> Back
            </button>

            <div style={{ marginBottom: 'var(--space-5)' }}>
              <span className="tu-patch"><span className="tu-patch__dot" />Carrier entry</span>
            </div>
            <h2 className="tu-h2">Choose how you want to enter Mission control</h2>
            <p className="tu-lede">Explore available missions before registration, finish your Carrier setup, or jump straight in if your KYC is already verified.</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-3)', marginBottom: 'var(--space-5)' }}>
              <button className="tu-tap" onClick={openCarrierGuestPreview} style={{ padding: 'var(--space-5)', textAlign: 'left' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--color-accent)', marginBottom: 'var(--space-3)' }}>
                  <Icon name="compass" size="22px" strokeWidth={1.75} />
                  <span className="tu-patch">Guest preview</span>
                </div>
                <div style={{ fontWeight: 700, fontSize: 'var(--text-lg)', marginBottom: 'var(--space-2)' }}>Explore missions first</div>
                <div className="tu-muted">Set your route and availability, then preview what missions would fit before you create an account.</div>
              </button>

              <button className="tu-tap" onClick={signInCarrierWithGoogle} style={{ padding: 'var(--space-5)', textAlign: 'left' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--color-primary)', marginBottom: 'var(--space-3)' }}>
                  <Icon name="check" size="22px" strokeWidth={1.75} />
                  <span className="tu-patch" style={{ background: 'var(--color-primary-soft)', color: 'var(--color-primary)', borderColor: 'var(--color-primary-border)' }}>Google sign-in</span>
                </div>
                <div style={{ fontWeight: 700, fontSize: 'var(--text-lg)', marginBottom: 'var(--space-2)' }}>Create or continue your account</div>
                <div className="tu-muted">Connect a profile, complete Carrier setup, and start KYC readiness before you can act on missions.</div>
              </button>

              <button className="tu-tap" onClick={resumeVerifiedCarrier} style={{ padding: 'var(--space-5)', textAlign: 'left' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--color-success)', marginBottom: 'var(--space-3)' }}>
                  <Icon name="check" size="22px" strokeWidth={1.75} />
                  <span className="tu-patch" style={{ background: 'var(--color-success-soft)', color: 'var(--color-success)', borderColor: 'var(--color-success-border)' }}>Fast lane</span>
                </div>
                <div style={{ fontWeight: 700, fontSize: 'var(--text-lg)', marginBottom: 'var(--space-2)' }}>I already have verified KYC</div>
                <div className="tu-muted">Load Mission control directly and act on the current mission lane with your saved Carrier status.</div>
              </button>
            </div>

            <Notice severity="info" title="Marketplace rule">
              TakeUp previews compatible missions but does not assign them automatically. The Shipper stays in control of which Carrier request can move into negotiation.
            </Notice>
          </div>
        </div>
        <Toast message={toast} />
      </div>
    );
  }

  // Carrier form
  if (step === 'carrier-form') {
    const allReady = acceptedGTC && carrierProfile.agreeToNoSubcontracting && carrierProfile.dateOfBirth;
    return (
      <div className="tu-root">
        <style>{TOKENS_CSS}</style>
        <div className="tu-page">
          <div className="tu-container">
            <button className="tu-btn tu-btn--ghost" onClick={() => setStep('carrier-entry')} style={{ marginBottom: 'var(--space-4)' }}>
              <Icon name="arrowLeft" size="16px" /> Back
            </button>

            <div style={{ marginBottom: 'var(--space-5)' }}>
              <span className="tu-patch"><span className="tu-patch__dot" />Carrier setup</span>
            </div>
            <h2 className="tu-h2">Set up your Carrier profile</h2>
            <p className="tu-lede">This stage is for account readiness only: transport mode, identity basics, and Contractor commitments before KYC.</p>

            <div style={{ background: 'var(--color-bg-warm)', border: '1px solid var(--color-accent-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-5)', marginBottom: 'var(--space-5)' }}>
              <div className="tu-muted" style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600, marginBottom: 4 }}>Signed in account</div>
              <div style={{ fontWeight: 700, fontSize: 'var(--text-xl)', marginBottom: 'var(--space-1)' }}>{carrierProfile.fullName || 'Carrier account'}</div>
              <div className="tu-muted" style={{ marginBottom: 'var(--space-3)' }}>{carrierProfile.email || 'google-account@takeup.app'} · via {carrierProfile.signedInProvider || 'Google'}</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 'var(--space-3)' }}>
                <div>
                  <label htmlFor="carrier-name" className="tu-label">Full name</label>
                  <input
                    id="carrier-name"
                    className="tu-input"
                    value={carrierProfile.fullName}
                    onChange={(e) => setCarrierProfile({ ...carrierProfile, fullName: e.target.value })}
                    placeholder="Alex Martin"
                  />
                </div>
                <div>
                  <label htmlFor="carrier-email" className="tu-label">Email</label>
                  <input
                    id="carrier-email"
                    className="tu-input"
                    value={carrierProfile.email}
                    onChange={(e) => setCarrierProfile({ ...carrierProfile, email: e.target.value })}
                    placeholder="alex.carrier@takeup.app"
                  />
                </div>
              </div>
            </div>

            <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-line)', borderRadius: 'var(--radius-md)', padding: 'var(--space-5)', marginBottom: 'var(--space-5)' }}>
              <h3 className="tu-h3">Age verification</h3>
              <label htmlFor="dob" className="tu-label">Date of birth *</label>
              <input
                id="dob"
                type="date"
                className={`tu-input${showAgeVerificationError && !carrierProfile.dateOfBirth ? ' tu-input--error' : ''}`}
                value={carrierProfile.dateOfBirth}
                onChange={(e) => setCarrierProfile({ ...carrierProfile, dateOfBirth: e.target.value })}
                max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]}
              />
              <p className="tu-muted" style={{ marginTop: 'var(--space-2)' }}>
                You must be 18 or older to register as a Contractor (Carrier).
              </p>
              {showAgeVerificationError && !carrierProfile.dateOfBirth && (
                <p style={{ color: 'var(--color-danger)', fontSize: 'var(--text-sm)', marginTop: 'var(--space-2)', fontWeight: 600 }}>
                  Please provide your date of birth to continue.
                </p>
              )}
            </div>

            <div style={{ display: 'grid', gap: 'var(--space-2)', marginBottom: 'var(--space-5)' }}>
              {deliveryMethods.map((method) => (
                <button
                  key={method.id}
                  className="tu-tap"
                  aria-pressed={carrierProfile.deliveryMethod === method.id}
                  disabled={method.disabled}
                  onClick={() => handleMethodSelect(method.id)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <div>
                      <div style={{ fontWeight: 700 }}>{method.title}</div>
                      <div className="tu-muted" style={{ marginTop: 2 }}>{method.subtitle}</div>
                    </div>
                    {method.disabled && (
                      <span style={{ background: 'var(--color-line)', color: 'var(--color-ink-3)', padding: '4px 10px', borderRadius: 'var(--radius-pill)', fontSize: 'var(--text-xs)', fontWeight: 600 }}>
                        Coming soon
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {carrierProfile.deliveryMethod && (
              <>
                <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-line)', borderRadius: 'var(--radius-md)', padding: 'var(--space-4)', marginBottom: 'var(--space-5)' }}>
                  <label className="tu-check-row" htmlFor="nosub">
                    <input
                      id="nosub"
                      type="checkbox"
                      checked={carrierProfile.agreeToNoSubcontracting}
                      onChange={(e) => setCarrierProfile({ ...carrierProfile, agreeToNoSubcontracting: e.target.checked })}
                    />
                    <span>
                      <strong>I agree to personally perform all missions.</strong> As a Contractor (Carrier), I will not sub-contract or delegate accepted missions to third parties.
                    </span>
                  </label>

                  <label className="tu-check-row" htmlFor="gtc">
                    <input
                      id="gtc"
                      type="checkbox"
                      checked={acceptedGTC}
                      onChange={(e) => setAcceptedGTC(e.target.checked)}
                    />
                    <span>
                      I have read and accept the{' '}
                      <button
                        type="button"
                        className="tu-btn tu-btn--ghost"
                        style={{ padding: 0, display: 'inline', fontSize: 'inherit' }}
                        onClick={(e) => { e.preventDefault(); setShowGTC(true); }}
                      >
                        Terms & Conditions
                      </button>
                      , including prohibited items, transport restrictions, age requirements, and Contractor (Carrier) responsibilities.
                    </span>
                  </label>
                </div>

                <button
                  className="tu-btn tu-btn--primary tu-btn--lg tu-btn--block"
                  disabled={!allReady}
                  onClick={proceedToAvailability}
                >
                  <Icon name="compass" size="18px" /> Ready for missions
                </button>
              </>
            )}
          </div>
        </div>
        {showGTC && <GTCModal />}
        {showTransportWarning && <TransportWarningModal method={showTransportWarning} />}
        {showInsuranceReminder && <InsuranceReminderModal />}
        <BlockingModal />
        <Toast message={toast} />
      </div>
    );
  }

  if (step === 'carrier-verification') {
    return (
      <div className="tu-root">
        <style>{TOKENS_CSS}</style>
        <div className="tu-page">
          <div className="tu-container">
            <button className="tu-btn tu-btn--ghost" onClick={() => setStep('carrier-form')} style={{ marginBottom: 'var(--space-4)' }}>
              <Icon name="arrowLeft" size="16px" /> Back
            </button>

            <div style={{ marginBottom: 'var(--space-5)' }}>
              <span className="tu-patch"><span className="tu-patch__dot" />Verification hub</span>
            </div>
            <h2 className="tu-h2">Unlock mission actions with identity verification</h2>
            <p className="tu-lede">Google sign-in gives you account access. KYC verification is the separate trust layer that allows a Carrier to respond to live missions.</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-5)' }}>
              <div style={{ background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-line)', boxShadow: 'var(--shadow-1)', padding: 'var(--space-5)' }}>
                <div className="tu-muted" style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600, marginBottom: 4 }}>Account readiness</div>
                <div style={{ fontWeight: 700, fontSize: 'var(--text-xl)', marginBottom: 'var(--space-1)' }}>{carrierProfile.fullName || 'Carrier profile'}</div>
                <div className="tu-muted" style={{ marginBottom: 'var(--space-3)' }}>{carrierProfile.email || 'Account email pending'} · via {carrierProfile.signedInProvider || 'Google'}</div>
                <div style={{ display: 'grid', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--color-ink-2)' }}>
                  <div><strong>Transport mode:</strong> {deliveryMethods.find((method) => method.id === carrierProfile.deliveryMethod)?.title || 'Not selected'}</div>
                  <div><strong>Contractor declaration:</strong> {carrierProfile.agreeToNoSubcontracting ? 'Accepted' : 'Still required'}</div>
                  <div><strong>Terms accepted:</strong> {acceptedGTC ? 'Yes' : 'No'}</div>
                </div>
              </div>

              <div style={{ background: verificationMeta.tone, borderRadius: 'var(--radius-lg)', border: `1px solid ${verificationMeta.border}`, boxShadow: 'var(--shadow-1)', padding: 'var(--space-5)' }}>
                <div className="tu-muted" style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600, marginBottom: 4 }}>Verification status</div>
                <div style={{ fontWeight: 800, fontSize: 'var(--text-2xl)', color: verificationMeta.color, marginBottom: 'var(--space-2)' }}>{verificationMeta.label}</div>
                <div style={{ color: 'var(--color-ink-2)', marginBottom: 'var(--space-3)' }}>{verificationMeta.description}</div>
                <Notice severity="info" title="Partner-ready placeholder">
                  The production version can create a partner verification session, store a provider reference, and sync status updates back into this screen.
                </Notice>
              </div>
            </div>

            <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-line)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-5)', marginBottom: 'var(--space-5)' }}>
              <div className="tu-muted" style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600, marginBottom: 4 }}>Prototype verification steps</div>
              <div style={{ display: 'grid', gap: 'var(--space-2)', color: 'var(--color-ink-2)', fontSize: 'var(--text-sm)' }}>
                <div>1. Account connected with Google for sign-in.</div>
                <div>2. Carrier profile completed with age, transport mode, and Contractor commitments.</div>
                <div>3. KYC partner session created and tracked by status.</div>
                <div>4. Only verified Carriers can send structured requests on live missions.</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-3)' }}>
              {carrierProfile.verificationStatus === 'not_started' && (
                <button className="tu-btn tu-btn--primary" onClick={startCarrierVerification}>Start KYC placeholder</button>
              )}
              {carrierProfile.verificationStatus === 'pending' && (
                <>
                  <button className="tu-btn tu-btn--secondary" onClick={requestCarrierMoreInfo}>Simulate more info request</button>
                  <button className="tu-btn tu-btn--primary" onClick={completeCarrierVerification}>Mark as verified</button>
                </>
              )}
              {carrierProfile.verificationStatus === 'more_info_required' && (
                <>
                  <button className="tu-btn tu-btn--secondary" onClick={startCarrierVerification}>Resubmit details</button>
                  <button className="tu-btn tu-btn--primary" onClick={completeCarrierVerification}>Approve after resubmission</button>
                </>
              )}
              {carrierProfile.verificationStatus === 'verified' && (
                <button className="tu-btn tu-btn--primary" onClick={() => setStep('carrier-availability')}>Go to Mission control</button>
              )}
              <button className="tu-btn tu-btn--ghost" onClick={() => setStep('carrier-preview')}>Preview mission lane</button>
            </div>
          </div>
        </div>
        <Toast message={toast} />
      </div>
    );
  }

  // Chat room
  if (step === 'chat-room') {
    const currentPrice = agreedPrice || selectedCarrierRequest?.proposedPrice || shipment.suggestedPrice;
    const minutes = Math.floor(negotiationTimeRemaining / 60);
    const seconds = negotiationTimeRemaining % 60;

    return (
      <div className="tu-root">
        <style>{TOKENS_CSS}</style>
        <div className="tu-page">
          <div className="tu-container--wide">
            <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
              <button className="tu-btn tu-btn--ghost" onClick={() => setStep('shipper-requests')}>
                <Icon name="arrowLeft" size="16px" /> Back to requests
              </button>
              <button
                className="tu-btn tu-btn--secondary"
                style={{ marginLeft: 'auto', color: 'var(--color-danger)', borderColor: 'var(--color-danger-border)' }}
                onClick={handleCancellation}
              >
                Cancel mission
              </button>
            </div>

            {negotiationTimeRemaining < 300 && !negotiationDeclined && (
              <div style={{ marginBottom: 'var(--space-4)' }}>
                <Notice severity="caution" title={`Time remaining: ${minutes}:${seconds.toString().padStart(2, '0')}`}>
                  Negotiations close automatically after 30 minutes. Either party may close earlier.
                </Notice>
              </div>
            )}

            {selectedCarrierRequest?.routeType === 'transit' && (
              <div style={{ marginBottom: 'var(--space-4)' }}>
                <Notice severity="caution" title="Transit route option">
                  This carrier reaches the delivery point as a transit stop, not as the final destination. Keep timing flexibility in mind during negotiation.
                </Notice>
              </div>
            )}

            {chatWarning && (
              <div style={{ marginBottom: 'var(--space-4)' }}>
                <Notice severity={chatWarning.severity} title={chatWarning.title}>
                  {chatWarning.message} Repeated violations may result in account suspension.
                </Notice>
              </div>
            )}

            {negotiationDeclined ? (
              <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-line)', borderRadius: 'var(--radius-md)', padding: 'var(--space-6)', textAlign: 'center' }}>
                <h3 className="tu-h3">Negotiation closed</h3>
                <p className="tu-muted" style={{ marginBottom: 'var(--space-5)' }}>
                  This mission will return to the available listings for other carriers.
                </p>
                <button
                  className="tu-btn tu-btn--primary"
                  onClick={() => {
                    resetMissionFlow();
                    setStep('welcome');
                  }}
                >
                  Return to home
                </button>
              </div>
            ) : (
              <div className="tu-chat-layout">
                <div className="tu-chat-main" style={{ background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-2)', overflow: 'hidden', border: '1px solid var(--color-line)' }}>
                  <div style={{ padding: 'var(--space-4) var(--space-5)', borderBottom: '1px solid var(--color-line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 'var(--text-lg)' }}>Negotiation with {carrierName}</div>
                      <div className="tu-muted">{selectedCarrierRequest?.vehicle || 'Car'} · ★ {selectedCarrierRequest?.rating || 4.8} · {selectedCarrierRequest?.completedMissions || 142} missions · {selectedCarrierRequest?.routeTitle || 'Route match'}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--color-ink-3)', fontSize: 'var(--text-sm)', fontVariantNumeric: 'tabular-nums' }}>
                      <Icon name="clock" size="16px" />
                      {minutes}:{seconds.toString().padStart(2, '0')}
                    </div>
                  </div>

                  <div style={{ flex: 1, overflowY: 'auto', padding: 'var(--space-5)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', minHeight: 0 }}>
                    {messages.map((msg, idx) => {
                      const isShipper = msg.sender === 'shipper';
                      const isSystem = msg.sender === 'system';
                      return (
                        <div key={idx} style={{ display: 'flex', justifyContent: isShipper ? 'flex-end' : isSystem ? 'center' : 'flex-start' }}>
                          <div style={{
                            maxWidth: isSystem ? '100%' : '75%',
                            borderRadius: 'var(--radius-md)',
                            padding: '10px 14px',
                            background: isShipper ? 'var(--color-primary)' : isSystem ? 'var(--color-warning-soft)' : 'var(--color-bg)',
                            color: isShipper ? 'white' : isSystem ? '#78350f' : 'var(--color-ink)',
                            border: isSystem ? '1px solid var(--color-warning-border)' : 'none',
                            textAlign: isSystem ? 'center' : 'left',
                          }}>
                            <div style={{ fontWeight: isSystem ? 600 : 400 }}>{msg.text}</div>
                            <div style={{ fontSize: 'var(--text-xs)', opacity: 0.75, marginTop: 4 }}>{msg.time}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div style={{ padding: 'var(--space-4)', borderTop: '1px solid var(--color-line)' }}>
                    <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
                      <input
                        className="tu-input"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                        placeholder="Type a question, reply, or counter-offer…"
                      />
                      <button className="tu-btn tu-btn--primary" onClick={sendMessage}>Send</button>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-3)' }}>
                      <span className="tu-muted">Try: "Can you do €20?", "Is pickup flexible?", "Deal at €24."</span>
                      <button
                        className="tu-btn tu-btn--ghost"
                        style={{ color: 'var(--color-ink-3)' }}
                        onClick={() => declineNegotiation('Shipper closed negotiation')}
                      >
                        Close negotiation
                      </button>
                    </div>
                  </div>
                </div>

                <aside className="tu-chat-sidebar">
                  {/* Mission summary — this is what was missing, and what fixes the symmetry */}
                  <div style={{ background: 'var(--color-bg-warm)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-5)', border: '1px solid var(--color-accent-border)' }}>
                    <div style={{ marginBottom: 'var(--space-3)' }}>
                      <span className="tu-patch"><span className="tu-patch__dot" />Approved request</span>
                    </div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xl)', fontWeight: 700, lineHeight: 'var(--lh-snug)', marginBottom: 'var(--space-3)', color: 'var(--color-ink)' }}>
                      {selectedCarrierRequest?.name || carrierName}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--color-ink-2)' }}>
                      <div><strong>Request type:</strong> {selectedCarrierRequest?.intentType === 'accept_price' ? 'Accepted your price' : selectedCarrierRequest?.intentType === 'counter_offer' ? `Counter-offer at €${selectedCarrierRequest?.proposedPrice}` : 'Clarifying question before commitment'}</div>
                      <div><strong>Route:</strong> {selectedCarrierRequest?.routeDetail || 'Compatible route match'}</div>
                      <div><strong>Pickup goal:</strong> {getPickupCommitmentLabel(shipment.pickupCommitment)}</div>
                      <div><strong>Delivery goal:</strong> {getDeliveryCommitmentLabel(shipment.deliveryCommitment)}</div>
                      <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'flex-start' }}>
                        <span style={{ color: 'var(--color-accent)', marginTop: 2 }}><Icon name="mapPin" size="14px" /></span>
                        <div>
                          <div className="tu-muted" style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>From</div>
                          <div>{shipment.pickupAddress || '—'}</div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'flex-start' }}>
                        <span style={{ color: 'var(--color-primary)', marginTop: 2 }}><Icon name="mapPin" size="14px" /></span>
                        <div>
                          <div className="tu-muted" style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>To</div>
                          <div>{shipment.deliveryAddress || '—'}</div>
                        </div>
                      </div>
                      {shipment.description && (
                        <div style={{ marginTop: 'var(--space-2)', paddingTop: 'var(--space-3)', borderTop: '1px dashed var(--color-line-2)' }}>
                          <div className="tu-muted" style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600, marginBottom: 2 }}>Contents</div>
                          <div style={{ fontStyle: 'italic' }}>{shipment.description}</div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Finalize price */}
                  <div style={{ background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-2)', padding: 'var(--space-5)', border: '1px solid var(--color-line)', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3 className="tu-h3">Negotiation summary</h3>

                    <div style={{ marginBottom: 'var(--space-4)' }}>
                      <span className="tu-label">Your initial offer</span>
                        <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xl)', fontWeight: 700, color: 'var(--color-ink-3)' }}>€{shipment.suggestedPrice}</div>
                    </div>

                    {selectedCarrierRequest?.proposedPrice && selectedCarrierRequest.proposedPrice !== shipment.suggestedPrice && (
                      <div style={{ marginBottom: 'var(--space-4)' }}>
                        <span className="tu-label">Carrier proposal</span>
                        <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xl)', fontWeight: 700, color: 'var(--color-accent)' }}>€{selectedCarrierRequest.proposedPrice}</div>
                      </div>
                    )}

                    <div style={{ marginBottom: 'var(--space-4)' }}>
                      <label htmlFor="agreed" className="tu-label">Current agreed price</label>
                      <input
                        id="agreed"
                        type="number"
                        className="tu-input"
                        value={currentPrice}
                        onChange={(e) => setAgreedPrice(parseInt(e.target.value, 10) || 0)}
                        style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-2xl)', fontWeight: 700, color: 'var(--color-primary)' }}
                      />
                    </div>

                    <div style={{ background: 'var(--color-bg)', borderRadius: 'var(--radius-md)', padding: 'var(--space-4)', marginBottom: 'var(--space-4)', fontSize: 'var(--text-sm)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                        <span className="tu-muted">Carrier earnings</span>
                        <span style={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>€{(currentPrice * (1 - PLATFORM_FEE)).toFixed(2)}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                        <span className="tu-muted">Service fee (15%)</span>
                        <span style={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>€{(currentPrice * PLATFORM_FEE).toFixed(2)}</span>
                      </div>
                      <div style={{ borderTop: '1px solid var(--color-line)', paddingTop: 'var(--space-2)', display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontWeight: 700 }}>You pay</span>
                        <span style={{ fontWeight: 700, fontSize: 'var(--text-lg)', fontVariantNumeric: 'tabular-nums' }}>€{currentPrice}</span>
                      </div>
                    </div>

                    <div style={{ marginTop: 'auto' }}>
                      <button className="tu-btn tu-btn--primary tu-btn--block" onClick={startHandoffConfirmation} style={{ marginBottom: 'var(--space-2)' }}>
                        <Icon name="check" size="18px" /> Continue to handoff
                      </button>
                      <button
                        className="tu-btn tu-btn--secondary tu-btn--block"
                        style={{ color: 'var(--color-ink-3)' }}
                        onClick={() => declineNegotiation('Shipper declined this request')}
                      >
                        Decline this request
                      </button>
                    </div>
                  </div>
                </aside>
              </div>
            )}
          </div>
        </div>
        {showCancellationModal && <CancellationModal />}
        <BlockingModal />
        <Toast message={toast} />
      </div>
    );
  }

  if (step === 'confirm-handoff') {
    const finalPrice = agreedPrice || shipment.suggestedPrice;
    const handoffOrderInvalid = handoffPlan.deliveryDate && handoffPlan.pickupDate && handoffPlan.deliveryDate < handoffPlan.pickupDate;
    const canLockHandoff = handoffPlan.pickupDate && handoffPlan.pickupWindow && handoffPlan.deliveryDate && handoffPlan.deliveryWindow && !handoffOrderInvalid;

    return (
      <div className="tu-root">
        <style>{TOKENS_CSS}</style>
        <div className="tu-page">
          <div className="tu-container">
            <button className="tu-btn tu-btn--ghost" onClick={() => setStep('chat-room')} style={{ marginBottom: 'var(--space-4)' }}>
              <Icon name="arrowLeft" size="16px" /> Back to negotiation
            </button>

            <div style={{ marginBottom: 'var(--space-5)' }}>
              <span className="tu-patch"><span className="tu-patch__dot" />Confirm handoff</span>
            </div>
            <h2 className="tu-h2">Lock pickup and delivery windows</h2>
            <p className="tu-lede" style={{ maxWidth: 760 }}>
              You already agreed the carrier and price. Now confirm the exact pickup and delivery windows so both sides work from the same in-app schedule.
            </p>

            {handoffOrderInvalid && (
              <div style={{ marginBottom: 'var(--space-4)' }}>
                <Notice severity="caution" title="Delivery cannot be earlier than pickup">
                  Adjust the delivery date so the carrier has a valid route timeline before tracking starts.
                </Notice>
              </div>
            )}

            <div className="tu-chat-layout">
              <div className="tu-chat-main" style={{ background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-2)', border: '1px solid var(--color-line)', padding: 'var(--space-5)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-5)' }}>
                  <div style={{ background: 'var(--color-bg)', borderRadius: 'var(--radius-md)', padding: 'var(--space-4)', border: '1px solid var(--color-line)' }}>
                    <div style={{ marginBottom: 'var(--space-3)' }}>
                      <span className="tu-patch"><span className="tu-patch__dot" />Pickup</span>
                    </div>
                    <div className="tu-muted" style={{ marginBottom: 'var(--space-3)' }}>Goal: {getPickupCommitmentLabel(shipment.pickupCommitment)}</div>
                    <label htmlFor="handoffPickupDate" className="tu-label">Pickup date</label>
                    <input
                      id="handoffPickupDate"
                      type="date"
                      className="tu-input"
                      value={handoffPlan.pickupDate}
                      onChange={(e) => setHandoffPlan((prev) => ({ ...prev, pickupDate: e.target.value }))}
                      style={{ marginBottom: 'var(--space-3)' }}
                    />
                    <label htmlFor="handoffPickupWindow" className="tu-label">Pickup window</label>
                    <select
                      id="handoffPickupWindow"
                      className="tu-input"
                      value={handoffPlan.pickupWindow}
                      onChange={(e) => setHandoffPlan((prev) => ({ ...prev, pickupWindow: e.target.value }))}
                    >
                      {HANDOFF_WINDOW_OPTIONS.map((option) => (
                        <option key={option.id} value={option.id}>{option.label}</option>
                      ))}
                    </select>
                  </div>

                  <div style={{ background: 'var(--color-bg)', borderRadius: 'var(--radius-md)', padding: 'var(--space-4)', border: '1px solid var(--color-line)' }}>
                    <div style={{ marginBottom: 'var(--space-3)' }}>
                      <span className="tu-patch"><span className="tu-patch__dot" />Delivery</span>
                    </div>
                    <div className="tu-muted" style={{ marginBottom: 'var(--space-3)' }}>Goal: {getDeliveryCommitmentLabel(shipment.deliveryCommitment)}</div>
                    <label htmlFor="handoffDeliveryDate" className="tu-label">Delivery date</label>
                    <input
                      id="handoffDeliveryDate"
                      type="date"
                      className="tu-input"
                      value={handoffPlan.deliveryDate}
                      onChange={(e) => setHandoffPlan((prev) => ({ ...prev, deliveryDate: e.target.value }))}
                      style={{ marginBottom: 'var(--space-3)' }}
                    />
                    <label htmlFor="handoffDeliveryWindow" className="tu-label">Delivery window</label>
                    <select
                      id="handoffDeliveryWindow"
                      className="tu-input"
                      value={handoffPlan.deliveryWindow}
                      onChange={(e) => setHandoffPlan((prev) => ({ ...prev, deliveryWindow: e.target.value }))}
                    >
                      {HANDOFF_WINDOW_OPTIONS.map((option) => (
                        <option key={option.id} value={option.id}>{option.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div style={{ background: 'var(--color-bg-warm)', borderRadius: 'var(--radius-md)', padding: 'var(--space-4)', border: '1px solid var(--color-accent-border)', marginBottom: 'var(--space-4)' }}>
                  <div style={{ fontWeight: 700, marginBottom: 'var(--space-2)' }}>What happens next</div>
                  <div style={{ display: 'grid', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--color-ink-2)' }}>
                    <div>The carrier receives these exact windows inside TakeUp.</div>
                    <div>Tracking starts only after the handoff schedule is locked.</div>
                    <div>Any later change should happen in-platform so the audit trail stays intact.</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
                  <button className="tu-btn tu-btn--ghost" onClick={() => setStep('chat-room')}>
                    Back to negotiation
                  </button>
                  <button className="tu-btn tu-btn--primary" disabled={!canLockHandoff} onClick={finalizeBooking}>
                    <Icon name="check" size="18px" /> Lock booking and start tracking
                  </button>
                </div>
              </div>

              <aside className="tu-chat-sidebar">
                <div style={{ background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-2)', padding: 'var(--space-5)', border: '1px solid var(--color-line)' }}>
                  <div style={{ marginBottom: 'var(--space-3)' }}>
                    <span className="tu-patch"><span className="tu-patch__dot" />Booking summary</span>
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xl)', fontWeight: 700, marginBottom: 'var(--space-3)' }}>
                    {selectedCarrierRequest?.name || carrierName}
                  </div>
                  <div style={{ display: 'grid', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--color-ink-2)' }}>
                    <div><strong>Price:</strong> €{finalPrice}</div>
                    <div><strong>Pickup goal:</strong> {getPickupCommitmentLabel(shipment.pickupCommitment)}</div>
                    <div><strong>Delivery goal:</strong> {getDeliveryCommitmentLabel(shipment.deliveryCommitment)}</div>
                    <div><strong>Pickup window:</strong> {formatHandoffSlot(handoffPlan.pickupDate, handoffPlan.pickupWindow)}</div>
                    <div><strong>Delivery window:</strong> {formatHandoffSlot(handoffPlan.deliveryDate, handoffPlan.deliveryWindow)}</div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
        <Toast message={toast} />
      </div>
    );
  }

  // ====================================================================
  // TRACKING — Sprint 1: the post-booking lifecycle the GTC describes
  // GTC Sections 5, 6, 6.2, 7, 13
  // ====================================================================
  if (step === 'tracking') {
    const finalPrice = agreedPrice || shipment.suggestedPrice;
    const currentPhaseInfo = DELIVERY_PHASES[deliveryPhase];
    const isFailed = deliveryPhase === 'delivery_failed';
    const isCompleted = deliveryPhase === 'completed';
    const isPodPhase = deliveryPhase === 'pod_submitted';
    const nextPhase = STEPPER_PHASES.find((phase) => DELIVERY_PHASES[phase].order === currentPhaseInfo?.order + 1);
    const nextPhaseInfo = nextPhase ? DELIVERY_PHASES[nextPhase] : null;
    const shipmentLabel = PRICING_TABLE[shipment.size]?.shortLabel?.toLowerCase() || 'item';
    const statusCopy = {
      booked: `Booking is locked. ${carrierName} has the confirmed pickup and delivery windows.`,
      carrier_en_route: `${carrierName} is travelling to the pickup location now.`,
      picked_up: `Your ${shipmentLabel} has been collected and the route is confirmed.`,
      in_transit: `Your ${shipmentLabel} is moving toward ${getAddressLabel(shipment.deliveryAddress)}.`,
      delivered: 'Carrier reached the delivery point and is submitting proof of delivery.',
      pod_submitted: 'Proof of delivery was submitted and is under platform review.',
      completed: `${carrierName} delivered your ${shipmentLabel}. Payment has been released.`,
      delivery_failed: `Reason: ${deliveryFailure?.label || 'Unknown'}. ${escrowStatus === 'refunded' ? 'Refund has been processed.' : 'Under review.'}`,
    };

    return (
      <div className="tu-root">
        <style>{TOKENS_CSS}</style>
        <div className="tu-page">
          <div className="tu-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)', flexWrap: 'wrap' }}>
              <div>
                <span className="tu-patch">
                  <span className="tu-patch__dot" style={{
                    background: isFailed ? 'var(--color-danger)' : isCompleted ? 'var(--color-success)' : undefined,
                  }} />
                  {isFailed ? 'Issue reported' : isCompleted ? 'Mission complete' : 'Mission active'}
                </span>
              </div>
              {currentPhaseInfo?.canCancel && (
                <button
                  className="tu-btn tu-btn--secondary"
                  style={{ color: 'var(--color-danger)', borderColor: 'var(--color-danger-border)' }}
                  onClick={handleCancellation}
                >
                  Cancel mission
                </button>
              )}
            </div>

            <h2 className="tu-h2" style={{ marginBottom: 'var(--space-2)' }}>
              {isFailed ? 'Delivery issue reported' : isCompleted ? 'Your mission is complete.' : 'Mission in progress'}
            </h2>
            <p className="tu-lede" style={{ marginBottom: 'var(--space-4)', maxWidth: '56ch' }}>
              {statusCopy[deliveryPhase] || `${carrierName} is handling your ${shipmentLabel}.`}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
              <div style={{ background: 'var(--color-bg-warm)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)', border: '1px solid var(--color-accent-border)', minHeight: 204 }}>
                <div style={{ marginBottom: 'var(--space-2)' }}>
                  <span className="tu-patch"><span className="tu-patch__dot" />Mission summary</span>
                </div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-lg)', fontWeight: 800, lineHeight: 'var(--lh-snug)', marginBottom: 'var(--space-3)' }}>
                  {PRICING_TABLE[shipment.size]?.shortLabel || 'Shipment'}
                </div>
                <div style={{ display: 'grid', gap: 'var(--space-3)', fontSize: 'var(--text-sm)', color: 'var(--color-ink-2)' }}>
                  <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--color-accent)', marginTop: 2 }}><Icon name="mapPin" size="14px" /></span>
                    <div>
                      <div className="tu-muted" style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>Pickup</div>
                      <div style={{ fontWeight: 700, color: 'var(--color-ink)' }}>{shipment.pickupAddress}</div>
                      <div className="tu-muted">{formatHandoffSlot(handoffPlan.pickupDate, handoffPlan.pickupWindow)}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--color-primary)', marginTop: 2 }}><Icon name="mapPin" size="14px" /></span>
                    <div>
                      <div className="tu-muted" style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>Delivery</div>
                      <div style={{ fontWeight: 700, color: 'var(--color-ink)' }}>{shipment.deliveryAddress}</div>
                      <div className="tu-muted">{formatHandoffSlot(handoffPlan.deliveryDate, handoffPlan.deliveryWindow)}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)', border: '1px solid var(--color-line)', minHeight: 204 }}>
                <div style={{ marginBottom: 'var(--space-2)' }}>
                  <span className="tu-patch" style={{ background: 'var(--color-primary-soft)', color: 'var(--color-primary)', borderColor: 'var(--color-primary-border)' }}><span className="tu-patch__dot" style={{ background: 'var(--color-primary)' }} />Payment details</span>
                </div>
                <div style={{ display: 'grid', gap: 'var(--space-3)', fontSize: 'var(--text-sm)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 'var(--space-3)' }}>
                    <span className="tu-muted">Total paid</span>
                    <span style={{ fontWeight: 800, fontSize: 'var(--text-2xl)', fontVariantNumeric: 'tabular-nums' }}>€{finalPrice}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--space-3)' }}>
                    <span className="tu-muted">Carrier payout</span>
                    <span style={{ fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>€{(finalPrice * (1 - PLATFORM_FEE)).toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--space-3)' }}>
                    <span className="tu-muted">Platform fee</span>
                    <span style={{ fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>€{(finalPrice * PLATFORM_FEE).toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--space-3)' }}>
                    <span className="tu-muted">Escrow</span>
                    <span style={{ fontWeight: 700, color: escrowStatus === 'held' ? 'var(--color-warning)' : escrowStatus === 'released' ? 'var(--color-success)' : escrowStatus === 'refunded' ? 'var(--color-info)' : 'var(--color-ink-3)' }}>
                      {escrowStatus === 'held' ? 'Held by platform' : escrowStatus === 'released' ? 'Released to carrier' : escrowStatus === 'refunded' ? 'Refunded to sender' : 'Pending'}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--space-3)' }}>
                    <span className="tu-muted">Carrier</span>
                    <span style={{ fontWeight: 700 }}>{carrierName} · ★ 4.8</span>
                  </div>
                  {podData && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--space-3)' }}>
                      <span className="tu-muted">POD time</span>
                      <span style={{ fontWeight: 700 }}>{new Date(podData.timestamp).toLocaleTimeString()}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div style={{ background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)', border: '1px solid var(--color-line)', boxShadow: 'var(--shadow-1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 'var(--space-3)', marginBottom: 'var(--space-3)', flexWrap: 'wrap' }}>
                <div>
                  <h3 className="tu-h3" style={{ marginBottom: 'var(--space-1)' }}>Delivery progress</h3>
                  <div className="tu-muted">
                    {isFailed ? 'Issue flow is active.' : isCompleted ? 'Delivery has been completed and settled.' : nextPhaseInfo ? `Next expected: ${nextPhaseInfo.label}.` : 'Final verification in progress.'}
                  </div>
                </div>
                {!isFailed && !isCompleted && !isPodPhase && deliveryPhase !== 'booked' && (
                  <button
                    className="tu-btn tu-btn--secondary"
                    style={{ color: 'var(--color-danger)', borderColor: 'var(--color-danger-border)' }}
                    onClick={() => setShowReportIssueModal(true)}
                  >
                    <Icon name="alert" size="16px" /> Report issue
                  </button>
                )}
              </div>

              <DeliveryStepper />

              <div style={{ display: 'grid', gap: 'var(--space-3)', fontSize: 'var(--text-sm)' }}>
                {!isFailed && !isCompleted && (
                  <div className={`tu-phase-card${isPodPhase ? ' tu-phase-card--accent' : ''}`}>
                    <h3 className="tu-h3" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                      <Icon name={deliveryPhase === 'booked' ? 'clock' : deliveryPhase === 'carrier_en_route' ? 'truck' : deliveryPhase === 'picked_up' || deliveryPhase === 'in_transit' ? 'compass' : 'check'} size="22px" strokeWidth={1.75} />
                      {currentPhaseInfo.label}
                    </h3>

                    {deliveryPhase === 'booked' && (
                      <p className="tu-muted">Waiting for {carrierName} to start heading to pickup. You can still cancel at this stage (€{DELIVERY_PHASES.booked.cancelFee} admin fee).</p>
                    )}
                    {deliveryPhase === 'carrier_en_route' && (
                      <p className="tu-muted">{carrierName} is on the way to the pickup address. This status is updated by the carrier flow, not by the shipper.</p>
                    )}
                    {deliveryPhase === 'picked_up' && (
                      <p className="tu-muted">The carrier confirmed pickup. Your shipment is now secured and preparing to move toward the delivery location.</p>
                    )}
                    {deliveryPhase === 'in_transit' && (
                      <p className="tu-muted">Your item is on its way to the delivery address. Keep this screen for status changes or use Report issue if something goes wrong.</p>
                    )}
                    {deliveryPhase === 'delivered' && (
                      <>
                        <p style={{ marginBottom: 'var(--space-2)' }}>
                          <strong>Carrier reached the delivery point.</strong> Proof of delivery is being collected with photo, GPS confirmation, timestamp, and recipient confirmation.
                        </p>
                        <p className="tu-muted">If this does not match reality, report an issue from this screen.</p>
                      </>
                    )}
                    {isPodPhase && (
                      <>
                        <p style={{ color: 'var(--color-accent)', fontWeight: 600, marginBottom: 'var(--space-2)' }}>
                          POD submitted — under review.
                        </p>
                        <p className="tu-muted">Escrow will be released once proof of delivery is verified. This usually takes a few seconds for automated review.</p>
                      </>
                    )}
                  </div>
                )}

                {isFailed && deliveryFailure && (
                  <div className="tu-phase-card tu-phase-card--danger">
                    <h3 className="tu-h3">{deliveryFailure.label}</h3>
                    {deliveryFailure.notes && (
                      <p style={{ color: 'var(--color-ink-2)', marginBottom: 'var(--space-3)' }}>{deliveryFailure.notes}</p>
                    )}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span className="tu-muted">Reported at</span>
                        <span style={{ fontWeight: 600 }}>{new Date(deliveryFailure.timestamp).toLocaleTimeString()}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span className="tu-muted">Carrier penalty</span>
                        <span style={{ fontWeight: 600, color: FAILURE_REASONS[deliveryFailure.reason]?.carrierPenalty ? 'var(--color-danger)' : 'var(--color-success)' }}>
                          {FAILURE_REASONS[deliveryFailure.reason]?.carrierPenalty ? 'Yes — account review' : 'None'}
                        </span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span className="tu-muted">Escrow status</span>
                        <span style={{ fontWeight: 600 }}>{escrowStatus === 'refunded' ? 'Refunded to sender' : 'Processing'}</span>
                      </div>
                    </div>
                  </div>
                )}

                {isCompleted && (
                  <div className="tu-phase-card tu-phase-card--success">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
                      <div style={{
                        width: 48, height: 48, borderRadius: '50%',
                        background: 'var(--color-success)', color: 'white',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <Icon name="check" size="28px" strokeWidth={2.5} />
                      </div>
                      <div>
                        <h3 className="tu-h3" style={{ margin: 0 }}>Delivered and verified</h3>
                        <p className="tu-muted" style={{ margin: 0 }}>Payment released to {carrierName}.</p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)' }}>
                      <span className="tu-muted">Carrier earned</span>
                      <span style={{ fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>€{(finalPrice * (1 - PLATFORM_FEE)).toFixed(2)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)', marginTop: 'var(--space-1)' }}>
                      <span className="tu-muted">Service fee</span>
                      <span style={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>€{(finalPrice * PLATFORM_FEE).toFixed(2)}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {(isCompleted || isFailed) && (
              <div style={{ marginTop: 'var(--space-3)', display: 'flex', justifyContent: 'flex-start' }}>
                <button
                  className="tu-btn tu-btn--primary"
                  onClick={() => {
                    resetMissionFlow();
                    setStep('welcome');
                  }}
                >
                  {isCompleted ? 'Create another mission' : 'Return to home'}
                </button>
              </div>
            )}
          </div>
        </div>
        {showReportIssueModal && <ReportIssueModal />}
        {showCancellationModal && <CancellationModal />}
        <BlockingModal />
        <Toast message={toast} />
      </div>
    );
  }

  // Carrier availability — "Mission control" — the missing screen from v1
  if (step === 'carrier-preview' || step === 'carrier-availability') {
    const method = deliveryMethods.find((m) => m.id === carrierProfile.deliveryMethod);
    const previewMode = step === 'carrier-preview';
    const readOnlyLane = !isCarrierVerified;
    const backStep = previewMode && !isCarrierGuest ? 'carrier-verification' : 'carrier-entry';
    const gateTitle = isCarrierGuest
      ? 'Create an account to respond'
      : isCarrierVerified
        ? 'Mission actions unlocked'
        : 'Complete KYC to respond';
    const gateMessage = isCarrierGuest
      ? 'Guest preview is read-only. Sign in with Google to create a Carrier account, then complete verification to act on missions.'
      : isCarrierVerified
        ? 'You are verified. Use the current route details below to respond to the missions that fit.'
        : 'Your account can preview mission flow, but only a verified Carrier can send a structured request to a Shipper.';

    return (
      <div className="tu-root">
        <style>{TOKENS_CSS}</style>
        <div className="tu-page tu-page--hero">
          <div className="tu-container">
            <button className="tu-btn tu-btn--ghost" onClick={() => setStep(backStep)} style={{ marginBottom: 'var(--space-4)' }}>
              <Icon name="arrowLeft" size="16px" /> Back
            </button>

            <div style={{ marginBottom: 'var(--space-5)' }}>
              <span className="tu-patch"><span className="tu-patch__dot" />{previewMode ? 'Mission preview' : 'Mission control'}</span>
            </div>
            <h2 className="tu-h2">{previewMode ? 'Preview missions on your route' : 'Act on missions that fit your route'}</h2>
            <p className="tu-lede">Route intent lives here for both guest discovery and verified Carrier operations. The difference is what actions the account is allowed to take.</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-5)' }}>
              <div style={{ background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-5)', border: '1px solid var(--color-line)', boxShadow: 'var(--shadow-1)' }}>
                <div style={{ color: 'var(--color-primary)', marginBottom: 'var(--space-3)' }}>
                  <Icon name="compass" size="24px" strokeWidth={1.75} />
                </div>
                <div className="tu-muted" style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600, marginBottom: 4 }}>Transport mode</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xl)', fontWeight: 700 }}>{method?.title || 'Select a mode in Carrier setup'}</div>
                <div className="tu-muted" style={{ marginTop: 4 }}>{method?.subtitle || 'Your verified fast lane will reuse this setting when you return.'}</div>
              </div>

              <div style={{ background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-5)', border: '1px solid var(--color-line)', boxShadow: 'var(--shadow-1)' }}>
                <div style={{ color: readOnlyLane ? 'var(--color-warning)' : 'var(--color-success)', marginBottom: 'var(--space-3)' }}>
                  <Icon name="clock" size="24px" strokeWidth={1.75} />
                </div>
                <div className="tu-muted" style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600, marginBottom: 4 }}>Account access</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xl)', fontWeight: 700 }}>{isCarrierGuest ? 'Guest preview' : verificationMeta.label}</div>
                <div className="tu-muted" style={{ marginTop: 4 }}>{verificationMeta.description}</div>
              </div>
            </div>

            <div style={{ background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-5)', border: '1px solid var(--color-line)', boxShadow: 'var(--shadow-1)', marginBottom: 'var(--space-5)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-4)' }}>
                <div>
                  <label htmlFor="carrier-origin" className="tu-label">Travel origin</label>
                  <input
                    id="carrier-origin"
                    className="tu-input"
                    value={carrierProfile.origin}
                    onChange={(e) => setCarrierProfile({ ...carrierProfile, origin: e.target.value })}
                    placeholder="Sofia center"
                  />
                </div>
                <div>
                  <label htmlFor="carrier-destination" className="tu-label">Travel destination</label>
                  <input
                    id="carrier-destination"
                    className="tu-input"
                    value={carrierProfile.destination}
                    onChange={(e) => setCarrierProfile({ ...carrierProfile, destination: e.target.value })}
                    placeholder="Plovdiv center"
                  />
                </div>
                <div>
                  <label htmlFor="carrier-departure" className="tu-label">Departure window</label>
                  <select
                    id="carrier-departure"
                    className="tu-input"
                    value={carrierProfile.departureWindow}
                    onChange={(e) => setCarrierProfile({ ...carrierProfile, departureWindow: e.target.value })}
                  >
                    {CARRIER_DEPARTURE_WINDOWS.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="carrier-arrival" className="tu-label">Arrival window</label>
                  <select
                    id="carrier-arrival"
                    className="tu-input"
                    value={carrierProfile.arrivalWindow}
                    onChange={(e) => setCarrierProfile({ ...carrierProfile, arrivalWindow: e.target.value })}
                  >
                    {CARRIER_ARRIVAL_WINDOWS.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="carrier-detour" className="tu-label">Max detour</label>
                  <select
                    id="carrier-detour"
                    className="tu-input"
                    value={carrierProfile.maxDetour}
                    onChange={(e) => setCarrierProfile({ ...carrierProfile, maxDetour: e.target.value })}
                  >
                    {CARRIER_DETOUR_OPTIONS.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="carrier-capacity" className="tu-label">Capacity</label>
                  <select
                    id="carrier-capacity"
                    className="tu-input"
                    value={carrierProfile.capacity}
                    onChange={(e) => setCarrierProfile({ ...carrierProfile, capacity: e.target.value })}
                  >
                    {CARRIER_CAPACITY_OPTIONS.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', marginTop: 'var(--space-4)' }}>
                {CARRIER_AVAILABILITY_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    className="tu-tap"
                    aria-pressed={carrierProfile.availability === opt}
                    onClick={() => setCarrierProfile({ ...carrierProfile, availability: opt })}
                    style={{ padding: '8px 14px', fontSize: 'var(--text-sm)', fontWeight: 600, width: 'auto', display: 'inline-block' }}
                  >
                    {opt}
                  </button>
                ))}
                <button
                  className="tu-tap"
                  aria-pressed={carrierProfile.preferredMatchLayer === 'all'}
                  onClick={() => setCarrierProfile({ ...carrierProfile, preferredMatchLayer: 'all' })}
                  style={{ padding: '8px 14px', width: 'auto' }}
                >
                  Direct + transit
                </button>
                <button
                  className="tu-tap"
                  aria-pressed={carrierProfile.preferredMatchLayer === 'direct_only'}
                  onClick={() => setCarrierProfile({ ...carrierProfile, preferredMatchLayer: 'direct_only' })}
                  style={{ padding: '8px 14px', width: 'auto' }}
                >
                  Direct only
                </button>
                <label className="tu-check-row" htmlFor="fragile-ok" style={{ marginLeft: 'auto' }}>
                  <input
                    id="fragile-ok"
                    type="checkbox"
                    checked={carrierProfile.allowsFragile}
                    onChange={(e) => setCarrierProfile({ ...carrierProfile, allowsFragile: e.target.checked })}
                  />
                  <span>I can handle fragile items with photo confirmation</span>
                </label>
              </div>
            </div>

            <Notice severity={readOnlyLane ? 'caution' : 'info'} title={gateTitle}>
              {gateMessage}
            </Notice>

            <div style={{ display: 'grid', gap: 'var(--space-4)', marginTop: 'var(--space-5)' }}>
              {!hasCarrierRouteIntent && (
                <div style={{ background: 'var(--color-bg)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-5)', border: '1px dashed var(--color-line-2)' }}>
                  <h3 className="tu-h3">Add your route to see compatible missions</h3>
                  <p className="tu-muted" style={{ marginBottom: 0 }}>Set availability, origin, and destination first. This keeps discovery and operational matching on the same Mission control surface.</p>
                </div>
              )}

              {hasCarrierRouteIntent && carrierMissionSamples.map((mission) => (
                <div key={mission.id} style={{ background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-5)', border: '1px solid var(--color-line)', boxShadow: 'var(--shadow-2)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 'var(--space-4)', marginBottom: 'var(--space-4)', flexWrap: 'wrap' }}>
                    <div>
                      <div className="tu-muted" style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600, marginBottom: 4 }}>{mission.routeFit}</div>
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-2xl)', fontWeight: 700 }}>{mission.title}</div>
                      <div className="tu-muted">{mission.packageType} · {mission.timing}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div className="tu-muted" style={{ fontSize: 'var(--text-xs)' }}>Shipper offer</div>
                      <div style={{ fontWeight: 700, fontSize: 'var(--text-xl)' }}>€{mission.offer}</div>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
                    <div style={{ background: 'var(--color-bg)', borderRadius: 'var(--radius-md)', padding: '10px 12px', border: '1px solid var(--color-line)' }}>
                      <div className="tu-muted" style={{ fontSize: 'var(--text-xs)', marginBottom: 2 }}>Pickup zone</div>
                      <div style={{ fontWeight: 700 }}>{mission.pickupZone}</div>
                    </div>
                    <div style={{ background: 'var(--color-bg)', borderRadius: 'var(--radius-md)', padding: '10px 12px', border: '1px solid var(--color-line)' }}>
                      <div className="tu-muted" style={{ fontSize: 'var(--text-xs)', marginBottom: 2 }}>Delivery zone</div>
                      <div style={{ fontWeight: 700 }}>{mission.deliveryZone}</div>
                    </div>
                    <div style={{ background: 'var(--color-bg)', borderRadius: 'var(--radius-md)', padding: '10px 12px', border: '1px solid var(--color-line)' }}>
                      <div className="tu-muted" style={{ fontSize: 'var(--text-xs)', marginBottom: 2 }}>Why you see it</div>
                      <div style={{ fontWeight: 700 }}>{mission.explanation}</div>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--color-ink-2)', marginBottom: 'var(--space-4)' }}>
                    <div><strong>Mission rule:</strong> the Shipper chooses which Carrier request moves into negotiation.</div>
                    <div><strong>Carrier note:</strong> {mission.note}</div>
                    <div><strong>Handling:</strong> {carrierProfile.allowsFragile ? 'Fragile missions allowed' : 'Standard handling only'}.</div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 'var(--space-2)' }}>
                    <button className="tu-btn tu-btn--primary" disabled={readOnlyLane} onClick={() => sendCarrierStructuredRequest(mission, 'accept')}>Accept current price</button>
                    <button className="tu-btn tu-btn--secondary" disabled={readOnlyLane} onClick={() => sendCarrierStructuredRequest(mission, 'counter')}>Suggest price</button>
                    <button className="tu-btn tu-btn--ghost" disabled={readOnlyLane} onClick={() => sendCarrierStructuredRequest(mission, 'question')}>Ask a question</button>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 'var(--space-6)', textAlign: 'center' }}>
              {isCarrierGuest && (
                <button className="tu-btn tu-btn--primary tu-btn--lg" onClick={signInCarrierWithGoogle}>
                  Continue with Google to unlock responses
                </button>
              )}
              {!isCarrierGuest && !isCarrierVerified && (
                <button className="tu-btn tu-btn--primary tu-btn--lg" onClick={() => setStep('carrier-verification')}>
                  Finish verification
                </button>
              )}
              {isCarrierVerified && (
                <button className="tu-btn tu-btn--secondary tu-btn--lg" onClick={() => showToast('Mission control is already active. Update your route any time to refresh the lane.') }>
                  Refresh current mission lane
                </button>
              )}
            </div>
          </div>
        </div>
        <Toast message={toast} />
      </div>
    );
  }

  // Confirmation — mission accepted, celebratory moment
  if (step === 'confirmation') {
    const finalPrice = agreedPrice || shipment.suggestedPrice;
    return (
      <div className="tu-root">
        <style>{TOKENS_CSS}</style>
        <div className="tu-page tu-page--hero">
          <div className="tu-container--narrow">
            <div style={{
              background: 'var(--color-surface)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-3)',
              padding: 'var(--space-7) var(--space-6)',
              textAlign: 'center',
              border: '1px solid var(--color-line)',
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* Decorative accent band */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 6,
                background: 'linear-gradient(90deg, var(--color-accent) 0%, var(--color-primary) 100%)',
              }} />

              <div style={{ marginBottom: 'var(--space-4)' }}>
                <span className="tu-patch"><span className="tu-patch__dot" />Mission booked</span>
              </div>

              <div style={{
                width: 88, height: 88, borderRadius: '50%',
                background: 'var(--color-success-soft)',
                border: '2px solid var(--color-success-border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto var(--space-5)',
                color: 'var(--color-success)',
              }}>
                <Icon name="check" size="44px" strokeWidth={2.5} />
              </div>

              <h2 className="tu-h2" style={{ fontSize: 'var(--text-3xl)' }}>Your mission is on its way.</h2>
              <p className="tu-lede" style={{ marginBottom: 'var(--space-6)' }}>
                {carrierName} will pick up your {PRICING_TABLE[shipment.size]?.shortLabel?.toLowerCase() || 'shipment'} shortly. You'll get a ping at every step.
              </p>

              <div style={{ background: 'var(--color-bg-warm)', borderRadius: 'var(--radius-md)', padding: 'var(--space-5)', marginBottom: 'var(--space-6)', textAlign: 'left', border: '1px solid var(--color-accent-border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                  <span className="tu-muted">Final price</span>
                  <span style={{ fontWeight: 700, fontFamily: 'var(--font-body)', fontVariantNumeric: 'tabular-nums' }}>€{finalPrice}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                  <span className="tu-muted">Carrier earnings</span>
                  <span style={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>€{(finalPrice * (1 - PLATFORM_FEE)).toFixed(2)}</span>
                </div>
                <div style={{ borderTop: '1px dashed var(--color-line-2)', paddingTop: 'var(--space-2)', display: 'flex', justifyContent: 'space-between' }}>
                  <span className="tu-muted">Service fee</span>
                  <span style={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>€{(finalPrice * PLATFORM_FEE).toFixed(2)}</span>
                </div>
              </div>

              <button
                className="tu-btn tu-btn--primary tu-btn--lg"
                onClick={() => {
                  resetMissionFlow();
                  setStep('welcome');
                }}
              >
                Create another mission
              </button>
            </div>
          </div>
        </div>
        <Toast message={toast} />
      </div>
    );
  }

  return null;
}

export default DeliveryMarketplace;
