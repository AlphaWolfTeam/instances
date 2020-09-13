import { expect } from "chai";
import { InstanceManager } from "./instance.manager";
import { config } from "../config";
import { DBHandler } from "../utils/dbHandler";

const validInstance = {
  InstanceName: "Instance name",
};
const validInstance2 = {
  InstanceName: "Instance2 name",
};
const validInstance3 = {
  InstanceName: "Instance3 name",
};
const validInstance4 = {
  InstanceName: "Instance4 name",
};
const validInstance5 = {
  InstanceName: "Instance5 name",
};
const validInstance6 = {
  InstanceName: "Instance6 name",
};
const validInstance7 = {
  InstanceName: "Instance7 name",
};

const collectionName = "Test";

describe("create instance --> Manager", () => {
  context("When instance is valid", () => {
    before(async () => await DBHandler.connect(config.db.uri));
    after(async () => await DBHandler.disconnect());
    it("Should create new instance", async () => {
      const res = await InstanceManager.create(collectionName, validInstance);
      expect(res).to.have.property("InstanceName");
    });
  });
});

describe("delete instance --> Manager", () => {
  context("When instance exists", () => {
    let instance: any;
    before(async () => {
      await DBHandler.connect(config.db.uri);
      instance = await InstanceManager.create(collectionName, validInstance2);
    });
    after(async () => {
      await DBHandler.disconnect();
    });
    it("Should delete the Instance", async () => {
      if (instance._id) {
        await InstanceManager.delete(collectionName, instance._id);
      } else {
        expect(true).to.be.false;
      }
      const res = await InstanceManager.findById(collectionName, instance._id);
      expect(res).to.be.null;
    });
  });
});

describe("find instance --> Manager", () => {
  context("When there is an instance", () => {
    before(async () => await DBHandler.connect(config.db.uri));
    after(async () => await DBHandler.disconnect());
    it("Should find an instance", async () => {
      const instance = await InstanceManager.create(
        collectionName,
        validInstance3
      );
      const res = await InstanceManager.findById(collectionName, instance._id);

      expect(res).to.have.property("InstanceName");
      expect(res).to.have.property("id");
      instance.id = instance._id;
      delete instance._id;
      expect(instance).to.deep.equal(res);
    });
  });
});

describe("find instances --> Manager", () => {
  context("When there are instances", () => {
    before(async () => {
      await DBHandler.connect(config.db.uri);
      await DBHandler.dbClient
        .db(DBHandler.dbName)
        .collection(collectionName)
        .deleteMany({});
    });
    after(async () => await DBHandler.disconnect());
    it("Should find instances", async () => {
      const instances = await Promise.all([
        InstanceManager.create(collectionName, validInstance4),
        InstanceManager.create(collectionName, validInstance5),
      ]);
      const res = await InstanceManager.find(collectionName, {});

      expect(res[0]).to.have.property("InstanceName");
      expect(res[1]).to.have.property("InstanceName");
      expect(res[0]).to.have.property("id");
      expect(res[1]).to.have.property("id");
      instances[0].id = instances[0]._id;
      delete instances[0]._id;
      instances[1].id = instances[1]._id;
      delete instances[1]._id;
      expect(instances).to.deep.equal(res);
    });
  });
});

describe("update instance --> Manager", () => {
  context("When there is an instance", () => {
    before(async () => await DBHandler.connect(config.db.uri));
    after(async () => await DBHandler.disconnect());
    it("Should update instances", async () => {
      const instances = await InstanceManager.create(
        collectionName,
        validInstance6
      );
      await InstanceManager.update(
        collectionName,
        instances._id,
        validInstance7
      );
      const res = await InstanceManager.findById(collectionName, instances._id);

      expect(res).to.have.property("InstanceName");
      expect(res).to.have.property("id");
      expect(res.InstanceName).to.equal(validInstance7.InstanceName);
    });
  });
});
