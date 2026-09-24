# ComicCraft – AI Comic Story Creator 🎨⚡

**Turn Your Imagination Into a Comic**

ComicCraft is a modern, responsive, generative AI web application that transforms user story prompts into complete, illustrated comic strips. Built with Python, FastAPI, Google Gemini AI, Hugging Face Diffusers integration, Pillow graphic synthesis, and FPDF2 PDF generation.

---

## 🌟 Key Features

- **Story Idea to Full Comic**: Input any creative premise, character name, setting, tone, and art style to generate an entire comic strip.
- **AI Outline Generation (Gemini Flash)**: Structures a coherent panel-by-panel story progression (exposition, rising action, climax, and resolution).
- **AI Narrative & Dialogues (Gemini Pro)**: Generates classic comic box captions, atmospheric voiceover narration, and character speech dialogues (`Leo: "..."`).
- **AI Illustrations**: Integrates with Hugging Face image diffusion models with anchor tokens for character and visual consistency.
- **Intelligent Graphic Fallback Engine**: If offline or API keys are missing, automatically creates stylized comic panels using a custom Pillow canvas engine (featuring dynamic gradients, comic halftone dot textures, action starbursts, and double panel framing).
- **Instant PDF Booklet Export**: Formats and compiles the comic into a print-ready PDF booklet with cover page, metadata, and panel layouts.
- **Interactive Modern UI**: Clean comic-inspired aesthetic with dark mode, preset inspiration prompts, and a real-time 6-stage animated loading screen.
- **RESTful JSON API**: Programmatic endpoint (`POST /generate-comic/json`) for automated comic generation.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Backend** | Python 3.11, FastAPI, Uvicorn |
| **Frontend** | HTML5, Modern CSS3 (Vanilla CSS, CSS Grid, Flexbox), JavaScript |
| **Generative AI** | Google Gemini API (Flash for outlines, Pro for narrative) |
| **Image Generation** | Hugging Face Inference API / Pillow Comic Graphic Canvas Fallback |
| **PDF Generation** | FPDF2 |
| **Validation & Settings** | Pydantic v2, Pydantic-Settings, Python-Dotenv |

---

## 📁 Project Structure

```
ComicCraft/
│
├── app/
│   ├── __init__.py
│   ├── main.py                    # FastAPI application initialization & middleware
│   ├── routes.py                  # API endpoints and template handlers
│   ├── config.py                  # Environment configuration and paths
│   │
│   ├── ai/
│   │   ├── __init__.py
│   │   ├── gemini_flash.py        # Structured outline generation
│   │   ├── gemini_pro.py          # Narration and character dialogues
│   │   └── image_generator.py     # HF diffusion & comic canvas graphic generator
│   │
│   ├── services/
│   │   ├── __init__.py
│   │   ├── layout_builder.py      # Combines panels, dialogue, and illustrations
│   │   └── exporters.py           # FPDF2 comic booklet compiler
│   │
│   └── models/
│       ├── __init__.py
│       └── schemas.py             # Pydantic schemas (PromptRequest, ComicResponse)
│
├── templates/
│   ├── index.html                 # Homepage with hero & creation form
│   ├── comic_preview.html         # Panel-by-panel comic reader with speech bubbles
│   └── export_success.html        # Export confirmation and PDF download page
│
├── static/
│   ├── css/
│   │   └── style.css              # Custom comic design system
│   ├── js/
│   │   └── script.js              # Form validation, presets & 6-stage progress bar
│   ├── images/
│   │   └── logo.png               # ComicCraft brand logo
│   ├── panels/                    # Generated panel illustrations
│   └── exports/                   # Generated comic PDF booklets
│
├── .env                           # Local environment variables (API keys)
├── .env.example                   # Example environment variables template
├── .gitignore                     # Git ignore rules
├── requirements.txt               # Python package dependencies
├── README.md                      # Documentation
└── run.py                         # Application server runner
```

---

## 🚀 Windows Setup & Installation

### 1. Clone or Open the Workspace

Open PowerShell or Command Prompt in the project folder:
```powershell
cd d:\aistorytelling
```

### 2. Create and Activate Virtual Environment

```powershell
python -m venv venv
venv\Scripts\activate
```

*(If using `uv`: `uv venv venv` and `venv\Scripts\activate`)*

### 3. Install Dependencies

```powershell
pip install -r requirements.txt
```

### 4. Configure Environment Variables

Create `.env` by copying `.env.example`:
```powershell
cp .env.example .env
```

Open `.env` and add your API keys:
```ini
GEMINI_API_KEY=your_gemini_api_key_here
HF_API_KEY=your_huggingface_api_key_here
APP_ENV=development
HOST=127.0.0.1
PORT=8000
```

> **Note**: Even without API keys, ComicCraft runs with a built-in intelligent story and comic canvas graphic fallback generator, making it 100% testable immediately!

---

## 🏃 Running the Application

Start the local server using `run.py`:

```powershell
python run.py
```

- **Web Application**: [http://127.0.0.1:8000](http://127.0.0.1:8000)
- **Interactive Swagger API Docs**: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
- **ReDoc Documentation**: [http://127.0.0.1:8000/redoc](http://127.0.0.1:8000/redoc)

---

## 🧪 Testing the Application

### Health Check

```powershell
curl http://127.0.0.1:8000/health
```
Response:
```json
{"status": "ok"}
```

### Diagnostic Image Generation Test

```powershell
curl http://127.0.0.1:8000/test-image
```
Response:
```json
{
  "status": "success",
  "message": "Image generated successfully",
  "image_url": "/static/panels/test_sample_xyz.png"
}
```

### JSON API Test (Programmatic Comic Generation)

Send a POST request to `/generate-comic/json`:
```powershell
curl -X POST "http://127.0.0.1:8000/generate-comic/json" ^
  -H "Content-Type: application/json" ^
  -d "{\"story_prompt\": \"A young wizard discovers a clock that pauses time\", \"character_name\": \"Arin\", \"setting\": \"School\", \"tone\": \"Adventure\", \"art_style\": \"Comic Book\", \"panel_count\": 5}"
```

---

## 📖 User Workflow Walkthrough

1. **Homepage**: Enter your story prompt, choose your character name, select setting, tone, art style, and choose the number of panels (3, 5, 6, or 8). You can also click any of the 5 **Quick Story Presets** (e.g. *Mystic Forest Fox*, *Cyber Detective*, *Cosmic Horizon*).
2. **Submit & Loading**: Click **Generate Comic**. The button locks against duplicate submissions and an animated 6-stage loading overlay displays real-time progress:
   - Stage 1: Understanding your story...
   - Stage 2: Creating comic outline...
   - Stage 3: Writing dialogue...
   - Stage 4: Creating illustrations...
   - Stage 5: Building comic layout...
   - Stage 6: Preparing PDF...
3. **Comic Preview**: Review your generated comic strip in a responsive grid. Each panel features a stylized badge, the illustration, scene description, caption box, narration ribbon, and character speech bubble.
4. **PDF Download**: Click **Download PDF** to obtain the compiled multi-page comic booklet complete with stylized cover page, metadata, and comic pages.
5. **Success Page**: Access `/export-success` to inspect export confirmation details or start a new comic.

---

## 💡 Example Prompt & Output

### Example Input
- **Story Prompt**: *"A brave fox exploring an enchanted forest to uncover a celestial crystal"*
- **Character Name**: `Leo`
- **Setting**: `Forest`
- **Tone**: `Adventure`
- **Art Style**: `Comic Book`
- **Panels**: `5`

### Example Generated Output
- **Comic Title**: `Leo's Adventure Chronicle: The Forest Quest`
- **Panel 1**:
  - **Title**: `Panel 1: The Beginning`
  - **Scene**: `Leo stands ready at the border of the forest, preparing to embark on an uncharted quest.`
  - **Caption**: `"The journey begins where ordinary maps end."`
  - **Narration**: `Under a quiet sky, Leo stepped forward, ready to face the uncharted.`
  - **Dialogue**: `Leo: "Whatever lies ahead, there is no turning back now."`
- **Export PDF**: `static/exports/comic_YYYYMMDD_HHMMSS_xxxx.pdf`

---

## 🔧 Troubleshooting

- **Port 8000 in use**: Set `PORT=8080` in `.env` or run `uvicorn app.main:app --port 8080`.
- **Missing API Keys**: ComicCraft automatically invokes its built-in fallback engine when API keys are absent, ensuring that layout, story, styling, and PDF generation work offline.
- **PDF Characters**: The PDF exporter automatically cleans and sanitizes UTF-8 smart quotes and unicode dashes into standard typography to prevent rendering errors.

---

## 📜 License
Released under the MIT License. Developed with ❤️ for comic lovers and generative AI enthusiasts.
