const express = require('express');
const bodyParser = require('body-parser');
const houseRoutes = require('./routes/houses');
const app = express();
const PORT = 3306;

app.use(bodyParser.json());
app.use('/houses', houseRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
