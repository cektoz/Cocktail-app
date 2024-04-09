import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/", async (req, res) => {
    try {
        const result = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/random.php");
        const cocktail = result.data.drinks[0]; // Assuming there's only one drink in the array
        const { strDrink: name, strInstructions: instructions, strDrinkThumb: image } = cocktail;
        res.render("index.ejs", { name, instructions, image });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
