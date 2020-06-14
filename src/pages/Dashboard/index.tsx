import React, { useState, useEffect, FormEvent } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import api from '../../services/api';

import logoImg from '../../styles/assets/logo.svg';

import { Title, Form, Repositories, Error } from './styles';

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  }
}

const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState('');
  const [inputError, setInputError] = useState('');

  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storageRepositories = localStorage.getItem('@GithubExplorer:repositories');
    if (storageRepositories) {
      return JSON.parse(storageRepositories);
    } else {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('@GithubExplorer:repositories', JSON.stringify(repositories));
  }, [repositories])

  async function handleAddRepository(event: FormEvent<HTMLFormElement>): Promise<void>{
    //adicionar um novo repositorio
    event.preventDefault(); //prevenir o evento padrão do form
    if (!newRepo) {
      setInputError('Digite um nome de repositorio valido');
      return;
    }

    try {
      const response = await api.get<Repository>(`repos/${newRepo}`);

      const repository = response.data;
      setRepositories([...repositories, repository]);
      setNewRepo('');
      setInputError('');
    } catch (Err) {
      setInputError('Erro na busca por esse repositorio!');
    }
  }

  return (
    <>
    <img src={logoImg} alt="Github Explorer" />
    <Title>Explore repositórios no Github</Title>

    <Form hasError={!!inputError} onSubmit={handleAddRepository}>
      <input
      type="text"
      placeholder="Digite o Repositorio aqui"
      value={newRepo}
      onChange={(e) => setNewRepo(e.target.value)}
      />
      <button type="submit">Pesquisar</button>
    </Form>

    {inputError && <Error>{inputError}</Error>}

    <Repositories>
      {repositories.map(repository => (
        <a key={repository.full_name} href="#">
        <img
          src={repository.owner.avatar_url}
          alt={repository.owner.login}
          />
          <div>
            <strong>{repository.full_name}</strong>
            <p>{repository.description}</p>
          </div>
          <FiChevronRight size={20} />
      </a>
      ))}
    </Repositories>
    </>
  )
}

export default Dashboard;
