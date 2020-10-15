export interface ISchema {
    _id: string,
    schemaName: string,
    schemaProperties: IProperty[],
    createdAt: Date,
    updatedAt: Date,
}

export interface IProperty {
    _id: string,
    propertyName: string,
    propertyType: string,
    defaultValue?: any,
    propertyRef?: string,
    enum?: any[],
    isUnique: boolean,
    index?: boolean,
    required?: boolean,
    validation?: Object,
    createdAt: Date,
    updatedAt: Date,
}

