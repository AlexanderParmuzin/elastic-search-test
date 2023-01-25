const { faker } = require("@faker-js/faker");
const client = require('./connect');
const count = 1000;

const run = async () => {
  for (let i = 0; i < count; i++) {
    const blog = {
      title: faker.lorem.paragraph(),
      description: faker.lorem.paragraph(),
      date: faker.date.past(),
    };
    await client.index({
        index: 'blog',
        document: {
          ...blog,
        }
      })
      console.log("blog index ->", i);
  }
};

run();
