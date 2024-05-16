import { faker } from "@faker-js/faker";

class MockingController {
  generateMockingProducts(req, res) {
    let fakerProducts = [];
    for (let i = 0; i < 100; i++) {
      fakerProducts.push({
        N: i + 1,
        id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        description: faker.lorem.sentences(2),
        price: faker.commerce.price(),
        thumbnail: faker.image.url(),
        code: faker.string.alpha(6),
        stock: faker.number.int({ min: 0, max: 100 }),
        status: faker.datatype.boolean(),
        category: faker.commerce.department(),
      });
    }
    const jsonString = JSON.stringify(
      { status: "ok", payload: fakerProducts },
      null,
      "\t"
    );

    const formattedJsonString = jsonString.replace(/},/g, "},\n");

    res.set("Content-Type", "application/json");
    res.send(formattedJsonString);
  }
}

export default MockingController;
