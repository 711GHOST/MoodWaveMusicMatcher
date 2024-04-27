const { spawn } = require("child_process");
const passport = require("passport");
const express = require("express");
const router = express.Router();

router.post(
  "/detect-emotion",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      console.log("Detecting emotion");

      // Verify image data is present
      if (!req.body.imageData) {
        return res.status(400).json({ error: "Missing image data" });
      }

      const pythonProcess = spawn("python", ["./routes/script.py"]);
      let detectedEmotion = "";

      pythonProcess.stdout.on("data", (data) => {
        detectedEmotion = data.toString().trim();
      });

      pythonProcess.on("close", (code) => {
        if (code === 0) {
          // Decode the base64 emotion string
          const emotion = Buffer.from(detectedEmotion, 'base64').toString('utf-8');
          res.json({ emotion });
        } else {
          res.status(500).json({ error: "Error running Python script" });
        }
      });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

module.exports = router;
