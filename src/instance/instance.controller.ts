import { InstanceManager } from "./instance.manager";
import { Request, Response } from "express";

export class InstanceController {
  static async find(req: Request, res: Response) {
    res.json(await InstanceManager.find(req.params.collectionId, req.body.cond));
  }

  static async findById(req: Request, res: Response) {
    res.json(await InstanceManager.findById(req.params.collectionId, req.params.id));
  }

  static async create(req: Request, res: Response) {
    res.json(await InstanceManager.create(req.params.collectionId, req.body.item));
  }

  static async update(req: Request, res: Response) {
    res.json(await InstanceManager.update(req.params.collectionId, req.params.id, req.body.item));
  }

  static async delete(req: Request, res: Response) {
    res.json(await InstanceManager.delete(req.params.collectionId, req.params.id));
  }
}
