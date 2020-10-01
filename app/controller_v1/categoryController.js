const dataMapper = require("../dataMapper_v1");

const categoryController = {
  getAllCategories: async (req, res) => {
    try {
      const getCategories = await dataMapper.getAllCategories();
      return res.json(getCategories);
    } catch (error) {
      return res.json(error.message);
    }
  },

  getPillars: async (req, res) => {
    try {
      const getPillars = await dataMapper.getPillars();
      return res.json(getPillars);
    } catch (error) {
      return res.json(error.message);
    }
  },
};

module.exports = categoryController;
