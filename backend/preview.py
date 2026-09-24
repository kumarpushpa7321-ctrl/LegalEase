from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="Preview API")

# Enable CORS so any frontend can call this API if needed
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PreviewRequest(BaseModel):
    title: str = "Document Preview"
    content: str
    format: str = "html"

@app.post("/api/preview")
async def generate_preview(request: PreviewRequest):
    """
    A simple API endpoint to generate a preview.
    It takes content and returns formatted HTML or plain text.
    """
    if not request.content:
        raise HTTPException(status_code=400, detail="Content is required")
        
    if request.format == "html":
        # Simple text to HTML logic (replaces newlines with <br> tags)
        formatted_content = request.content.replace("\n", "<br>")
        html_preview = f"<h1>{request.title}</h1><p>{formatted_content}</p>"
        return {"status": "success", "preview": html_preview}
    
    return {"status": "success", "preview": request.content}

@app.get("/")
async def health_check():
    return {"status": "ok", "message": "Preview API is running!"}

if __name__ == "__main__":
    import uvicorn
    # Run this file with: python preview.py
    uvicorn.run("preview:app", host="0.0.0.0", port=8000, reload=True)
