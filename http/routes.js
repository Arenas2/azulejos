var express = require('express');
var router = express.Router();

var jwt = require('jsonwebtoken');
var secret  = 'ScarlettJohanson';

router.get("/", function(req, res) {
    res.render("main/layout");
})

router.get("/main/:url", function(req, res) {
    var page = req.params.url
    res.render("main/frags/" + page);
})

router.get("/user", function(req, res) {
    res.render("user/layout");
})

router.get("/token", function(req, res) {

    token = jwt.sign({ id: req.user.userId}, secret, { expiresIn: '1h' });

    console.log(req.user.userId);
    res.redirect('/user' + token);
})

router.get("/user:token", function(req, res) {
    res.render("user/layout");
})

router.get("/user/:url", function(req, res) {
    var page = req.params.url
    res.render("user/frags/" + page);
})

router.get("/admin/:url", function(req, res) {
    var page = req.params.url
    res.render("admin/frags/" + page);
})

router.get("/admin", function(req, res) {
    res.render("admin/layout");
})

router.get('/robots.txt', function (req, res) {
    res.type('text/plain');
    res.send("User-agent: *\nDisallow: /");
});

router.get("/partials/:part", function(req, res) {
	var partial = req.params.part
    res.render("partials/" + partial );
})

router.get("/dialogs/:part", function(req, res) {
	var partial = req.params.part
    res.render("partials/dialogs/" + partial );
})


router.all('/:action', function(req, res){
})

module.exports = router;
