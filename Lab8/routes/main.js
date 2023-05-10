const express = require("express");
const router = express.Router();
const data = require("../data/marvel");

router.get("/", async (req, res) => {
  res.render("pages/home", { title: "Character Finder" });
});

router.post("/search", async (req, res) => {
  try {
    let body = req.body;
    let input = body.search;
    if (input.trim().length == 0) {
      throw "Must enter a string that's not just spaces";
    }
    const results = await data.getCharacterBySearch(input);
    res.render("pages/characters", { results: results.data.data.results, title:"Characters Found", search_term:input });
  } catch (e) {
    res.status(400).render("pages/error", { error: e, title: "Error" });
  }
});

router.get("/characters/:id", async (req, res) => {
  try {
    let id = req.params.id;
    const result = await data.getCharacterById(id);
    const characterData = result.data.data.results[0];
    res.render("pages/character", {
      title: characterData.name,
      character_name: characterData.name,
      character_description: characterData.description,
      image_source: characterData.thumbnail.path,
      extension: characterData.thumbnail.extension,
      comics: characterData.comics.items,
    });
  } catch (e) {
    res.status(404).render("pages/error", { error: e, title: "Error" });
  }
});

module.exports = router;
