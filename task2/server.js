const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

// Temporary in-memory storage
const submissions = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Show form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'form.html'));
});

// Handle form submission
app.post('/submit', (req, res) => {
  const { name, email, phone, dob, gender, country, message } = req.body;

  // Server-side validation
  if (
    !name || !email || !phone || !dob || !gender || !country || !message ||
    !email.includes('@') || !/^\d{10}$/.test(phone)
  ) {
    return res.send("❌ Invalid submission. Please go back and fill all fields correctly.");
  }

  // Store in memory
  submissions.push({ name, email, phone, dob, gender, country, message });

  // Send to response.ejs
  res.render('response', { name, email, phone, dob, gender, country, message });
});

// Start the server
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
