import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 80;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    try {
      const response = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/random.php");
      const result = response.data;
      res.render("index.ejs", { data: result });
    } catch (error) {
      console.error("Failed to make request:", error.message);
      res.render("index.ejs", {
        error: error.message,
      });
    }
  });

  app.post("/", async (req, res) => {

    try{
        console.log(req.body);
        const type = req.body.type;
        const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${type}`);
        const result = response.data;
        console.log(result.drinks);
        res.render("index.ejs",{
          data : result.drinks[Math.floor(Math.random()*result.drinks.length)],
        });
      }
      catch(error){
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {
          error:"NO activity match your criteria ",
        });
      }
    });

    app.listen(port, () => {
        console.log(`Server running on port: ${port}`);
      });