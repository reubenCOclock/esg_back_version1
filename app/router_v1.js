const express = require("express");

const router = express.Router();

const userControllerV1 = require("./controller_v1/userController");
const quizControllerV1 = require("./controller_v1/quizController");
const answerControllerV1 = require("./controller_v1/answerController");
const questionControllerV1 = require("./controller_v1/questionController");
const categoryControllerV1 = require("./controller_v1/categoryController");

const isUserAuthenticated = require("./middleware/isUserAuthenticated");

router.post("/user/v1/insert", userControllerV1.insertUser);

router.get("/role/v1/getUserRole", userControllerV1.getUserRole);

router.post("/user/v1/authentication", userControllerV1.authenticateUserSignIn);

router.post(
  "/quiz/v1/insertQuizTour/:id",
  isUserAuthenticated,
  quizControllerV1.insertQuizTour
);

router.post(
  "/quiz/v1/updateQuizStarted/:quizTour",
  quizControllerV1.updateQuizTourStarted
);

router.get("/user/v1/findUserById/:id", userControllerV1.findUserById);

router.get("/quiz/v1/findQuizTour/:id", quizControllerV1.findQuizTour);

router.get(
  "/answer/v1/checkEmptyAnswers/:userId",
  answerControllerV1.checkIfQuizHasAnswers
);

router.get(
  "/question/v1/getQuestions/:categoryId",
  questionControllerV1.getQuestions
);

router.get(
  "/categories/v1/getCategories",
  categoryControllerV1.getAllCategories
);

router.post(
  "/question/v1/insertOrder/:order/:questionId",
  questionControllerV1.insertQuestionOrder
);

router.post(
  "/answer/v1/insert/:quizTourId/:questionId",
  answerControllerV1.insertQuizAnswer
);

router.get(
  "/answer/v1/getAnswers/:quizTourId",
  answerControllerV1.getAnswersByQuizTour
);

router.get(
  "/answer/v1/getQuizAnswer/:quizTourId/:questionId",
  answerControllerV1.getAnswerByQuizTourAndQuestion
);

router.get(
  "/answer/v1/emptyAnswersByQuizTour/:userId",
  answerControllerV1.getEmptyAnswersByQuizTour
);

router.get("/pillar/v1/getPillars", categoryControllerV1.getPillars);

router.get(
  "/quiz/v1/getCategoryScoresByPillar/:pillarId",
  quizControllerV1.getCategoryScoresByPillar
);

router.post(
  "/quiz/v1/insertPillarQuizScores/:quizTourId",
  quizControllerV1.insertPillarQuizScores
);

router.get("/quiz/v1/getAggregateScores", quizControllerV1.getAggreateScore);

module.exports = router;
