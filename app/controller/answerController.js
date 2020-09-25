const dataMapper = require("../dataMapper");
// toutes ces fonctions font appel a une requette en particulier qui se trouvent dans le fichier datamapper. Pour voir ces requettes, rendez vous dans le fichier danamapper.js et consulter la requette en particulier

const answerController = {
  insertQuizAnswer: async (req, res) => {
    try {
      // recuperation du contenu de la reponse d'un utilisateur
      const answer = req.body.answer;
      let score;
      // selon sa reponse son "score" va varier.
      if (answer == "oui") {
        score = 0.9;
      } else if (answer == "peut etre") {
        score = 0.5;
      } else if (answer == "je ne sais pas") {
        score = 0.5;
      } else if (answer == "non") {
        score = 0.1;
      } else {
        score = 0;
      }
      // la reponse sera ensuite inseré en bdd avec les parametres correpondants.
      const newAnswer = await dataMapper.insertQuizAnswer(
        req.params.quizTourId,
        req.params.questionId,
        score,
        req.body.answer
      );

      return res.json(newAnswer);
    } catch (error) {
      return res.json(error.message);
    }
  },

  updateQuizAnswer: async (req, res) => {
    try {
      // meme logique que dans la fonction precedante sauf que cette fonction sera exectué dans le cas ou un utilisateur change sa reponse a une question a la quelle il a deja donné une reponse. Au lieu d'une insertion il y aura une mise a jour.
      const answer = req.body.answer;
      let score;
      if (answer == "oui") {
        score = 0.9;
      } else if (answer == "peut etre") {
        score = 0.5;
      } else if (answer == "je ne sais pas") {
        score = 0.5;
      } else {
        score = 0.1;
      }

      const updatedAnswer = await dataMapper.updateQuizAnswer(
        req.params.quizTourId,
        req.params.questionId,
        score,
        req.body.answer
      );

      return res.json(updatedAnswer);
    } catch (error) {
      res.json(error.message);
    }
  },

  getAnswerByQuizTourAndQuestion: async (req, res) => {
    // appel a la requellte visant a recupere une reponse par le quiz acutelle et la question actuelle.
    try {
      const answer = await dataMapper.getAnswerByQuizTourAndQuestion(
        req.params.quizTourId,
        req.params.questionId
      );
      return res.json(answer);
    } catch (error) {
      return res.json(error.message);
    }
  },

  getAnswersByQuizId: async (req, res) => {
    //appel a la fonction quie va recupere toutes les reponses d'un quiz en particulier.
    try {
      const answers = await dataMapper.getAnswersByQuizTour(
        req.params.quizTourId
      );
      return res.json(answers);
    } catch (error) {
      return res.json(error.message);
    }
  },

  checkIfQuizHasAnswers: async (req, res) => {
    try {
      const emptyAnswers = await dataMapper.checkIfQuizHasAnswers(
        req.params.userId
      );
      return res.json(emptyAnswers);
    } catch (error) {
      return res.json(error.message);
    }
  },

  getAnswerTotalByQuestion: async (req, res) => {
    try {
      const getQuestionTotal = await dataMapper.getTotalAnswerCountByQuestion(
        req.params.questionId
      );
      return res.json(getQuestionTotal);
    } catch (error) {
      return res.json(error.message);
    }
  },

  getTotalAnswersByQuestion: async (req, res) => {
    try {
      const getTotalAnswers = await dataMapper.getTotalAnswerCount(
        req.params.questionId
      );
    } catch (error) {
      return res.json(error.message);
    }
  },

  getAnswerTotalByResponse: async (req, res) => {
    try {
      const totalCountByResponse = await dataMapper.getTotalAnswerCountByResponse(
        req.params.questionId,
        req.params.response
      );
      return res.json(totalCountByResponse);
    } catch (error) {
      return res.json(error.message);
    }
  },

  getTotalTaggedCountByQuestions: async (req, res) => {
    try {
      const totalTaggedByQuestion = await dataMapper.getTotalTaggedCountByQuestion(
        req.params.questionId
      );
      return res.json(totalTaggedByQuestion);
    } catch (error) {
      return res.json(error.message);
    }
  },

  getTotalRespondentsByAnswers: async (req, res) => {
    try {
      const totalRespondents = await dataMapper.getTotalRespondentsByAnswers(
        req.params.questionId
      );
      return res.json(totalRespondents);
    } catch (error) {
      return res.json(error.message);
    }
  },
};

module.exports = answerController;
