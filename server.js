const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db_conn_file = fs.readFileSync('./database.json');
const mysql = require('mysql');
const conf = JSON.parse(db_conn_file);
const sql ="SELECT t.HJ_NO no, t.HJ_DV dv, t.WD_HJ wdhj, t.SND snd, t.DSC dsc, t.CLS_CD clscd, t.TOT_CLS_NM2 totclsnm2, t.CLS_NM2 clsnm2, t.MSND2 msnd2, t.RDC rdc, t.HJ_CNT hjcnt, t.TOT_HJ_CNT tothjcnt FROM THJ_TOT_HJ_DICS t WHERE 1=1 ORDER BY t.CLS_CD,t.HJ_NO LIMIT 20";

const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
}); 

connection.connect();

const multer = require('multer');
const upload = multer({dest: './upload'})

app.get('/api/hanjas', (req, res) => {
    
    connection.query(
        sql, 
        (err,rows,fields) => {
            if(err) {
                console.log(err);
                res.send(err);
            } else {    
                res.send(rows);
                console.log(rows);
            }
        }
    ); 
});

// upload 폴더를 공유
//app.use('/image', express.static('./upload'));

// Insert 구문
/* app.post('/api/hanjas', upload.single('image'), (req,res) => {
    let sql = 'INSERT INTO CUSTOMER VALUES(null, ?,?,?,?,?, NOW(), 0)';
    let image = '/image/' + req.file.filename;
    let name = req.body.name;
    let birthday = req.body.birthday;
    let gender = req.body.gender;
    let job = req.body.job;

    //console.log(image);
    //console.log(name);
    //console.log(birthday);
    //console.log(gender);
    //console.log(job);

    let params = [image, name, birthday, gender, job];

    connection.query(sql, params, 
        (err, rows, fields) => {
            res.send(rows);
            console.log(err);
            console.log(rows);
        }
    );

}); */

/* app.delete('/api/customers/:id', (req,res) => {
    let sql = 'UPDATE CUSTOMER SET isDeleted = 1 WHERE id=?';
    let params = [req.params.id];

    connection.query(sql, params,
        (err, rows, fields) => {
            res.send(rows);
        }
    )
});  */



app.listen(port, () => console.log(`Listening on port ${port}`));
