import 'module-alias/register'
//import no dang bi @/modules ????


import express from 'express'
import { setupCategoryHexagon } from './modules/category'
import { sequelize } from './share/component/sequelize'

( async () => {

await sequelize.authenticate()

const app = express()

const port = 3000
app.use(express.json())
// app.use('/v1', setupCategoryHexagon(sequelize))
//....
app.listen(port,() => {
console.log('Server is running on port', port);
})
})()