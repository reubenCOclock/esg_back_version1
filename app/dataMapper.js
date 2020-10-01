const db = require("./dbInfo.js");
const { SSL_OP_CISCO_ANYCONNECT } = require("constants");

const dataMapper = {
  selectQuestions: async () => {
    //requette pour recuperer toutes les questions d'un questionnaire
    try {
      const getQuestions = await db.query(
        `SELECT * FROM question WHERE id !=33 ORDER BY RANDOM()`
      );
      return getQuestions.rows;
    } catch (error) {
      console.log(error.message);
    }
  },
  selectDataInfoByQuestionId: async (questionId) => {
    // requette pour recuperer tous les datapoints qui sont lié a une question en particulier en affichant la question concerné indiqué par le parametre
    try {
      const getDataPointsById = await db.query(
        "SELECT datapoints.code,datapoints.weight,datapoints.ethical_code,question.id FROM question_data JOIN question ON question.id=question_data.question_id JOIN datapoints ON datapoints.id=question_data.datapoint_id WHERE question.id=$1",
        [questionId]
      );
      return getDataPointsById;
    } catch (error) {
      console.log(error.message);
    }
  },

  insertQuestionOrder: async (counter, questionId) => {
    try {
      const newQuestionOrder = await db.query(
        `UPDATE question SET question_order=$1 WHERE "id"=$2 RETURNING question_order,"id",content`,
        [counter, questionId]
      );
      return newQuestionOrder.rows[0];
    } catch (error) {
      console.log(error.message);
    }
  },

  insertUser: async (email, role, password, token, salt) => {
    // creation d'un nouveau utilisateur selon son email
    try {
      const newUser = await db.query(
        `INSERT INTO "user" (email,role_id,password,token,salt) VALUES ($1,$2,$3,$4,$5) RETURNING id,email,role_id,token,salt`,
        [email, role, password, token, salt]
      );

      return newUser.rows[0];
    } catch (error) {
      console.log(error.message);
    }
  },

  updateUserIsHashed: async (userId) => {
    try {
      await db.query(`UPDATE "user" SET is_hashed='1' WHERE "id"=$1`, [userId]);
    } catch (error) {
      console.log(error.message);
    }
  },

  getAllRoles: async () => {
    try {
      const allRoles = await db.query(`SELECT * FROM "role"`);
      return allRoles.rows;
    } catch (error) {
      console.log(error.message);
    }
  },

  getUserRole: async () => {
    try {
      const userRole = await db.query(
        `SELECT * FROM "role" WHERE title='user'`
      );
      return userRole.rows[0];
    } catch (error) {
      console.log(error.message);
    }
  },

  getRoleByUser: async (roleId) => {
    try {
      const getRole = await db.query(`SELECT * FROM "role" WHERE id=$1`, [
        roleId,
      ]);
      return getRole.rows[0];
    } catch (error) {
      console.log(error.message);
    }
  },

  selectUserByEmail: async (email) => {
    //recuperation d'un utilisateur selon son email
    const findUser = await db.query(`SELECT * FROM "user" WHERE email=$1`, [
      email,
    ]);
    return findUser.rows[0];
  },

  selectUserById: async (userId) => {
    try {
      const findUser = await db.query(`SELECT * FROM "user" WHERE id=$1`, [
        userId,
      ]);
      return findUser.rows[0];
    } catch (error) {
      console.log(error.message);
    }
  },

  selectUserByToken: async (token) => {
    try {
      const findUser = await db.query(`SELECT * FROM "user" WHERE token=$1`, [
        token,
      ]);
      return findUser.rows[0];
    } catch (error) {
      console.log(error.message);
    }
  },
  insertQuizTour: async (userId) => {
    // insertion d'une nouvelle tournée de questionnaire en bdd selon un utilisateur en particulier
    const newQuizTour = await db.query(
      `INSERT INTO quiztour (userId) VALUES($1) RETURNING id,userId`,
      [userId]
    );
    return newQuizTour.rows[0];
  },

  updateQuizTourStarted: async (bool, quizTourId) => {
    try {
      await db.query(`UPDATE quiztour SET is_started=$1 WHERE "id"=$2`, [
        bool,
        quizTourId,
      ]);
    } catch (error) {
      console.log(error.message);
    }
  },

  findQuizTour: async (userId) => {
    // recuperation du dernier quiz sur lequel un utilisateur travaillé, le ORDER BY fait en sorte que le quiz le plus recent s'affiche et le LIMIT fait en sorte que il y a que un seul quiz qui s'affiche
    const selectQuizTour = await db.query(
      `SELECT * FROM quiztour WHERE userId=$1 ORDER BY "id" DESC LIMIT 1 `,
      [userId]
    );
    return selectQuizTour.rows[0];
  },

  insertQuizAnswer: async (quizTourId, questionId, score, response) => {
    // insertion d'une nouvelle reponse a un quiz dans la bdd, elle prend en compte le quiztour actuelle, la question actuelle, le contenu de la reponse et le poids de la reponse comme indiqué dans les parametres
    const InsertQuizAnswer = await db.query(
      "INSERT into answer (quiztour_id,question_id,score,response) VALUES($1,$2,$3,$4) RETURNING id,quiztour_id,question_id,score,response",
      [quizTourId, questionId, score, response]
    );
    return InsertQuizAnswer.rows[0];
  },

  updateQuizAnswer: async (quizTourId, questionId, score, response) => {
    //mise a jour d'une reponse selon les memes information que dans la requette contenu de la fonction "insertQuizAnswer" cette fonction sera appelé quand un utilisatuer changera la reponse a une reponse sur laquelle il a deja donné une reponse
    try {
      const updatedAnswer = await db.query(
        "UPDATE answer SET score=$1,response=$4 WHERE quiztour_id=$2 AND question_id=$3  RETURNING id,quiztour_id,question_id,score,response",
        [score, quizTourId, questionId, response]
      );
      return updatedAnswer.rows[0];
    } catch (error) {
      console.log("this is where the error was thrown at updateQuizAnswer");
      console.log(error.message);
    }
  },

  checkIfQuizHasAnswers: async (userId) => {
    try {
      const checkEmptyAnswers = await db.query(
        `SELECT * FROM answer WHERE quiztour_id IN(SELECT "id" FROM quiztour WHERE userId=$1 ORDER BY "id" DESC LIMIT 1)`,
        [userId]
      );
      return checkEmptyAnswers.rows;
    } catch (error) {
      console.log("this is where the error occured at checkIfQuizHasAnswers");
      console.log(error.message);
    }
  },

  getAnswerByQuizTourAndQuestion: async (quizTourId, questionId) => {
    //recuperation d'une reponse par quiz en at par question en particulier
    const getAnswer = await db.query(
      "SELECT * FROM answer WHERE quiztour_id=$1 AND question_id=$2",
      [quizTourId, questionId]
    );
    if (getAnswer) {
      return getAnswer;
    } else {
      console.log("no");
    }
  },

  getAnswersByQuizTour: async (quizTourId) => {
    // recuperation de toutes les reponses pour un quiz en particulier
    try {
      const getAnswers = await db.query(
        "SELECT * FROM answer WHERE quiztour_id=$1",
        [quizTourId]
      );
      return getAnswers.rows;
    } catch (error) {
      console.log("this is where the error was thrown at getAnswersByQuizTour");
    }
  },

  findEmptyAnswersByQuizTour: async (userId) => {
    // Recuperation de toutes les questions presentes qui ne se trouve pas parmi les questions auxquelles un utilisateur n'aurai repondu pendant un quiz. Cette requette sert a verifier si un utilisateur a bien repondu a toutes les question d'un quiz en particulier.
    try {
      const getEmptyAnswers = await db.query(
        `SELECT * FROM question WHERE "id" NOT IN(SELECT question_id FROM answer WHERE quiztour_id 
        IN(SELECT "id" FROM quiztour where userId=$1 ORDER BY "id" DESC LIMIT 1)) ORDER by question_order ASC`,
        [userId]
      );

      return getEmptyAnswers.rows;
    } catch (error) {
      console.log(
        "this is where the error was thrown at findEmptyAnswersByQuizTour"
      );
      console.log(error.message);
    }
  },

  findEmptyAnswersByQuizTourWithTaggedQuestions: async (userId) => {
    try {
      const getEmptyAnswersWithTaggedQuestions = await db.query(
        `SELECT * FROM question WHERE "id" NOT IN(SELECT question_id FROM answer 
        WHERE quiztour_id IN(SELECT "id" FROM quiztour WHERE userId=$1 ORDER BY "id" DESC LIMIT 1)) AND "id" 
        NOT IN (SELECT question_id FROM unclear_question 
        WHERE userId=$1 AND quiztour_id IN (SELECT "id" FROM quiztour WHERE userId=$1 ORDER BY "id" DESC LIMIT 1) ) ORDER BY question_order ASC`,
        [userId]
      );
      return getEmptyAnswersWithTaggedQuestions.rows;
    } catch (error) {
      console.log(error.message);
    }
  },

  findTotalByCriteria: async (criteria) => {
    // cette requette trouve l'aggregation des poids de la ponderation des codes ethiques pour un code en particuliar (en l'occurence E,S ou G)
    const getWeight = await db.query(
      `SELECT SUM(weight) AS total,ethical_code FROM datapoints WHERE ethical_code=$1 GROUP BY ethical_code`,
      [criteria]
    );
    return getWeight.rows[0];
  },

  groupAnswersAndQuestionsByQuiz: async (criteria, userId) => {
    // cette requette qui est tres longue vise a afficher le contenu d'une reponse, son poids, la question a laquelle la reponse est lié et la liste de tous les datapoints concerné par la question a laquelle l'utilisateur a repondu. Ces informations permet de faire le calcul du score de la reponse multiplié par la ponderation du datapoint pour tous les datapoints lié a la questiion a laquelle l'utilisateur a repondu. Cette requette est groupé par les "criteres" E,S et G.
    const getQuizDataByCriteria = await db.query(
      `SELECT answer.score * datapoints.weight AS multiplication_result,answer.response,question.content,question.id AS questionNumber, datapoints.ethical_code,datapoints.weight
      FROM question
      JOIN question_data ON question.id=question_data.question_id
      JOIN datapoints ON datapoints.id=question_data.datapoint_id
      JOIN answer ON question.id=answer.question_id
      JOIN quiztour ON answer.quiztour_id=quiztour.id
      WHERE question.id IN (SELECT question_id FROM question_data WHERE 
      datapoint_id IN (select "id" FROM datapoints WHERE ethical_code=$1)) 
      AND quiztour.id IN(SELECT "id" FROM quiztour WHERE userId=$2 ORDER BY "id" DESC LIMIT 1)
      AND answer.response!='je ne sais pas'`,
      [criteria, userId]
    );

    return getQuizDataByCriteria.rows;
  },

  aggregateDataWeightsByQuestionsAnswered: async (userId) => {
    try {
      const getDataPointWeightsByAnsweredQuestions = await db.query(
        `SELECT SUM(datapoints.weight) AS sum,datapoints.ethical_code
      FROM question 
      JOIN question_data ON question.id=question_data.question_id
      JOIN datapoints ON datapoints.id=question_data.datapoint_id
      JOIN answer ON answer.question_id=question.id
      JOIN quiztour ON quiztour.id=answer.quiztour_id
      WHERE question.id IN (SELECT question_id FROM question_data 
      WHERE datapoint_id IN(SELECT "id" FROM datapoints))
      AND quiztour.id IN (SELECT "id" FROM quiztour WHERE userId=$1 ORDER BY "id" DESC LIMIT 1)
      AND answer.response!='je ne sais pas'
      GROUP BY datapoints.ethical_code`,
        [userId]
      );
      return getDataPointWeightsByAnsweredQuestions.rows;
    } catch (error) {
      console.log(error.message);
    }
  },

  insertQuizScore: async (quizTourId, userId, ethicalCriteria, score) => {
    //requette qui insere le score E,S et G pour un utilisateur en particulier et pour un quiztour en particulier. Concretement, 3 rangés de la table quizscores seront lié a une tournée de quiz en particulier qui peut potentiellement etre vu comme un defaut. Le but de cette requette cependant et de pouvoir afficher le score E,S et G respectivement coté front.
    try {
      const insertQuizScore = await db.query(
        `INSERT INTO quizscores(quiztour_id,userId,ethical_criteria,score) VALUES($1,$2,$3,$4) RETURNING quiztour_id,userId,ethical_criteria,score`,
        [quizTourId, userId, ethicalCriteria, score]
      );
      return insertQuizScore.rows[0];
    } catch (error) {
      console.log("message=====" + error.message);
    }
  },

  getQuizScoreByUser: async (userId) => {
    // cette requette retourne les 3 dernieres insertion de la table quizscores pour bien pouvoir afficher le E,S et le G du dernier questionnaire lié a un utilisateur en particulier. Le limit 3 permet de pouvoir eviter des doublons au cas ou il se trouverai mais de pouvoir bien prendre tous les criteres en consideration.
    try {
      const getQuizScoreByUser = await db.query(
        `SELECT * FROM quizscores WHERE quiztour_id IN (SELECT "id" FROM quiztour WHERE userId=$1 ORDER BY "id" DESC LIMIT 1) ORDER BY "id" LIMIT 3`,
        [userId]
      );
      return getQuizScoreByUser.rows;
    } catch (error) {
      console.log("message====>" + error.message);
    }
  },

  findQuestionCriteria: async (questionId) => {
    //cette requette vise a determiner le critere de datapoints qui sont lié a la question. Etant donné que chaque question est lié a des datapoints qui sont uniquement lié aux criteres E,S ou G, il y a seulement besoin de recuperer le premier resultant de la requette
    try {
      const getCriteriaByQuestion = await db.query(
        `SELECT datapoints.ethical_code FROM datapoints JOIN question_data ON datapoints.id=question_data.datapoint_id
      JOIN question ON question_data.question_id=question.id 
      WHERE question.id=$1 LIMIT 1`,
        [questionId]
      );
      return getCriteriaByQuestion.rows[0];
    } catch (error) {
      console.log(error.message);
    }
  },

  getDataPointsWeightByEthicalCode: async () => {
    try {
      const getDataPointsWeights = await db.query(`SELECT SUM(datapoints.weight) AS total,datapoints.ethical_code FROM datapoints
    JOIN question_data ON question_data.datapoint_id=datapoints.id
    JOIN question ON question_data.question_id=question.id WHERE question.id!=33
    GROUP BY datapoints.ethical_code`);
      return getDataPointsWeights.rows;
    } catch (error) {
      console.log(error.message);
    }
  },

  getTotalDataPointWeights: async () => {
    try {
      const getTotalDataPointWeights = await db.query(`SELECT SUM(datapoints.weight)  FROM datapoints
      JOIN question_data ON question_data.datapoint_id=datapoints.id
      JOIN question ON question_data.question_id=question.id WHERE question.id!=33`);
      return getTotalDataPointWeights.rows;
    } catch (error) {
      console.log(error.message);
    }
  },

  getDataPointsWeightByQuestionsAnswered: async (targetedCriteria, userId) => {
    try {
      const getDataPointsWeightsByQuestion = await db.query(
        `SELECT SUM(datapoints.weight) AS sum,datapoints.ethical_code AS code
      FROM question 
      JOIN question_data ON question.id=question_data.question_id
      JOIN datapoints ON datapoints.id=question_data.datapoint_id
      JOIN answer ON answer.question_id=question.id
      JOIN quiztour ON quiztour.id=answer.quiztour_id
      WHERE question.id IN (SELECT question_id FROM question_data 
      WHERE datapoint_id IN(SELECT "id" FROM datapoints WHERE ethical_code=$1))
      AND quiztour.id IN (SELECT "id" FROM quiztour WHERE userId=$2 ORDER BY "id" DESC LIMIT 1)
      AND answer.response!='je ne sais pas'
      GROUP BY datapoints.ethical_code`,
        [targetedCriteria, userId]
      );
      return getDataPointsWeightsByQuestion.rows;
    } catch (error) {
      console.log(error.message);
    }
  },

  insertIntoUnclearQuestion: async (userId, quizTourId, questionId) => {
    try {
      await db.query(
        `INSERT INTO unclear_question (userId,quiztour_id,question_id) VALUES($1,$2,$3)`,
        [userId, quizTourId, questionId]
      );
    } catch (error) {
      console.log(error.message);
    }
  },

  getUnclearQuestionByUser: async (userId, questionId) => {
    try {
      const unclearQuestion = await db.query(
        `SELECT * FROM unclear_question WHERE userId=$1 AND question_id=$2`,
        [userId, questionId]
      );
      return unclearQuestion.rows;
    } catch (error) {
      console.log(error.message);
    }
  },

  checkIfQuizHasTaggedQuestions: async (userId) => {
    try {
      const taggedQuestions = await db.query(
        `SELECT * FROM unclear_question WHERE quiztour_id IN(SELECT "id" FROM quiztour WHERE userId=$1 ORDER BY "id" DESC LIMIT 1)`,
        [userId]
      );
      return taggedQuestions.rows;
    } catch (error) {
      console.log(error.message);
    }
  },

  insertQuizOpinion: async (quizTourId, userId, opinionText) => {
    try {
      await db.query(
        `INSERT INTO quiz_opinion(quiztour_id,userId,opinion_text) VALUES($1,$2,$3)`,
        [quizTourId, userId, opinionText]
      );
    } catch (error) {
      console.log(error.message);
    }
  },

  getQuestionContentById: async (questionId) => {
    try {
      const questionContent = await db.query(
        `SELECT * FROM question WHERE id=$1`,
        [questionId]
      );
      return questionContent.rows[0];
    } catch (error) {
      console.log(error.message);
    }
  },

  getTotalAnswerCountByQuestion: async (questionId) => {
    try {
      const totalAnswerCount = await db.query(
        `SELECT COUNT("id") AS total FROM answer 
      WHERE answer.question_id IN(SELECT "id" FROM question WHERE "id"=$1)
      UNION 
      SELECT COUNT("id") AS total FROM unclear_question 
      WHERE question_id IN(SELECT "id" FROM question WHERE "id"=$1)`,
        [questionId]
      );
      return totalAnswerCount.rows;
    } catch (error) {
      console.log(error.message);
    }
  },

  getTotalAnswerCount: async (questionId) => {
    const totalAnswers = await db.query(
      `SELECT COUNT("id") AS total FROM answer 
    WHERE answer.question_id IN(SELECT "id" FROM question WHERE "id"=$1)`,
      [questionId]
    );
    return totalAnswers.rows;
  },

  getTotalAnswerCountByResponse: async (questionId, response) => {
    try {
      const answerCountByResponse = await db.query(
        `SELECT COUNT("id")AS total,response FROM answer 
      WHERE question_id IN(SELECT "id" FROM question WHERE "id"=$1) AND response=$2
      GROUP BY response`,
        [questionId, response]
      );
      return answerCountByResponse.rows[0];
    } catch (error) {
      console.log(error.message);
    }
  },

  getTotalTaggedCountByQuestion: async (questionId) => {
    try {
      const totalTaggedQuestions = await db.query(
        `SELECT COUNT("id") AS total FROM unclear_question 
      WHERE question_id IN(SELECT "id" FROM question WHERE "id"=$1)`,
        [questionId]
      );
      return totalTaggedQuestions.rows[0];
    } catch (error) {
      console.log(error.message);
    }
  },

  getTotalRespondentsByAnswers: async (questionId) => {
    try {
      const getTotalUserAnswers = await db.query(
        `SELECT COUNT(DISTINCT(quiztour.userId)) FROM answer 
      JOIN quiztour ON answer.quiztour_id=quiztour.id
      WHERE answer.question_id IN(SELECT "id" FROM question WHERE "id"=$1)
      UNION 
      SELECT COUNT(DISTINCT(quiztour.userId)) 
      FROM unclear_question
      JOIN quiztour ON unclear_question.quiztour_id=quiztour.id
      WHERE unclear_question.question_id IN(SELECT "id" FROM question WHERE "id"=$1)`,
        [questionId]
      );
      console.log(getTotalUserAnswers.rows);
      return getTotalUserAnswers.rows;
    } catch (error) {
      console.log(error.message);
    }
  },
};

module.exports = dataMapper;
