// import Livro from '../models/Livro';
// import ProductRepository from '../repositories/ProductRepository';
// import { db } from '../config/database';
// import { LivroInterface } from '../interfaces/LivroInterface';
// import LivroService from '../services/LivroService';

// describe('LivroRepository', () => {

//     beforeAll(async () => {
//         // await db.sync({ force: true });
//     });

//     afterAll(async () => {
//         await db.close();
//     });

//     describe('LivroRepository.__getLivroById', () => {
//         it('deve retornar todos os dados do livro', async () => {

//             const ProdductID = 1;
//             const mockResponse = {
//                 id: 1,
//                 title: 'café em cápsulas',
//                 description: 'especial',
//                 price: 40,
//                 amount: 20,
//                 subcategory: '10 un',
//                 image: 'link',
//                 published: true,
//                 order_id: 1
//             }

//             const product = Product

//             Product.findOne = jest.fn().mockResolvedValue(mockResponse);

//             const result = await ProductRepository.getProduct(ProdductID);


//             expect(result).toEqual(mockResponse);
//             expect(Product.findOne).toHaveBeenCalledTimes(1);
//             expect(Product.findOne).toBeCalledWith({
//                 where: {
//                     id: ProductID
//                 }
//             });
//         });
//     });

//     describe('ProductRepository.__createProduct', () => {
//         it('deve criar um Product', async () => {            
//             const createPayload = {
//                 created_by: 1,
//                 titulo: 'Era uma Vez',
//                 autor: 'João da Silva',
//                 paginas: 1
//             }

//             const createdBook = (await ProductService.criarProduct(createPayload)).dataValues;
//             expect(createdBook.titulo).toEqual(createPayload.titulo);
//         });
//     });

//     describe('ProductRepository.__removeProduct', () => {
//         it('deve retornar true na tentativa de remover um Product', async () => {

//             const ProductID = 1;
//             const mockResponse = true;

//             Product.destroy = jest.fn().mockResolvedValue(mockResponse);

//             const result = await ProductRepository.removeProduct(ProductID);

//             expect(result).toEqual(mockResponse);
//             expect(Product.destroy).toHaveBeenCalledTimes(1);
//             expect(Product.destroy).toBeCalledWith({
//                 where: {
//                     id: ProductID
//                 }
//             });
//         });
//     });
// });