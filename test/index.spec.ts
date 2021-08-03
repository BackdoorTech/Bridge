import { bridge } from "./../src/index";
import axios from "axios";

it("Functionl", () => {
  const virtualDom = {
    axios,
    user: {
      name: ""
    },
    console: console
  };

  bridge(
    `
    let response = await axios.get('https://api.agify.io/?name=michael');
    let wellDone = false
    
    if(response.data.name != '') {
      user.name = response.data.name;
      alert(user.name)
      console.log(user.name)
      console.log(user.name.replace('mich','peter'))
      wellDone = true
    }
  `,
    virtualDom
  );

  expect("me").toBe("me");
});
