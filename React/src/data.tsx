
interface MyCustomType {
  ID: number;
  Name: String;
}
export interface SampleItem {
  ID: number;
  DynamicValue: string | number | MyCustomType | Date | boolean | null;
  Type: String;
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
};

export default service;
