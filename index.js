const express = require('express');
const app = express();
const tasksRoutes = require("./routes/route");

const port = 8181 || process.env.PORT;

app.use(express.json());
app.use("/api", tasksRoutes);

app.get('/', (req, res) => {
    res.send('Test endpoint')
});

app.listen(port, () => {
    console.log(`Server Alive On http:localhost:${port}`);
});