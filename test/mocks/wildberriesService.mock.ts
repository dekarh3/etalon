import axios from "axios";
jest.mock("axios");

import wildberriesFixture from "#test/fixtures/wildberries.js";

const mockedAxios = jest.mocked(axios);
mockedAxios.get.mockImplementation(() => {
    return Promise.resolve({ data: wildberriesFixture });
});
