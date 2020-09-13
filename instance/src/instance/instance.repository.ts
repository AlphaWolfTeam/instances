import { DBHandler } from "../utils/dbHandler";

export class InstanceRepository {
  static async find(collectionName: string, cond: {}): Promise<any> {
    const docs = await DBHandler.getDocuments(collectionName, cond);
    return docs.map(this.toId);
  }

  static async findById(
    collectionName: string,
    id: string
  ): Promise<any | null> {
    const doc = await DBHandler.getDocument(collectionName, id);
    return this.toId(doc);
  }

  static async create(collectionName: string, item: any): Promise<any> {
    return (await DBHandler.createDocument(collectionName, item)).ops[0];
  }

  static async update(
    collectionName: string,
    id: string,
    item: any
  ): Promise<any> {
    return (await DBHandler.updateDocument(collectionName, id, item)).ops[0];
  }

  static async delete(
    collectionName: string,
    id: string
  ): Promise<{ ok?: number; n?: number }> {
    return (await DBHandler.deleteDocument(collectionName, id)).result;
  }

  private static toId(item: any) {
    if (item && item._id) {
      item.id = item._id;
      delete item._id;
    }
    return item;
  }
}
