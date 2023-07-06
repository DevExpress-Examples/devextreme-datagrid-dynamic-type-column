import { Injectable } from '@angular/core';

export interface MyCustomType {
  ID: number;
  Name: string;
  toString: () => string;
}

export type DynamicType = string | number | Date | boolean | MyCustomType;

export interface GridDataModel {
  ID: number;
  DynamicValue: DynamicType;
  Type: string;
}

const typeList = ['String', 'Number', 'Date', 'Boolean', 'MyCustomType'];

const myDropdownData: MyCustomType[] = [
  {
    ID: 0,
    Name: 'John Doe',
  },
  {
    ID: 1,
    Name: 'Jane Smith',
  },
];

const sampleData: GridDataModel[] = [
  {
    ID: 1,
    DynamicValue: 'Sample String',
    Type: 'String',
  },
  {
    ID: 2,
    DynamicValue: 42,
    Type: 'Number',
  },
  {
    ID: 3,
    DynamicValue: new Date(),
    Type: 'Date',
  },
  {
    ID: 4,
    DynamicValue: true,
    Type: 'Boolean',
  },
  {
    ID: 5,
    DynamicValue: {
      ID: 1,
      Name: 'Jane Smith',
    },

    Type: 'MyCustomType',
  },
];

const defaultValue = 'default string';
const defaultType = 'String';

@Injectable()
export class Service {
  getMyDropdownData(): MyCustomType[] {
    return myDropdownData;
  }

  getSampleData(): GridDataModel[] {
    return sampleData;
  }

  getTypeList(): string[] {
    return typeList;
  }

  getDefaultValue(): string {
    return defaultValue;
  }

  getDefaultType(): string {
    return defaultType;
  }
}
