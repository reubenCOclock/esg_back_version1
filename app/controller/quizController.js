const dataMapper = require("../dataMapper");
// toutes ces fonctions font appel a une requette en particulier qui se trouvent dans le fichier datamapper. Pour voir ces requettes, rendez vous dans le fichier danamapper.js et consulter la requette en particulier

const quizController = {
  // insertion d'un nouveau quiz lié a un utilisateur en particulier.
  insertQuizTour: async (req, res) => {
    const newQuiz = await dataMapper.insertQuizTour(req.params.id);
    return res.json(newQuiz);
  },

  updateQuizTourStarted: async (req, res) => {
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

  getEmptyAnswersByQuizTour: async (req, res) => {
    // recuperation de toutes les questions quxquelles il n'y a pas de reponse selon un utilisateur et un quiz en particulier.
    try {
      const emptyAnswers = await dataMapper.findEmptyAnswersByQuizTour(
        req.params.userId
      );
      return res.json(emptyAnswers);
    } catch (error) {
      res.json(error.message);
    }
  },

  getEmptyAnswersByQuizTourWithTaggedQuestions: async (req, res) => {
    try {
      const getEmptyAnswersWithTaggedQuestions = await dataMapper.findEmptyAnswersByQuizTourWithTaggedQuestions(
        req.params.user
      );
      return res.json(getEmptyAnswersWithTaggedQuestions);
    } catch (error) {
      return res.json(error.message);
    }
  },

  findTotalByCriteria: async (req, res) => {
    // recuperation de l'aggregation de la ponderation des datapoints selon un critere un particulier en l'occurence E,S ou G.
    try {
      const criteriaTotal = await dataMapper.findTotalByCriteria(
        req.params.criteria
      );
      return res.json(criteriaTotal);
    } catch (error) {
      res.json(error.message);
    }
  },

  groupQuestionsAndAnswersByQuiz: async (req, res) => {
    // appel a la requette visant a recuperere les reponses, la question, et tous les datapoints associé a la question auxquelles l'utilisatuer a repondu selon un critere et un utilisateur en particulier.
    try {
      const getQuizResultsByCriteria = await dataMapper.groupAnswersAndQuestionsByQuiz(
        req.params.criteria,
        req.params.userId
      );
      return res.json(getQuizResultsByCriteria);
    } catch (error) {
      return res.json(error.message);
    }
  },

  getAggregateDataPointsByAnsweredQuestions: async (req, res) => {
    try {
      const getAggregateDataPoints = await dataMapper.aggregateDataWeightsByQuestionsAnswered(
        req.params.userId
      );
      return res.json(getAggregateDataPoints);
    } catch (error) {
      res.json(error.message);
    }
  },

  insertQuizScore: async (req, res) => {
    // insertion d'un score lié a un quiz, le critere (E,S, ou G) et le score dans ce cas.
    try {
      const getInsertedQuizScore = await dataMapper.insertQuizScore(
        req.params.quizTourId,
        req.params.userId,
        req.body.ethicalCriteria,
        req.body.score
      );
      return res.json(getInsertedQuizScore);
    } catch (error) {
      res.json(error.message);
    }
  },

  getQuizScoreByUser: async (req, res) => {
    // recuperation des dernieres scores basé sur le dernie quiz pris par un utilisateur en particulier.
    try {
      const getQuizScoreByUser = await dataMapper.getQuizScoreByUser(
        req.params.userId
      );
      return res.json(getQuizScoreByUser);
    } catch (error) {
      res.json(error.message);
    }
  },

  getDataPointWeightByEthicalCode: async (req, res) => {
    try {
      const getCriteriaWeights = await dataMapper.getDataPointsWeightByEthicalCode();
      return res.json(getCriteriaWeights);
    } catch (error) {
      res.json(error.message);
    }
  },

  getTotalDataPointWeights: async (req, res) => {
    try {
      const getTotalDataPointWeights = await dataMapper.getTotalDataPointWeights();
      return res.json(getTotalDataPointWeights);
    } catch (error) {
      return res.json(error.message);
    }
  },

  getDataPointsWeightsByQuestionAndCriteria: async (req, res) => {
    try {
      const getDataPointWeightsByTargetedCriteria = await dataMapper.getDataPointsWeightByQuestionsAnswered(
        req.params.criteria,
        req.params.userId
      );
      return res.json(getDataPointWeightsByTargetedCriteria);
    } catch (error) {
      return res.json(error.message);
    }
  },

  checkIfQuizHasTaggedQuestions: async (req, res) => {
    try {
      const checkTaggedQuestions = await dataMapper.checkIfQuizHasTaggedQuestions(
        req.params.user
      );
      return res.json(checkTaggedQuestions);
    } catch (error) {
      return res.json(error.message);
    }
  },

  insertQuizOpinion: async (req, res) => {
    try {
      await dataMapper.insertQuizOpinion(
        req.params.quizTour,
        req.params.user,
        req.body.opinion
      );
      return res.json({ message: "avis bien inseré" });
    } catch (error) {
      return res.json(error.message);
    }
  },
};

module.exports = quizController;
