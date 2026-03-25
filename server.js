const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 3000;

// ✅ serve all files (THIS IS THE FIX)
app.use(express.static(__dirname));

app.use(bodyParser.json());

// simple route test
app.get('/', (req, res) => {
  res.send('Server is working ✅');
});

// load users
let users = [];
if (fs.existsSync('users.json')) {
  users = JSON.parse(fs.readFileSync('users.json'));
}

// register
app.post('/register', (req, res) => {
  const { username, password } = req.body;

  if (users.find(u => u.username === username)) {
    return res.json({ success: false });
  }

  users.push({ username, password });
  fs.writeFileSync('users.json', JSON.stringify(users));

  res.json({ success: true });
});

// login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username && u.password === password);

  res.json({ success: !!user });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
