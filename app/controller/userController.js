const dataMapper = require("../dataMapper");

const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

// toutes ces fonctions font appel a une requette en particulier qui se trouvent dans le fichier datamapper. Pour voir ces requettes, rendez vous dans le fichier danamapper.js et consulter la requette en particulier

const userController = {
  // insertion d'un utilisatuer
  insertUser: async (req, res) => {
    console.log(req.body.password);
    console.log(req.body.email);
    console.log(req.body.role);

    const token = uid2(64);
    const salt = uid2(64);
    const hash = SHA256(req.body.password + salt).toString(encBase64);

    const findUserByEmail = await dataMapper.selectUserByEmail(req.body.email);

    if (findUserByEmail) {
      return res.json({ message: "user already exsits" });
    } else {
      const newUser = await dataMapper.insertUser(
        req.body.email,
        req.body.role,
        hash,
        token,
        salt
      );

      await dataMapper.updateUserIsHashed(newUser.id);
      return res.json(newUser);
    }
  },

  findUserByEmail: async (req, res) => {
    //recuperation d'un utilisatuer
    const targetedUser = await dataMapper.selectUserByEmail(req.params.email);
    return res.json(targetedUser);
  },

  findUserById: async (req, res) => {
    try {
      const targetedUser = await dataMapper.selectUserById(req.params.id);
      return res.json(targetedUser);
    } catch (error) {
      return res.json(error.message);
    }
  },

  getRoleByUser: async (req, res) => {
    try {
      const roleInfo = await dataMapper.getRoleByUser(req.params.roleId);
      return res.json(roleInfo);
    } catch (error) {
      return res.json(error.message);
    }
  },

  authenticateUserSignIn: async (req, res) => {
    try {
      const selectedUser = await dataMapper.selectUserByEmail(req.body.email);
      if (selectedUser) {
        //console.log(selectedUser);
        console.log(req.body.password);
        const userToken = selectedUser.token;
        const userSalt = selectedUser.salt;

        const hash = SHA256(req.body.password + selectedUser.salt).toString(
          encBase64
        );

        if (hash == selectedUser.password) {
          return res.json(selectedUser);
        } else {
          return res.json({ message: "mauvais mot de passe" });
        }
      } else {
        return res.json({ message: "email n'existe pas" });
      }
    } catch (error) {
      return res.json(error.message);
    }
  },

  getAllRoles: async (req, res) => {
    try {
      const allRoles = await dataMapper.getAllRoles();
      return res.json(allRoles);
    } catch (error) {
      return res.json(error.message);
    }
  },

  getUserRole: async (req, res) => {
    try {
      const userRole = await dataMapper.getUserRole();
      return res.json(userRole);
    } catch (error) {
      return res.json(error.message);
    }
  },
};

module.exports = userController;
