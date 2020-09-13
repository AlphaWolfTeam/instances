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

  public static async createDocument(collectionName: string, document: any) {
    return this.dbClient
      .db(this.dbName)
      .collection(collectionName)
      .insertOne(document);
  }

  public static async deleteDocument(collectionName: string, id: string) {
    return this.dbClient
      .db(this.dbName)
      .collection(collectionName)
      .deleteOne({ _id: id });
  }

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

  public static async getDocument(collectionName: string, id: string) {
    return this.dbClient
      .db(this.dbName)
      .collection(collectionName)
      .findOne({ _id: id });
  }

  public static async getDocuments(collectionName: string, cond: {}) {
    return this.dbClient
      .db(this.dbName)
      .collection(collectionName)
      .find(cond)
      .toArray();
  }
}
