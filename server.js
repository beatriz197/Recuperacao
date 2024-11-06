const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const con = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    database:'stockcar'
});

con.connect((err) =>{
    if(err) {
        console.error('Erro ao conectar ao banco de dados', err);
        return;
    }
    console.log('Conectado ao banco de dados.');
});

const teste = (req, res) => {
    res.send("Back-end respondendo");
}

//CLIENTES

// CRUD - Create clientes
const createclientes = (req, res) => {
    const {nome, cpf, email, endereco, data_nascimento, data_cadastro} =req.body;

    const query = 'INSERT INTO clientes (nome, cpf, email, endereco, data_nascimento, data_cadastro) VALUES(?, ?, ?, ?, ?, ?)';
    con.query(query, [nome, cpf, email, endereco, data_nascimento, data_cadastro], (err,result) => {
        if(err) {
            res.status(500).json({error: err.message});
        } else {
            res.status(201).json({message: 'clientes criado com sucesso', result});
        }

    });
}

//CRUD - Read clientes
const readclientes = (req, res) => {
    con.query("SELECT * FROM clientes",(err,result) => {
        if(err) {
            res.status(500).json({error: err.message});
        } else {
            res.json(result);
        }
    });
}

// CRUD - Update clientes
const updateclientes = (req, res) => {
    const { nome, cpf, email, endereco, data_nascimento, data_cadastro, cliente_id} = req.body;

    const query = 'UPDATE clientes SET nome = ?, cpf = ?, email = ?, endereco = ?, data_nascimento = ?, data_cadastro = ? WHERE cliente_id = ?'
    con.query(query, [nome, cpf, email, endereco, data_nascimento, data_cadastro, cliente_id ], (err, result)=>{
        if(err) {
            res.status(500).json({error: err.message});
        }else {
            res.json({message:'clientes atualizado com sucesso', result});
        }
    });
}


//CRUD - Delete clientes
const deleteclientes = (req, res) => {
    const {cpf} = req.params;

    const query = 'DELETE FROM clientes WHERE cpf = ?';
    con.query(query, [cpf], (err,result)=> {
        if(err) {
            res.status(500).json({error:err.message});
        }else {
            res.json({message: 'clientes removido com sucesso', result});
        }
    });
}


//Carros


// CRUD - Create carros
const createcarros = (req, res) => {
    const { marca_veiculo, modelo_veiculo, ano_veiculo, fabricacao_veiuclo,cliente_id} =req.body;

    const query = 'INSERT INTO carros (marca_veiculo, modelo_veiculo, ano_veiculo, fabricacao_veiuclo, cliente_id) VALUES(?, ?, ?, ?, ?)';
    con.query(query, [marca_veiculo, modelo_veiculo, ano_veiculo, fabricacao_veiuclo, cliente_id], (err,result) => {
        if(err) {
            res.status(500).json({error:err.message});
        } else {
            res.status(201).json({message: 'carros criado com sucesso', result});
        }

    });
}

//CRUD - Read carros
const readcarros = (req, res) => {
    con.query("SELECT * FROM carros",(err,result) => {
        if(err) {
            res.status(500).json({error: err.message});
        } else {
            res.json(result);
        }
    });
}

// CRUD - Update carros
const updatecarros = (req, res) => {
    const {carros_id, marca_veiculo, modelo_veiculo, ano_veiculo, fabricacao_veiuclo, cliente_id} = req.body;

    const query = 'UPDATE carros SET marca_veiculo = ?, modelo_veiculo = ?, ano_veiculo = ?, fabricacao_veiuclo = ?, cliente_id = ? WHERE carros_id = ?';
    con.query(query, [marca_veiculo, modelo_veiculo, ano_veiculo, fabricacao_veiuclo, cliente_id, carros_id], (err, result)=>{
        if(err) {
            res.status(500).json({error: err.message});
        }else {
            res.json({message:'carros atualizado com sucesso', result});
        }
    });
}


//CRUD - Delete carros
const deletecarros = (req, res) => {
    const {carros_id} = req.params;

    const query = 'DELETE FROM carros WHERE carros_id = ?';
    con.query(query, [carros_id], (err,result)=> {
        if(err) {
            res.status(500).json({error:err.message});
        }else {
            res.json({message: 'carros removido com sucesso', result});
        }
    });
};

//TELEFONE

// CRUD - Create telefone
const createtelefone = (req, res) => {
    const {numero, tipo} =req.body;

    const query = 'INSERT INTO telefone (numero, tipo) VALUES(?, ?)';
    con.query(query, [numero, tipo], (err,result) => {
        if(err) {
            res.status(500).json({error: err.message});
        } else {
            res.status(201).json({message: 'telefone criado com sucesso', result});
        }

    });
}

//CRUD - Read telefone
const readtelefone = (req, res) => {
    con.query("SELECT * FROM telefone",(err,result) => {
        if(err) {
            res.status(500).json({error: err.message});
        } else {
            res.json(result);
        }
    });
}

// CRUD - Update telefone
const updatetelefone = (req, res) => {
    const {cliente_id,numero, tipo, telefone_id} = req.body;

    const query = 'UPDATE telefone SET cliente_id = ?, numero = ?, tipo = ? WHERE telefone_id = ?'
    con.query(query, [cliente_id, numero, tipo, telefone_id], (err, result)=>{
        if(err) {
            res.status(500).json({error: err.message});
        }else {
            res.json({message:'telefone atualizado com sucesso', result});
        }
    });
}


//CRUD - Delete telefone
const deletetelefone = (req, res) => {
    const {tipo} = req.params;

    const query = 'DELETE FROM telefone WHERE tipo = ?';
    con.query(query, [tipo], (err,result)=> {
        if(err) {
            res.status(500).json({error:err.message});
        }else {
            res.json({message: 'telefone removido com sucesso', result});
        }
    });
}



//Saida Front
const app = express();
app.use(express.json());
app.use(cors());
app.get("/", teste);

//CLIENTES

app.post("/clientes",createclientes);
app.get("/clientes", readclientes);
app.put("/clientes", updateclientes);
app.delete("/clientes/:cpf", deleteclientes);

//CARROS

app.post("/carros",createcarros);
app.get("/carros", readcarros);
app.put("/carros", updatecarros);
app.delete("/carros/:carros_id", deletecarros);

//TELEFONE

app.post("/telefone",createtelefone);
app.get("/telefone", readtelefone);
app.put("/telefone", updatetelefone);
app.delete("/telefone/:telefone_id", deletetelefone);

//Teste de porta
app.listen(3005, () => {
    console.log("Servidor rodando na porta 3005");
});