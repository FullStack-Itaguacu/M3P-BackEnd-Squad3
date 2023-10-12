# Monitorrindos Medications


## Descrição do Projeto final do módulo 2 - Backend

Nossa equipe chamou a atenção dos gestores da empresa LabPharmacy Inc, uma renomada empresa do ramo de tecnologia farmacêutica, e com isso fomos convidados para desenvolver o site Monitorrindos Medications um e-commerce farmacêutico.

Este site proporcionará a oportunidade de comprar medicamentos, efetuar o registro de compradores e vendedores. Os vendedores terão a capacidade de monitorar suas vendas, enquanto os compradores poderão acompanhar suas compras anteriores com facilidade.

## Tenologias Utilizadas
 O backend do Pharmacy Central System foi desenvolvido utilizando as seguintes tecnologias:
 
- Node.js: É uma plataforma de desenvolvimento JavaScript para aplicações de rede e servidor.
- Express.js: Frameword web para Node.js, que facilita a criação de APIs.
- Sequelize: Biblioteca que interege com o banco de dados relacional como o PostgreSQL.
- PostgreSQL: Banco de dados relacional, que será utilizado para armazenar os dados do sistema.
- DBeaver: Gerenciador de banco de dados SQL.


## Como executar o sistema Pharmacy Central System

Para executar o Pharmacy Central System em uma máquina local, siga as seguites instruções:

1. Certifique-se de ter o Node.js instalado em sua máquina

2. Clone o repositório do Phamacy Central System em sua máquina local:

```sh
https://github.com/FullStack-Itaguacu/M3P-BackEnd-Squad3.git
```

3. Acesse o diretorio do projeto :

```sh
cd M3P-BackEnd-Squad3
```

4. Instale as dependências para rodar o projeto:

```sh
npm install
```

5. Inicie o servidor

```sh
npm rum dev
```

6. Crie um banco de dados PostgreSQL e atualiza as configurações de conexão do arquivo criando um arquivo .env, e completando conforme o exemplo .envexemple, com as informações do seu banco de dados.
Aqui você precisará ter um gerenciador database configurado. Neste projeto foi utilizado o DBeaver.


7. Para rodar as migrations para que as tabelas sejam inseridas em seu banco de dados fazer o comando:

```sh
npx sequelize db:migrate
```

8. Agora você já pode acessar o Pharmacy Central System em seu navegador através do endereço, usei o ThunderClient para os testes ` http://localhost:3002`

## Endpoint criados e suas funcionalidades
| Endpoint | Funcionalidade |
| --- | --- |
|POST /user/login | Endpoint Público com o objetivo de efetuar o login de um usuário comprador e/ou administrador na aplicação. |
|POST /user/admin/login | Endpoint Público com objetivo de efetuar o login de um usuário administrador na aplicação. |
|POST /user/signup | Endpoint Público com objetivo de cadastrar um usuário comprador na aplicação. |
|POST /user/admin/signup | Endpoint Privado com o objetivo de cadastrar um usuário na aplicação. |
|POST /products/admin | Endpoint Privado com o objetivo de cadastrar um produto na aplicação.   |
|GET /products/admin/:offset/:limit | Endpoint Privado com o objetivo de listar todos os produtos cadastrados daquele usuário administrador.|
|GET /products/:offset/:limit | Endpoint Privado com o objetivo de  listar todos os produtos cadastrados na aplicação | Utilizar o query params para os campos name, typeProduct como filtro e totalStock como ordenação.|
|GET /buyers/address | Endpoint Privado com o objetivo de listar todos os endereços cadastrados do usuário. Para saber quem é o usuário, utilize o id do payload do JWT no filtro. |
|PATCH /products/admin/:productId | Endpoint Privado com o objetivo de atualizar alguns campos do produto na aplicação.|
| GET /buyers/admin/:offset/:limit | Endpoint Privado com objetivo de listar todos os usuários.| 
|GET /buyers/admin/:userId | Endpoint Privado com o objetivo de listar uma especificação do usuário selecionado pelo id|
|PATCH /buyers/admin/:userId | Endpoint Privado com o objetivo de atualizar alguns campos do usuário comprador na aplicação.|
|POST /sales/ | Endpoint Privado com o objetivo de  criar registros de venda na aplicação.|
|GET /sales/ | Endpoint Privado com o objetivo de  fornecer todas as compras que aquele comprador realizou.|
|GET /sales/admin | Endpoint Privado com o objetivo de  fornecer todas as vendas que aquele administrador realizou.|
| GET /sales/dashboard/admin | Endpoint Privado com o objetivo de  fornecer resultados financeiros a partir das vendas realizadas.|

## Realização entre as tabelas
Para este projeto fizemos as seguintes relações entre as tabelas:

![tabelas DBeaver](https://github.com/FullStack-Itaguacu/M3P-BackEnd-Squad3/assets/115937834/d0d9223d-bf10-4ccd-9fb3-06a5958a849a)


## Organização do Projeto
A organização do projeto foi feito utiliznado o método Kanban, montando no trello os cards com cada endpoint e suas regras, onde cada participante do Squard fez uma parte colocando seu nome no card e passando para a revisão antes de concluir.

[!trello](https://trello.com/b/Iw8Phx36/m3p-backend-squad-3)

##Melhorias Futuras
- Ao nosso ver um ponto que seria muito importante de acrescentar seria poder deletar um produto, pois as vezes esse produto pode ter saido de venda mais ainda pode aparecer na listagem.









