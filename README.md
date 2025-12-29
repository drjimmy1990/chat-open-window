# 🏢 Blade Properties Chat Assistant

An **AI-powered chatbot widget** that intelligently identifies real estate projects from natural language and opens project galleries based on user queries. Built with **n8n workflow automation** and **Google Gemini AI**.

---

## 🎯 Overview

This project provides a conversational AI assistant for "Blade Properties" that can:

- **Understand natural language** – Users can ask about properties in plain English/Arabic
- **Identify projects** – AI determines which project the user is asking about
- **Take action** – Automatically opens project galleries in various display modes

### Demo Available Projects

| Project Name | Code | Description |
|--------------|------|-------------|
| The Downtown Skyscraper | `Project-A` | A flagship 85-floor skyscraper development |
| The Seaside Villa | `Project-B` | A luxury beachfront villa collection |

---

## 🏗️ Architecture

```mermaid
flowchart LR
    A[User Message] --> B[Webhook]
    B --> C[AI Agent]
    C --> D{Switch}
    D -->|Project-A| E[Open Skyscraper Gallery]
    D -->|Project-B| F[Open Villa Gallery]
    D -->|Fallback| G[Text Response]
    E --> H[Respond to Webhook]
    F --> H
    G --> H
    H --> I[Chat Widget]
```

### Components

1. **Frontend Chat Widget** – HTML/CSS/JavaScript chat interface
2. **n8n Workflow Backend** – Processes messages and routes responses
3. **Google Gemini AI** – Natural language understanding for project identification
4. **Project Gallery Pages** – Premium HTML pages with project content

---

## 📁 Project Structure

```
CHAT OPEN WINDOW/
├── config.js              # ⚙️ Centralized configuration (webhook URL, messages)
├── index-newtab.html      # Chat widget (opens projects in new tab)
├── index-newwindow.html   # Chat widget (opens projects in popup window)
├── separated.html         # Chat widget (opens projects in modal/iframe)
├── project-a.html         # 🏙️ The Downtown Skyscraper gallery
├── project-b.html         # 🏖️ The Seaside Villa gallery
├── n8n-workflow.json      # n8n workflow export (backend logic)
└── README.md              # This documentation
```

---

## ⚙️ Configuration

All settings are centralized in **`config.js`** for easy editing:

```javascript
const CONFIG = {
    // n8n Webhook URL - Update this to your n8n instance
    webhookUrl: 'https://n8n.ai-eg.online/webhook/YOUR-WEBHOOK-ID',
    
    // Bot settings
    botName: 'Blade Properties Assistant',
    welcomeMessage: 'Hello! Ask me to show you "The Downtown Skyscraper" or "The Seaside Villa".',
    
    // Messages
    messages: {
        actionResponse: "Of course! I'll open the page for that project.",
        modalActionResponse: "Of course! Opening the project gallery for you.",
        unexpectedFormat: "I received a response, but it had an unexpected format.",
        errorMessage: "Sorry, there was an issue processing the response."
    }
};
```

### Quick Setup

1. Open `config.js`
2. Update `webhookUrl` with your n8n webhook URL
3. Customize `botName` and messages as needed
4. Done! All chat widgets will use the new settings

---

## 🚀 Features

### 💬 Chat Widget Variants

| File | Display Mode | Best For |
|------|--------------|----------|
| `index-newtab.html` | Opens in new browser tab | Desktop browsing |
| `index-newwindow.html` | Opens in popup window (900x700) | Focused viewing |
| `separated.html` | Opens in overlay modal/iframe | Single-page experience |

### 🏙️ Project A: The Downtown Skyscraper

Premium gallery page featuring:
- Hero section with full-width imagery
- Key stats (85 floors, 420m height, 250 units)
- Premium amenities grid (pool, fitness, dining, etc.)
- Image gallery with hover effects
- Call-to-action section

### 🏖️ Project B: The Seaside Villa

Coastal luxury gallery featuring:
- Beachfront hero with wave divider
- Beach stats section
- Villa collection cards (Pearl, Coral, Azure)
- Resort amenities grid
- Responsive image gallery
- Dual CTA buttons

### 🤖 AI Capabilities

- **Project Identification** – Recognizes project names, aliases, and context
- **Intent Classification** – Distinguishes between project requests and general chat
- **Action/Text Response** – Returns structured JSON for frontend handling

---

## 📤 Response Types

```json
// Action Response (opens a page)
{
  "type": "action",
  "content": "https://example.com/project-gallery"
}

// Text Response (displays message)
{
  "type": "text",
  "content": "Sorry, I couldn't identify which project you meant."
}
```

---

## ⚙️ n8n Workflow

### Workflow Nodes

1. **Webhook** – Receives POST requests with user messages
2. **AI Agent** – Uses Gemini AI to classify the message
3. **Google Gemini Chat Model** – LLM for natural language processing
4. **Switch** – Routes based on AI output (`Project-A`, `Project-B`, or fallback)
5. **Edit Fields** – Constructs the response payload
6. **Respond to Webhook** – Returns JSON to the frontend

### Webhook Request

| Field | Type | Description |
|-------|------|-------------|
| `message` | string | User's chat message |

---

## 🛠️ Setup & Installation

### Prerequisites

- [n8n](https://n8n.io/) instance (self-hosted or cloud)
- Google Gemini API credentials
- Web server for hosting HTML files

### Step 1: Import n8n Workflow

1. Open your n8n instance
2. Go to **Workflows** → **Import from File**
3. Upload `n8n-workflow.json`
4. Configure the **Google Gemini Chat Model** node with your API key
5. Activate the workflow

### Step 2: Update Configuration

Edit `config.js` and update the webhook URL:

```javascript
webhookUrl: 'https://YOUR-N8N-INSTANCE/webhook/YOUR-WEBHOOK-ID',
```

### Step 3: Add Project Gallery URLs

In the n8n workflow "Edit Fields" nodes, update the URLs to your hosted gallery pages:

```javascript
// Edit Fields2 (Project-A)
"content": "https://your-domain.com/project-a.html"

// Edit Fields3 (Project-B)
"content": "https://your-domain.com/project-b.html"
```

### Step 4: Deploy the Frontend

Host the HTML files on any web server:

- **Local development**: Use `python -m http.server` or VS Code Live Server
- **Production**: Deploy to Netlify, Vercel, GitHub Pages, or any static hosting

> ⚠️ **Important**: When opening HTML files directly from the filesystem, some browsers block the `config.js` import. Use a local server for development.

---

## 💡 Customization

### Adding New Projects

1. **Create Gallery Page** – Add `project-c.html` with the project content

2. **Update AI Agent System Message** (in n8n):
   ```
   The available projects are:
   - "The Downtown Skyscraper" which has the code 'Project-A'.
   - "The Seaside Villa" which has the code 'Project-B'.
   - "The Mountain Resort" which has the code 'Project-C'.  ← ADD NEW
   ```

3. **Add Switch Condition** – Add a new branch for `Project-C`

4. **Create Edit Fields Node** – Configure the URL for the new project

### Styling the Chat Widget

All styling is contained within each HTML file's `<style>` block. Key classes:

| Class | Purpose |
|-------|---------|
| `.chat-widget` | Main container (width, height, shadow) |
| `.chat-header` | Header bar (background color, title) |
| `.user-message` | User message bubbles (background, alignment) |
| `.bot-message` | Bot message bubbles (background, alignment) |

---

## 📋 Example Interactions

| User Says | AI Detects | Result |
|-----------|------------|--------|
| "Show me the skyscraper" | Project-A | Opens skyscraper gallery |
| "I want to see the villa" | Project-B | Opens villa gallery |
| "Tell me about downtown tower" | Project-A | Opens skyscraper gallery |
| "Show me the beach property" | Project-B | Opens villa gallery |
| "Hello, how are you?" | N/A | Text response |

---

## 🔒 Security Considerations

- Webhook is publicly accessible – consider adding authentication
- CORS must be configured on n8n (already handled via `origin: null`)
- Sensitive project URLs should be protected if needed

---

## 📜 License

This project is provided as-is for demonstration purposes.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Submit a pull request

---

## 📞 Support

For questions or issues, please open an issue in the repository or contact the development team.

---

**Built with ❤️ using n8n + Google Gemini AI**
