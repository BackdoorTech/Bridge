import { getDeep } from "../function/getDeep"
import { setDeep } from '../function/setDeep'
import { LineReader } from "./lineReader"

export class Variable {

  data: any

  parseValue(value: any, data: any ) {

    try {
      if(value instanceof Object) {
        //console.log(value, 'is object!!!!!!!!!!!!!!!!!!!!!!');
        return value;
      }
      return JSON.parse(`{"value":${value}}`).value
    } catch(e){
      //console.log(value, 'is object!!!!!!!!!!!!!!!!!!!!');
      return getDeep(data, value)
    }

  }

  async set(Tline: string, lineReader:LineReader, data:any) {

    this.data = data
    console.log(JSON.stringify(data))
    const variableName = lineReader.variableName
    let variableValue = lineReader.variableValue

    let value = await this.parseValue(variableValue, this.data)
    //console.log('value to set', variableValue)
    setDeep(data ,variableName, value)
  }

}
