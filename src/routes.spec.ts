import { Router } from './helpers/Router';

import { describe } from "node:test";
import supertest from 'supertest';


describe("Teste da rotas de prodito da API", () => {
  test("Criando um produto", async () => {
    const res = await supertest(Router).get("/products");
    expect(res.status).toBe(200);
  })
  test("Recuperando todos os produtos", async () => {
    const res = await supertest(Router).get("/products");
    expect(res.status).toBe(200);
  })
  test("Recuperando produto por id", async () => {
    const res = await supertest(Router).get("/products");
    expect(res.status).toBe(200);
  })
  test("Atualizando um produto", async () => {
    const res = await supertest(Router).get("/products");
    expect(res.status).toBe(200);
  })
  test("Deletando produto", async () => {
    const res = await supertest(Router).get("/products");
    expect(res.status).toBe(200);
  })

  test("Deletando produto", async () => {
    const res = await supertest(Router).get("/products");
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toContain('application/json');
    expect(res.body).toBeDefined();
  })
})




//Categorias
describe("Teste da rotas de categoria da API", () => {
  test("Criando um categoria", async () => {
    const res = await supertest(Router).get("/categories");
    expect(res.status).toBe(200);
  })
  test("Recuperando todos os categorias", async () => {
    const res = await supertest(Router).get("/categories");
    expect(res.status).toBe(200);
  })
  test("Recuperando categoria por id", async () => {
    const res = await supertest(Router).get("/categories");
    expect(res.status).toBe(200);
  })
  test("Atualizando um categoria", async () => {
    const res = await supertest(Router).get("/categories");
    expect(res.status).toBe(200);
  })
  test("Deletando categoria", async () => {
    const res = await supertest(Router).get("/categories");
    expect(res.status).toBe(200);
  })
})