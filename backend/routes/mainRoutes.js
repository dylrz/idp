const express = require('express');
const router = express.Router();
const User = require('../model/user')
const Team = require('../model/team');
const Player = require('../model/player');

router.get("/", function (req, res) {
    res.render("index")
});

// router.get('/main', async (req, res) => {
//     const username = req.session.username || 'Guest';
  
//     const userId = req.user ? req.user._id : null;
  
//     try {
//       // fetch all teams associated with the user
//       const teams = userId ? await Team.find({ user: userId }) : [];
  
//       res.render('main', {
//         name: username,
//         teams: teams
//       });
//     } catch (error) {
//       console.error("Failed to fetch the user's teams:", error);
//       res.status(500).send("Error fetching teams information");
//     }
//   });

router.get('/main', async (req, res) => {
  const username = req.session.username || 'Guest';
  const userId = req.user ? req.user._id : null;

  try {
    const teams = userId ? await Team.find({ user: userId }) : [];
    res.json({ name: username, teams: teams }); // Send data as JSON
  } catch (error) {
    console.error("Failed to fetch the user's teams:", error);
    res.status(500).json({ error: "Error fetching teams information" });
  }
});


  module.exports = router;