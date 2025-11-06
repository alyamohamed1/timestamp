// index.js
// Timestamp Microservice

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static('public'));

// Serve the main page
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// Your API endpoint
app.get("/api/:date?", (req, res) => {
  let dateParam = req.params.date;

  // If no date is provided, return the current date
  if (!dateParam) {
    const now = new Date();
    return res.json({ unix: now.getTime(), utc: now.toUTCString() });
  }

  let date;

  // Check if it's a UNIX timestamp (number)
  if (!isNaN(dateParam)) {
    date = new Date(parseInt(dateParam));
  } else {
    date = new Date(dateParam);
  }

  // Handle invalid date
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // Return valid date response
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Start the server
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

