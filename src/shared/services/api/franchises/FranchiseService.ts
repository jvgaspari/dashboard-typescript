import { Environment } from '../../../environment';
import { Api } from '../axios-config';


export interface IListFranchise {
  id: number;
  nome: string;
}

export interface IDetailFranchise {
  id: number;
  nome: string;
}

type TFranchiseTotalCount = {
  data: IListFranchise[];
  totalCount: number;
}

const getAll = async (page = 1, filter = '', dropDown = false): Promise<TFranchiseTotalCount | Error> => {
  try {
    let urlRelativa;
    {
      dropDown?
        urlRelativa = '/franquias'
        :
        urlRelativa = `/franquias?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&nome_like=${filter}`;
    }
    
    //const urlRelativa = '/franquias';

    const { data, headers } = await Api.get(urlRelativa);

    if (data) {
      return {
        data,
        totalCount: Number(headers['x-total-count'] || Environment.LIMITE_DE_LINHAS),
      };
    }

    return new Error('Erro ao listar os registros.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao listar os registros.');
  }
};

const getById = async (id: number): Promise<IDetailFranchise | Error> => {
  try {
    const { data } = await Api.get(`/franquias/${id}`);

    if (data) {
      return data;
    }

    return new Error('Erro ao consultar o registro.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao consultar o registro.');
  }
};

const create = async (dados: Omit<IDetailFranchise, 'id'>): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IDetailFranchise>('/franquias', dados);

    if (data) {
      return data.id;
    }

    return new Error('Erro ao criar o registro.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao criar o registro.');
  }
};

const updateById = async (id: number, dados: IDetailFranchise): Promise<void | Error> => {
  try {
    await Api.put(`/franquias/${id}`, dados);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao atualizar o registro.');
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete(`/franquias/${id}`);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao apagar o registro.');
  }
};


export const FranchiseService = {
  getAll,
  create,
  getById,
  updateById,
  deleteById,
};
