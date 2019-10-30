declare module 'rdf-ext' {
  import { DataFactory } from 'rdf-js'

  interface DataFactoryExt {
    dataset(): any;
  }

  const tslintPlugin: DataFactory & DataFactoryExt
  export default tslintPlugin
}
