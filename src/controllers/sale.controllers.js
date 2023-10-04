const { Sale } = require ('../models/sale');
const { Product } = require('../models/product');
const { User } = require('../models/user');

class SaleController {
    async createSale(req, res) {
        try {
            // Criar dados de teste
            const buyer = await User.create({
                id: 1,
                fullName: "Maria Aparecida",
                cpf: "12345678910",
                birthDate: "1990/02/21",
                email: "email@email.com",
                phone: "3333333333",
                password: "Maria123",
                addressId: 1,
                typeUser: "administrador",
                createdBy: "2023/10/03"
            });

            const addressId = await User.create({
                id: 1,
                cep: "877788888",
                street: "rua teste",
                number: "32",
                neighborhood: "teste",
                city: "teste",
                state: "teste"
            });

            const seller = await User.create({
                id: 1,
                fullName: "Maria Aparecida",
                cpf: "12345678910",
                birthDate: "1990/02/21",
                email: "email@email.com",
                phone: "3333333333",
                password: "Maria123",
                addressId: 1,
                typeUser: "administrador",
                createdBy: "2023/10/03"
            });

            const product = await Product.create({
                id: 1,
                name: "Dipirona",
                lab_name: "lab A",
                image_link: "Imagem da dipirona",
                dosage: "500mg",
                unit_price: "3.00",
                type_product: "medicamento não controlado",
                total_stock: "15",
                user_id: 1
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
                    error: "O campo productId está mal formatado. Só é válido Medicamento controlado ou Medicamento não controlado",
                });
            }

            if (!isValidEmail(email)) {
                return res.status(400).json({
                    error: "O campo email está em um formato inválido.",
                });
            }

            if (buyerId === undefined || req.user.typeUser !== "administrador") {
                return res.status(403).json({
                    error: "Acesso negado. O campo buyerId é obrigatório para usuários com tipo 'administrador'.",
                });
            }

            // Criar a venda usando os dados de teste
            const newSale = await Sale.create({
                buyerId: buyer.id,
                sellerId: seller.id,
                productId: product.id,
                unitPrice,
                amountBuy,
                userAddressId,
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