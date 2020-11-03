import { InstanceRepository } from "./instance.repository";
import axios from "axios";
import { config } from "../config";
import { IProperty, ISchema } from "../utils/schema.interface";
import { ObjectId } from "mongodb";
import { ValidationError } from "../utils/errors/user";
import { validationFactory } from "./validation/validation.factory";

export class InstanceManager {
  static async find(collectionName: string, cond: {}) {
    return await InstanceRepository.find(collectionName, cond);
  }

  static async findById(collectionName: string, id: string) {
    return await InstanceRepository.findById(collectionName, id);
  }

  static async create(collectionId: string, item: any) {
    const schema = await this.getSchema(config.schema.url, collectionId);
    this.propertyValidation(schema, item);
    item = this.handleDefaultValues(schema, item);
    return await InstanceRepository.create(schema.schemaName, item);
  }

  static async update(collectionId: string, id: string, item: any) {
    const schema = await this.getSchema(config.schema.url, collectionId);
    this.propertyValidation(schema, item);
    return await InstanceRepository.update(schema.schemaName, id, item);
  }

  static async delete(collectionName: string, id: string) {
    return await InstanceRepository.delete(collectionName, id);
  }

  /**
   * Returns the schema from schema-api.
   * @param schemaApiBaseUrl the base url to the schema-api.
   * @param collectionId the collection id of the schema.
   */
  private static async getSchema(
    schemaApiBaseUrl: string,
    collectionId: string
  ): Promise<ISchema> {
    return await axios.get(`${schemaApiBaseUrl}/api/schema/${collectionId}`);
  }

  /**
   * Returns the item with implemented default values.
   * @param schema the schema that contains all the default values.
   * @param item the item to implement default value on.
   */
  private static handleDefaultValues(schema: ISchema, item: any) {
    // Returns true if the value is empty.
    // This function was created due to the fact that if there is a false value,
    // the function will still return false (non empty value).
    function isEmpty(val: any) {
      return val === undefined || val == null || val.length <= 0;
    }

    const defaultedItems = schema.schemaProperties.filter(
      (prop: IProperty) => !isEmpty(prop.defaultValue)
    );
    defaultedItems.forEach(function (prop: IProperty) {
      if (isEmpty(item[prop.propertyName])) {
        item[prop.propertyName] = prop.defaultValue;
      }
    });

    return item;
  }

  /**
   * Validate each property in itemToInsert if is satisfying the schema property requirements.
   * Throws a ValidationError if there is an invalid property.
   * @param schema the schema to validate with.
   * @param itemToInsert the item to validate.
   */
  private static async propertyValidation(
    schema: ISchema,
    itemToInsert: any
  ): Promise<void> {
    const numberOfRequiredSchemaProps = schema.schemaProperties.filter(
      (prop: IProperty) => !!prop.required
    ).length;
    const numberOfInputProps = Object.keys(itemToInsert).length;
    const numberOfSchemaProps = schema.schemaProperties.length;
    const isNumberOfPropsValid =
      numberOfRequiredSchemaProps <= numberOfInputProps &&
      numberOfInputProps <= numberOfSchemaProps;

    const isEveryPropValid = schema.schemaProperties.every(async function (
      schemaProp: IProperty
    ): Promise<boolean> {
      const itemProp = itemToInsert[schemaProp.propertyName];
      if (!itemProp) {
        return !!schemaProp.required;
      } else {
        const isItemTypeValid =
          Object.prototype.toString.call(itemProp) ===
          `[object ${schemaProp.propertyType}]`;
        const isValueIncludedInEnum = schemaProp.enum?.some(
          (enumVal: any) => enumVal === itemProp
        );
        if (isItemTypeValid && isValueIncludedInEnum) {
          if (!schemaProp.validation) {
            return true;
          }
          const validate = validationFactory(schemaProp.propertyType);
          return validate(itemProp, schemaProp.validation);
        } else if (ObjectId.isValid(itemProp)) {
          if (schemaProp.propertyRef) {
            try {
              const isValidReference = !!(await InstanceManager.findById(
                schemaProp.propertyRef,
                itemProp
              ));
              return isValidReference;
            } catch (e) {
              return false;
            }
          }
          return true;
        }
        return false;
      }
    });

    if (!isNumberOfPropsValid || !isEveryPropValid) {
      throw new ValidationError();
    }
  }
}
