const express = require('express');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate');
const fs = require('fs');

// json file reader

// fs.readFile('./db.json','utf-8',(err,jsonString)=>{
// 	if(err) {
// 		console.log(err);
// 	} else{
// 		try{
// 			const data = JSON.parse(jsonString);
// 			console.log(data);

// 			app.get('/menu', (req,res)=>{
// 			res.render('menu', {data});
// })

// 		} catch(err) {
// 				console.log(err);
// 		}
// 	}
// })

function jsonReader(filePath, cb) {
    fs.readFile(filePath, 'utf-8', (err, fileData) => {
        if (err) {
            return cb && cb(null, object);
        }
        try {
            const object = JSON.parse(fileData);
            return cb && cb(null, object);
        } catch (err) {
            return cb && cb(err);
        }
    });
}


jsonReader('./db.json', (err, data) => {
    if (err) {
        console.log(err);
    } else {
        // console.log(data[0].name);
        app.get('/menu', (req, res) => {
            res.render('menu', { 
								data : data
							   });
        });
    }
});

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/info', (req,res)=> {
	res.render('info');
})

app.get('/replacement',(req,res)=> {
	res.render('replacement');
})

app.get('/survey', (req, res) => {
    res.render('survey');
});

app.get('/quiz', (req, res) => {
    res.render('quiz');
});

app.get('/about', (req, res) => {
    res.render('about');
});


// app.get('*',(req,res)=>{
// 	res.render('pageNotFound')
// })

app.listen(8080, () => {
    console.log('Serving on port 8080');
});