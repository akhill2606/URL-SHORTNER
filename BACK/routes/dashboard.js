const router = require("express").Router();
require("../models/shortUrl");
const auth = require("../middleware/auth");
const ShortUrl = require("../models/shortUrl");

router.get("/my", auth, async (req, res) => {
  try {
    res.send("hii"); 
    const myshortUrls = await ShortUrl.find({ email: "qwerty@gmail.com" });
    // res.render("index", { shortUrls: myshortUrls });
    console.log(myshortUrls);
  } catch (error) {}
});

router.post("/quick", async (req, res) => {
  try {
    const { full ,email} = req.body;
    if (!full) return res.status(400).json({ msg: "Enter a valid link" });

    const existingFullUrl = await ShortUrl.findOne({ full: full });
    if (existingFullUrl) {
      return res.status(400).json({ msg: "This url is already shortened" });
    }

    const newQuick = new ShortUrl({
      full: full,
      email:email
    });
    const generatedQuick = await newQuick.save();
    res.json(newQuick);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// router.post("/custom", auth ,async (req, res) => {
//   try {
//     const { full, short ,email} = req.body;

//     if (!full) return res.status(400).json({ msg: "Enter a valid link" });

//     const existingFullUrl = await ShortUrl.findOne({ full: full });
//     if (existingFullUrl)
//       return res.status(400).json({ msg: "This url is already shortened" });

//     const existingShortUrl = await ShortUrl.findOne({ short: short });
//     if (existingShortUrl)
//       return res
//         .status(400)
//         .json({ msg: "Shortened url already exists , try another one" });

//     //console.log(req.body);
//     const newQuick = new ShortUrl({
//       full: full,
//       short: short,
//       email: email,
//     });
//     const generatedQuick = await newQuick.save();
//     res.json(newQuick);
//     console.log(generatedQuick);
//   } catch (err) {
//     const m = err.message;
//     res.status(500).json({ msg: m });
//   }
// });

router.post("/custom", async (req, res) => {
  try {
    const { full, short, email } = req.body;

    if (!full) return res.status(400).json({ msg: "Enter a valid link" });

    const existingFullUrl = await ShortUrl.findOne({ full: full });
    if (existingFullUrl)
      return res.status(400).json({ msg: "This url is already shortened" });

    const existingShortUrl = await ShortUrl.findOne({ short: short });
    if (existingShortUrl)
      return res
        .status(400)
        .json({ msg: "Shortened url already exists , try another one" });

    //console.log(req.body);
    const newCustom = new ShortUrl({
      full: full,
      short: short,
      email: email,
    });
    const generateCustom = await newCustom.save();
    res.json(newCustom);
    console.log(generatedCustom);
  } catch (err) {
    const m = err.message;
    res.status(500).json({ msg: m });
  }
});

module.exports = router;
