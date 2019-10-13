import cors from 'cors'
import path from 'path'
import hydraBox from 'hydra-box'
import express from 'express'
import dotenv from 'dotenv'
import dotenvExpand from 'dotenv-expand'
import $rdf from 'rdf-ext'
import Parser from '@rdfjs/parser-n3'
import { createReadStream } from 'fs'

dotenvExpand(dotenv.config())

const parser = new Parser({ baseIRI: process.env.BASE_URI })

async function hydraMiddleware () {
  const dataset = await $rdf.dataset()
    .import(parser.import(createReadStream(path.join(__dirname, 'hydra/api.ttl'))))

  return hydraBox('/api', dataset,
    {
      contextHeader: '/context/',
    }
  )
}

Promise.resolve()
  .then(async () => {
    const app = express()

    app.use(
      cors({
        exposedHeaders: ['link', 'location'],
      })
    )
    app.use(await hydraMiddleware())

    app.listen(process.env.PORT, () => {
      console.log(`listening on port ${process.env.PORT}`)
    })
  })
  .catch(err => console.error(err))
