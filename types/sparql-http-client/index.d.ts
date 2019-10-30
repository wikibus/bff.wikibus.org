import { Term } from 'rdf-js'
import fetch, { Response, RequestInit } from 'node-fetch'
import { URL } from 'url'

export interface SparqlHttpOptions {
  endpointUrl?: string;
  updateUrl?: string;
}

export interface SparqlClientOptions extends SparqlHttpOptions {
  fetch: typeof fetch;
  URL: typeof URL;
}

export interface QueryRequestInit extends SparqlHttpOptions, RequestInit {}

export interface SelectBindings {
  results: { bindings: Record<string, Term>[] };
}

export interface AskResult {
  boolean: boolean;
}

export interface SelectResponse {
  json(): Promise<SelectBindings & AskResult>;
}

export class SparqlHttp<TResponse extends Response = Response> {
  public constructor(options?: SparqlHttpOptions);
  public updateQuery(query: string, options?: QueryRequestInit): Promise<Response>;
  public selectQuery(query: string, options?: QueryRequestInit): Promise<SelectResponse & TResponse>;
  public constructQuery(query: string, options?: QueryRequestInit): Promise<TResponse>;
}
