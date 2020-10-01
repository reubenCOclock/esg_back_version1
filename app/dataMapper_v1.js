const { Client } = require("pg");
const client = new Client(process.env.DB_V1);
client.connect();

const dataMapper = {
  insertUser: async (email, role, password, token, salt) => {
    // creation d'un nouveau utilisateur selon son email
    try {
      const newUser = await client.query(
        `INSERT INTO "user" (email,role_id,password,token,salt) VALUES ($1,$2,$3,$4,$5) RETURNING id,email,role_id,token,salt`,
        [email, role, password, token, salt]
      );

      return newUser.rows[0];
    } catch (error) {
      console.log(error.message);
    }
  },

  updateUserIsHashed: async (userId) => {
    // si le mpd de l'utlisateur n'est pas encore hashé, je fais le hachage
    try {
      await client.query(`UPDATE "user" SET is_hashed='1' WHERE "id"=$1`, [
        userId,
      ]);
    } catch (error) {
      console.log(error.message);
    }
  },

  getAllRoles: async () => {
    // je selectionne tout les roles
    try {
      const allRoles = await client.query(`SELECT * FROM "role"`);
      return allRoles.rows;
    } catch (error) {
      console.log(error.message);
    }
  },

  getUserRole: async () => {
    //je selectionne le role "user"
    try {
      const userRole = await client.query(
        `SELECT * FROM "role" WHERE title='user'`
      );
      return userRole.rows[0];
    } catch (error) {
      console.log(error.message);
    }
  },

  getRoleByUser: async (roleId) => {
    try {
      const getRole = await client.query(`SELECT * FROM "role" WHERE id=$1`, [
        roleId,
      ]);
      return getRole.rows[0];
    } catch (error) {
      console.log(error.message);
    }
  },

  selectUserByEmail: async (email) => {
    try {
      //recuperation d'un utilisateur selon son email
      const findUser = await client.query(
        `SELECT * FROM "user" WHERE email=$1`,
        [email]
      );
      return findUser.rows[0];
    } catch (error) {
      console.log("this is where the error occured at selectUserByEmail");
    }
  },

  selectUserById: async (userId) => {
    try {
      const findUser = await client.query(`SELECT * FROM "user" WHERE id=$1`, [
        userId,
      ]);
      return findUser.rows[0];
    } catch (error) {
      console.log("this is where the error occured at selectUserById");
      console.log(error.message);
    }
  },

  selectUserByToken: async (token) => {
    try {
      const findUser = await client.query(
        `SELECT * FROM "user" WHERE token=$1`,
        [token]
      );
      return findUser.rows[0];
    } catch (error) {
      console.log(error.message);
    }
  },

  insertQuizTour: async (userId) => {
    // insertion d'une nouvelle tournée de questionnaire en bdd selon un utilisateur en particulier
    const newQuizTour = await client.query(
      `INSERT INTO quiztour (userId) VALUES($1) RETURNING id,userId`,
      [userId]
    );
    return newQuizTour.rows[0];
  },

  updateQuizTourStarted: async (bool, quizTourId) => {
    try {
      await client.query(`UPDATE quiztour SET is_started=$1 WHERE "id"=$2`, [
        bool,
        quizTourId,
      ]);
    } catch (error) {
      console.log(
        "there was an error in this query this is the right one we are talking about"
      );
    }
  },

  findQuizTour: async (userId) => {
    // recuperation du dernier quiz sur lequel un utilisateur travaillé, le ORDER BY fait en sorte que le quiz le plus recent s'affiche et le LIMIT fait en sorte que il y a que un seul quiz qui s'affiche
    const selectQuizTour = await client.query(
      `SELECT * FROM quiztour WHERE userId=$1 ORDER BY "id" DESC LIMIT 1 `,
      [userId]
    );
    return selectQuizTour.rows[0];
  },

  checkIfQuizHasAnswers: async (userId) => {
    // verification si il y a deja des reponses pour un quiz en particulier
    try {
      const checkEmptyAnswers = await client.query(
        `SELECT * FROM answer WHERE quiztour_id IN(SELECT "id" FROM quiztour WHERE userId=$1 ORDER BY "id" DESC LIMIT 1)`,
        [userId]
      );
      return checkEmptyAnswers.rows;
    } catch (error) {
      console.log("this is where the error occured");
      console.log(error.message);
    }
  },

  selectQuestionsByCategory: async (categoryName) => {
    // je selectionne toutes les questions et je fait le triage par la categorie
    try {
      const questionsByCategory = await client.query(
        `SELECT * FROM question WHERE datapoint_id IN(SELECT "id" FROM datapoint 
        WHERE category_id IN(SELECT "id" FROM category WHERE "name"=$1)) ORDER BY RANDOM()`,
        [categoryName]
      );
      return questionsByCategory.rows;
    } catch (error) {
      console.log(error.message);
    }
  },

  insertQuestionOrder: async (counter, questionId) => {
    // je mets a jour l'ordrre des questions
    try {
      const newQuestionOrder = await client.query(
        `UPDATE question SET question_order=$1 WHERE "id"=$2 RETURNING question_order,"id","content"`,
        [counter, questionId]
      );

      return newQuestionOrder.rows[0];
    } catch (error) {
      console.log(error.message);
    }
  },

  getAllCategories: async () => {
    try {
      const getCategories = await client.query(`SELECT * FROM category`);
      return getCategories.rows;
    } catch (error) {
      console.log(error.message);
    }
  },

  insertQuizAnswer: async (quizTourId, questionId, score, content) => {
    try {
      // insertion d'une question dans un quiz
      const InsertQuizAnswer = await client.query(
        `INSERT into answer ("content",question_id,quiztour_id,score) VALUES($1,$2,$3,$4) RETURNING id,quiztour_id,question_id,score,"content"`,
        [content, questionId, quizTourId, score]
      );
      return InsertQuizAnswer.rows[0];
    } catch (error) {
      //console.log("this is where the error occured");
      console.log(error.message);
    }
    // insertion d'une nouvelle reponse a un quiz dans la bdd, elle prend en compte le quiztour actuelle, la question actuelle, le contenu de la reponse et le poids de la reponse comme indiqué dans les parametres
  },

  getQuestionInformation: async (questionId) => {
    try {
      const getQuestionInfo = await client.query(
        `SELECT * FROM question WHERE "id"=$1`,
        [questionId]
      );
      return getQuestionInfo.rows[0];
    } catch (error) {
      console.log(error.message);
    }
  },

  getAnswersByQuizTour: async (quizTourId) => {
    try {
      const getAnswers = await client.query(
        `SELECT * FROM answer WHERE quiztour_id=$1`,
        [quizTourId]
      );
      return getAnswers.rows;
    } catch (error) {
      console.log(error.message);
    }
  },

  getAnswerByQuizTourAndQuestion: async (quizTourId, questionId) => {
    //recuperation d'une reponse par quiz en at par question en particulier
    const getAnswer = await client.query(
      "SELECT * FROM answer WHERE quiztour_id=$1 AND question_id=$2",
      [quizTourId, questionId]
    );
    if (getAnswer) {
      return getAnswer;
    } else {
      console.log("no");
    }
  },

  updateQuizAnswer: async (quizTourId, questionId, score, content) => {
    //mise a jour d'une reponse selon les memes information que dans la requette contenu de la fonction "insertQuizAnswer" cette fonction sera appelé quand un utilisatuer changera la reponse a une reponse sur laquelle il a deja donné une reponse
    try {
      const updatedAnswer = await client.query(
        `UPDATE answer SET score=$1,"content"=$4 WHERE quiztour_id=$2 AND question_id=$3  RETURNING id,quiztour_id,question_id,score,response`,
        [score, quizTourId, questionId, content]
      );
      return updatedAnswer.rows[0];
    } catch (error) {
      //console.log("this is where the error was thrown at updateQuizAnswer");
      console.log(error.message);
    }
  },

  getEmptyAnswersByQuizTour: async (userId) => {
    // je selectionne les questions auxquelles il n'y a aucune reponse sur un quiz en particulier
    try {
      const emptyAnswers = await client.query(
        `SELECT * FROM question WHERE "id" NOT IN(SELECT question_id FROM answer WHERE quiztour_id IN(SELECT "id" FROM quiztour 
        WHERE userId=$1 ORDER BY "id" DESC LIMIT 1)) ORDER BY question_order DESC`,
        [userId]
      );
      console.log("here is the user id");
      console.log(userId);
      return emptyAnswers.rows;
    } catch (error) {
      console.log(error.message);
    }
  },

  getPillars: async () => {
    try {
      const getPillars = await client.query(`SELECT * FROM pillar`);
      return getPillars.rows;
    } catch (error) {
      console.log(error.message);
    }
  },

  getCategoryScoresByPillar: async (pillarId) => {
    //je selectionne le total des reponses, le nombre de questions par categorie le score divisé par l'identifiant des categories, et je fait un groupement par le nom des categories
    try {
      const categoryScoresByPillar = await client.query(
        `SELECT SUM(answer.score) AS score, 
        COUNT(category.id) AS total_category_count, SUM(answer.score)/COUNT(category.id) AS proportion,
        category.weight,category.name FROM answer 
        JOIN question ON answer.question_id=question.id
        JOIN datapoint ON question.datapoint_id=datapoint.id
        JOIN category ON datapoint.category_id=category.id
        JOIN quiztour ON answer.quiztour_id=quiztour.id
        JOIN "user" ON quiztour.userId="user".id
        WHERE answer.quiztour_id IN(SELECT "id" FROM quiztour WHERE userId=5 ORDER BY "id" DESC LIMIT 1) 
        AND category.name IN(SELECT "name" FROM category WHERE pillar_id=$1)
        GROUP BY category.name,category.weight`,
        [pillarId]
      );

      return categoryScoresByPillar.rows;
    } catch (error) {
      console.log(error.message);
    }
  },

  insertPillarQuizScores: async (criteria, score, quizTourId) => {
    //insertion d'un resultat d'un quiz dans la bdd
    try {
      const insertPillarScore = await client.query(
        `INSERT INTO quiz_score (criteria,score,quiztour_id) VALUES ($1,$2,$3) RETURNING categories_score,quiztour_id`,
        [criteria, score, quizTourId]
      );
      return insertPillarScore.rows;
    } catch (error) {
      console.log(error.message);
    }
  },

  getAggregateScore: async () => {
    // requette visant a determiner le score esg total d'une entreprise sans filtrer sur une cateogorie en particulier mais en prenant l'ensemble total
    try {
      const getGroupedScores = await client.query(`SELECT  SUM(answer.score)/COUNT(category.id)*category.weight AS muliplication_result  FROM answer 
        JOIN question ON answer.question_id=question.id
        JOIN datapoint ON question.datapoint_id=datapoint.id
        JOIN category ON datapoint.category_id=category.id
        JOIN quiztour ON answer.quiztour_id=quiztour.id
        JOIN "user" ON quiztour.userId="user".id
        WHERE answer.quiztour_id IN(SELECT "id" FROM quiztour WHERE userId=5 ORDER BY "id" DESC LIMIT 1) 
        GROUP BY category.weight`);
      return getGroupedScores.rows;
    } catch (error) {
      console.log(error.message);
    }
  },
};

module.exports = dataMapper;
