const express = require("express");

const router = express.Router();

// ce fichier met en place un router pour pouvoir interroger les routes au cas ou elles seront appeles. Elles determinent la methode du router (get ou post), la route defini avec les parametres indiqué par un ":" au cas ou il y aurai des parametres, et le controller et sa fonction associé pour la route interrogé.

const isUserAuthenitcated = require("./middleware/isUserAuthenticated");

const questionController = require("./controller/questionsController");
const userController = require("./controller/userController");
const quizController = require("./controller/quizController");
const answerController = require("./controller/answerController");

router.get("/questions", questionController.getQuestions);
router.post(
  "/dataInfo/:questionId",
  questionController.getDataInfoByQuestionId
);

router.post(
  "/insertQuestionOrder/:order/:questionId",
  questionController.insertQuestionOrder
);

router.get(
  "/getQuestionCriteria/:questionId",
  questionController.findQuestionCriteria
);

router.post("/insertUser", userController.insertUser);
router.post("/authenticateSignIn", userController.authenticateUserSignIn);
router.get("/findUser/:email", userController.findUserByEmail);
router.get("/findUserById/:id", userController.findUserById);
router.get("/findAllRoles", userController.getAllRoles);
router.get("/findUserRole", userController.getUserRole);
router.get("/findRoleByUserInfo/:roleId", userController.getRoleByUser);

router.post("/insertQuizTour/:id", quizController.insertQuizTour);
router.post(
  "/updateQuizTourIsStarted/:quizTour",
  quizController.updateQuizTourStarted
);
router.get(
  "/findQuizTour/:id",

  quizController.findQuizTour
);
router.post(
  "/insertAnswer/:quizTourId/:questionId",
  answerController.insertQuizAnswer
);
router.post(
  "/updateAnswer/:quizTourId/:questionId",
  answerController.updateQuizAnswer
);

router.get(
  "/getAnswer/:quizTourId/:questionId",
  answerController.getAnswerByQuizTourAndQuestion
);

router.get(
  "/getAnswersByQuizTour/:quizTourId",
  answerController.getAnswersByQuizId
);

router.get(
  "/getEmptyAnswersByQuizTour/:userId",
  quizController.getEmptyAnswersByQuizTour
);

router.get(
  "/checkIfQuizHasAnswers/:userId",
  answerController.checkIfQuizHasAnswers
);

router.get("/getCriteriaTotal/:criteria", quizController.findTotalByCriteria);

router.get(
  "/groupQuestionsAndAnswers/:criteria/:userId",
  quizController.groupQuestionsAndAnswersByQuiz
);

router.get(
  "/aggregateDataWeights/:userId",
  quizController.getAggregateDataPointsByAnsweredQuestions
);

router.post(
  "/insertQuizScore/:userId/:quizTourId",
  quizController.insertQuizScore
);

router.get("/getQuizScoreByUser/:userId", quizController.getQuizScoreByUser);

router.get(
  "/totalDataPointsWeightByCriteria",
  quizController.getDataPointWeightByEthicalCode
);

router.get("/totalDataPointsWeight", quizController.getTotalDataPointWeights);

router.get(
  "/dataPointWeightByQC/:criteria/:userId",
  quizController.getDataPointsWeightsByQuestionAndCriteria
);

router.post(
  "/insertIntoUnclearQuestion/:userId/:quizTour/:question",
  questionController.insertIntoUnclearQuestion
);

router.get(
  "/findUnclearAnswer/:user/:question",
  questionController.getUnclearQuestionByUser
);

router.get(
  "/checkIfQuizHasTaggedAnswer/:user",
  quizController.checkIfQuizHasTaggedQuestions
);

router.post(
  "/insertQuizOpinion/:quizTour/:user",
  quizController.insertQuizOpinion
);

router.get(
  "/emptyAnswersWithTaggedQuestions/:user",
  quizController.getEmptyAnswersByQuizTourWithTaggedQuestions
);

router.get(
  "/questionContent/:questionId",
  questionController.getQuestionContent
);

router.get(
  "/getAnswerStats/:questionId",
  answerController.getAnswerTotalByQuestion
);

router.get(
  "/totalAnswerCountByResponse/:questionId/:response",
  answerController.getAnswerTotalByResponse
);

router.get(
  "/totalTaggedByQuestion/:questionId",
  answerController.getTotalTaggedCountByQuestions
);

router.get(
  "/totalAnswerRespondents/:questionId",
  answerController.getTotalRespondentsByAnswers
);

module.exports = router;
