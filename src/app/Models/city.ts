export interface ICity {
  id: number,
  nome: string,
  microrregiao: {
    id: number,
    nome: string,
    mesorregiao: {
      id: number,
      nome: string,
      UF: {
        id: number,
        nome: string,
        sigla: string,
        regiao: {
          id: number,
          nome: string,
          sigla: string
        }
      }
    }
  }
  regiaoImediata: {
    id: number,
    nome: string,
    regiaoIntermediaria: {
      id: number,
      nome: string,
      UF: {
        id: number,
        nome: string,
        sigla: string,
        regiao: {
          id: number,
          nome: string,
          sigla: string
        }
      }
    }
  }
}
