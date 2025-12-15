import express from 'express'
import { setupCategoryHexagon } from './modules/category'

( async () => {

// await sequenlize.authenticate()

const app = express()

const port = 3000
app.use(express.json())
// app.use('/v1', setupCategoryHexagon(sequelize))
//....
app.listen(port,() => {
console.log('Server is running on port', port);
})
})()