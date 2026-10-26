require('dotenv').config();
const express = require('express');
const mysql = mysql2 = require('mysql2'); // ou const mysql = require('mysql2');

const app = express();
const PORTA = process.env.PORT || 3000;

// Middleware para ler dados do formulário
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Conexão segura com o MySQL utilizando o .env
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err);
        return;
    }
    console.log('Ligado ao MySQL com segurança via .env! 🚀');
});

// --- ROTA GET: Listar clientes ---
// --- ROTA GET: Listar clientes com design profissional ---
app.get('/clientes', (req, res) => {
    db.query('SELECT * FROM clientes', (err, resultados) => {
        if (err) {
            console.error('Erro ao buscar clientes:', err);
            return res.status(500).send('Erro na base de dados.');
        }

        let linhasTabela = '';
        if (resultados.length === 0) {
            linhasTabela = `<tr><td colspan="3" style="text-align: center; color: #888;">Nenhum cliente cadastrado ainda.</td></tr>`;
        } else {
            resultados.forEach(c => {
                linhasTabela += `
                    <tr>
                        <td><strong>#${c.id}</strong></td>
                        <td>${c.nome}</td>
                        <td>${c.email ? c.email : '<span style="color: #aaa;">Não informado</span>'}</td>
                    </tr>
                `;
            });
        }

        const html = `
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Painel de Clientes | Matheus Websites Maker</title>
            <style>
                * {
                    box-sizing: border-box;
                    margin: 0;
                    padding: 0;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                }
                body {
                    background-color: #f4f7f6;
                    color: #333;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    padding: 20px;
                }
                .container {
                    background: #ffffff;
                    width: 100%;
                    max-width: 800px;
                    padding: 30px;
                    border-radius: 12px;
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
                }
                .header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 25px;
                    border-bottom: 2px solid #f0f0f0;
                    padding-bottom: 15px;
                }
                .header h1 {
                    font-size: 1.6rem;
                    color: #2c3e50;
                }
                .btn {
                    display: inline-block;
                    background-color: #007bff;
                    color: white;
                    padding: 10px 18px;
                    text-decoration: none;
                    border-radius: 6px;
                    font-weight: 600;
                    font-size: 0.9rem;
                    transition: background 0.2s ease;
                }
                .btn:hover {
                    background-color: #0056b3;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 10px;
                }
                th, td {
                    text-align: left;
                    padding: 14px 16px;
                    border-bottom: 1px solid #eee;
                }
                th {
                    background-color: #f8f9fa;
                    color: #555;
                    font-size: 0.85rem;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }
                tr:hover {
                    background-color: #fcfcfc;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>📋 Lista de Clientes</h1>
                    <a href="/clientes.html" class="btn">+ Novo Cliente</a>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>E-mail</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${linhasTabela}
                    </tbody>
                </table>
            </div>
        </body>
        </html>
        `;

        res.send(html);
    });
});

// --- ROTA POST: Cadastrar novo cliente ---
app.post('/clientes', (req, res) => {
    const { nome, email } = req.body;
    const sql = 'INSERT INTO clientes (nome, email) VALUES (?, ?)';

    db.query(sql, [nome, email], (err, resultado) => {
        if (err) {
            console.error('Erro ao cadastrar cliente:', err);
            return res.status(500).send('Erro ao guardar na base de dados.');
        }

        console.log('Cliente inserido com sucesso! ID:', resultado.insertId);
        res.redirect('/clientes.html');
    });
});

// Iniciar o servidor
app.listen(PORTA, () => {
    console.log(`Servidor a rodar na porta ${PORTA}`);
});
const express = require('express');


// Isto é fundamental para o Render e o navegador lerem o manifest e o sw.js
app.use(express.static('public'));