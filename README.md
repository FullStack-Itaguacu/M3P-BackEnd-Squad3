# Monitorrindos Medications


## Descrição do Projeto final do módulo 2 - Backend

Nossa equipe chamou a atenção dos gestores da empresa LabPharmacy Inc, uma renomada empresa do ramo de tecnologia farmacêutica, e com isso fomos convidados para desenvolver o site Monitorrindos Medications um e-commerce farmacêutico.

Neste site será possiível fazer compras de medicamentos, realizar cadastro de compradores e vendedores, o vendedor poderá ver suas vendas assim como o comprador poderá ver suas compras já realizadas.

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
|POST /user/login | Endpoint Público com o objetivo de efetuar o login de um usuário comprador e/ou administrador na aplicação. No corpo da requisição, deve receber somente o e-mail e a senha. Validar e-mail e senha com os valores do banco de dados. |
|POST /user/admin/login | Endpoint Público com objetivo de efetuar o login de um usuário administrador na aplicação. No corpo da requisição, deve receber somente o e-mail e a senha. Validar e-mail e senha com os valores do banco de dados|
|POST /user/signup | Endpoint Público com objetivo de cadastrar um usuário comprador na aplicação. No corpo da requisição, deve receber todos os campos obrigatórios tanto de um usuário e campos necessários para criar o/os endereços.|
|POST /user/admin/signup | Endpoint Privado com o objetivo de cadastrar um usuário na aplicação. No corpo da requisição, deve receber todos os campos obrigatórios tanto de um usuário e campos necessários para criar o/os endereço/os.|
|POST /products/admin | Endpoint Privado com o objetivo de cadastrar um produto na aplicação.  O campo userId deve ser usado através do payload do JWT do usuário ADMIN. No corpo da requisição, deve receber todos os campos obrigatórios da entidade Products. |
|GET /products/admin/:offset/:limit | Endpoint Privado com o objetivo de listar todos os produtos cadastrados daquele usuário administrador. O campo userId deve ser usado através do payload do JWT do usuário ADMIN para listar os produtos deste usuário. O endpoint deve utilizar os path params offset e limit para realizar paginação. Retornar 20 itens no máximo na página. Na requisição, utilizar o query params para os campos name, typeProduct  como filtro e totalStock como ordenação.|
|GET /products/:offset/:limit | Endpoint Privado com o objetivo de  listar todos os produtos cadastrados na aplicação | Utilizar o query params para os campos name, typeProduct como filtro e totalStock como ordenação. O endpoint deve utilizar os path params offset e limit para realizar paginação. Retornar 20 itens no máximo na página|
|GET /products/:productId | Endpoint Privado com o objetivo de listar uma especificação do produto selecionado pelo id.|
|GET /buyers/address | Endpoint Privado com o objetivo de listar todos os endereços cadastrados do usuário. Para saber quem é o usuário, utilize o id do payload do JWT no filtro. |
|PATCH /products/admin/:productId | Endpoint Privado com o objetivo de atualizar alguns campos do produto na aplicação. O campo userId deve ser usado através do payload do JWT do usuário ADMIN. No corpo da requisição, deve enviar um ou todos os campos seguintes para atualizar - (name) (opcional) // Não pode ser enviado como string vazia. - (imageLink) (opcional) // Não pode ser enviado como string vazia. - (dosage) (opcional) // Não pode ser enviado como string vazia. (totalStock) (obrigatório) Este campo não pode ser menor que zero. |
| GET /buyers/admin/:offset/:limit | Endpoint Privado com objetivo de listar todos os usuários. Utilizar o query params para os campos fullName como filtro de busca por nome e createdAt como ordenação crescente e decrescente. O endpoint deve utilizar os path params offset e limit para realizar paginação. Retornar 20 itens no máximo na página.| 
|GET /buyers/admin/:userId | Endpoint Privado com o objetivo de listar uma especificação do usuário selecionado pelo id|
|PATCH /buyers/admin/:userId | Endpoint Privado com o objetivo de atualizar alguns campos do usuário comprador na aplicação. No corpo da requisição, deve enviar um ou todos os campos seguintes para atualizar: - (fullName) (opcional) // Não pode ser enviado como string vazia. - (email) (opcional) // Não pode ser enviado como string vazia. - (cpf) (opcional) // Não pode ser enviado como string vazia. - (phone) (opcional) Este campo não pode ser menor que zero.  - (typeUser) (opcional) Este campo não pode ser menor que zero.|
|POST /sales/ | Endpoint Privado com o objetivo de  criar registros de venda na aplicação. No corpo da requisição, um array de objetos. Regras: - Se for criado com sucesso, atualizar a quantidade de produtos na tabela products. - O campo total deve ser feito calculando a quantidade selecionada vezes o preço unitário do produto. - O campo buyer_id deve ser usado para todos os itens do array. Você irá pegar essa informação diretamente no Back-end pelo payload do JWT. - O campo seller_id deve ser recuperado através do id do produto, que irá indicar o vendedor, no caso o campo de referência será o user_id para trazer para a tabela de sales. |
|GET /sales/ | Endpoint Privado com o objetivo de  fornecer todas as compras que aquele comprador realizou. Regras: Deve utilizar o user_id do usuário através do payload do JWT para filtrar utilizando o buyer_id|
|GET /sales/admin | Endpoint Privado com o objetivo de  fornecer todas as vendas que aquele administrador realizou. Regras: Deve utilizar o user_id do usuário através do payload do JWT para filtrar utilizando o seller_id |
| GET /sales/dashboard/admin | Endpoint Privado com o objetivo de  fornecer resultados financeiros a partir das vendas realizadas. Regras: -totalSales: Retorna o total de valores vendidos por todos os produtos pertencentes daquele administrador. -TotalAmount: Retornar o total de produtos vendidos. - Filtrar estes resultados pelo seller_id. |

## Realização entre as tabelas
Para este projeto fizemos as seguintes relações:

## Organização do Projeto
A organização do projeto foi feito utiliznado o método Kanban, montando no trello os cards com cada endpoint e suas regras.

[!trello](https://trello.com/b/Iw8Phx36/m3p-backend-squad-3)

##Melhorias Futuras










