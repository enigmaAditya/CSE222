// Visitor Counter using cookie-session
import express from 'express';
import cookieSession from 'cookie-session';

const app = express();

// Global data (server-side)
let totalVisits = 0;
let visitLog = [];
let nextUserId = 1;

// Middleware
app.use(cookieSession({
    name: 'session',
    keys: ['secret1', 'secret2'],
    maxAge: 24 * 60 * 60 * 1000
}));

// Main Route
app.get('/', (req, res) => {

    // New user check
    if (!req.session.userId) {
        req.session.userId = nextUserId++;
        req.session.myVisits = 0;
    }

    // Increment counts
    totalVisits++;
    req.session.myVisits++;

    // Log this visit
    visitLog.unshift({
        id: totalVisits,
        user: 'User-' + req.session.userId,
        time: new Date().toLocaleString()
    });

    // Build table rows
    let rows = '';
    visitLog.forEach(v => {
        rows += `<tr>
            <td>${v.id}</td>
            <td>${v.user}</td>
            <td>${v.time}</td>
        </tr>`;
    });

    // Send HTML
    res.send(`
        <h1>Site Visitor Counter</h1>

        <h3>Total Site Visits: ${totalVisits}</h3>
        <h3>Your Visits: ${req.session.myVisits}</h3>
        <h3>You are: User-${req.session.userId}</h3>

        <a href="/">Refresh</a> |
        <a href="/clear">Clear Session</a>

        <h2>Visit Log</h2>
        <table border="1" cellpadding="8">
            <tr>
                <th>ID</th>
                <th>User</th>
                <th>Time</th>
            </tr>
            ${rows}
        </table>
    `);
});

// Clear session
app.get('/clear', (req, res) => {
    req.session = null;
    res.redirect('/');
});

app.listen(3001, () => {
    console.log('Server on http://localhost:3001');
});