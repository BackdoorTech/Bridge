# Bridge

Code interpreter inside javascript and node

## Usage

```javascript
import axios from "axios";

const virtualDom = {
  axios,
  user: {
    name: ""
  },
  alert: alert,
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

console.log(virtualDom.user.name); // michael
console.log(virtualDom.wellDone); // true
```

Virtual dom

In the virtualDom can be set anything function object and variable even instance of string, number e class

## Why Bridge

When facing a behaviour of a particular component that is unpredictable or need to be changed dynamically. Bridge can solve this problem for you.

## Development Requirements

node >= 14

## Installation

Use the package manager [yarn](https://www.npmjs.com/package/yarn) to install Bridge.

```bash
yarn install
```

## Connect with

<a href="https://codesandbox.io/s/bridge-c774c" target="blank"><img align="center" src="https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/codesandbox.svg" alt="backdoortech" height="30" width="40" /></a>

## Contributing

For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
