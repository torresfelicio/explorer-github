import React from 'react';
import { FiChevronRight } from 'react-icons/fi';

import logoImg from '../../styles/assets/logo.svg';

import { Title, Form, Repositories } from './styles';

const Dashboard: React.FC = () => {
  return (
    <>
    <img src={logoImg} alt="Github Explorer" />
    <Title>Explore repositórios no Github</Title>

    <Form>
      <input type="text" placeholder="Digite o Repositorio aqui"/>
      <button type="submit">Pesquisar</button>
    </Form>

    <Repositories>
      <a href="">
        <img
          src="https://avatars2.githubusercontent.com/u/18267941?s=460&u=935b3304de2d7ca3dd51e9618e4b68db707fd513&v=4"
          alt="Imagem do repositorio"
          />
          <div>
            <strong>Lucas Torres</strong>
            <p>Eu sou o lucas e gosto de tudo.</p>
          </div>
          <FiChevronRight size={20} />
      </a>

    </Repositories>
    </>
  )
}

export default Dashboard;
