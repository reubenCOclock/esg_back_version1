const dataMapper = require("../dataMapper");
// toutes ces fonctions font appel a une requette en particulier qui se trouvent dans le fichier datamapper. Pour voir ces requettes, rendez vous dans le fichier danamapper.js et consulter la requette en particulier

const questionController = {
  getQuestions: async (req, res) => {
    // recuperation de toutes les questions
    try {
      const questions = await dataMapper.selectQuestions();
      return res.json(questions);
    } catch (error) {
      res.json(error.message);
    }
  },

  getDataInfoByQuestionId: async (req, res) => {
    // recuperation de toutes les datapoints qui sont lié a une question en particulier.
    try {
      const getDataPointsByQuestionId = await dataMapper.selectDataInfoByQuestionId(
        req.params.questionId
      );
      return res.json(getDataPointsByQuestionId.rows);
    } catch (error) {
      res.json(error.message);
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

  findQuestionCriteria: async (req, res) => {
    try {
      const questionCodeByCriteria = await dataMapper.findQuestionCriteria(
        req.params.questionId
      );
      return res.json(questionCodeByCriteria);
    } catch (error) {
      res.json(error.message);
    }
  },

  insertIntoUnclearQuestion: async (req, res) => {
    try {
      await dataMapper.insertIntoUnclearQuestion(
        req.params.userId,
        req.params.quizTour,
        req.params.question
      );
      return res.json({ message: "question has sucessfully been tagged" });
    } catch (error) {
      return res.json(error.message);
    }
  },

  getUnclearQuestionByUser: async (req, res) => {
    try {
      const getUnclearQuestion = await dataMapper.getUnclearQuestionByUser(
        req.params.user,
        req.params.question
      );
      return res.json(getUnclearQuestion);
    } catch (error) {
      return res.json(error.message);
    }
  },

  getQuestionContent: async (req, res) => {
    try {
      const getQuestionContent = await dataMapper.getQuestionContentById(
        req.params.questionId
      );

      //console.log(getQuestionContent);

      return res.json(getQuestionContent);
    } catch (error) {
      return res.json(error.message);
    }
  },
};

module.exports = questionController;
