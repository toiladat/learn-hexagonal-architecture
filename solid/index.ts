class ItemSpe {
  constructor(
    private readonly name: string,
    private readonly type: string,
    private readonly color: string
  ) {}
  compare(item: ItemSpe) {
    return (
      this.name === item.name &&
      this.type === item.type &&
      this.color === item.color
    );
  }
}

class DigitalItemSpec extends ItemSpe {
  constructor(
    private readonly fileExt: string,
    name: string,
    type: string,
    color: string
  ) {
    super(name, type, color);
  }

  compare(item: DigitalItemSpec): boolean {
    return super.compare(item) && this.fileExt === item.fileExt // supper để so sánh cha + con thì mới
  }
}

class Item {
  constructor(
    private readonly id: string,
    private readonly imageUrl: string,
    private readonly quantity: string,
    private readonly price: string,
    private readonly spec: ItemSpe
  ) {}
  //S in solid single responsibility principle
  // Mỗi class nên được tách ra làm 1 nhiệm vụ của chính nó
  // tách bussiness logic ra riêng mỗi class
  compare(itemSpec: ItemSpe) {
    return this.spec.compare(itemSpec);
  }

  encode(encoder: IItemEncoder): string {
    return encoder.encode(this);
  }
}

//O Open/Closed Principle (OCP)
//Class không được sửa code bên trong khi thêm chức năng mới.
//Nhưng có thể mở rộng bằng cách thêm class mới.
interface IItemEncoder {
  encode(item: Item): string;
}

class ItemStringEncoder implements IItemEncoder {
  encode(item: Item): string {
    return "encodeToString";
  }
}

class ItemJSONEncoder implements IItemEncoder {
  encode(item: Item): string {
    return "encodeToJSON";
  }
}

class ItemWrongEncder implements IItemEncoder {
  encode(item: Item): string {
    throw Error("sai");
    return "";
  }
}
// ----------- TEST --------------------

const spec = new ItemSpe("Shoe", "Sport", "Black");

const item = new Item("1", "img.png", "10", "100", spec);

// console.log(item.encode(new ItemWrongEncder()));
console.log(item.encode(new ItemJSONEncoder()));
