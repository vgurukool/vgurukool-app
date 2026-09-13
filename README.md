# Vgurukool — Sovereign Academy & Vedic Intelligence Portal

Dedicated landing application and public entry point for **Vgurukool** (`https://vgurukool.com` and `https://www.vgurukool.com`).

---

## Architecture Overview

The app is built as a lightweight, high-performance containerized application:
- **Frontend:** React 18, Vite, Tailwind CSS, Lucide Icons, Keycloak JS SSO.
- **Backend:** FastAPI (Python 3.11) providing SPA static asset serving, `/api/health` probe, and `/api/ai/chat` proxying to cluster LiteLLM.
- **Orchestration:** Helm chart deployed on AWS EKS with Nginx Ingress and automated Let's Encrypt TLS certificates via `cert-manager`.

---

## The 4 Core Sections

### 1. Self Assessment
- Displays the **Ashta Lakshmi Wealth & Prosperity Audit Showcase**.
- Previews the 8 dimensions of holistic Vedic prosperity.
- Provides a direct launch button to the dedicated assessment portal at `https://ashta-lakshmi.vgurukool.com`.

### 2. Course Catalog & Programs
- Interactive discipline filters: *All Disciplines*, *Sacred Literature*, *Philosophy & Yoga*, *Sanskrit & Chanting*, *Vedic Economics*.
- Features the **18-Week Bhagavad Gita Immersive Journey** with direct SSO launch into LearnHouse LMS.
- Curricula previews for *The 10 Principal Upanishads*, *Spoken Sanskrit & Metered Chanting*, *Patanjali Yoga Sutras*, and *Vedic Economics & Ethical Enterprise*.

### 3. The 8 Lakshmi Applications
- Strictly presents the **8 Lakshmi Portals** without exposing internal infrastructure or admin tools:
  - 🟢 **Dhana Lakshmi** (Live): Financial Sovereignty & Liquid Capital Management.
  - 🟢 **Dhanya Lakshmi** (Live): Agricultural Abundance & Nutritional Nourishment.
  - 🟢 **Gaja Lakshmi** (Live): Royal Influence, Animal Husbandry & Divine Power.
  - 🟢 **Vidya Lakshmi** (Live): Sovereign Knowledge, Vedic Epistemology & Mastery.
  - ⏳ **Adi Lakshmi** (In Development): Primal Wisdom & Primordial Lineage.
  - ⏳ **Dhairya Lakshmi** (In Development): Inner Valor, Fortitude & Resilience.
  - ⏳ **Vijaya Lakshmi** (In Development): Ethical Victory, Perseverance & Conquest.
  - ⏳ **Santana Lakshmi** (In Development): Generational Continuity & Heritage.
  - 🏛️ **Central Ashta Lakshmi Portal**: Comprehensive 8-fold diagnostic suite.

### 4. AI Assistants
- Interactive conversational interface featuring Vedic specialist agents:
  - **Kubera**: Divine Treasurer & Guardian of the North (wealth architecture, ethical accumulation, sustainable abundance).
  - **Dhanvantari**: Master of Ayurveda (Dinacharya, Doshas, holistic vitality, and herbal science).
  - **Brihaspati**: Guru of the Devas (Vedic philosophy, states of consciousness, Upanishadic inquiries).
  - **Saraswati**: Goddess of Speech & Learning (Sanskrit phonetics, chanting meters, Vedic grammar).
- Powered by `/api/ai/chat` proxying to `http://litellm.litellm.svc.cluster.local:4000/v1/chat/completions`.

---

## Directory Structure

```text
vgurukool-app/
├── chart/                      # Helm chart for Kubernetes deployment
│   ├── Chart.yaml
│   ├── values.yaml
│   └── templates/
│       ├── deployment.yaml
│       ├── service.yaml
│       ├── ingress.yaml
│       ├── configmap.yaml
│       ├── serviceaccount.yaml
│       └── _helpers.tpl
├── server/                     # FastAPI backend & proxy
│   ├── main.py
│   └── requirements.txt
├── src/                        # React Vite frontend
│   ├── components/
│   │   └── AIAssistantsSection.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── public/
│   └── silent-check-sso.html
├── Dockerfile                  # Multi-stage build (Node -> Python)
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## Local Development

1. **Frontend:**
   ```bash
   npm install
   npm run dev
   ```

2. **Backend:**
   ```bash
   cd server
   pip install -r requirements.txt
   uvicorn main:app --host 0.0.0.0 --port 3000 --reload
   ```

---

## Docker Build & Deployment

1. **Build Container Image:**
   ```bash
   docker build -t ayusing/vgurukool:v1.0.0 .
   docker push ayusing/vgurukool:v1.0.0
   ```

2. **Deploy to Kubernetes via Helm:**
   ```bash
   helm upgrade --install vgurukool ./chart -n vgurukool
   ```
