const express = require('express');
const { google } = require('googleapis');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

console.log('Environment:', process.env.NODE_ENV);

app.use(express.static('public'));

app.get('/api/data', async (req, res) => {
  try {
    if (process.env.NODE_ENV === 'test') {
      return res.json([
        ['name', 'dimention', 'x', 'y', 'z', 'zoomMin', 'zoomMax', 'description'],
        ['拠点', '0', '79', '', '378', '-1', '3', 'ここは拠点'],
      ]);
    }

    const auth = new google.auth.JWT(
      process.env.GOOGLE_CLIENT_EMAIL,
      null,
      process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      ['https://www.googleapis.com/auth/spreadsheets.readonly']
    );

    const sheets = google.sheets({ version: 'v4', auth });
    const result = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: 'Sheet1!A1:H50',
    });

    res.json(result.data.values);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching spreadsheet data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
