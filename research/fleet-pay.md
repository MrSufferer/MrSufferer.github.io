# FleetPay

**Interest-bearing payments that arrive before wallets.**

_Send money to an email. The recipient claims to Avalanche or previews fiat. Pending funds can earn until they are claimed, cancelled, or refunded._

![FleetPay home — send to an email, let them choose](output/fleetpay-home.png)

> **Status.** This is a **Fuji** MVP using **synthetic fUSDC**. It is not Circle native USDC on Avalanche C-Chain mainnet, and it is not a production payout product. Yield is whatever actually settles — there is no advertised APY.

## Description

FleetPay is an interest-bearing payment protocol on **Avalanche**. A sender funds an on-chain escrow for someone who may not have a wallet yet. The recipient gets an email, proves they own it, and chooses how to finish: claim to an Avalanche address, or preview a separate fiat conversion.

While the payment is pending, principal can sit in a capped shared yield vault. Adapters talk to **Aave V3**, **Spark Savings**, and **BENQI**. After a successful claim, **positive realized yield splits 50/50** between sender and recipient. Cancel or expiry returns the current escrow redemption value to the sender. The service fee is not refunded.

- **Pay an email**, not a `0x` address the recipient has to invent first
- **1–30 day** expiry, **7 days** by default
- **On-chain escrow** per recipient (CREATE2, independently claimable in a batch)
- **Visible truth**: principal, fees, estimated value, expiry, queue, and risk
- **Fail closed** on missing credentials, unverified refunds, and mainnet simulation RPC

Contracts in this repo still use the historical `Fling*` names. Packages are `@fling/*`. The product name is **FleetPay**.

## Motivation

Stablecoin senders already want to pay contractors, payroll, and family by email. Today that usually means one of two bad options:

1. Force the recipient through wallet setup, gas, and an off-ramp before they can be paid.
2. Park the money in an app database and hope operations, yield, and compliance stay honest.

Pending funds sit idle. Recipients who do not live in crypto never see a clean finish. Operators cannot reconcile what the chain actually holds.

FleetPay treats the **chain as the source of truth for funds**. The app is the claim, compliance, and payout layer around that escrow — not a shadow ledger. Yield is a side effect of time in the vault, disclosed as estimated then settled, never as a guaranteed rate.

## Quick Start

**Prerequisites:** Node **24.19.0** (see `.nvmrc`) and **pnpm 8.15.9**.

```bash
git clone https://github.com/mangekyou-labs/fleet-pay.git
cd fleet-pay
corepack enable
corepack prepare pnpm@8.15.9 --activate
pnpm install
cp .env.example .env
pnpm web:dev
```

Open [http://127.0.0.1:3000](http://127.0.0.1:3000).

The example env file is the contract. Leave secrets empty for a local browse. Without `DATABASE_URL` **and** `FLING_CLAIM_TOKEN_ENCRYPTION_KEY` together, the web app uses **in-memory storage** (lost on restart). Creating real payments, sending OTP email, or talking to Fuji needs extra values from `.env.example` — use a disposable Fuji key only.

## Usage

### Product surfaces

| Path | What it is |
| --- | --- |
| `/` | Home: send, recipient demo, yield/sim entry |
| `/send` | Create a payment to an email |
| `/payments` | Sender payment list |
| `/demo` | Recipient view without a live claim token |
| `/claim/[token]` | Email OTP + claim / authorization |
| `/sim` | Investor fork dashboard (not mainnet) |
| `/ops` | Operator console (requires `OPS_OPERATOR_TOKEN`) |

Fiat conversion is a **separate provider flow**. Live Ramp / Mt Pelerin payout stays closed until webhook keys and explicit real-funds acknowledgements are set. The local Mt Pelerin widget is a preview, not a bank transfer.

### Repo map

- `apps/web` — Next.js app (the thing you run in Quick Start)
- `apps/api`, `apps/worker`, `apps/mobile` — service and client boundaries
- `contracts/` — Foundry escrow, vault, adapters, factory
- `packages/domain`, `database`, `chain`, `providers` — money, persistence, chain I/O, fiat adapters

### Checks

```bash
pnpm lint
pnpm test
pnpm --filter @fling/web test
forge test --summary   # from contracts/, requires Foundry
```

## Contributing

Issues and pull requests are welcome on [mangekyou-labs/fleet-pay](https://github.com/mangekyou-labs/fleet-pay).

- Do **not** commit `.env`, keys, seed phrases, or Playwright wallets
- Keep Fuji and mainnet language honest — no native-USDC claims on this testnet path
- Run `pnpm lint` and `pnpm test` before you open a PR
- Historical `Fling` identifiers in Solidity and package names stay unless a change is specifically about renaming
