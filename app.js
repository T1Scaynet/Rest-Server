require ('dotenv').config();
const { server, PORT } = require('./models/server');


server.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
});