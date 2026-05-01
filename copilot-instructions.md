# TakeUp Product and Legal Change Guardrails

This file is the standing source of truth for future changes to TakeUp.
Use it for any new feature, refactor, policy update, or UX change related to the delivery marketplace.

## Product Intent

TakeUp is a marketplace that connects:
- Assigner (platform name: Shipper)
- Contractor (platform name: Carrier)

TakeUp facilitates matching, messaging, and payment orchestration.
TakeUp does not present itself as the party physically transporting items.

## Non-Negotiable Terminology

- All user-facing role copy must follow the canonical terminology already defined in the product code.
- Legal form: Assigner and Contractor.
- Friendly UI form: Shipper and Carrier.
- On first mention in important flows or legal text, prefer the full form: Assigner (Shipper) and Contractor (Carrier).
- Do not introduce new role names unless the product owner explicitly approves a terminology change.

## Core Legal Positioning

When editing product flows, preserve these assumptions unless the legal model is intentionally changed:

- TakeUp is an intermediary marketplace, not the transport operator.
- Contractors perform missions personally and are not employees of TakeUp.
- Off-platform payments and early contact exchange are restricted.
- Prohibited goods controls are part of the platform safety model.
- Proof of delivery, disputes, and cancellation must be traceable and evidence-based.

## Red-Line Rules

Do not add or ship features that imply any of the following without an explicit legal review:

- TakeUp directly holds customer funds as escrow without a licensed payment partner.
- TakeUp guarantees insurance coverage when no actual policy or partner exists.
- TakeUp guarantees legality or safety of a shipment based only on keyword filtering.
- TakeUp assigns, controls, or manages Contractors in a way that increases worker reclassification risk.
- TakeUp enables transport of regulated goods, medicines, weapons, dangerous goods, cash, or high-risk categories without a dedicated policy and review flow.
- TakeUp stores geolocation, proof-of-delivery photos, medical details, or chat moderation data without a defined privacy basis and retention approach.

## Required Legal Checks Before Any New Feature

For every meaningful product change, ask these questions before implementation is considered complete:

1. Does this change affect contract formation?
2. Does this change affect who controls pricing, task acceptance, cancellation, or penalties?
3. Does this change affect payment flow, refunds, or wallet-like behavior?
4. Does this change collect or expose additional personal data?
5. Does this change expand what goods can be listed or transported?
6. Does this change automate a decision that can materially affect a user?
7. Does this change require updates to Terms, Privacy Policy, Refund Policy, or Safety Policy?

If the answer to any of the above is yes, treat the change as legal-impacting.

## Product Rules for Future Changes

### 1. Payments

- Do not describe money as held in escrow unless the payment architecture really supports that claim.
- Prefer wording that reflects orchestration through a licensed payment provider.
- Any feature involving balances, stored funds, delayed payouts, split payments, or refunds must be reviewed as a payments-regulated surface.

### 2. Contractor Model

- Avoid features that make TakeUp look like an employer or dispatch operator.
- Be careful with automatic assignment, mandatory acceptance windows, route control, ranking penalties, productivity scoring, or deactivation based only on platform metrics.
- If adding performance management, flag it for worker-status review.

### 3. Prohibited Goods and Trust and Safety

- Keyword detection is only a first-pass warning tool.
- High-risk shipments must support review, escalation, and evidence handling.
- Do not imply that the platform has verified a shipment unless there is an actual verification workflow.

### 4. Proof of Delivery and Disputes

- Any automated release or refund must be tied to a defensible evidence model.
- High-impact disputes should allow manual review.
- Do not create irreversible payment or penalty logic based on weak or one-sided events alone.

### 5. Privacy and Data Protection

- Chat monitoring, GPS capture, timestamping, photo evidence, and audit logs are privacy-sensitive features.
- Minimize personal data in UI and logs.
- Avoid exposing full addresses, unnecessary coordinates, or sensitive notes in front-end state beyond what the flow requires.
- New data collection must be matched with a purpose, retention idea, and access boundary.

### 6. Cancellation and Refunds

- Cancellation fees must remain explainable and proportionate.
- Refund logic must stay aligned with the payment flow and user-facing policy.
- If a feature changes when a mission becomes binding, revisit cancellation rules.

## Launch Readiness Gates

Treat these as blockers for public launch, not nice-to-have items:

- Clear payment-provider-backed payout and refund architecture
- Separate legal documents, not only one in-app terms modal
- Identity and trust checks for Contractors
- Privacy framework for chat, location, POD, and audit data
- Prohibited goods enforcement process
- Claims and dispute process with evidence handling
- Tax and consumer-law analysis
- Worker-status and platform-control review

## Implementation Guidance for Copilot and Future Editors

When making changes:

- Prefer small, traceable changes over broad rewrites.
- Preserve the existing terminology map and lifecycle state model unless intentionally changing the business model.
- If a feature increases legal risk, add a clear TODO or note in code or docs describing the legal dependency.
- Keep legal copy consistent across UI, flows, alerts, and policy text.
- Do not silently broaden scope from pilot behavior to public-launch behavior.

## Change Checklist

Before marking a feature done, verify:

- UI copy matches the approved role terminology.
- Payment wording is accurate.
- New states or actions fit the delivery lifecycle.
- Any new moderation or evidence logic has an operational fallback.
- Any new personal data has a clear reason to exist.
- Any new legal promise is supported by a real process, partner, or policy.

## Escalate Instead of Guessing

Stop and request explicit product or legal direction if a proposed change:

- introduces wallets, balances, stored value, or direct fund custody
- expands into cross-border shipping logic
- adds insurance promises or guaranteed compensation
- changes contractor control, ranking, or discipline mechanisms
- adds sensitive-data collection or new monitoring behavior
- expands allowed shipment categories beyond the current low-trust prototype model

## Working Assumption

Build TakeUp as a legally cautious marketplace MVP.
Do not design as if the legal framework can be fixed later without product changes.
Core legal assumptions must lead the product, and high-risk features must follow them.