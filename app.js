const express = require('express');
const data = require('./data.json');
const app = express();
const projects = data.projects;


app.use('/static', express.static('public'));

app.set('view engine', 'pug');

app.get ('/', (req, res) => {
    
    res.render('index', { projects });
});

app.get ('/about', (req, res) => {
    res.render('about', {projects});
});

app.get('/projects', (req, res) => {
    //res.redirect('/');
     res.render('project', {projects});
});

app.get ('/projects/:id', (req, res) => {
    const {id} = req.params;
    if( isNaN(id) || id >= projects.length) {
      return  res.redirect('/');
    }
    res.render('project', {id, projects});
});
app.use((req, res, next) => {
    const err = new Error('Not Found');
    const message = "Sorry, that page is not found.";
    console.log(message);
    err.status = 404
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error');
});

app.listen(3000, () => {
    console.log('The Project application is running on localhost:3000!')
});