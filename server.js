const express       = require('express');
const mysql         = require('mysql');
const app           = express();
var bodyParser      = require('body-parser');
var UUID            = require('node-uuid');

const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get('/api/questions', (req, res) => {
  var sql = "SELECT * FROM `questions`";
  console.log(sql);
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    res.send({result: result});
  });
});

app.get('/api/questions/:questionid', (req, res) => {
  var sql = "SELECT * FROM `questions` WHERE `id`='"+req.params.questionid+"'";
  console.log(sql);
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    res.send({result: result});
  });
});

app.post('/api/questions', function (req, res) {
  // First read existing users.
  //INSERT INTO `questions`(`question`, `answer`, `id`) VALUES ("2+2=?","4",4)//
  //INSERT INTO 'questions' ('question', 'answer', 'id') VALUES ('wfewefwef','wefwef','a61d31b1-d14a-4b99-90e5-11d06dcb5ed0')
  var uuid = UUID();
  var sql = "INSERT INTO `questions` (`question`, `answer`, `id`) VALUES ('"+req.body.question+"','"+req.body.answer+"','"+uuid+"')";
  console.log(sql);
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("a question added");
    res.send({id: uuid});
  });
})

app.post('/api/updateanswer', (req, res) => {
  console.log(req.body.id);
  var sql = "UPDATE `questions` SET `answer`='"+req.body.answer+"' WHERE `id`='"+req.body.id+"'";
  console.log(sql);
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
    res.send('Updated Successfully!');
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));

/*** Database ***/

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'andrii',
  password: '123456',
  database: 'andrii'
});
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});