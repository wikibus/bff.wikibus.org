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
    libraryLink.addOut(hydra.title, 'Collection of physical media about public transport')
  })

  res.graph(graph.dataset)
}
