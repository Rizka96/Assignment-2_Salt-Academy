const PORT = process.env.PORT;
const app = require("./app")

app.listen(PORT, () => {
    console.log(`app is running http://localhost:${PORT}`);
});
  