import faker from "faker";
const controller = {};

controller.index = (req, res) => {
    res.send({
        data: faker.helpers.userCard()
    });
};

export default controller;
