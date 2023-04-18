interface MyCustomTypeProps {
  ID?: number;
  Name?: string;
}

export class MyCustomType {
  ID: number;
  Name: string;

  constructor(props?: MyCustomTypeProps) {
    this.ID = props?.ID || 0;
    this.Name = props?.Name || "John Doe";
  }
}

const myDropdownData: MyCustomTypeProps[] = [
  {
    ID: 0,
    Name: "John Doe",
  },
  {
    ID: 1,
    Name: "Jane Smith",
  },
];

type DynamicType = string | number | Date | boolean | MyCustomType;
export type GridDataModel = {
  ID: number;
  DynamicValue: DynamicType;
  Type: String;
}

const sampleData: GridDataModel[] = [
  {
    ID: 1,
    DynamicValue: "Sample String",
    Type: "String",
  },
  {
    ID: 2,
    DynamicValue: 42,
    Type: "Number",
  },
  {
    ID: 3,
    DynamicValue: new Date(),
    Type: "Date",
  },
  {
    ID: 4,
    DynamicValue: true,
    Type: "Boolean",
  },
  {
    ID: 5,
    DynamicValue: new MyCustomType(),
    Type: "MyCustomType",
  },
];

export default {
  getMyDropdownData() {
    return myDropdownData;
  },
  getSampleData(): GridDataModel[]{
    return sampleData;
  }
};
