import { Request, Response } from 'express';
import { CouponController } from '../controllers/CouponController';

class CupomController {

    public async create(req: Request, res: Response) {
        try {

            const tipo = req.user;

            if (tipo != '1') {
                return res.status(400).json({ erro: "Somente usuários administradores podem criar cupons." });
            }

            const { nome, valor } = req.body;

            const cupom = await  CupomController.create({
                nome, valor
            });

            res.status(201).json({ message: `Cupom '${nome}' inserido com sucesso! ` });

        } catch (error) {
            res.status(400).json({ erro: "Falha na inserção do cupom." });
        }
    }

    public async update(req: Request, res: Response) {
        try {

            const tipo = req.user;

            if (tipo != '1') {
                return res.status(400).json({ erro: 'Somente usuários administradores podem atualizar cupons.' });
            }

            const { id } = req.params;

            if (!id) {
                return res.json("O parâmetro id é obrigatório.");
            }

            const cupom = await  CupomController.findByPk(id);

            if (!cupom) {
                return res.json(`Cupom de id '${id} não encontrado.'`);
            }

            let payloadUpdate = {};


            Object.assign(payloadUpdate, req.body);

            const cupomUpdate = await  CupomController.update(payloadUpdate, {
                where: { id },
            });

            return res.status(200).json(cupomUpdate);

        } catch (error) {
            return res.status(400).json({ erro: `Ocorreu algum erro na atualização do cupom: ${error}` });
        }
    }

    public async delete(req: Request, res: Response) {

        try {
            const tipo = req.user;

            if (tipo != '1') {
                return res.status(400).json({ erro: 'Somente usuários administradores podem deletar cupons.' });
            }

            const { id } = req.params;

            if (!id) {
                return res.json("O parâmetro id é obrigatório.");
            }

            const cupom = await  CupomController.findByPk(id);

            if (!cupom) {
                return res.json(`Cupom de id '${id} não encontrado.'`);
            }

            const cupomDelete = await  CupomController.destroy({
                where:{
                    id
                }
            });

            return res.status(204).json({message:"Cupom deletado com sucesso!"});

        } catch (error) {
            return res.status(400).json({erro: "Erro ao deletar o cupom"});
        }

    }

    public async getAll(req: Request, res: Response) {
        try {

            const cuponsList = await  CupomController.findAll();

            res.status(200).json(cuponsList);

        } catch (error) {
            res.status(400).json({ erro: "Falha na listagem dos cupons." });
        }
    }

    public async getById(req: Request, res: Response) {
        try {

            const { id } = req.params;

            if(!id){
                return res.status(400).json({erro: "O parâmetro id é obrigatório."});
            }

            const cupom = await  CupomController.findOne({
                where:{
                    id
                }
            });

            if(!cupom){
                return res.status(200).json({mensagem: "Cupum não encontrado."});
            }

            res.status(200).json(cupom);

        } catch (error) {
            res.status(400).json({ erro: "Falha ao buscar o cupom." });
        }
    }

}

export default new CupomController();