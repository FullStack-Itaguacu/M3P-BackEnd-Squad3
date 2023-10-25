# Pharmalândia Medications

## Descrição do Projeto Pharmalândia Medications

Nossa equipe chamou a atenção dos gestores da empresa LabPharmacy Inc, uma renomada empresa do ramo de tecnologia farmacêutica, e com isso fomos convidados para desenvolver o site Pharmalândia Medications, um Marketplace de produtos farmacêuticos.

Este site proporcionará a oportunidade de cadastrar vendedores, usuários (compradores), comprar medicamentos e efetuar o registro de compradores e vendedores. Os vendedores terão a capacidade de monitorar suas vendas, enquanto os compradores poderão acompanhar suas compras anteriores com facilidade.

## Tecnologias Utilizadas

O backend do Pharmalândia Medications foi desenvolvido utilizando as seguintes tecnologias:

- Node.js: É uma plataforma de desenvolvimento JavaScript para aplicações de rede e servidor.
- Express.js: Framework web para Node.js que facilita a criação de APIs.
- Sequelize: Biblioteca que interage com o banco de dados relacional como o PostgreSQL.
- PostgreSQL: Banco de dados relacional que será utilizado para armazenar os dados do sistema.
- DBeaver: Gerenciador de banco de dados SQL.

## Como executar o Pharmalândia Medications

Para executar o Pharmalândia Medications em uma máquina local, siga as seguintes instruções:

1. Certifique-se de ter o Node.js instalado em sua máquina;

2. Clone o repositório do Pharmalândia Medications em sua máquina local:

```sh
https://github.com/FullStack-Itaguacu/M3P-BackEnd-Squad3.git
```

3. Acesse o diretório do projeto :

```sh
cd M3P-BackEnd-Squad3
```

4. Instale as dependências para rodar o projeto:

```sh
npm install
```

5. Inicie o servidor

```sh
npm rum dev:
```

6. Crie um banco de dados PostgreSQL e atualize as configurações de conexão no arquivo. Depois crie um arquivo .env, e complete conforme o arquivo .envexemple, com as informações do seu banco de dados.
   Aqui você precisará ter um gerenciador database configurado. Neste projeto foi utilizado o DBeaver.

![exemplo  env](https://github.com/FullStack-Itaguacu/M3P-BackEnd-Squad3/assets/115937834/1b077986-6e68-4100-b511-6dea8eb54465)

8. Para rodar as migrations e inserir as tabelas em seu banco de dados você precisa executar o comando:

```sh
npx sequelize db:migrate
```

8. Agora você já pode acessar o Pharmalândia Medications em seu navegador. Usamos o ThunderClient para os testes ` http://localhost:3002`

## Endpoint criados e suas funcionalidades

| Endpoint         | Funcionalidade                                                                                              |
| ---------------- | ----------------------------------------------------------------------------------------------------------- |
| POST /user/login | Endpoint Público com o objetivo de efetuar o login de um usuário comprador e/ou administrador na aplicação. |

![Login](https://github.com/FullStack-Itaguacu/M3P-BackEnd-Squad3/assets/115937834/06e7fbbf-5b9c-4003-a9b0-9e20e7b8f28c)
| | |
|POST /user/admin/login | Endpoint Público com objetivo de efetuar o login de um usuário administrador na aplicação. |
![Login admin](https://github.com/FullStack-Itaguacu/M3P-BackEnd-Squad3/assets/115937834/c985fb8a-81bc-4445-8205-b9ee3f604e1b)
| | |
|POST /user/signup | Endpoint Público com objetivo de cadastrar um usuário comprador na aplicação. |
![Cadastro usuário](https://github.com/FullStack-Itaguacu/M3P-BackEnd-Squad3/assets/115937834/0e5e47b5-74ef-4112-8785-420cc32be6d7)
| | |
|POST /user/admin/signup | Endpoint Privado com o objetivo de cadastrar um usuário na aplicação. |
![user-admin-signup](https://github.com/FullStack-Itaguacu/M3P-BackEnd-Squad3/assets/115937834/8fd2ae81-4d46-45af-9e83-f664e909fb24)
| | |
|POST /products/admin | Endpoint Privado com o objetivo de cadastrar um produto na aplicação. |
![product-admin](https://github.com/FullStack-Itaguacu/M3P-BackEnd-Squad3/assets/115937834/443eb8b0-1e8a-49eb-8e4d-ce850ea10449)
| | |
|GET /products/admin/:offset/:limit | Endpoint Privado com o objetivo de listar todos os produtos cadastrados daquele usuário administrador.|
![products-admin-0-20](https://github.com/FullStack-Itaguacu/M3P-BackEnd-Squad3/assets/115937834/50940314-4068-4fd1-a97b-66435cc1894c)
| | |
|GET /products/:offset/:limit | Endpoint Privado com o objetivo de listar todos os produtos cadastrados na aplicação. |
![product-limit](https://github.com/FullStack-Itaguacu/M3P-BackEnd-Squad3/assets/115937834/d5297aca-70dd-44eb-a865-3cc343ef8eda)
| | |
|GET /products/:productId | Endpoint Privado com o objetivo de listar uma especificação do produto selecionado pelo id|
![product-ID](https://github.com/FullStack-Itaguacu/M3P-BackEnd-Squad3/assets/115937834/4efe836f-6a85-4105-b4f3-5df39519810a)
| | |
|GET /buyers/address | Endpoint Privado com o objetivo de listar todos os endereços cadastrados do usuário. |
![buyers-address](https://github.com/FullStack-Itaguacu/M3P-BackEnd-Squad3/assets/115937834/baf0d309-e6c2-494d-a2c7-b87638221f25)
| | |
|PATCH /products/admin/:productId | Endpoint Privado com o objetivo de atualizar alguns campos do produto na aplicação.|
![product-admin-id](https://github.com/FullStack-Itaguacu/M3P-BackEnd-Squad3/assets/115937834/b25aaf25-924c-4a1f-aed5-b9069d0c0316)
| | |
| GET /buyers/admin/:offset/:limit | Endpoint Privado com objetivo de listar todos os usuários.|
![bueyrs-admin-limit](https://github.com/FullStack-Itaguacu/M3P-BackEnd-Squad3/assets/115937834/ee893c53-73ae-4659-9c18-cc4321e89124)
| | |
|GET /buyers/admin/:userId | Endpoint Privado com o objetivo de listar uma especificação do usuário selecionado pelo id|
![buyers-admin-ID](https://github.com/FullStack-Itaguacu/M3P-BackEnd-Squad3/assets/115937834/672ee20c-1631-4321-8f21-ac7a235779a5)
| | |
|PATCH /buyers/admin/:userId | Endpoint Privado com o objetivo de atualizar alguns campos do usuário comprador na aplicação.|
![buyers-admin-id-patch](https://github.com/FullStack-Itaguacu/M3P-BackEnd-Squad3/assets/115937834/6803c618-bed5-44b8-a613-636ced61044a)
| | |
|POST /sales | Endpoint Privado com o objetivo de criar registros de venda na aplicação.|
![cadastro-sales](https://github.com/FullStack-Itaguacu/M3P-BackEnd-Squad3/assets/115937834/0d55b9aa-5e03-40bb-b9e5-d4efa6aac22b)
| | |
|GET /sales | Endpoint Privado com o objetivo de fornecer todas as compras que aquele comprador realizou.|
![get-sales](https://github.com/FullStack-Itaguacu/M3P-BackEnd-Squad3/assets/115937834/5c6f4242-1b99-4dff-a1f6-da60cea5bd42)
| | |
|GET /sales/admin | Endpoint Privado com o objetivo de fornecer todas as vendas que aquele administrador realizou.|
![get-sales-admin](https://github.com/FullStack-Itaguacu/M3P-BackEnd-Squad3/assets/115937834/30924f4e-2811-46c9-b3d6-fc059f978cc9)
| | |
|GET //sales/:id | Endpoint privado com o objetivo de listar uma venda pelo Id|
![sales-ID](https://github.com/FullStack-Itaguacu/M3P-BackEnd-Squad3/assets/115937834/b0a5301a-d0ab-459d-8212-2e57b9910220)
| | |
|GET /sales/dashboard/admin | Endpoint Privado com o objetivo de fornecer resultados financeiros a partir das vendas realizadas.|
![dashboard-admin](https://github.com/FullStack-Itaguacu/M3P-BackEnd-Squad3/assets/115937834/b041c344-6f6b-4221-8767-ec50527679fc)

## Realização entre as tabelas

Para este projeto fizemos as seguintes relações entre as tabelas:

![tabelas DBeaver](https://github.com/FullStack-Itaguacu/M3P-BackEnd-Squad3/assets/115937834/d0d9223d-bf10-4ccd-9fb3-06a5958a849a)

## Organização do Projeto

A organização do projeto foi feita utilizando o método Kanban, montando no trello os cards com cada endpoint e suas regras, onde cada participante do Squard fez uma parte colocando seu nome no card e passando para a revisão antes de concluir.

![trello](https://github.com/FullStack-Itaguacu/M3P-BackEnd-Squad3/assets/115937834/f60458b6-6ee3-496b-a65a-2c43099705a2)

## Documentação Swagger

Para oferecer mais detalhes de cada rota você pode consultar a documentação pelo endereço: `https://monitorrindodeploymaster.cyclic.app/api-docs`
![swagger](https://github.com/FullStack-Itaguacu/M3P-BackEnd-Squad3/assets/86123419/f368a712-88ab-4e60-abf1-a07728d79d3e)

## Melhorias Futuras

- Deletar ou desativar um produto, uma vez que o produto pode não estar mais disponível para comercialização ou por outras razões que justifiquem a exclusão.
- O vendedor deve receber um alerta quando algum produto estiver fora de estoque.
- Deletar ou desativar um administrador.
- Deletar ou desativar um usuário.
- Atualização de dados / endereço do usuário.
- Alteração de senha.
