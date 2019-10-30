import { Request, Response } from 'express'
import SparqlHttp from 'sparql-http-client'

declare module 'express' {

  interface HydraBoxRequest extends Request {
    sparql: SparqlHttp;
    graph: any;
  }

  interface HydraBoxResponse extends Response {
    graph(dataset: any): void;
    setLink(url: string, rel: string): void;
  }
}
