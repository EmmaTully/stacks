// Simple JavaScript for interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Navigation item click handlers
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all nav items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
        });
    });

    // Sidebar item click handlers
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    sidebarItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all sidebar items
            sidebarItems.forEach(sidebar => sidebar.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
        });
    });

    // AI Toggle functionality
    const aiToggle = document.querySelector('.toggle-switch input');
    aiToggle.addEventListener('change', function() {
        const description = document.querySelector('.toggle-description');
        if (this.checked) {
            description.textContent = 'Enable AI responses globally for all conversations';
            console.log('AI responses enabled globally');
        } else {
            description.textContent = 'AI responses are currently disabled';
            console.log('AI responses disabled');
        }
    });

    // Refresh button functionality
    const refreshBtn = document.querySelector('.refresh-btn');
    refreshBtn.addEventListener('click', function() {
        this.style.transform = 'rotate(360deg)';
        this.style.transition = 'transform 0.5s ease';
        
        setTimeout(() => {
            this.style.transform = '';
            this.style.transition = '';
        }, 500);
        
        console.log('Refreshing conversations...');
        // Here you would typically fetch new data
    });

    // Search button functionality
    const searchBtn = document.querySelector('.search-btn');
    searchBtn.addEventListener('click', function() {
        console.log('Opening search...');
        // Here you would typically open a search modal or navigate to search page
    });

    // Conversation row click handlers
    const conversationRows = document.querySelectorAll('.conversation-row');
    conversationRows.forEach(row => {
        row.addEventListener('click', function() {
            // Remove active state from all rows
            conversationRows.forEach(r => r.classList.remove('active-row'));
            
            // Add active state to clicked row
            this.classList.add('active-row');
            
            const contactName = this.querySelector('.contact-name').textContent;
            console.log(`Opening conversation with: ${contactName}`);
            // Here you would typically navigate to the conversation detail view
        });
    });

    // Pagination functionality
    const pageButtons = document.querySelectorAll('.page-btn');
    pageButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            if (!this.classList.contains('active')) {
                pageButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                console.log('Navigating to page...');
            }
        });
    });

    // Add some interactive styling
    const style = document.createElement('style');
    style.textContent = `
        .conversation-row.active-row {
            background-color: #e8f5e8 !important;
            border-left: 3px solid #4CAF50;
        }
        
        .refresh-btn:active {
            transform: scale(0.95);
        }
        
        .search-btn:active {
            transform: scale(0.95);
        }
        
        .page-btn:active {
            transform: scale(0.95);
        }
    `;
    document.head.appendChild(style);
});

// Utility function to simulate data loading
function loadConversations() {
    console.log('Loading conversations...');
    // Simulate API call delay
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([
                {
                    id: 1,
                    contact: 'Emma',
                    lastMessage: 'Absolutely, Emma! Here\'s the link to our online credit application so you can get started right away: [Insert Online Credit Application ...]',
                    date: 'Jul 22, 2025'
                },
                {
                    id: 2,
                    contact: '(512) 565-7979',
                    lastMessage: 'Testing received! Let me know if you have any questions or need assistance.',
                    date: 'Jul 24, 2025'
                }
            ]);
        }, 1000);
    });
}

// Function to render conversations (for future dynamic loading)
function renderConversations(conversations) {
    const tableContainer = document.querySelector('.conversations-table');
    const existingRows = tableContainer.querySelectorAll('.conversation-row');
    
    // Remove existing conversation rows
    existingRows.forEach(row => row.remove());
    
    // Add new conversation rows
    conversations.forEach(conversation => {
        const row = document.createElement('div');
        row.className = 'conversation-row';
        row.innerHTML = `
            <div class="contact-cell">
                <div class="contact-avatar">
                    <i class="fas fa-user"></i>
                </div>
                <span class="contact-name">${conversation.contact}</span>
            </div>
            <div class="message-cell">
                <span class="message-text">${conversation.lastMessage}</span>
            </div>
            <div class="date-cell">
                <span class="date-text">${conversation.date}</span>
            </div>
        `;
        
        // Add click handler
        row.addEventListener('click', function() {
            document.querySelectorAll('.conversation-row').forEach(r => r.classList.remove('active-row'));
            this.classList.add('active-row');
            console.log(`Opening conversation with: ${conversation.contact}`);
        });
        
        tableContainer.appendChild(row);
    });
}
