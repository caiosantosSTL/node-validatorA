const express = require('express')
const app = express()

const {body, validationResult} = require('express-validator')

app.use(express.json())
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))

// *****************************

app.get('/', function(req, res){
    res.render('index')
})

app.post('/add', [ //area de filtro de validator

    body('namex', 'Nome e sobrenome')
        .exists() //que nao esteja vazio
        .isLength({min: 5}), // tamanho minimo
    body('emailx', 'Email tem que ser valido')
        .exists()
        .isEmail(),
    body('idadex', 'Tem que ser valor numerico')
        .exists()
        .isNumeric()
    

], function(req, res){
    /*const error = validationResult(req)
    if(!error.isEmpty()){
        res.status(400).json({ error: error.array() })
        console.log(error)
    }*/
    const error = validationResult(req) //caso tenha um erro
    if (!error.isEmpty()) { // se esta vazio
        console.log(req.body) //mostra no terminal em json as areas onde foram add os valores
        const valores = req.body // usaremos essa var no html para checar se o campo esta vazio ou nao ao submit
        const validacao = error.array() // indicar 
        res.render('index' , {validacao: validacao, valores: valores})
    }else{
        res.send('Validacao ok') //se tudo no form estiver bem
    }

})

// *****************************

app.listen(3001, function(){
    console.log('server rodando ** ')
})
// ativar nodemon com: npm run start // sendo start definido em package.json
