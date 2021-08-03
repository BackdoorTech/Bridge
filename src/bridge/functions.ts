import { getDeep } from "../function/getDeep"
import { LineReader } from "./lineReader"

export  class Function {
  async run(line: string, lineReader:LineReader, data:any) {
    //console.log('is async', lineReader.functionAsync, Tline)
    const functionName = lineReader.functionName
    const functionArgs = lineReader.functionArgs
    const hasArgs = lineReader.functionHasArg
    const functionAsync = lineReader.functionAsync

    const func = await getDeep(data, functionName)

    let result: any;

    if(functionAsync) {
        return await func(...functionArgs)
    } else {
        return func(...functionArgs)
    }
      //consol
  }
}
