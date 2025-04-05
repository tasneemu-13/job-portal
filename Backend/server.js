require('dotenv').config();
const app = require('./app');
const { ConnectDB } = require('./db.config');

ConnectDB(); // connects MongoDB

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
