import mongodb from "mongodb";

export class DBHandler {
  public static dbClient: mongodb.MongoClient;
  public static dbName: string;

  public static async connect(dbUri: string) {
    this.dbClient = await mongodb.connect(dbUri, { useUnifiedTopology: true });
    this.dbName = dbUri.split("/")[dbUri.split("/").length - 1];
  }

  public static async disconnect() {
    await this.dbClient.close();
  }

  /**
   *
   * @param collectionName the name of the collection that the instance will be in it.
   * @param document the instance to insert.
   */
  public static async createDocument(collectionName: string, document: any) {
    return this.dbClient
      .db(this.dbName)
      .collection(collectionName)
      .insertOne(document);
  }

  /**
   * Deletes an instance.
   * @param collectionName the name of the collection that the instance in it.
   * @param id the instance id.
   */
  public static async deleteDocument(collectionName: string, id: string) {
    return this.dbClient
      .db(this.dbName)
      .collection(collectionName)
      .deleteOne({ _id: id });
  }

  /**
   * Update an instance.
   * @param collectionName the name of the collection that the instance in it.
   * @param id the instance id.
   * @param document the updated instance.
   */
  public static async updateDocument(
    collectionName: string,
    id: string,
    document: any
  ) {
    return this.dbClient
      .db(this.dbName)
      .collection(collectionName)
      .replaceOne({ _id: id }, document);
  }

  /**
   * Get instance by id.
   * @param collectionName the name of the collection that the instance in it.
   * @param id the instance id.
   */
  public static async getDocument(collectionName: string, id: string) {
    return this.dbClient
      .db(this.dbName)
      .collection(collectionName)
      .findOne({ _id: id });
  }

  /**
   * Get many instances.
   * @param collectionName the name of the collection that the instances in it.
   * @param cond a condition for more specific search.
   */
  public static async getDocuments(collectionName: string, cond: {}) {
    return this.dbClient
      .db(this.dbName)
      .collection(collectionName)
      .find(cond)
      .toArray();
  }
}
