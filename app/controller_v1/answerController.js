const dataMapper = require("../dataMapper_v1");

const answerController = {
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

  insertQuizAnswer: async (req, res) => {
    try {
      // recuperation du contenu de la reponse d'un utilisateur
      const answer = req.body.answer;
      let score;
      // selon sa reponse son "score" va varier.

      const associatedQuestion = await dataMapper.getQuestionInformation(
        req.params.questionId
      );
      //console.log("here is the associated question");
      //console.log(associatedQuestion);

      if (associatedQuestion.polarity == "positive") {
        if (answer == "yes") {
          score = 1;
        } else if (answer == "no") {
          score = 0;
        }
      } else {
        if (answer == "yes") {
          score = 0;
        } else if (answer == "no") {
          score = 1;
        }
      }

      //console.log(score);
      //console.log(req.body.answer);
      // la reponse sera ensuite inseré en bdd avec les parametres correpondants.
      const newAnswer = await dataMapper.insertQuizAnswer(
        req.params.quizTourId,
        req.params.questionId,
        score,
        req.body.answer
      );

      return res.json(newAnswer);
    } catch (error) {
      //console.log("an error has occured in this place");
      return res.json(error.message);
    }
  },

  updateQuizAnswer: async (req, res) => {
    try {
      // meme logique que dans la fonction precedante sauf que cette fonction sera exectué dans le cas ou un utilisateur change sa reponse a une question a la quelle il a deja donné une reponse. Au lieu d'une insertion il y aura une mise a jour.
      const answer = req.body.answer;
      let score;
      const associatedQuestion = await dataMapper.getQuestionInformation(
        req.params.questionId
      );
      //console.log("here is the associated question");
      //console.log(associatedQuestion);

      if (associatedQuestion.polarity == "positive") {
        if (answer == "yes") {
          score = 1;
        } else if (answer == "no") {
          score = 0;
        }
      } else {
        if (answer == "yes") {
          score = 0;
        } else if (answer == "no") {
          score = 1;
        }
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

  getAnswersByQuizTour: async (req, res) => {
    try {
      const answersByQuizTour = await dataMapper.getAnswersByQuizTour(
        req.params.quizTourId
      );
      return res.json(answersByQuizTour);
    } catch (error) {
      return res.json(error.message);
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

  getEmptyAnswersByQuizTour: async (req, res) => {
    try {
      const emptyAnswers = await dataMapper.getEmptyAnswersByQuizTour(
        req.params.userId
      );

      return res.json(emptyAnswers);
    } catch (error) {
      return res.json(error.message);
    }
  },
};

module.exports = answerController;
