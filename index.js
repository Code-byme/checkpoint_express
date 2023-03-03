const express = require('express');
const app = express();
const port = 3000;

// Custom middleware to restrict access to the web app during non-working hours
app.use((req, res, next) => {
  const date = new Date();
  const dayOfWeek = date.getDay();
  const hourOfDay = date.getHours();
  if (dayOfWeek >= 1 && dayOfWeek <= 5 && hourOfDay >= 9 && hourOfDay <= 17) {
    // It's a weekday between 9am and 5pm, so allow access to the web app
    next();
  } else {
    // It's outside of working hours, so send a message saying the web app is closed
    res.send('Sorry, this web app is only available during working hours (Monday to Friday, 9am to 5pm).');
  }
});

// Set up static files directory for CSS
app.use(express.static('public'));

// Route handlers for each page
app.get('/', (req, res) => {
  res.render('home', {title: 'Home'});
});

app.get('/services', (req, res) => {
  res.render('services', {title: 'Our Services'});
});

app.get('/contact', (req, res) => {
  res.render('contact', {title: 'Contact Us'});
});

// Use the EJS template engine
app.set('view engine', 'ejs');

// Set up the views directory
app.set('views', './views');

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
