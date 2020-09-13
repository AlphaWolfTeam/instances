import { InstanceRepository } from "./instance.repository";

export class InstanceManager {
  static async find(collectionName: string, cond: {}) {
    return await InstanceRepository.find(collectionName, cond);
  }

  static async findById(collectionName: string, id: string) {
    return await InstanceRepository.findById(collectionName, id);
  }

  static async create(collectionName: string, item: any) {
    return await InstanceRepository.create(collectionName, item);
  }

  static async update(collectionName: string, id: string, item: any) {
    return await InstanceRepository.update(collectionName, id, item);
  }

  static async delete(collectionName: string, id: string) {
    return await InstanceRepository.delete(collectionName, id);
  }
}
