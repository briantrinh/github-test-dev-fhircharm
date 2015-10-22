var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/ui/login.html', function(req, res){
  res.render('ui/login.html', { title: 'Express'});
});

router.get('/ui/patientlist.html', function(req, res){
  res.render('ui/patientlist.html', { title: 'Express'});
});

router.get('/ui/patient.html', function(req, res){
  res.render('ui/patient.html', { title: 'Express'});
});

router.get('/ui/pCondition.html', function(req, res){
  res.render('ui/pCondition.html', { title: 'Express'});
});

router.get('/ui/register.html', function(req, res){
  res.render('ui/register.html', { title: 'Express'});
});

router.get('/ui/lockscreen.html', function(req, res){
  res.render('ui/lockscreen.html', { title: 'Express'});
});

router.get('/ui/starter.html', function(req, res){
  res.render('ui/starter.html', { title: 'Express'});
});

module.exports = router;
