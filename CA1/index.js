import express from 'express';
import fs from 'fs';
import path from 'path';
const app = express();
const backupDir = path.resolve('backups');
if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir);
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.send(`
        <form action="/" method="POST">
            <textarea name="text" rows="10" cols="50"></textarea><br>
            <button type="submit">save</button>
        </form>
    `);
});
app.post('/', (req, res) => {
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    const filename = `backup-${timestamp}.txt`;
    fs.writeFileSync(path.join(backupDir, filename), req.body.text);

    const files = fs.readdirSync(backupDir);
    const links = files.map(f => `<a href="/view?file=${f}">${f}</a>`).join('<br>');
    
    res.send(`
        <h3>Your backup has been Saved!</h3>
        ${links}
        <br><br>
        <a href="/">go back</a>
    `);
});
app.get('/view', (req, res) => {
    const content = fs.readFileSync(path.join(backupDir, req.query.file), 'utf8');
    res.send(`
        <pre>${content}</pre>
        <a href="/">Back to Editor</a>
    `);
});
app.listen(3000, () => console.log('Server started on http://localhost:3000'));
