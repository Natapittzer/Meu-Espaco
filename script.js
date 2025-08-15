// App State
let appState = {
    files: [],
    links: [],
    events: [],
    notes: [],
    currentDate: new Date(),
    currentSection: 'files'
};

// DOM Elements
const elements = {
    // Navigation
    navItems: document.querySelectorAll('.nav-item'),
    contentSections: document.querySelectorAll('.content-section'),
    
    // Theme
    themeToggle: document.getElementById('theme-toggle'),
    body: document.body,
    
    // Files
    uploadArea: document.getElementById('upload-area'),
    uploadZone: document.querySelector('.upload-zone'),
    fileInput: document.getElementById('file-input'),
    filesGrid: document.getElementById('files-grid'),
    uploadBtn: document.getElementById('upload-btn'),
    
    // Links
    linksContainer: document.getElementById('links-container'),
    addLinkBtn: document.getElementById('add-link-btn'),
    linkModal: document.getElementById('link-modal'),
    linkForm: document.getElementById('link-form'),
    
    // Calendar
    calendarDays: document.getElementById('calendar-days'),
    currentMonth: document.getElementById('current-month'),
    prevMonth: document.getElementById('prev-month'),
    nextMonth: document.getElementById('next-month'),
    addEventBtn: document.getElementById('add-event-btn'),
    eventModal: document.getElementById('event-modal'),
    eventForm: document.getElementById('event-form'),
    
    // Notes
    notesContainer: document.getElementById('notes-container'),
    addNoteBtn: document.getElementById('add-note-btn'),
    noteModal: document.getElementById('note-modal'),
    noteForm: document.getElementById('note-form'),
    
    // Modals
    modalOverlay: document.getElementById('modal-overlay'),
    modalClose: document.querySelectorAll('.modal-close'),
    modalCancel: document.querySelectorAll('.modal-cancel'),
    
    // Export/Import
    exportBtn: document.getElementById('export-btn'),
    importBtn: document.getElementById('import-btn'),
    importInput: document.getElementById('import-input'),
    
    // Notifications
    notificationContainer: document.getElementById('notification-container')
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    try {
        loadData();
        initializeEventListeners();
        renderCurrentSection();
        checkReminders();
        requestNotificationPermission();
        
        // Check for reminders every minute
        setInterval(checkReminders, 60000);
        
        // Add test reminder function to window for debugging
        window.testReminder = () => {
            const testItem = {
                id: 'test',
                title: 'Teste de Lembrete',
                reminder: new Date(Date.now() + 10000).toISOString() // 10 seconds from now
            };
            
            showNotification(
                'Teste de Lembrete',
                'Este é um teste do sistema de lembretes. Configure um lembrete real para testar.',
                'warning',
                5000
            );
            
            // Check again in 10 seconds
            setTimeout(() => {
                showNotification(
                    'Lembrete de Teste',
                    'Este lembrete deveria aparecer agora!',
                    'warning',
                    10000
                );
            }, 10000);
        };
        
        console.log('Aplicação inicializada com sucesso');
    } catch (error) {
        console.error('Erro na inicialização da aplicação:', error);
    }
});

// Event Listeners
function initializeEventListeners() {
    // Navigation
    elements.navItems.forEach(item => {
        item.addEventListener('click', () => {
            const section = item.dataset.section;
            switchSection(section);
        });
    });
    
    // Theme Toggle
    elements.themeToggle.addEventListener('click', toggleTheme);
    
    // File Upload
    if (elements.uploadBtn && elements.fileInput) {
        elements.uploadBtn.addEventListener('click', () => elements.fileInput.click());
    }
    if (elements.fileInput) {
        elements.fileInput.addEventListener('change', handleFileUpload);
    }
    if (elements.uploadZone && elements.fileInput) {
        elements.uploadZone.addEventListener('click', () => elements.fileInput.click());
    }
    
    // Drag and Drop
    if (elements.uploadZone) {
        elements.uploadZone.addEventListener('dragover', handleDragOver);
        elements.uploadZone.addEventListener('dragleave', handleDragLeave);
        elements.uploadZone.addEventListener('drop', handleDrop);
    }
    
    // Links
    if (elements.addLinkBtn) {
        elements.addLinkBtn.addEventListener('click', () => openModal('link-modal'));
    }
    if (elements.linkForm) {
        elements.linkForm.addEventListener('submit', handleAddLink);
    }
    
    // Calendar
    if (elements.prevMonth) {
        elements.prevMonth.addEventListener('click', () => changeMonth(-1));
    }
    if (elements.nextMonth) {
        elements.nextMonth.addEventListener('click', () => changeMonth(1));
    }
    if (elements.addEventBtn) {
        elements.addEventBtn.addEventListener('click', () => openModal('event-modal'));
    }
    if (elements.eventForm) {
        elements.eventForm.addEventListener('submit', handleAddEvent);
    }
    
    // Notes
    if (elements.addNoteBtn) {
        elements.addNoteBtn.addEventListener('click', () => openModal('note-modal'));
    }
    if (elements.noteForm) {
        elements.noteForm.addEventListener('submit', handleAddNote);
    }
    
    // Modals
    if (elements.modalClose) {
        elements.modalClose.forEach(btn => btn.addEventListener('click', closeModal));
    }
    if (elements.modalCancel) {
        elements.modalCancel.forEach(btn => btn.addEventListener('click', closeModal));
    }
    if (elements.modalOverlay) {
        elements.modalOverlay.addEventListener('click', (e) => {
            if (e.target === elements.modalOverlay) closeModal();
        });
    }
    
    // Export/Import
    if (elements.exportBtn) {
        elements.exportBtn.addEventListener('click', exportData);
    }
    if (elements.importBtn && elements.importInput) {
        elements.importBtn.addEventListener('click', () => elements.importInput.click());
    }
    if (elements.importInput) {
        elements.importInput.addEventListener('change', importData);
    }
    
    // Test Reminder
    const testReminderBtn = document.getElementById('test-reminder-btn');
    if (testReminderBtn) {
        testReminderBtn.addEventListener('click', () => {
            showNotification(
                'Teste de Lembrete',
                'Testando sistema de notificações... Em 5 segundos aparecerá outro lembrete.',
                'warning',
                5000
            );
            
            setTimeout(() => {
                showNotification(
                    'Lembrete de Teste',
                    '✅ Sistema de lembretes funcionando! Configure um lembrete real para testar.',
                    'success',
                    8000
                );
            }, 5000);
        });
    }
}

// Navigation
function switchSection(section) {
    // Update navigation
    elements.navItems.forEach(item => {
        item.classList.remove('active');
        if (item.dataset.section === section) {
            item.classList.add('active');
        }
    });
    
    // Update content sections
    elements.contentSections.forEach(content => {
        content.classList.remove('active');
        if (content.id === section) {
            content.classList.add('active');
        }
    });
    
    appState.currentSection = section;
    renderCurrentSection();
}

function renderCurrentSection() {
    switch (appState.currentSection) {
        case 'files':
            if (typeof renderFiles === 'function') renderFiles();
            break;
        case 'links':
            if (typeof renderLinks === 'function') renderLinks();
            break;
        case 'calendar':
            if (typeof renderCalendar === 'function') renderCalendar();
            break;
        case 'notes':
            if (typeof renderNotes === 'function') renderNotes();
            break;
    }
}

// Theme Management
function toggleTheme() {
    elements.body.classList.toggle('light-theme');
    const isLight = elements.body.classList.contains('light-theme');
    elements.themeToggle.innerHTML = isLight ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    saveData();
}

// File Management
function handleFileUpload(event) {
    const files = Array.from(event.target.files);
    files.forEach(file => {
        if (file.size > 10 * 1024 * 1024) { // 10MB limit
            showNotification('Arquivo muito grande', 'O arquivo deve ter menos de 10MB', 'error');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = (e) => {
            const fileData = {
                id: generateId(),
                name: file.name,
                type: file.type,
                size: file.size,
                data: e.target.result,
                date: new Date().toISOString(),
                reminder: null
            };
            
            appState.files.push(fileData);
            saveData();
            renderFiles();
            showNotification('Arquivo adicionado', `${file.name} foi adicionado com sucesso`, 'success');
        };
        reader.readAsDataURL(file);
    });
    
    event.target.value = '';
}

function handleDragOver(e) {
    e.preventDefault();
    elements.uploadZone.classList.add('dragover');
}

function handleDragLeave(e) {
    e.preventDefault();
    if (!elements.uploadZone.contains(e.relatedTarget)) {
        elements.uploadZone.classList.remove('dragover');
    }
}

function handleDrop(e) {
    e.preventDefault();
    elements.uploadZone.classList.remove('dragover');
    
    const files = Array.from(e.dataTransfer.files);
    files.forEach(file => {
        const input = elements.fileInput;
        input.files = e.dataTransfer.files;
        handleFileUpload({ target: input });
    });
}

function renderFiles() {
    if (!elements.filesGrid) return;
    
    if (appState.files.length === 0) {
        elements.filesGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">Nenhum arquivo adicionado ainda</p>';
        return;
    }
    
    elements.filesGrid.innerHTML = appState.files.map(file => `
        <div class="file-card" data-id="${file.id}">
            ${file.type.startsWith('image/') 
                ? `<img src="${file.data}" alt="${file.name}">` 
                : `<div class="file-icon"><i class="fas fa-file"></i></div>`
            }
            <h4>${file.name}</h4>
            <p>${formatFileSize(file.size)} • ${formatDate(file.date)}</p>
            ${file.reminder ? `<div class="reminder-badge">Lembrete: ${formatDate(file.reminder)}</div>` : ''}
            <div class="file-actions">
                <button onclick="downloadFile('${file.id}')" title="Download">
                    <i class="fas fa-download"></i>
                </button>
                <button onclick="setFileReminder('${file.id}')" title="Definir Lembrete">
                    <i class="fas fa-bell"></i>
                </button>
                <button onclick="deleteFile('${file.id}')" title="Excluir">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
}

function downloadFile(fileId) {
    const file = appState.files.find(f => f.id === fileId);
    if (!file) return;
    
    const link = document.createElement('a');
    link.href = file.data;
    link.download = file.name;
    link.click();
}

function deleteFile(fileId) {
    if (confirm('Tem certeza que deseja excluir este arquivo?')) {
        appState.files = appState.files.filter(f => f.id !== fileId);
        saveData();
        renderFiles();
        showNotification('Arquivo excluído', 'Arquivo removido com sucesso', 'success');
    }
}

function setFileReminder(fileId) {
    const file = appState.files.find(f => f.id === fileId);
    if (!file) return;
    
    // Create a modal for setting reminder
    const reminderModal = document.createElement('div');
    reminderModal.className = 'modal-overlay active';
    reminderModal.innerHTML = `
        <div class="modal">
            <div class="modal-header">
                <h3>Definir Lembrete para ${file.name}</h3>
                <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">&times;</button>
            </div>
            <div class="modal-body">
                <form id="reminder-form">
                    <div class="form-group">
                        <label for="reminder-date">Data</label>
                        <input type="date" id="reminder-date" required>
                    </div>
                    <div class="form-group">
                        <label for="reminder-time">Hora</label>
                        <input type="time" id="reminder-time" required>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">Cancelar</button>
                        <button type="submit" class="btn-primary">Salvar Lembrete</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    document.body.appendChild(reminderModal);
    
    // Set current date and time as default
    const now = new Date();
    document.getElementById('reminder-date').value = now.toISOString().split('T')[0];
    document.getElementById('reminder-time').value = now.toTimeString().slice(0, 5);
    
    // Handle form submission
    document.getElementById('reminder-form').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const date = document.getElementById('reminder-date').value;
        const time = document.getElementById('reminder-time').value;
        
        if (date && time) {
            file.reminder = new Date(`${date}T${time}`).toISOString();
            saveData();
            renderFiles();
            showNotification('Lembrete definido', `Lembrete configurado para ${formatDate(file.reminder)}`, 'success');
            reminderModal.remove();
        }
    });
}

// Link Management
function handleAddLink(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const link = {
        id: generateId(),
        title: formData.get('title') || document.getElementById('link-title').value,
        url: formData.get('url') || document.getElementById('link-url').value,
        description: formData.get('description') || document.getElementById('link-description').value,
        date: new Date().toISOString(),
        reminder: document.getElementById('link-reminder').value ? new Date(document.getElementById('link-reminder').value).toISOString() : null
    };
    
    appState.links.push(link);
    saveData();
    renderLinks();
    closeModal();
    e.target.reset();
    showNotification('Link adicionado', `${link.title} foi adicionado com sucesso`, 'success');
}

function renderLinks() {
    if (!elements.linksContainer) return;
    
    if (appState.links.length === 0) {
        elements.linksContainer.innerHTML = '<p style="text-align: center; color: var(--text-muted);">Nenhum link adicionado ainda</p>';
        return;
    }
    
    elements.linksContainer.innerHTML = appState.links.map(link => `
        <div class="link-card" data-id="${link.id}">
            <h4>${link.title}</h4>
            <a href="${link.url}" target="_blank">${link.url}</a>
            <p>${link.description}</p>
            <p><small>Adicionado em: ${formatDate(link.date)}</small></p>
            ${link.reminder ? `<div class="reminder-badge">Lembrete: ${formatDate(link.reminder)}</div>` : ''}
            <div class="link-actions">
                <button onclick="editLink('${link.id}')" class="btn-secondary">
                    <i class="fas fa-edit"></i> Editar
                </button>
                <button onclick="deleteLink('${link.id}')" class="btn-secondary">
                    <i class="fas fa-trash"></i> Excluir
                </button>
            </div>
        </div>
    `).join('');
}

function deleteLink(linkId) {
    if (confirm('Tem certeza que deseja excluir este link?')) {
        appState.links = appState.links.filter(l => l.id !== linkId);
        saveData();
        renderLinks();
        showNotification('Link excluído', 'Link removido com sucesso', 'success');
    }
}

function editLink(linkId) {
    const link = appState.links.find(l => l.id === linkId);
    if (!link) return;
    
    document.getElementById('link-title').value = link.title;
    document.getElementById('link-url').value = link.url;
    document.getElementById('link-description').value = link.description;
    document.getElementById('link-reminder').value = link.reminder ? new Date(link.reminder).toISOString().slice(0, 16) : '';
    
    // Update form to handle edit
    elements.linkForm.onsubmit = (e) => {
        e.preventDefault();
        
        link.title = document.getElementById('link-title').value;
        link.url = document.getElementById('link-url').value;
        link.description = document.getElementById('link-description').value;
        link.reminder = document.getElementById('link-reminder').value ? new Date(document.getElementById('link-reminder').value).toISOString() : null;
        
        saveData();
        renderLinks();
        closeModal();
        elements.linkForm.reset();
        elements.linkForm.onsubmit = handleAddLink; // Reset to original handler
        showNotification('Link atualizado', `${link.title} foi atualizado com sucesso`, 'success');
    };
    
    openModal('link-modal');
}

// Calendar Management
function changeMonth(delta) {
    const newDate = new Date(appState.currentDate);
    newDate.setMonth(newDate.getMonth() + delta);
    appState.currentDate = newDate;
    renderCalendar();
}

function renderCalendar() {
    const year = appState.currentDate.getFullYear();
    const month = appState.currentDate.getMonth();
    
    elements.currentMonth.textContent = new Date(year, month).toLocaleDateString('pt-BR', { 
        month: 'long', 
        year: 'numeric' 
    });
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    let calendarHTML = '';
    const today = new Date();
    
    for (let i = 0; i < 42; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i);
        
        const isOtherMonth = currentDate.getMonth() !== month;
        const isToday = currentDate.toDateString() === today.toDateString();
        const hasEvents = appState.events.some(event => {
            const eventDate = new Date(event.date);
            return eventDate.toDateString() === currentDate.toDateString();
        });
        
        const dayEvents = appState.events.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate.toDateString() === currentDate.toDateString();
        });
        
        calendarHTML += `
            <div class="calendar-day ${isOtherMonth ? 'other-month' : ''} ${isToday ? 'today' : ''} ${hasEvents ? 'has-events' : ''}" 
                 onclick="showDayEvents('${currentDate.toISOString()}')">
                <div class="day-number">${currentDate.getDate()}</div>
                ${dayEvents.map(event => `<div class="event-dot" title="${event.title}"></div>`).join('')}
            </div>
        `;
    }
    
    if (elements.calendarDays) {
        elements.calendarDays.innerHTML = calendarHTML;
    }
}

function handleAddEvent(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const event = {
        id: generateId(),
        title: formData.get('title') || document.getElementById('event-title').value,
        date: formData.get('date') || document.getElementById('event-date').value,
        time: formData.get('time') || document.getElementById('event-time').value,
        description: formData.get('description') || document.getElementById('event-description').value
    };
    
    // Combine date and time
    if (event.time) {
        event.date = `${event.date}T${event.time}`;
    }
    
    appState.events.push(event);
    saveData();
    renderCalendar();
    closeModal();
    e.target.reset();
    showNotification('Evento adicionado', `${event.title} foi adicionado ao calendário`, 'success');
}

function showDayEvents(dateString) {
    try {
        const date = new Date(dateString);
        const dayEvents = appState.events.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate.toDateString() === date.toDateString();
        });
        
        if (dayEvents.length === 0) {
            showNotification('Nenhum evento', `Nenhum evento para ${date.toLocaleDateString('pt-BR')}`, 'warning');
            return;
        }
        
        const eventsList = dayEvents.map(event => `
            <div style="margin-bottom: 1rem; padding: 1rem; background: var(--bg-tertiary); border-radius: 0.5rem;">
                <h4 style="margin-bottom: 0.5rem;">${event.title}</h4>
                <p style="color: var(--text-secondary); font-size: 0.875rem;">${event.description || 'Sem descrição'}</p>
                <p style="color: var(--text-muted); font-size: 0.75rem;">${formatDate(event.date)}</p>
            </div>
        `).join('');
        
        showNotification('Eventos do dia', eventsList, 'success', 10000);
    } catch (error) {
        console.error('Erro ao mostrar eventos do dia:', error);
        showNotification('Erro', 'Erro ao carregar eventos do dia', 'error');
    }
}

// Notes Management
function handleAddNote(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const note = {
        id: generateId(),
        title: formData.get('title') || document.getElementById('note-title').value,
        content: formData.get('content') || document.getElementById('note-content').value,
        date: new Date().toISOString(),
        reminder: document.getElementById('note-reminder').value ? new Date(document.getElementById('note-reminder').value).toISOString() : null
    };
    
    appState.notes.push(note);
    saveData();
    renderNotes();
    closeModal();
    e.target.reset();
    showNotification('Nota criada', `${note.title} foi criada com sucesso`, 'success');
}

function renderNotes() {
    if (!elements.notesContainer) return;
    
    if (appState.notes.length === 0) {
        elements.notesContainer.innerHTML = '<p style="text-align: center; color: var(--text-muted);">Nenhuma nota criada ainda</p>';
        return;
    }
    
    elements.notesContainer.innerHTML = appState.notes.map(note => `
        <div class="note-card" data-id="${note.id}">
            <h4>${note.title}</h4>
            <p>${note.content}</p>
            <p><small>Criada em: ${formatDate(note.date)}</small></p>
            ${note.reminder ? `<div class="reminder-badge">Lembrete: ${formatDate(note.reminder)}</div>` : ''}
            <div class="note-actions">
                <button onclick="editNote('${note.id}')" class="btn-secondary">
                    <i class="fas fa-edit"></i> Editar
                </button>
                <button onclick="deleteNote('${note.id}')" class="btn-secondary">
                    <i class="fas fa-trash"></i> Excluir
                </button>
            </div>
        </div>
    `).join('');
}

function deleteNote(noteId) {
    if (confirm('Tem certeza que deseja excluir esta nota?')) {
        appState.notes = appState.notes.filter(n => n.id !== noteId);
        saveData();
        renderNotes();
        showNotification('Nota excluída', 'Nota removida com sucesso', 'success');
    }
}

function editNote(noteId) {
    const note = appState.notes.find(n => n.id === noteId);
    if (!note) return;
    
    document.getElementById('note-title').value = note.title;
    document.getElementById('note-content').value = note.content;
    document.getElementById('note-reminder').value = note.reminder ? new Date(note.reminder).toISOString().slice(0, 16) : '';
    
    // Update form to handle edit
    elements.noteForm.onsubmit = (e) => {
        e.preventDefault();
        
        note.title = document.getElementById('note-title').value;
        note.content = document.getElementById('note-content').value;
        note.reminder = document.getElementById('note-reminder').value ? new Date(document.getElementById('note-reminder').value).toISOString() : null;
        
        saveData();
        renderNotes();
        closeModal();
        elements.noteForm.reset();
        elements.noteForm.onsubmit = handleAddNote; // Reset to original handler
        showNotification('Nota atualizada', `${note.title} foi atualizada com sucesso`, 'success');
    };
    
    openModal('note-modal');
}

// Modal Management
function openModal(modalId) {
    const modalOverlay = document.getElementById('modal-overlay');
    const modal = document.getElementById(modalId);
    
    if (modalOverlay && modal) {
        modalOverlay.classList.add('active');
        modal.style.display = 'block';
    }
}

function closeModal() {
    const modalOverlay = document.getElementById('modal-overlay');
    const modals = document.querySelectorAll('.modal');
    
    if (modalOverlay) {
        modalOverlay.classList.remove('active');
    }
    
    modals.forEach(modal => {
        modal.style.display = 'none';
    });
}

// Export/Import
function exportData() {
    const data = {
        files: appState.files,
        links: appState.links,
        events: appState.events,
        notes: appState.notes,
        exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `meu-espaco-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    
    showNotification('Backup exportado', 'Seus dados foram exportados com sucesso', 'success');
}

function importData(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);
            
            if (data.files) appState.files = data.files;
            if (data.links) appState.links = data.links;
            if (data.events) appState.events = data.events;
            if (data.notes) appState.notes = data.notes;
            
            saveData();
            renderCurrentSection();
            showNotification('Backup importado', 'Seus dados foram importados com sucesso', 'success');
        } catch (error) {
            showNotification('Erro na importação', 'Arquivo inválido ou corrompido', 'error');
        }
    };
    reader.readAsText(file);
    
    event.target.value = '';
}

// Notifications
function showNotification(title, message, type = 'success', duration = 5000) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const icon = type === 'success' ? 'fas fa-check-circle' : 
                 type === 'warning' ? 'fas fa-exclamation-triangle' : 
                 'fas fa-times-circle';
    
    notification.innerHTML = `
        <i class="${icon}"></i>
        <div class="notification-content">
            <h4>${title}</h4>
            <p>${message}</p>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    elements.notificationContainer.appendChild(notification);
    
    // Add sound for reminders
    if (type === 'warning') {
        try {
            // Create a simple beep sound
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = 800;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        } catch (e) {
            // Fallback if audio fails
            console.log('Audio notification failed:', e);
        }
    }
    
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, duration);
}

// Push Notifications
function requestNotificationPermission() {
    if ('Notification' in window) {
        Notification.requestPermission();
    }
}

function showPushNotification(title, body) {
    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(title, { body });
    }
}

// Reminders
function checkReminders() {
    const now = new Date();
    const items = [
        ...appState.files.map(f => ({ ...f, type: 'file' })),
        ...appState.links.map(l => ({ ...l, type: 'link' })),
        ...appState.notes.map(n => ({ ...n, type: 'note' }))
    ];
    
    items.forEach(item => {
        if (item.reminder) {
            const reminderTime = new Date(item.reminder);
            const timeDiff = reminderTime.getTime() - now.getTime();
            
            // Check if reminder is within the next 5 minutes (more flexible)
            if (timeDiff > -300000 && timeDiff <= 300000) { // ±5 minutes
                // Check if we haven't shown this reminder recently
                const reminderKey = `reminder_${item.id}_${Math.floor(reminderTime.getTime() / 60000)}`;
                if (!localStorage.getItem(reminderKey)) {
                    showPushNotification(
                        `Lembrete: ${item.title || item.name}`,
                        `Você tem um lembrete agendado para ${formatDate(item.reminder)}`
                    );
                    showNotification(
                        'Lembrete',
                        `${item.title || item.name} - ${formatDate(item.reminder)}`,
                        'warning',
                        10000
                    );
                    
                    // Mark this reminder as shown for this minute
                    localStorage.setItem(reminderKey, 'true');
                    setTimeout(() => localStorage.removeItem(reminderKey), 60000);
                }
            }
        }
    });
}

// Data Persistence
function saveData() {
    try {
        localStorage.setItem('meuEspacoData', JSON.stringify(appState));
    } catch (error) {
        console.error('Erro ao salvar dados:', error);
    }
}

function loadData() {
    try {
        const saved = localStorage.getItem('meuEspacoData');
        if (saved) {
            const data = JSON.parse(saved);
            appState = { ...appState, ...data };
        }
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
    }
}

// Utility Functions
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
            case '1':
                e.preventDefault();
                switchSection('files');
                break;
            case '2':
                e.preventDefault();
                switchSection('links');
                break;
            case '3':
                e.preventDefault();
                switchSection('calendar');
                break;
            case '4':
                e.preventDefault();
                switchSection('notes');
                break;
            case 's':
                e.preventDefault();
                saveData();
                showNotification('Dados salvos', 'Seus dados foram salvos automaticamente', 'success');
                break;
        }
    }
});

// Welcome notification on first visit
if (!localStorage.getItem('meuEspacoFirstVisit')) {
    setTimeout(() => {
        showNotification(
            'Bem-vindo ao Meu Espaço!',
            'Use Ctrl+1,2,3,4 para navegar rapidamente entre as seções. Ctrl+S para salvar manualmente.',
            'success',
            8000
        );
        localStorage.setItem('meuEspacoFirstVisit', 'true');
    }, 1000);
}
