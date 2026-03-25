const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname));

// simple database (JSON file)
const DB_FILE = 'users.json';

function loadUsers() {
  if (!fs.existsSync(DB_FILE)) return [];
  return JSON.parse(fs.readFileSync(DB_FILE));
}

function saveUsers(users) {
  fs.writeFileSync(DB_FILE, JSON.stringify(users, null, 2));
}

// REGISTER
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  let users = loadUsers();

  if (users.find(u => u.username === username)) {
    return res.json({ success: false, message: 'User exists' });
  }

  users.push({ username, password, score: 0 });
  saveUsers(users);

  res.json({ success: true });
});

// LOGIN
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  let users = loadUsers();

  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.json({ success: false });
  }

  res.json({ success: true, user });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));