// ==================== PORTFOLIO BACKEND SERVER ====================
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ==================== MIDDLEWARE ====================
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JS, images)
app.use(express.static(path.join(__dirname, '/')));

// Rate limiting — prevent spam
const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: { success: false, message: 'Too many requests. Please try again in 15 minutes.' },
    standardHeaders: true,
    legacyHeaders: false,
});

// ==================== ROUTES ====================

// Health check
app.get('/api/health', (req, res) => {
    res.json({ success: true, message: 'Server is running', timestamp: new Date().toISOString() });
});

// Contact form — proxy to Formspree
app.post('/api/contact', contactLimiter, async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !subject || !message) {
            return res.status(400).json({ success: false, message: 'All fields are required.' });
        }

        // Forward to Formspree
        const formspreeResponse = await fetch('https://formspree.io/f/mdajdldl', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({ name, email, subject, message }),
        });

        const data = await formspreeResponse.json();

        if (formspreeResponse.ok) {
            console.log(`📧 Contact: ${name} (${email}) — "${subject}"`);
            res.json({ success: true, message: "Message sent successfully! I'll get back to you soon." });
        } else {
            throw new Error(data.error || 'Formspree error');
        }
    } catch (error) {
        console.error('❌ Contact error:', error.message);
        res.status(500).json({ success: false, message: 'Failed to send message. Please try again.' });
    }
});

// Newsletter — store locally (can be upgraded later)
const subscribers = [];
app.post('/api/newsletter', contactLimiter, (req, res) => {
    const { email } = req.body;
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ success: false, message: 'Please provide a valid email.' });
    }

    if (subscribers.includes(email)) {
        return res.json({ success: true, message: "You're already subscribed!" });
    }

    subscribers.push(email);
    console.log(`📰 New subscriber: ${email} (Total: ${subscribers.length})`);
    res.json({ success: true, message: 'Subscribed successfully! Stay tuned for updates.' });
});

// Catch-all: Serve index.html
app.get('{*path}', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// ==================== START SERVER ====================
app.listen(PORT, () => {
    console.log(`
╔══════════════════════════════════════════════╗
║                                              ║
║   🔐 Ayush Portfolio Server                  ║
║   ─────────────────────────────              ║
║   🌐 http://localhost:${PORT}                  ║
║   📧 Contact: Formspree ✅                   ║
║   🛡️  Rate limiting: Active                  ║
║                                              ║
╚══════════════════════════════════════════════╝
    `);
});
