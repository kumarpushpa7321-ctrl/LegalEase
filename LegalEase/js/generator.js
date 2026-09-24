document.addEventListener('DOMContentLoaded', () => {
    // Pre-select template if navigated from dashboard
    const selectedTemplate = localStorage.getItem('selectedTemplate');
    if (selectedTemplate) {
        const docTypeSelect = document.getElementById('docType');
        if (docTypeSelect) {
            docTypeSelect.value = selectedTemplate;
            // Clear it so it doesn't stick forever
            localStorage.removeItem('selectedTemplate');
        }
    }

    // Dynamic Form Handlers
    const addPartyBtn = document.getElementById('add-party-btn');
    const addTermBtn = document.getElementById('add-term-btn');
    const partiesContainer = document.getElementById('parties-container');
    const termsContainer = document.getElementById('terms-container');

    if (addPartyBtn) {
        let partyCount = 2;
        addPartyBtn.addEventListener('click', () => {
            partyCount++;
            const div = document.createElement('div');
            div.className = 'party-block border rounded p-3 mb-3 bg-light';
            div.innerHTML = `
                <div class="d-flex justify-content-between">
                    <h5>Additional Party</h5>
                    <button type="button" class="btn btn-sm btn-outline-danger remove-party"><i class="bi bi-x"></i></button>
                </div>
                <div class="row g-2">
                    <div class="col-md-4">
                        <input type="text" class="form-control party-name" placeholder="Name" required>
                    </div>
                    <div class="col-md-4">
                        <input type="text" class="form-control party-role" placeholder="Role" required>
                    </div>
                    <div class="col-md-4">
                        <input type="text" class="form-control party-address" placeholder="Address" required>
                    </div>
                </div>
            `;
            partiesContainer.appendChild(div);

            div.querySelector('.remove-party').addEventListener('click', () => {
                div.remove();
            });
        });
    }

    if (addTermBtn) {
        addTermBtn.addEventListener('click', () => {
            const div = document.createElement('div');
            div.className = 'input-group mb-2 term-block';
            div.innerHTML = `
                <input type="text" class="form-control term-input" placeholder="Additional term..." required>
                <button class="btn btn-outline-danger remove-term" type="button"><i class="bi bi-trash"></i></button>
            `;
            termsContainer.appendChild(div);

            div.querySelector('.remove-term').addEventListener('click', () => {
                div.remove();
            });
        });

        // Attach to initial remove button
        document.querySelectorAll('.remove-term').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.target.closest('.term-block').remove();
            });
        });
    }

    // Form Submission
    const form = document.getElementById('document-form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Gather data
            const parties = [];
            document.querySelectorAll('.party-block').forEach(block => {
                parties.push({
                    name: block.querySelector('.party-name').value,
                    role: block.querySelector('.party-role').value,
                    address: block.querySelector('.party-address').value
                });
            });

            const terms = [];
            document.querySelectorAll('.term-input').forEach(input => {
                if (input.value.trim()) terms.push(input.value.trim());
            });

            const requestData = {
                document_type: document.getElementById('docType').value,
                title: document.getElementById('docTitle').value,
                effective_date: document.getElementById('effectiveDate').value,
                expiration_date: document.getElementById('expirationDate').value || null,
                parties: parties,
                terms: terms,
                additional_instructions: document.getElementById('additionalInstructions').value || null,
                company_name: document.getElementById('companyName').value || null
            };

            // Show loading
            document.getElementById('loading-overlay').style.display = 'flex';
            document.getElementById('error-alert').classList.add('d-none');

            try {
                // Simulate network delay
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Generate simulated document content
                let partiesText = requestData.parties.map((p, i) => `Party ${i + 1}: **${p.name}** (${p.role}), located at ${p.address}`).join('\\n');
                let termsText = requestData.terms.map((t, i) => `${i + 1}. ${t}`).join('\\n');
                
                const generatedContent = `
**${requestData.title}**
Type: ${requestData.document_type}
Effective Date: ${requestData.effective_date}
Expiration Date: ${requestData.expiration_date || 'N/A'}
Company: ${requestData.company_name || 'N/A'}

**Parties Involved**
${partiesText}

**Terms and Conditions**
${termsText}

**Additional Instructions**
${requestData.additional_instructions || 'None'}

*This document was generated automatically by LegalEase (Static Version).*
                `.trim();
                
                // Save to dashboard
                const docToSave = {
                    title: requestData.title,
                    type: requestData.document_type,
                    companyName: requestData.company_name,
                    content: generatedContent
                };
                
                const savedDoc = saveDocumentToHistory(docToSave);
                localStorage.setItem('currentPreview', JSON.stringify(savedDoc));
                
                // Redirect to preview
                window.location.href = 'preview.html';
                
            } catch (error) {
                document.getElementById('loading-overlay').style.display = 'none';
                const errorAlert = document.getElementById('error-alert');
                errorAlert.textContent = `Error: ${error.message}`;
                errorAlert.classList.remove('d-none');
                window.scrollTo(0, 0);
            }
        });
    }
});
