import ProductRepository from "../repositories/ProductRepository";
import ProductService from "../services/ProductService";

describe("ProductService", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("ProductService.__getProduct", () => {
        it("Deve retornar todos os produtos", async () => {

            // Arrange
            const id = 1
            const mockResponse = {
                id: 1,
                title: "Produto 1",
                description: "Descrição do produto 1",
                price: 100,
                measures: 100,
                amount: 20,
                published: true,
                option: "Opção do produto 1",
                image: "link",
                categoty_id: "1",
                category: "café",

            }

            // Act
            ProductRepository.findById = jest.fn().mockResolvedValue(mockResponse);
            const result = await ProductService.getProduct(id);

            // Assert
            // expect(result).toEqual(mockResponse);
            // expect(ProductRepository.findById).toHaveBeenCalledTimes(2);
            // expect(ProductRepository.findById).toBeCalledWith(id);
        })
    })
})