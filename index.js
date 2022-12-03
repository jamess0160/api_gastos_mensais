import express from "express";
import cors from 'cors'
import banco from './banco.js'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/teste', (req, res) => {
    res.json({
        msg: "api funciondo"
    })
})

app.get('/entradas', async (req, res)=>{
    res.json(await banco.query("SELECT * FROM entradas"))
})

app.get('/gastos', async (req, res) => {
    let resultado = await banco.query("SELECT * FROM registro_gasto")
    if (resultado.error) {
        return res.status(500).json(resultado.error)
    }
    res.json(resultado)
})

app.get('/gastos/unico/:id', async (req, res) => {
    let resultado = await banco.query("SELECT * FROM registro_gasto WHERE id = ?", [req.params.id])
    if (resultado.error) {
        return res.status(500).json(resultado.error)
    }
    res.json(resultado)
})

app.post('/gastos', async (req, res) => {
    let resultado = await banco.query("INSERT INTO registro_gasto SET ?", [req.body])
    if (resultado.error) {
        return res.status(500).json(resultado.error)
    }
    res.json(resultado)
})

app.put('/gastos/:id', async (req, res) => {
    let resultado = await banco.query("UPDATE registro_gasto SET ? WHERE id = ?", [req.body, req.params.id])
    if (resultado.error) {
        return res.status(500).json(resultado.error)
    }
    res.json(resultado)
})

app.delete('/gastos/:id', async (req, res) => {
    let resultado = await banco.query("DELETE FROM registro_gasto WHERE id = ?", [req.params.id])
    if (resultado.error) {
        return res.status(500).json(resultado.error)
    }
    res.json(resultado)
})

app.listen(3000, () => {
    console.log("api funcionando, aberta na url http://localhost:3000/teste")
})