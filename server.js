import express from 'express'
const app = express()

// Express Routing:

// app.get('/', (req, res) => {
//     res.send('hello from express server!!!!!')
// })




// app.get('/puki', (req, res) => {
//     res.send('Hello Puki')
// })

// app.get('/nono', (req, res) => res.redirect('/'))

app.get('/api/bug', (req, res) => {

})

const port = 3030
app.listen(port, () =>
    console.log(`Server listening on port http://127.0.0.1:${port}/`)
)
