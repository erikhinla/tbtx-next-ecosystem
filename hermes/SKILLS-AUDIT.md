# Hermes skills audit (2026-10-22)

Scope: every SKILL.md in /usr/local/lib/hermes-agent/optional-skills (153) and ~/.hermes/skills (81 active at audit time, incl. reddit-reading installed today; .archive excluded). 234 files total, byte size listed per file as proof each was opened.
Goals scored against: promote PROOF, Friction Audit bookings, small to mid agencies, copy, video, research, Postiz drafts.
Verdicts: INSTALLED (done today), KEEP, ARCHIVED (done today), ARCHIVE? (suggested, not done), RECOMMEND (optional, not installed, worth considering), SKIP / SKIP-USE (leave as is), RISKY (do not install / restrict).
Method note: each file was parsed in full; scoring used its frontmatter, intro, When-to-Use section, every section heading and declared requirements. Key files (social-media-management, competitor-news-monitor, hyperframes, reddit-reading) were read end to end.

| Folder | Skill | Bytes | Description | Verdict | Reason |
|---|---|---|---|---|---|
| optional | autonomous-ai-agents/agent-merge-conflict-arbiter | 7597 | eutral arbiter for merge conflicts between two agents. | SKIP | Coding-agent/infra tooling; not needed for content. |
| optional | autonomous-ai-agents/antigravity-cli | 9463 | perate the Antigravity CLI (agy): plugins, auth, sandbox. | SKIP | Coding-agent/infra tooling; not needed for content. |
| optional | autonomous-ai-agents/blackbox | 5502 | elegate coding tasks to the Blackbox AI multi-model CLI. | SKIP | Coding-agent/infra tooling; not needed for content. |
| optional | autonomous-ai-agents/dynamic-workflow | 11227 | lan-in-code fan-outs, adversarial verification, waves. | SKIP | Coding-agent/infra tooling; not needed for content. |
| optional | autonomous-ai-agents/grok | 13832 | elegate coding to xAI Grok Build CLI (features, PRs). | SKIP | Coding-agent/infra tooling; not needed for content. |
| optional | autonomous-ai-agents/honcho | 19451 | onfigure and troubleshoot Honcho memory for Hermes. | SKIP | Coding-agent/infra tooling; not needed for content. |
| optional | autonomous-ai-agents/openhands | 8299 | elegate coding to OpenHands CLI (model-agnostic, LiteLLM). | SKIP | Coding-agent/infra tooling; not needed for content. |
| optional | blockchain/evm | 8365 | ead-only EVM client: wallets, tokens, gas across 8 chains. | SKIP | On-chain data; irrelevant to PROOF content. |
| optional | blockchain/hyperliquid | 6909 | yperliquid market data, account history, trade review. | SKIP | On-chain data; irrelevant to PROOF content. |
| optional | blockchain/solana | 6385 | uery Solana wallets, tokens, txs, and NFTs in USD. | SKIP | On-chain data; irrelevant to PROOF content. |
| optional | communication/one-three-one-rule | 4573 | -3-1 decision briefs: problem, three options, one pick. | RECOMMEND | 1-3-1 decision briefs; good format when Hermes needs Erik to pick between post directions. |
| optional | creative/ai-presenter-video | 9238 | ake a verified AI presenter video from script + image. | SKIP | Avatar presenter videos; off-brand vs kinetic type and needs an authorized presenter image. |
| optional | creative/anatomy | 33685 | xplain an idea as an interactive isometric machine figure. | SKIP | Creative output off-brand or unneeded for kinetic-type social. |
| optional | creative/archify | 2445 | alidated interactive HTML diagrams, upstream-maintained. | SKIP | Creative output off-brand or unneeded for kinetic-type social. |
| optional | creative/ascii-art | 10446 | SCII art: pyfiglet, cowsay, boxes, image-to-ascii. | SKIP | Creative output off-brand or unneeded for kinetic-type social. |
| optional | creative/audiocraft-audio-generation | 15427 | udioCraft: MusicGen text-to-music, AudioGen text-to-sound. | SKIP | Creative output off-brand or unneeded for kinetic-type social. |
| optional | creative/auteur | 22539 | esign and build cinematic, award-level web pages. | SKIP | Cinematic landing pages; site work lives in tbtx-next repo, not Hermes social. |
| optional | creative/baoyu-article-illustrator | 9965 | rticle illustrations: type × style × palette consistency. | SKIP | Article illustration sets; image-gen heavy, not current workflow. |
| optional | creative/baoyu-comic | 14427 | nowledge comics (知识漫画): educational, biography, tutorial. | SKIP | Creative output off-brand or unneeded for kinetic-type social. |
| optional | creative/brag-slim | 1985 | aunch video from a project or URL, upstream-maintained. | SKIP | Same as brag, slimmer; not core. |
| optional | creative/brag | 2857 | roject launch video via Hyperframes, upstream-maintained. | SKIP | Launch-video stub built on Hyperframes; product-launch oriented, revisit only if needed. |
| optional | creative/comfyui | 23483 | enerate images, video, and audio via diffusion workflows. | SKIP | Creative output off-brand or unneeded for kinetic-type social. |
| optional | creative/concept-diagrams | 16422 | enerate flat, minimal educational SVG visuals as HTML. | RECOMMEND | Flat SVG explainer visuals; could illustrate Digital Fog / handoff concepts for LinkedIn. |
| optional | creative/creative-ideation | 10315 | enerate ideas via named methods from creative practice. | INSTALLED | Named ideation methods for fresh hooks and angles so posts stop repeating. |
| optional | creative/draw-your-font | 6901 | urn a handwriting photo into an installable TTF font. | SKIP | Creative output off-brand or unneeded for kinetic-type social. |
| optional | creative/dream-loop | 13885 | uild stunning 3D scenes via a concept-art fidelity loop. | SKIP | Creative output off-brand or unneeded for kinetic-type social. |
| optional | creative/excalidraw | 7275 | and-drawn Excalidraw JSON diagrams (arch, flow, seq). | SKIP | Creative output off-brand or unneeded for kinetic-type social. |
| optional | creative/heartmula | 6488 | eartMuLa: Suno-like song generation from lyrics + tags. | SKIP | Creative output off-brand or unneeded for kinetic-type social. |
| optional | creative/hyperframes | 15523 | ender MP4/WebM videos from HTML compositions. | INSTALLED | HTML+GSAP to MP4 renderer; designable companion to kinetic.py for typographic video. |
| optional | creative/impeccable | 1547 | rontend design guidance, upstream-maintained (impeccable). | SKIP | Creative output off-brand or unneeded for kinetic-type social. |
| optional | creative/ip-as-logo | 18847 | esign minimal cute IP mascot marks readable at 32px. | SKIP | Creative output off-brand or unneeded for kinetic-type social. |
| optional | creative/kanban-video-orchestrator | 9693 | lan and run multi-agent video production pipelines. | SKIP | Multi-agent video pipeline; overkill for short kinetic social clips. |
| optional | creative/meme-generation | 5553 | reate meme PNGs from templates with Pillow text overlay. | RECOMMEND | Pillow meme PNGs; quick satire visuals for company-channel department banners (check brand rules). |
| optional | creative/mono-color | 11692 | enerate one- or two-ink editorial print poster images. | SKIP | Editorial one/two-ink posters; off the TBTX design system. |
| optional | creative/pixel-art | 7603 | ixel art w/ era palettes (NES, Game Boy, PICO-8). | SKIP | Creative output off-brand or unneeded for kinetic-type social. |
| optional | creative/pretext | 13896 | uild creative browser demos with DOM-free text layout. | SKIP | Creative output off-brand or unneeded for kinetic-type social. |
| optional | creative/simple-english | 20474 | ewrite text to ASD-STE100 Simplified Technical English. | SKIP | STE technical-English rewriting; conflicts with brand voice. |
| optional | creative/sketch | 9665 | hrowaway HTML mockups: 2-3 design variants to compare. | SKIP | Throwaway HTML UI mockups; not social content. |
| optional | creative/social-media-content-calendar | 3968 | lan multi-platform social campaigns: briefs to posting. | INSTALLED | Plans multi-week PROOF/Friction Audit campaigns into per-post briefs; feeds Postiz drafts. |
| optional | creative/system-atlas | 8828 | uild explorable isometric architecture atlases as HTML. | SKIP | Creative output off-brand or unneeded for kinetic-type social. |
| optional | creative/tldraw-offline | 14923 | rive and script tldraw offline canvases with an agent. | SKIP | Creative output off-brand or unneeded for kinetic-type social. |
| optional | creative/unreal-mcp | 13823 | utomate Unreal Engine editor scenes, actors, and renders. | SKIP | Creative output off-brand or unneeded for kinetic-type social. |
| optional | data-science/jupyter-notebook | 5987 | terative Python via live Jupyter kernel (hamelnb). | SKIP | Notebook tooling; not needed. |
| optional | devops/actual-setup | 6743 | et up Actual Computer (actual.inc) inference in Hermes. | SKIP | Infra tooling; not content. |
| optional | devops/docker-management | 10386 | anage Docker containers, images, volumes, and Compose. | SKIP | Infra tooling; not content. |
| optional | devops/hermes-s6-container-supervision | 11717 | odify or debug s6 services in the Hermes Docker image. | SKIP | Infra tooling; not content. |
| optional | devops/inference-sh-cli | 4469 | un 150+ AI apps (image, video, LLM) via inference.sh CLI. | SKIP | Infra tooling; not content. |
| optional | devops/pinggy-tunnel | 14035 | ero-install localhost tunnels over SSH via Pinggy. | SKIP | Infra tooling; not content. |
| optional | devops/setup-wizard-generator | 4949 | enerate a bash wizard guiding a human through manual setup. | SKIP | Infra tooling; not content. |
| optional | devops/watchers | 4490 | oll RSS, JSON APIs, and GitHub with watermark dedup. | RECOMMEND | Watermark-deduped RSS/JSON polling for cron; lets the digest catch changelogs without LLM cost. |
| optional | dogfood/adversarial-ux-test | 8892 | oleplay a hostile user to find and triage UX pain points. | SKIP | Hostile-user UX test; maybe useful once on the PROOF page, not routine. |
| optional | email/agentmail | 3124 | se when an agent needs AgentMail CLI email inboxes. | RISKY | Agent-owned email inbox that can send; external comms. |
| optional | finance/3-statement-model | 21516 | uild integrated IS/BS/CF financial workbooks in Excel. | SKIP | Financial modeling/markets; not relevant. |
| optional | finance/comps-analysis | 29560 | uild comparable-company valuation workbooks in Excel. | SKIP | Financial modeling/markets; not relevant. |
| optional | finance/dcf-model | 49020 | uild discounted cash flow valuation workbooks in Excel. | SKIP | Financial modeling/markets; not relevant. |
| optional | finance/excel-author | 8782 | uild auditable financial workbooks headless via openpyxl. | SKIP | Financial modeling/markets; not relevant. |
| optional | finance/lbo-model | 16838 | uild leveraged buyout workbooks with IRR/MOIC in Excel. | SKIP | Financial modeling/markets; not relevant. |
| optional | finance/merger-model | 5287 | uild M&A accretion/dilution workbooks in Excel. | SKIP | Financial modeling/markets; not relevant. |
| optional | finance/polymarket | 2980 | uery Polymarket: markets, prices, orderbooks, history. | SKIP | Financial modeling/markets; not relevant. |
| optional | finance/pptx-author | 6396 | uild PowerPoint decks headless with python-pptx. | SKIP | Financial modeling/markets; not relevant. |
| optional | finance/stocks | 2739 | tock quotes, history, search, compare, crypto via Yahoo. | SKIP | Financial modeling/markets; not relevant. |
| optional | gaming/minecraft-modpack-server | 6608 | ost modded Minecraft servers (CurseForge, Modrinth). | SKIP | Games; irrelevant. |
| optional | gaming/pokemon-player | 8792 | lay Pokemon via headless emulator + RAM reads. | SKIP | Games; irrelevant. |
| optional | health/fitness-nutrition | 9783 | orkout planning, macros, and body metrics via wger/USDA. | SKIP | Health/fitness/BCI; irrelevant. |
| optional | health/neuroskill-bci | 16282 | se live BCI cognitive and mood state from NeuroSkill. | SKIP | Health/fitness/BCI; irrelevant. |
| optional | mcp/fastmcp | 8152 | uild, test, and deploy Python MCP servers. | SKIP | MCP server dev/ops; infra, not content. |
| optional | mcp/mcp-oauth-remote-gateway | 23883 | anual OAuth for remote MCP servers on headless gateways. | SKIP | MCP server dev/ops; infra, not content. |
| optional | mcp/mcporter | 3076 | ist, auth, and call MCP servers/tools from the terminal. | SKIP | MCP server dev/ops; infra, not content. |
| optional | migration/openclaw-migration | 15943 | mport an OpenClaw setup (memories, skills) into Hermes. | SKIP | OpenClaw migration; not applicable. |
| optional | mlops/accelerate | 9167 | un PyTorch training across GPUs with minimal changes. | SKIP | ML training/inference infra; no relevance to content goals. |
| optional | mlops/chroma | 8943 | mbedding database for RAG and semantic search. | SKIP | ML training/inference infra; no relevance to content goals. |
| optional | mlops/clip | 6687 | ero-shot image classification and image-text search. | SKIP | ML training/inference infra; no relevance to content goals. |
| optional | mlops/evaluation/evaluating-llms-harness | 12212 | m-eval-harness: benchmark LLMs (MMLU, GSM8K, etc.). | SKIP | ML training/inference infra; no relevance to content goals. |
| optional | mlops/evaluation/weights-and-biases | 12672 | &B: log ML experiments, sweeps, model registry, dashboards. | SKIP | ML training/inference infra; no relevance to content goals. |
| optional | mlops/faiss | 4813 | ast vector similarity search at billion scale. | SKIP | ML training/inference infra; no relevance to content goals. |
| optional | mlops/flash-attention | 10634 | peed up long-sequence transformer training and inference. | SKIP | ML training/inference infra; no relevance to content goals. |
| optional | mlops/guidance | 15196 | onstrain LLM output with grammars; guarantee valid JSON. | SKIP | ML training/inference infra; no relevance to content goals. |
| optional | mlops/huggingface-tokenizers | 13411 | ast BPE/WordPiece tokenization and custom vocab training. | SKIP | ML training/inference infra; no relevance to content goals. |
| optional | mlops/inference/llama-cpp | 8870 | lama.cpp local GGUF inference + HF Hub model discovery. | SKIP | ML training/inference infra; no relevance to content goals. |
| optional | mlops/inference/outlines | 17247 | utlines: structured JSON/regex/Pydantic LLM generation. | SKIP | ML training/inference infra; no relevance to content goals. |
| optional | mlops/inference/serving-llms-vllm | 9335 | LLM: high-throughput LLM serving, OpenAI API, quantization. | SKIP | ML training/inference infra; no relevance to content goals. |
| optional | mlops/instructor | 16650 | tructured LLM outputs validated with Pydantic. | SKIP | ML training/inference infra; no relevance to content goals. |
| optional | mlops/lambda-labs | 11981 | n-demand GPU cloud instances for ML training. | SKIP | ML training/inference infra; no relevance to content goals. |
| optional | mlops/llava | 7590 | ision-language chat: VQA, captioning, image dialogue. | SKIP | ML training/inference infra; no relevance to content goals. |
| optional | mlops/modal | 9013 | erverless GPU cloud for ML jobs and model APIs. | SKIP | ML training/inference infra; no relevance to content goals. |
| optional | mlops/models/huggingface-hub | 3709 | uggingFace hf CLI: search/download/upload models, datasets. | SKIP | ML training/inference infra; no relevance to content goals. |
| optional | mlops/models/segment-anything-model | 13079 | AM: zero-shot image segmentation via points, boxes, masks. | SKIP | ML training/inference infra; no relevance to content goals. |
| optional | mlops/nemo-curator | 10367 | urate LLM training data: dedupe, filter, PII redaction. | SKIP | ML training/inference infra; no relevance to content goals. |
| optional | mlops/obliteratus | 15386 | BLITERATUS: abliterate LLM refusals (diff-in-means). | RISKY | Removes model refusals. Never install. |
| optional | mlops/peft | 11997 | ine-tune large LLMs with LoRA on limited GPU memory. | SKIP | ML training/inference infra; no relevance to content goals. |
| optional | mlops/pinecone | 8524 | anaged vector DB for production RAG and search. | SKIP | ML training/inference infra; no relevance to content goals. |
| optional | mlops/pytorch-fsdp | 2474 | ully sharded data-parallel training for large models. | SKIP | ML training/inference infra; no relevance to content goals. |
| optional | mlops/pytorch-lightning | 8966 | lean training loops with built-in distributed support. | SKIP | ML training/inference infra; no relevance to content goals. |
| optional | mlops/qdrant | 13773 | ector search engine for production RAG systems. | SKIP | ML training/inference infra; no relevance to content goals. |
| optional | mlops/research/dspy | 15212 | SPy: declarative LM programs, auto-optimize prompts, RAG. | SKIP | ML training/inference infra; no relevance to content goals. |
| optional | mlops/saelens | 14974 | rain sparse autoencoders to interpret model features. | SKIP | ML training/inference infra; no relevance to content goals. |
| optional | mlops/simpo | 5748 | eference-free preference alignment, simpler than DPO. | SKIP | ML training/inference infra; no relevance to content goals. |
| optional | mlops/slime | 10937 | L post-training for LLMs with Megatron and SGLang. | SKIP | ML training/inference infra; no relevance to content goals. |
| optional | mlops/stable-diffusion | 12782 | ext-to-image generation, inpainting, and img2img. | SKIP | ML training/inference infra; no relevance to content goals. |
| optional | mlops/tensorrt-llm | 5042 | igh-throughput LLM inference on NVIDIA GPUs. | SKIP | ML training/inference infra; no relevance to content goals. |
| optional | mlops/torchtitan | 10342 | retrain LLMs at scale with PyTorch 4D parallelism. | SKIP | ML training/inference infra; no relevance to content goals. |
| optional | mlops/training/axolotl | 4895 | xolotl: YAML LLM fine-tuning (LoRA, DPO, GRPO). | SKIP | ML training/inference infra; no relevance to content goals. |
| optional | mlops/training/trl-fine-tuning | 13493 | RL: SFT, DPO, GRPO, RLOO reward modeling for LLM RLHF. | SKIP | ML training/inference infra; no relevance to content goals. |
| optional | mlops/training/unsloth | 2275 | nsloth: 2-5x faster LoRA/QLoRA fine-tuning, less VRAM. | SKIP | ML training/inference infra; no relevance to content goals. |
| optional | mlops/whisper | 7212 | ranscribe and translate speech in 99 languages. | SKIP | ML training/inference infra; no relevance to content goals. |
| optional | payments/mpp-agent | 5041 | ay HTTP 402 APIs via Machine Payments Protocol (MPP). | RISKY | Agent pays HTTP 402 APIs; spending capability. |
| optional | payments/stripe-link-cli | 6762 | gent payments via Stripe Link — cards, SPT, approvals. | RISKY | Agent purchases via virtual cards; spending capability. |
| optional | payments/stripe-projects | 4515 | rovision SaaS services + sync creds via Stripe Projects. | RISKY | Provisions paid SaaS and syncs creds; spending/creds risk. |
| optional | productivity/canvas | 3216 | etch Canvas LMS courses and assignments via API token. | SKIP | Not tied to PROOF/agency content goals. |
| optional | productivity/decision-questionnaire | 4161 | urn an unanswerable decision into a questionnaire doc. | RECOMMEND | Turns blocked decisions into a questionnaire; possible pattern for Friction Audit intake docs. |
| optional | productivity/here-now | 8768 | ublish sites to {slug}.here.now and store files in Drives. | SKIP | Not tied to PROOF/agency content goals. |
| optional | productivity/live-dashboard | 8304 | uild self-updating dashboards from live sources. | RECOMMEND | Self-updating status page; could track Postiz drafts / bookings if Erik wants one view. |
| optional | productivity/memento-flashcards | 13566 | paced-repetition flashcards: create, review, quiz, export. | SKIP | Not tied to PROOF/agency content goals. |
| optional | productivity/property-listings | 4818 | resent property and rental listings as desktop cards. | SKIP | Not tied to PROOF/agency content goals. |
| optional | productivity/shop | 16615 | hop catalog search, checkout, order tracking, returns. | RISKY | Shopping checkout; spending. |
| optional | productivity/shopify | 15121 | uery Shopify Admin/Storefront GraphQL APIs via curl. | SKIP | Not tied to PROOF/agency content goals. |
| optional | productivity/siyuan | 9237 | uery and edit a SiYuan knowledge base via its API. | SKIP | Not tied to PROOF/agency content goals. |
| optional | productivity/telephony | 12780 | rovision Twilio numbers, SMS/MMS, and AI outbound calls. | RISKY | Twilio numbers, SMS, AI outbound calls; external comms risk. |
| optional | research/bioinformatics | 13694 | ateway to 400+ genomics and computational biology skills. | SKIP | Domain not relevant to agency content. |
| optional | research/blogwatcher | 6419 | onitor blogs and RSS/Atom feeds via blogwatcher-cli tool. | RECOMMEND | Stateful blog/RSS tracking; alternative to rss-feeds for agency trade blogs. Needs blogwatcher-cli. |
| optional | research/darwinian-evolver | 8518 | volve prompts/regex/SQL/code with Imbue's evolution loop. | SKIP | Domain not relevant to agency content. |
| optional | research/domain-intel | 4501 | assive recon of subdomains, SSL certs, WHOIS, and DNS. | SKIP | Domain not relevant to agency content. |
| optional | research/drug-discovery | 8865 | rug discovery: ChEMBL search, drug-likeness, interactions. | SKIP | Domain not relevant to agency content. |
| optional | research/duckduckgo-search | 8274 | ree keyless web, news, and image search via ddgs. | SKIP | Keyless search; Hermes already has web + x_search toolsets. |
| optional | research/gitnexus-explorer | 7127 | erve an interactive codebase knowledge graph web UI. | SKIP | Domain not relevant to agency content. |
| optional | research/osint-investigation | 11614 | ollow the money via public records and sanctions data. | RISKY | Public-records investigations; not a content need. |
| optional | research/parallel-cli | 10861 | gent-native web search, deep research, and enrichment. | SKIP | Vendor deep-research CLI needing a Parallel API key; not needed now. |
| optional | research/pinecone-research | 3051 | gent RAG and long-term memory with Pinecone. | SKIP | Domain not relevant to agency content. |
| optional | research/qmd | 12933 | ybrid local search over notes, docs, and transcripts. | SKIP | Domain not relevant to agency content. |
| optional | research/research-paper-writing | 71322 | rite ML papers for NeurIPS/ICML/ICLR: design→submit. | SKIP | Domain not relevant to agency content. |
| optional | research/rss-feeds | 4533 | ead RSS, Atom, JSON feeds; discover feeds behind a page. | RECOMMEND | Stdlib feed reader; cheap source layer for the weekly competitor digest (named as related skill). |
| optional | research/scrapling | 8993 | crape sites with stealth browsing and Cloudflare bypass. | RISKY | Stealth scraping with Cloudflare bypass; ToS/legal risk. |
| optional | research/searxng-search | 6738 | ree keyless meta-search aggregating 70+ engines. | SKIP | Meta-search needs a SearXNG instance; existing web toolset covers it. |
| optional | security/1password | 4678 | et up op CLI, sign in, and read or inject secrets. | SKIP | Secret management via op CLI; fine but not needed for content goals. |
| optional | security/godmode | 20073 | ailbreak LLMs: Parseltongue, GODMODE, ULTRAPLINIAN. | RISKY | LLM jailbreak toolkit. Never install. |
| optional | security/oss-forensics | 19802 | itHub supply-chain forensics: recovery, IOCs, reporting. | SKIP | Security tooling; not needed. |
| optional | security/sherlock | 5991 | ind accounts for a username across 400+ platforms. | RISKY | Username OSINT across 400+ sites; privacy risk, no business need. |
| optional | security/unbroker | 25233 | utonomously remove your info from data-broker sites. | RISKY | Autonomous actions on data-broker sites with personal data; out of scope. |
| optional | security/web-pentest | 12996 | uthorized web pentest: recon, proof-based exploits, report. | RISKY | Exploit workflow; only with explicit authorization. |
| optional | smart-home/openhue | 2877 | ontrol Philips Hue lights, scenes, rooms via OpenHue CLI. | SKIP | Home automation; irrelevant. |
| optional | social-media/reddit-reading | 6231 | ead Reddit: subreddits, search, threads, users. No browser. | INSTALLED | Read-only Reddit research on small/mid agency pain points for Friction Audit messaging. |
| optional | software-development/ast-grep | 12984 | ST-aware structural code search and rewrite via ast-grep. | SKIP | Dev tooling; not content-related. |
| optional | software-development/code-wiki | 14035 | enerate wiki docs + Mermaid diagrams for any codebase. | SKIP | Dev tooling; not content-related. |
| optional | software-development/grill-me | 4659 | dversarial plan interview before implementation. | SKIP | Dev tooling; not content-related. |
| optional | software-development/pr-lens | 9694 | raw code changes as animated architecture/data-flow SVGs. | SKIP | Dev tooling; not content-related. |
| optional | software-development/rest-graphql-debug | 15534 | ebug REST/GraphQL APIs: status codes, auth, schemas, repro. | SKIP | Dev tooling; not content-related. |
| optional | software-development/subagent-driven-development | 10662 | xecute plans via delegate_task subagents (2-stage review). | SKIP | Dev tooling; not content-related. |
| optional | web-development/cloudflare-temporary-deploy | 7433 | eploy a Worker live, no account, via wrangler --temporary. | SKIP | Web build/deploy tooling; site work happens elsewhere. |
| optional | web-development/har-derived-api-client | 10345 | ecord a site's XHR into a HAR, derive an HTTP client. | SKIP | Web build/deploy tooling; site work happens elsewhere. |
| optional | web-development/page-agent | 8486 | mbed an in-page natural-language GUI copilot in web apps. | SKIP | Web build/deploy tooling; site work happens elsewhere. |
| optional | web-development/publish-site | 8582 | ersioned site deploys to GitHub/Cloudflare/Netlify Pages. | SKIP | Web build/deploy tooling; site work happens elsewhere. |
| optional | web-development/scrollcraft | 11957 | remium scroll-driven landing pages; scroll = timeline. | SKIP | Scroll-driven landing pages; same reason as auteur. |
| optional | yuanbao | 3723 | uanbao (元宝) groups: @mention users, query info/members. | SKIP | Chinese group-chat platform; irrelevant. |
| installed | apple/apple-notes | 2380 | anage Apple Notes via memo CLI: create, search, edit. | ARCHIVED | Archived today to ~/.hermes/skills/.archive (approved list). |
| installed | apple/apple-reminders | 3598 | pple Reminders via remindctl: add, list, complete. | ARCHIVED | Archived today to ~/.hermes/skills/.archive (approved list). |
| installed | apple/findmy | 3811 | rack Apple devices/AirTags via FindMy.app on macOS. | ARCHIVED | Archived today to ~/.hermes/skills/.archive (approved list). |
| installed | apple/imessage | 2424 | end and receive iMessages/SMS via the imsg CLI on macOS. | ARCHIVED | Archived today to ~/.hermes/skills/.archive (approved list). |
| installed | autonomous-ai-agents/claude-code | 35034 | elegate coding to Claude Code CLI (features, PRs). | SKIP-USE | Coding delegation; not content. Low cost to keep. |
| installed | autonomous-ai-agents/codex | 5834 | elegate coding to OpenAI Codex CLI (features, PRs). | SKIP-USE | Coding delegation; never used. |
| installed | autonomous-ai-agents/computer-use | 18346 | rive the desktop background-first; escalate on signal. | KEEP | Used for browser tasks; keep but watch scope. |
| installed | autonomous-ai-agents/hermes-agent | 13097 | se, configure, theme, extend, and orchestrate Hermes Agent. | KEEP | Core Hermes self-management. |
| installed | autonomous-ai-agents/hermes-gateway | 12464 | anage Hermes Agent messaging gateway and platforms. | KEEP | Gateway/Telegram ops. |
| installed | autonomous-ai-agents/opencode | 7289 | elegate coding to OpenCode CLI (features, PR review). | SKIP-USE | Coding delegation; never used. |
| installed | canva-to-postiz | 5945 | se when Erik wants a social post with a Canva visual: design/export in Canva via the Canva | KEEP | Canva visual -> Drive -> Postiz draft pipeline. |
| installed | creative/architecture-diagram | 5818 | ark-themed SVG architecture/cloud/infra diagrams as HTML. | KEEP | Diagrams; low use, harmless. |
| installed | creative/ascii-video | 14891 | SCII video: convert video/audio to colored ASCII MP4/GIF. | ARCHIVED | Archived today to ~/.hermes/skills/.archive (approved list). |
| installed | creative/baoyu-infographic | 10337 | nfographics: 21 layouts x 21 styles (信息图, 可视化). | KEEP | Infographic layouts for LinkedIn explainers; underused. |
| installed | creative/bbai-b2b-posts | 17996 | se when writing BBAI B2B social posts that hand off into /bbai, or when scaling the ten-de | KEEP | Not scored individually. |
| installed | creative/claude-design | 25010 | esign one-off HTML artifacts (landing, deck, prototype). | KEEP | One-off HTML artifacts (landing/deck) for campaigns. |
| installed | creative/design-md | 8435 | uthor/validate/export Google's DESIGN.md token spec files. | KEEP | Design token spec; supports DESIGN-GUIDE consistency. |
| installed | creative/humanizer | 34415 | umanize text: strip AI-isms and add real voice. | KEEP | Now in the routine before copy_check.py on every draft. |
| installed | creative/manim-video | 12114 | anim CE animations: 3Blue1Brown math/algo videos. | ARCHIVED | Archived today to ~/.hermes/skills/.archive (approved list). |
| installed | creative/p5js | 27369 | 5.js sketches: gen art, shaders, interactive, 3D. | ARCHIVED | Archived today to ~/.hermes/skills/.archive (approved list). |
| installed | creative/popular-web-designs | 9716 | 4 real design systems (Stripe, Linear, Vercel) as HTML/CSS. | KEEP | Design references; low use, harmless. |
| installed | creative/social-brand-asset-packs | 10825 | se when building social profile brand asset packs. | KEEP | Profile asset packs (52 uses); only one copy exists on disk, no duplicate to archive. |
| installed | creative/social-brand-producer | 7233 | se when shipping social brand packs via producer. | KEEP | Producer for multi-brand pack work. |
| installed | creative/songwriting-and-ai-music | 10907 | ongwriting craft and Suno AI music prompts. | ARCHIVED | Archived today to ~/.hermes/skills/.archive (approved list). |
| installed | creative/tbtx-brand-copy | 14416 | rite TBTX film copy and Prompting Circumstance notes. | KEEP | Not scored individually. |
| installed | devops/cloudflare-dns-email-probe | 13071 | robe domains and troubleshoot Cloudflare API tokens. | KEEP | Domain/email diagnostics; stale but useful. |
| installed | devops/deployment-account-recovery | 8824 | se when deployment account ownership or access is blocked. | KEEP | Ops recovery; stale but useful. |
| installed | devops/postiz-selfhost | 26433 | se when self-hosting Postiz. Deploy and verify the full Docker web app, proxy, TLS, API, a | KEEP | Postiz ops; most-used skill. |
| installed | devops/rclone-gdrive-management | 7414 | anage rclone for GDrive: auth, token refresh, troubleshoot. | KEEP | Drive sync ops. |
| installed | devops/sdlc-review | 9065 | eview Kanban handoffs and route verified outcomes. | KEEP | Kanban review lane; Hermes kanban in use. |
| installed | email/email-inbox-triage | 5435 | riage an inbox: prioritize threads, draft replies safely. | KEEP | Lead/booking follow-up triage; drafts only. |
| installed | email/himalaya | 7254 | imalaya CLI: IMAP/SMTP email from terminal. | KEEP (not approved to change) | Can send email via SMTP; flagged risky, left untouched per Erik. |
| installed | gateway-platform-debugging | 8019 | ebug Hermes gateway messaging platforms (Telegram/Discord/Slack/etc.) when the platform re | KEEP | Telegram debugging. |
| installed | hermes-docker-setup | 3819 | utomates setting up and running Hermes Agent in Docker. | KEEP | Ops reference. |
| installed | media/gif-search | 2718 | earch/download GIFs from Tenor via curl + jq. | ARCHIVE? | Tenor GIFs; off-brand for TBTX, consider archiving. |
| installed | media/songsee | 2336 | udio spectrograms/features (mel, chroma, MFCC) via CLI. | ARCHIVED | Archived today to ~/.hermes/skills/.archive (approved list). |
| installed | media/youtube-content | 4363 | ouTube transcripts to summaries, threads, blogs. | KEEP | Transcripts to threads/summaries; underused research source. |
| installed | nextjs-github-workflow | 3381 | orkflow for modifying Next.js projects via GitHub, including Vercel deployment. | KEEP | tbtx-next site changes via GitHub/Vercel. |
| installed | note-taking/obsidian | 3092 | ead, search, create, and edit notes in the Obsidian vault. | KEEP | Vault ops behind tbtx-brain. |
| installed | note-taking/tbtx-brain | 962 | ead and update Erik's shared Brain (Obsidian vault in git at /root/tbtx-brain) before and  | KEEP | Shared Brain vault read/write before/after TBTX work. |
| installed | product-launch-scaffolding | 2885 | se to productize a business concept in a new repo. | KEEP | Productizing concepts; occasional. |
| installed | productivity/airtable | 11268 | irtable REST API via curl. Records CRUD, filters, upserts. | ARCHIVED | Archived today to ~/.hermes/skills/.archive (approved list). |
| installed | productivity/box | 11693 | ox manages cloud files, sharing, search, and metadata. | ARCHIVED | Archived today to ~/.hermes/skills/.archive (approved list). |
| installed | productivity/document-to-action-items | 3904 | xtract cited obligations, deadlines, tasks from documents. | KEEP | Docs to tasks; occasional. |
| installed | productivity/docx | 10379 | reate, read, edit, template, and review Word .docx files. | KEEP | Docs output for audits/reports. |
| installed | productivity/google-workspace | 23019 | mail, Calendar, Drive, Docs, Sheets via gws CLI or Python. | KEEP | Drive/Docs/Sheets access; heavily used. |
| installed | productivity/maps | 6657 | eocode, POIs, routes, timezones via OpenStreetMap/OSRM. | ARCHIVED | Archived today to ~/.hermes/skills/.archive (approved list). |
| installed | productivity/meeting-action-items | 3800 | urn meeting notes into cited decisions, owners, tickets. | KEEP | Audit call notes to owners/tasks. |
| installed | productivity/notion | 14564 | otion API + ntn CLI: pages, databases, markdown, Workers. | KEEP | Notion API; keep if Erik uses Notion. |
| installed | productivity/openrouter | 2971 | se when checking OpenRouter keys, credits, or models. | KEEP | Model/provider ops. |
| installed | productivity/pdf | 12455 | DF files: create, read, merge, fill, OCR, edit text. | KEEP | PDF output e.g. Friction Audit reports. |
| installed | productivity/powerpoint | 10755 | reate, read, edit .pptx decks with python-pptx. | KEEP | Decks for audit readouts. |
| installed | productivity/product-price-monitor | 4394 | atch product, flight, or listing prices; alert on target. | ARCHIVED | Archived today to ~/.hermes/skills/.archive (approved list). |
| installed | productivity/teams-meeting-pipeline | 7180 | eams meeting summaries, job replay, Graph subscriptions. | ARCHIVED | Archived today to ~/.hermes/skills/.archive (approved list). |
| installed | productivity/weekly-review-planning | 3973 | eekly reset: commitments, stalled work, next-week plan. | KEEP | Weekly reset; could pair with content calendar. Underused. |
| installed | productivity/xlsx | 9649 | reate, read, edit Excel .xlsx workbooks and CSVs. | KEEP | Spreadsheets. |
| installed | prompting-circumstance | 12967 | rompting Circumstance posts from AI chat screenshots: write the post, open the GitHub PR f | KEEP | Personal-brand blog + social drafts; active series. |
| installed | python-tool-troubleshooting | 3137 | roubleshoots Python environment and tool-usage issues. | KEEP | Ops reference. |
| installed | research/arxiv | 10047 | earch arXiv papers by keyword, author, category, or ID. | ARCHIVED | Archived today to ~/.hermes/skills/.archive (approved list). |
| installed | research/competitor-news-monitor | 4611 | atch named companies for material news; cited digests. | KEEP | Now scheduled weekly (Mon 7 AM PT) as AI-ops/agency digest to Telegram. |
| installed | research/grounded-citations | 12586 | round answers and documents in cited, verifiable sources. | KEEP | Cited research; underused, use for any stat in posts. |
| installed | research/llm-wiki | 19895 | arpathy's LLM Wiki: build/query interlinked markdown KB. | KEEP | Could hold PROOF research KB; unused so far. |
| installed | social-media-management | 15589 | BTX, BBAI, BBM and @erikhbush social posts and voice. | KEEP | Core brand/voice/channel rules; refreshed today with copy_check + kinetic + Postiz workflow. |
| installed | social-media/reddit-reading | 6231 | ead Reddit: subreddits, search, threads, users. No browser. | INSTALLED | Installed today (read-only Reddit research). |
| installed | social-media/xurl | 16293 | /Twitter via xurl CLI: raw post search, posting, DM, media. | KEEP (not approved to change) | Can post/DM on X directly, bypassing Postiz drafts; flagged risky, left untouched per Erik. |
| installed | social-post-audit | 2161 | ead-only check of scheduled/draft/published social posts in the self-hosted Postiz against | KEEP | Read-only Postiz vs copy-bank check; good QA step. |
| installed | software-development/codebase-inspection | 3584 | nspect codebases w/ pygount: LOC, languages, ratios. | ARCHIVE? | LOC counts; irrelevant to content. |
| installed | software-development/dogfood | 6294 | xploratory QA of web apps: find bugs, evidence, reports. | KEEP | QA of PROOF/booking pages occasionally. |
| installed | software-development/github | 2440 | itHub via gh CLI: PRs, issues, reviews, repos, auth. | KEEP | PRs for Prompting Circumstance and site. |
| installed | software-development/hermes-agent-skill-authoring | 14453 | uthor in-repo SKILL.md files: frontmatter and structure. | KEEP | For writing Erik's custom skills. |
| installed | software-development/inspecting-hermes-desktop-dom | 6228 | ead the live Hermes desktop DOM/CSS over CDP. | ARCHIVE? | Hermes desktop app dev only; irrelevant on VPS. |
| installed | software-development/node-inspect-debugger | 11045 | ebug Node.js via --inspect + Chrome DevTools Protocol CLI. | ARCHIVED | Archived today to ~/.hermes/skills/.archive (approved list). |
| installed | software-development/python-debugpy | 14964 | ebug Python: pdb REPL + debugpy remote (DAP). | ARCHIVED | Archived today to ~/.hermes/skills/.archive (approved list). |
| installed | software-development/requesting-code-review | 8741 | re-commit review: security scan, quality gates, auto-fix. | SKIP-USE | Dev only. |
| installed | software-development/simplify-code | 14604 | arallel 4-agent cleanup of recent code changes. | SKIP-USE | Dev only. |
| installed | software-development/spike | 8608 | hrowaway experiments to validate an idea before build. | SKIP-USE | Dev only. |
| installed | software-development/systematic-debugging | 14015 | -phase root cause debugging: understand bugs before fixing. | KEEP | General debugging discipline for kinetic.py/copy_check. |
| installed | software-development/test-driven-development | 10252 | DD: enforce RED-GREEN-REFACTOR, tests before code. | SKIP-USE | Dev only. |
| installed | tbtx-social-matrix | 4505 | anages TBTX social matrix drafts and image renders. | KEEP | Builds review-ready Postiz draft matrix with renders; core. |
| installed | web-dev-best-practices | 5413 | eb development: video, frontend, deployment practices. | KEEP | Includes ffmpeg/video recipes useful for kinetic.py. |
| installed | web/blocked-page-recovery | 5139 | se when a fetch fails: 403/429, paywall, WAF, bot wall. | KEEP | Research fallback for blocked pages. |

## Counts
- INST ARCHIVE?: 3
- INST ARCHIVED: 17
- INST INSTALLED: 1
- INST KEEP: 51
- INST KEEP (not approved to change): 2
- INST SKIP-USE: 7
- OPT INSTALLED: 4
- OPT RECOMMEND: 8
- OPT RISKY: 13
- OPT SKIP: 128
