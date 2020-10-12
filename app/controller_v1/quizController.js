const dataMapper = require("../dataMapper_v1");

const quizController = {
  // insertion d'un nouveau quiz dans la bdd
  insertQuizTour: async (req, res) => {
    try {
      const newQuiz = await dataMapper.insertQuizTour(req.params.id);
      return res.json(newQuiz);
    } catch (error) {
      console.log(error.message);
    }
  },

  updateQuizTourStarted: async (req, res) => {
    //qd un utilisateur aura commencé a repondre aux questionnaire, je vais dire que le quiz a bien debuté
    try {
      await dataMapper.updateQuizTourStarted(true, req.params.quizTour);
      return res.json({ message: "quiz tour sucessfully updated" });
    } catch (error) {
      return res.json(error.message);
    }
  },

  findQuizTour: async (req, res) => {
    //recupereration du dernier quiz lié a un utilisateur en particulier.
    const latestQuiz = await dataMapper.findQuizTour(req.params.id);
    return res.json(latestQuiz);
  },

  getCategoryScoresByPillar: async (req, res) => {
    // je groupe les scores par les pilliers E,S,et G
    try {
      const getCategoryScoresByPillar = await dataMapper.getCategoryScoresByPillar(
        req.params.userId,
        req.params.pillarId
      );
      return res.json(getCategoryScoresByPillar);
    } catch (error) {
      return res.json(error.message);
    }
  },

  insertPillarQuizScores: async (req, res) => {
    try {
      const pillarQuizScores = await dataMapper.insertPillarQuizScores(
        req.body.criteria,
        req.body.score,
        req.params.quizTourId
      );
      return res.json(pillarQuizScores);
    } catch (error) {
      return res.json(error.message);
    }
  },

  getAggreateScore: async (req, res) => {
    try {
      const aggregateScores = await dataMapper.getAggregateScore(
        req.params.userId
      );
      return res.json(aggregateScores);
    } catch (error) {
      return res.json(error.message);
    }
  },
};

module.exports = quizController;
