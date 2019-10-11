import cors from 'cors'
import path from 'path'
import hydraBox from 'hydra-box'
import url from 'url'
import express from 'express'
import dotenv from 'dotenv'
import dotenvExpand from 'dotenv-expand'

dotenvExpand(dotenv.config())

function hydraMiddleware () {
  return hydraBox.fromUrl(
    '/api',
    'file://' + path.join(__dirname, 'hydra/api.ttl'),
    {
      contextHeader: '/context/',
    }
  )
}

Promise.resolve()
  .then(async () => {
    const baseUrl = `${process.env.BASE_URI}`

    const app = express()

    app.use(
      cors({
        exposedHeaders: ['link', 'location'],
      })
    )
    app.use(await hydraMiddleware())

    app.listen(new url.URL(baseUrl).port, () => {
      console.log(`listening at ${baseUrl}`)
    })
  })
  .catch(err => console.error(err))
