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

const sql ="SELECT t.HJ_NO hjno, t.HJ_DV hjdv, t.WD_HJ wdhj, t.SND snd, t.DSC dsc, t.CLS_CD clscd, t.TOT_CLS_NM2 totclsnm2, t.CLS_NM2 clsnm2, t.MSND2 msnd2, t.RDC rdc, t.HJ_CNT hjcnt, t.TOT_HJ_CNT tothjcnt FROM THJ_TOT_HJ_DICS_TEST t WHERE 1=1 AND t.DEL_YN='N' AND t.HJ_DV='사자성어' ORDER BY t.CLS_CD,t.HJ_NO LIMIT 100";
//const sql ="SELECT t.HJ_NO hjno, t.HJ_DV hjdv, t.WD_HJ wdhj, t.SND snd, t.DSC dsc, t.CLS_CD clscd, t.TOT_CLS_NM2 totclsnm2, t.CLS_NM2 clsnm2, t.MSND2 msnd2, t.RDC rdc, t.HJ_CNT hjcnt, t.TOT_HJ_CNT tothjcnt FROM THJ_TOT_HJ_DICS_TEST t WHERE 1=1 AND t.DEL_YN='N' ORDER BY t.CLS_CD,t.HJ_NO LIMIT 5";

//const sql ="SELECT t.HJ_NO no, t.HJ_DV dv, t.WD_HJ wdhj, t.SND snd, t.DSC dsc, t.CLS_CD clscd, t.TOT_CLS_NM2 totclsnm2, t.CLS_NM2 clsnm2, t.MSND2 msnd2, t.RDC rdc, t.HJ_CNT hjcnt, t.TOT_HJ_CNT tothjcnt FROM THJ_TOT_HJ_DICS t WHERE 1=1 AND t.DEL_YN='N' ORDER BY t.CLS_CD,t.HJ_NO LIMIT 5";

//const sql_static ="SELECT EXM_DT_NO exmdtno, MNG_ID mngid, STU_ID stuid, 	TOT_CLS_NM2 totclsnm2, HJ_DV hjdv, COUNT(*) totexmcnt , COUNT(SND_YN) snderrcnt , COUNT(HJ_YN) hjerrcnt , COUNT(*)- COUNT(SND_YN) crrsndcnt , COUNT(*)- COUNT(HJ_YN) crrhjcnt , FORMAT((1- COUNT(SND_YN)/ COUNT(*))*100,2) crrsndrto , FORMAT((1- COUNT(HJ_YN)/ COUNT(*))*100,2) crrhjrto , FORMAT((COUNT(SND_YN)/ COUNT(*))*100,2) errsndrto , FORMAT((COUNT(HJ_YN)/ COUNT(*))*100,2) errhjrto FROM (SELECT LEFT(a.EXM_DT_NO,8) EXM_DT_NO, a.MNG_ID, a.STU_ID, a.SND_YN, a.HJ_YN, t.HJ_DV,t.HJ_NO, t.WD_HJ, t.SND, t.TOT_CLS_NM2, CLS_NM2, t.MSND2, t.DSC,t.RDC, t.HJ_CNT, t.TOT_HJ_CNT FROM THJ_HJ_EXM_RST a, (SELECT t.HJ_DV,t.HJ_NO, t.WD_HJ, t.SND, t.TOT_CLS_NM2, CLS_NM2, t.MSND2, t.DSC,t.RDC, t.HJ_CNT, t.TOT_HJ_CNT FROM (SELECT t.HJ_DV, t.HJ_NO, t.WD_HJ, t.SND, t.DSC, t.TOT_CLS_NM2, CLS_NM2, t.MSND2, t.RDC, t.HJ_CNT, t.TOT_HJ_CNT FROM THJ_TOT_HJ_DICS t WHERE 1=1 ORDER BY srt_seq, cls_cd) t) t WHERE 1=1 AND a.HJ_DV = t.HJ_DV AND a.HJ_NO = t.HJ_NO) t GROUP BY EXM_DT_NO, MNG_ID, STU_ID, TOT_CLS_NM2, HJ_DV"

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
                //console.log(rows);
            }
        }
    ); 
});

// image폴더에서 upload 폴더로 접근할수 있게 설정
app.use('/image', express.static('./upload'));

// insert 구분설정
app.post('/api/hanjas', upload.single('image'), (req, res) => {
    //let sql="INSERT INTO THJ_TOT_HJ_DICS (HJ_DV, HJ_NO, WD_HJ, SND, CLS_CD, DSC, HJ_IMG, CRT_DT, DEL_YN) VALUES (?,?,?,?,?,?,?,NOW(), 'N')";
    let sql="INSERT INTO THJ_TOT_HJ_DICS_TEST (HJ_DV, HJ_NO, WD_HJ, SND, CLS_CD, DSC, HJ_IMG, CRT_DT, DEL_YN) VALUES (?,?,?,?,?,?,?,NOW(), 'N')";
    
    let image ='/image' + req.file.filename;
    // HJ_DV, HJ_NO, WD_HJ, SND, CLS_CD, DSC, HJ_IMG
    let hjdv = req.body.hjdv;
    let hjno = req.body.hjno;
    let wdhj = req.body.wdhj;
    let snd = req.body.snd;
    let clscd = req.body.clscd;
    let dsc = req.body.dsc;
    
    console.log(sql);

    /* console.log(hjdv);
    console.log(hjno);
    console.log(wdhj);
    console.log(snd);
    console.log(clscd);
    console.log(dsc);  */

    let params =[hjdv, hjno, wdhj, snd, clscd, dsc, image];
    connection.query(sql, params, (err, rows, fields) => {
        res.send(rows);
        console.log(err);
    })
})


app.delete('/api/hanjas/:hjno' , (req, res) => {
    let sql ="UPDATE THJ_TOT_HJ_DICS_TEST SET DEL_YN='Y', UPD_DT=NOW() WHERE HJ_NO = ? ";
    let params =[req.params.hjno];

    connection.query(sql, params, (err, rows, fields) => {
        res.send(rows);
        console.log(rows);
    })
});


app.listen(port, () => console.log(`Listening on port ${port}`));
