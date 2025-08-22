
interface MyCustomType {
  ID: number;
  Name: string;
}
export interface SampleItem {
  ID: number;
  DynamicValue: string | number | MyCustomType | Date | boolean | null;
  Type: string;
}

const sampleData: SampleItem[] = [
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
      ID: 0,
      Name: 'John Doe',
    },
    Type: 'MyCustomType',
  },
];

let counter = sampleData.length + 1;
const defaultValue = 'default string';
const defaultType = 'String';

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

const service = {
  getData(): SampleItem[] {
    return sampleData;
  },
  getDropDownData(): MyCustomType[] {
    return myDropdownData;
  },
  getDefaultValue(): string {
    return defaultValue;
  },
  getDefaultType(): string {
    return defaultType;
  },
  getNextId(): number {
    return counter++;
  },
};

export default service;
