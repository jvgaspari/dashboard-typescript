import { Environment } from '../../../environment';
import { Api } from '../axios-config';


export interface IListEmployee {
  id: number;
  email: string;
  franchiseId: number;
  nomeCompleto: string;
}

export interface IDetailEmployee {
  id: number;
  email: string;
  franchiseId: number;
  nomeCompleto: string;
}

type TEmployeeTotalCount = {
  data: IListEmployee[];
  totalCount: number;
}

const getAll = async (page = 1, filter = ''): Promise<TEmployeeTotalCount | Error> => {
  try {
    const urlRelativa = `/employees?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&nomeCompleto_like=${filter}`;

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

const getById = async (id: number): Promise<IDetailEmployee | Error> => {
  try {
    const { data } = await Api.get(`/employees/${id}`);

    if (data) {
      return data;
    }

    return new Error('Erro ao consultar o registro.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao consultar o registro.');
  }
};

const create = async (dados: Omit<IDetailEmployee, 'id'>): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IDetailEmployee>('/employees', dados);

    if (data) {
      return data.id;
    }

    return new Error('Erro ao criar o registro.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao criar o registro.');
  }
};

const updateById = async (id: number, dados: IDetailEmployee): Promise<void | Error> => {
  try {
    await Api.put(`/employees/${id}`, dados);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao atualizar o registro.');
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete(`/employees/${id}`);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao apagar o registro.');
  }
};


export const EmployeeService = {
  getAll,
  create,
  getById,
  updateById,
  deleteById,
};
