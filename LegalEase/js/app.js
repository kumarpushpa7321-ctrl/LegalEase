// No API needed, static app only
// Initialize local storage if empty
function initStorage() {
    if (!localStorage.getItem('legalDocs')) {
        localStorage.setItem('legalDocs', JSON.stringify([]));
    }
}

// Save document to history
function saveDocumentToHistory(docData) {
    initStorage();
    const docs = JSON.parse(localStorage.getItem('legalDocs'));
    docData.id = Date.now().toString();
    docData.date = new Date().toLocaleDateString();
    docs.unshift(docData);
    localStorage.setItem('legalDocs', JSON.stringify(docs));
    return docData;
}

// Get all documents
function getDocuments() {
    initStorage();
    return JSON.parse(localStorage.getItem('legalDocs'));
}

// Update dashboard stats
function updateDashboard() {
    const docs = getDocuments();
    const generatedEl = document.getElementById('stat-generated');
    if (generatedEl) generatedEl.textContent = docs.length;
    
    // Simulate downloads for dashboard (could be tracked, but let's just use generated * 0.8 for visual)
    const downloadedEl = document.getElementById('stat-downloaded');
    if (downloadedEl) {
        const downloads = localStorage.getItem('downloadCount') || 0;
        downloadedEl.textContent = downloads;
    }

    const tbody = document.getElementById('recent-docs-body');
    if (tbody && docs.length > 0) {
        tbody.innerHTML = '';
        docs.slice(0, 5).forEach(doc => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>${doc.title}</strong></td>
                <td><span class="badge bg-secondary">${doc.type}</span></td>
                <td>${doc.date}</td>
                <td>
                    <button class="btn btn-sm btn-outline-primary" onclick="viewDocument('${doc.id}')">View</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }
}

// Track downloads
function incrementDownload() {
    let count = parseInt(localStorage.getItem('downloadCount') || '0');
    localStorage.setItem('downloadCount', count + 1);
}

function viewDocument(id) {
    const docs = getDocuments();
    const doc = docs.find(d => d.id === id);
    if (doc) {
        localStorage.setItem('currentPreview', JSON.stringify(doc));
        window.location.href = 'preview.html';
    }
}

function startGeneration(type) {
    localStorage.setItem('selectedTemplate', type);
    window.location.href = 'generator.html';
}

// Run on page load
document.addEventListener('DOMContentLoaded', () => {
    initStorage();
    updateDashboard();
});
