import { bridge } from "../../src/index";
import axios from "axios";

it("get Name from api", async () => {

  const virtualDom: any = {
    axios,
    user: {
      name: ""
    },
    console: console
  };

  await bridge(
    `
    let response = await axios.get('https://api.agify.io/?name=michael');

    if(response.data.name != '') {
      user.name = response.data.name;
    }
  `,
    virtualDom
  );

  expect(virtualDom.user.name).toBe("michael");

});


it("Change variable if condition is false", async () => {

  const virtualDom: any = {
    wellDone: false
  }

  await bridge(
    `
    if(!wellDone) {
      wellDone = true
    }
  `,
    virtualDom
  );

  expect(virtualDom.wellDone).toBe(true);

});


it("create variable", async () => {

  const virtualDom: any = {
    wellDone: false
  }

  await bridge(
    `
    let instance = '123'
  `,
    virtualDom
  );

  expect(virtualDom.instance).toBe('123');

});