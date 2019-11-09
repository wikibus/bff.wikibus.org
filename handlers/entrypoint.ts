import { HydraBoxRequest, HydraBoxResponse } from 'express'
import $rdf from 'rdf-ext'
import cf from 'clownface'
import { api, hydra, rdf } from '../lib/ns'

export function get (req: HydraBoxRequest, res: HydraBoxResponse) {
  const graph = cf($rdf.dataset(), process.env.BASE_URI)

  graph.addOut(rdf.type, api.EntryPoint)
  graph.addOut(hydra.title, 'wikibus.org')
  graph.addOut(hydra.description, 'Online public transport encyclopedia')
  graph.addOut(api.library, $rdf.namedNode(process.env.API_LIBRARY), libraryLink => {
    libraryLink.addOut(hydra.title, 'Library')
    libraryLink.addOut(hydra.description, 'Collection of physical media about public transport')
  })

  if (process.env.DATA_SHEETS) {
    graph.addOut(api.dataSheets, $rdf.namedNode(process.env.DATA_SHEETS), link => {
      link.addOut(hydra.title, 'Data sheets')
      link.addOut(hydra.description, 'Technical data gathered from brochures, books, etc')
    })
  }

  res.graph(graph.dataset)
}
