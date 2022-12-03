import mysql from "mysql"

const connection = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: '123456',
    database: 'gastos_mensais'
})

connection.connect()


export default {
    query(sqlQuery, params) {
        return new Promise((resolve) => {
            connection.query({
                sql: sqlQuery,
                values: params
            }, (error, result) => {
                if (error) {
                    resolve({
                        error
                    })
                    return
                }
                resolve(result)
            })
        })
    }
}