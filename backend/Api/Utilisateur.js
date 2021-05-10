const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
//const User = require("../DB/User");
const utilisateurs = require("../models/Utilisateur");
const config = require("../routes/config");
const route = express.Router();

//Login
route.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await utilisateurs.findByCredentials(email, password);
    if (!user) {
      return res
        .status(401)
        .json({ error: "Login failed! Check authentication credentials" });
    }
    const token = await user.generateAuthToken();
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(400).json({ err: err });
  }
  //   if (user) {
  //     return res.status(200).json({ succes: "Login " });
  //   } else {
  //     return res.status(200).json({ error: "failed " });
  //   }
  // } catch (error) {
  //   return res
  //     .status(401)
  //     .json({ error: "Login failed! Check authentication credentials" });
  // }
});

//   const token = await generateAuthToken();
//   res.status(201).json({ user, token });
// } catch (err) {
//   res.status(400).json({ err: err });
// }
// try {
//   const user = await utilisateurs.findByCredentials(
//     req.body.email,
//     req.body.password
//   );
//   var token = jwt.sign({ id: user._id }, config.secret, {
//     expiresIn: 86400, // expires in 24 hours
//   });
//   res.send({ user, token });
// } catch (error) {
//   res.status(400).send({
//     error: { message: "You have entered an invalid email or password" },
//   });
// }

//Register
// route.post("/register", function (req, res) {
//   var hashedPassword = bcrypt.hashSync(req.body.password, 8);

//   utilisateurs.create(
//     {
//       nom: req.body.nom,
//       prenom: req.body.prenom,
//       email: req.body.email,
//       password: hashedPassword,
//     },
//     function (err, user) {
//       if (err)
//         return res
//           .status(500)
//           .send("There was a problem registering the user.");
//       // create a token
//       var token = jwt.sign({ id: user._id }, config.secret, {
//         expiresIn: 86400, // expires in 24 hours
//       });
//       res.status(200).send({ auth: true, token: token });
//     }
//   );
// });

route.post("/register", async (req, res) => {
  try {
    let sameEmail = await utilisateurs.find({ email: req.body.email });
    if (sameEmail.length >= 1) {
      return res.status(409).json({
        message: "email already in use",
      });
    }

    const {
      nom,
      prenom,
      genre,
      email,
      password,
      date_naissance,
      rue,
      ville,
      code_postal,
      telephone,
      imageUrl,
      etat,
    } = req.body;
    await bcrypt.hash(password, 8).then((hashedPassword) => {
      const Utilisateurs = {};
      Utilisateurs.nom = nom;
      Utilisateurs.prenom = prenom;
      Utilisateurs.email = email;
      Utilisateurs.password = hashedPassword;
      Utilisateurs.code_postal = code_postal;
      Utilisateurs.rue = rue;
      Utilisateurs.ville = ville;
      Utilisateurs.genre = genre;
      Utilisateurs.date_naissance = date_naissance;
      Utilisateurs.telephone = telephone;
      Utilisateurs.imageUrl = imageUrl;
      Utilisateurs.etat = etat;
      let utilisateursModel = new utilisateurs(Utilisateurs);
      utilisateursModel.save();
      res.json(utilisateursModel);
    });
  } catch (err) {
    res.json(err, "err");
  }
});

route.get("/", async (req, res) => {
  const Utilisateurs = await utilisateurs.find();
  res.json(Utilisateurs);
});

route.get("/:id", async (req, res) => {
  const Utilisateurs = await utilisateurs.findById({ _id: req.params.id });
  res.json(Utilisateurs);
});

//supprimer client
route.delete("/delete/:id", async (req, res) => {
  const result = await utilisateurs.findByIdAndDelete({ _id: req.params.id });
  res.json(result);
});

route.patch("/update/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const user = await utilisateurs.findByIdAndUpdate(_id, req.body);
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

// route.get("/userdata", (req, res) => {
//   // try {
//   //     await res.json(req.userData);
//   //   } catch (err) {
//   //     console.log(err);
//   //   }
//   try {
//     const token = req.headers.authorization.replace("Bearer ", "");
//     console.log(token);
//     const decoded = jwt.verify(token, config.secret);
//     req.userData = decoded;
//     console.log(req.userData);
//     next();
//     //  await res.json(req.userData);
//   } catch (err) {
//     return res.status(401).json({
//       message: "Authentification Failed",
//     });
//   }
// });
// route.get("/userdata", async (req, res) => {
//   // await res.json(req.userData);
//   try {
//     const token = await req.headers.authorization.replace("Bearer ", "");
//     console.log(token);
//     // const decoded = jwt.verify(token, config.secret);
//     // req.userData = decoded;
//     // console.log(req.userData);
//     next();
//   } catch (err) {
//     return res.status(401).json({
//       message: "Authentification Failed",
//     });
//   }
// });
module.exports = route;
