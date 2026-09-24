let isEditing = false;
let currentDoc = null;

document.addEventListener('DOMContentLoaded', () => {
    const rawData = localStorage.getItem('currentPreview');
    if (!rawData) {
        window.location.href = 'index.html';
        return;
    }
    
    currentDoc = JSON.parse(rawData);
    
    document.getElementById('doc-title-display').textContent = currentDoc.title;
    
    const previewDiv = document.getElementById('document-preview');
    const editorArea = document.getElementById('document-editor');
    
    // Set content (replace double asterisks with bold tags for preview)
    const formattedContent = currentDoc.content
        .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
        .replace(/\n/g, '<br>');
        
    previewDiv.innerHTML = formattedContent;
    editorArea.value = currentDoc.content;

    // Toggle Edit
    document.getElementById('toggle-edit-btn').addEventListener('click', (e) => {
        isEditing = !isEditing;
        if (isEditing) {
            previewDiv.style.display = 'none';
            editorArea.style.display = 'block';
            e.target.innerHTML = '<i class="bi bi-save"></i> Save Changes';
            e.target.classList.remove('btn-outline-secondary');
            e.target.classList.add('btn-success');
        } else {
            // Save and render
            currentDoc.content = editorArea.value;
            // Update local storage
            const docs = getDocuments();
            const index = docs.findIndex(d => d.id === currentDoc.id);
            if (index !== -1) {
                docs[index].content = currentDoc.content;
                localStorage.setItem('legalDocs', JSON.stringify(docs));
                localStorage.setItem('currentPreview', JSON.stringify(currentDoc));
            }

            const newFormatted = currentDoc.content
                .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
                .replace(/\n/g, '<br>');
            previewDiv.innerHTML = newFormatted;
            
            previewDiv.style.display = 'block';
            editorArea.style.display = 'none';
            e.target.innerHTML = '<i class="bi bi-pencil"></i> Edit Text';
            e.target.classList.remove('btn-success');
            e.target.classList.add('btn-outline-secondary');
        }
    });
});

async function exportDoc(format) {
    const errorDiv = document.getElementById('export-error');
    errorDiv.classList.add('d-none');
    
    if (isEditing) {
        errorDiv.textContent = "Please save your changes before exporting.";
        errorDiv.classList.remove('d-none');
        return;
    }

    const formData = new FormData();
    formData.append('content', currentDoc.content);
    formData.append('title', currentDoc.title);
    formData.append('format', format);
    if (currentDoc.companyName) {
        formData.append('company_name', currentDoc.companyName);
    }

    const logoInput = document.getElementById('logo-upload');
    if (logoInput.files.length > 0) {
        formData.append('logo', logoInput.files[0]);
    }

    try {
        incrementDownload();

        // Create a blob directly on the client side
        let fileContent = currentDoc.content;
        let mimeType = 'text/plain';
        if (format === 'html') {
            fileContent = `<!DOCTYPE html><html><head><title>${currentDoc.title}</title></head><body>` + currentDoc.content.replace(/\\n/g, '<br>') + `</body></html>`;
            mimeType = 'text/html';
        }

        const blob = new Blob([fileContent], { type: mimeType });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        
        // Construct filename
        const cleanTitle = currentDoc.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        a.download = `${cleanTitle}.${format}`;
        
        document.body.appendChild(a);
        a.click();
        
        window.URL.revokeObjectURL(url);
        a.remove();
        
    } catch (error) {
        errorDiv.textContent = `Error: ${error.message}`;
        errorDiv.classList.remove('d-none');
    }
}
