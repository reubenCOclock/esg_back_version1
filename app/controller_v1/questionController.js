const dataMapper = require("../dataMapper_v1");

const questionController = {
  getQuestions: async (req, res) => {
    try {
      const getQuestions = await dataMapper.selectQuestionsByCategory(
        req.params.categoryId
      );
      return res.json(getQuestions);
    } catch (error) {
      return res.json(error.message);
    }
  },

  insertQuestionOrder: async (req, res) => {
    // insertion de l'ordre dans laquelle une question se trouvera dans le questionnaire.
    try {
      const newQuestionOrder = await dataMapper.insertQuestionOrder(
        req.params.order,
        req.params.questionId
      );

      return res.json(newQuestionOrder);
    } catch (error) {
      console.log(error.message);
      res.json(error.message);
    }
  },
};

module.exports = questionController;
