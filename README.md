🛒 E-commerce Backend API
Este projeto é uma API de e-commerce robusta, desenvolvida com foco em arquitetura de software, segurança e integridade de dados. A aplicação gerencia usuários, produtos, pedidos e itens de pedidos, garantindo relações consistentes através de um banco de dados relacional.

🛠️ Tecnologias Utilizadas
Runtime: Node.js

Framework: Express

ORM: Sequelize

Banco de Dados: PostgreSQL

Segurança: JWT (JSON Web Tokens) e Bcrypt.js para hash de senhas

📊 Estrutura do Banco de Dados
Baseado na modelagem ER (Entidade-Relacionamento) do projeto:

tb_users: Armazena informações dos usuários (Nome, Email, Senha criptografada, Role).

tb_products: Gerencia o catálogo de produtos, preços e estoque disponível.

tb_orders: Registra os cabeçalhos dos pedidos, vinculados a um usuário e status do pedido.

tb_orders_items: Tabela de junção que gerencia os produtos dentro de cada pedido, permitindo múltiplos itens por transação.

🚀 Funcionalidades Principais
Autenticação e Autorização: Registro de usuários com senhas seguras e geração de tokens JWT para acesso a rotas protegidas.

Gestão de Usuários: CRUD completo para gerenciamento de perfis.

Sistema de Pedidos: Fluxo completo desde a criação do produto até o fechamento do pedido.

Relacionamentos Sequelize: Implementação de associações 1:N (Usuário -> Pedidos) e N:N através da tabela de itens.