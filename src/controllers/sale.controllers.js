const { Sale } = require ('../models/sale');
const { Product } = require('../models/product');
const { User } = require('../models/user');
const { Address } = require('../models/address')

class SaleController {
    async createSale(req, res) {
        try {
            // Criar dados de teste
            const buyer = await User.create({
                fullName: "Maria Aparecida",
                cpf: "12345678910",
                birthDate: "1990-02-21",
                email: "email@email.com",
                phone: "3333333333",
                password: "Maria1234",
                typeUser: "administrador",
                created_by: null, // Defina o campo corretamente se necessário
              });

              const address = await Address.create({
                cep: "877788888",
                street: "rua teste",
                numberStreet: "32", // Use o nome correto do campo 'number'
                neighborhood: "teste",
                city: "teste",
                state: "teste",
                complement: "teste",
                latitude: "teste",
                longitude: "teste"

            });

            const seller = await User.create({
                fullName: "Vendedor",
                cpf: "98765432100",
                birthDate: "1990-02-22",
                email: "vendedor@email.com",
                phone: "4444444444",
                password: "SenhaVendedor",
                typeUser: "administrador",
                createdBy: "2023/10/03"
            });
            

            const product = await Product.create({
                productName: "Dipirona", // Use o nome correto do campo aqui
                laboratoryName: "lab A",
                imageLink: "Imagem da dipirona",
                dosage: "500mg",
                unitPrice: "3.00",
                productType: "Medicamento não controlado",
                totalStock: 15,
                userId: 1,
                totalPrice: "45.00", 
                registrationDate: new Date()
              });

              console.log("Dados de teste criados com sucesso!");

              const {
                buyerId,
                sellerId,
                productId,
                unitPrice,
                amountBuy,
                userAddressId,
                total,
                typePayment,
                email,
              } = req.body;
        
              if (
                !productId ||
                !unitPrice ||
                !amountBuy ||
                !userAddressId ||
                !total ||
                !typePayment
              ) {
                return res.status(422).json({
                  error: "Preencha todos os campos obrigatórios!",
                });
              }
        
              if (!isValidTypeProduct(productId)) {
                return res.status(400).json({
                  error:
                    "O campo productId está mal formatado. Só é válido Medicamento controlado ou Medicamento não controlado",
                });
              }
        
              if (!isValidEmail(email)) {
                return res.status(400).json({
                  error: "O campo email está em um formato inválido.",
                });
              }
        
              if (buyerId === undefined || req.user.typeUser !== "administrador") {
                return res.status(403).json({
                  error:
                    "Acesso negado. O campo buyerId é obrigatório para usuários com tipo 'administrador'.",
                });
              }
        
              // Criar a venda usando os dados de teste
              const newSale = await Sale.create({
                buyerId: buyer.id,
                sellerId: seller.id,
                productId: product.id,
                unitPrice,
                amountBuy,
                userAddressId: address.id,
                total,
                typePayment,
              });
        
              return res.status(201).json({
                message: "Registros criados com sucesso!",
                sale: newSale,
              });
            } catch (error) {
              console.error(error);
              return res.status(500).json({
                error: "Não foi possível cadastrar uma venda!",
              });
            }
          }
        }

function isValidTypeProduct(productId) {
    const validProducts = ["Medicamento controlado", "Medicamento não controlado"];
    return validProducts.includes(productId);
}

function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
}


module.exports =  new SaleController();