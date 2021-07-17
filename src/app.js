import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes';
import useragent from 'express-useragent';


const app = express();







app.use(express.urlencoded({ extended: true }))
app.set('views', path.join(__dirname, '../src/views'));
app.set('view engine', 'ejs');
app.disable('x-powered-by');
app.use(cors({
    credentials: true,
    origin: function(origin, callback) {
        callback(null, true);
    }
}));



app.use(express.static(path.join(__dirname, '/../client/public')));
app.use(useragent.express());
app.use(bodyParser.urlencoded({
    limit: '500mb',
    extended: true
}));
app.use(bodyParser.json({ limit: '500mb' }));

app.use(express.static(path.join(__dirname, '../public')))
app.use(express.static(path.join(__dirname, '../media')))



// Setup other routes
app.use('/api', routes);

app.get('/home', function(req, res) {
    return res.render('home');
});

app.get('/index', function(req, res) {
    return res.render('index');
});


app.get('/AllProduct', function(req, res) {
    return res.render('AllProduct');
});

app.get('/AllSeller', function(req, res) {
    return res.render('AllSeller');
});

app.get('/resetPass', function(req, res) {
    return res.render('password');
});

app.get('/LoginSeller', function(req, res) {

    return res.render('LoginForSeller');


});

app.get('/LoginAdmin', function(req, res) {

    return res.render('LoginForAdmin');


});

app.get('/RegisterSeller', function(req, res) {
    return res.render('register');
});

app.get('/RegisterUser', function(req, res) {
    return res.render('RegisterUser');

});

app.get('/CheckOut', function(req, res) {
    return res.render('CheckOut');

});

app.get('/ShopDetail', function(req, res) {
    return res.render('ShopDetail');
});

app.get('/LoginUser', function(req, res) {
    return res.render('LoginUser');
});

app.get('/ForgotPasswordUser', function(req, res) {
    return res.render('ForgotPasswordUser');
});


app.get('/MyProfileUser', function(req, res) {
    return res.render('MyProfileUser');
});


app.get('/DashboardSeller', function(req, res) {
    return res.render('DashboardForSeller');
});

app.get('/ListUsers', function(req, res) {
    return res.render('ListUsers');
});

app.get('/ListSeller', function(req, res) {
    return res.render('ListSeller');
});

app.get('/AddRole', function(req, res) {
    return res.render('AddRole');
});

app.get('/ListReport', function(req, res) {
    return res.render('ListReport');
});

app.get('/ListVoucher', function(req, res) {
    return res.render('ListVoucher');
});



app.get('/admin', function(req, res) {
    app.use(express.static(path.join(__dirname, '../build')))
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});


export default app;