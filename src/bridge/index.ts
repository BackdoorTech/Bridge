// https://github.com/cucumber/cucumber-js/issues/1152
// import prettgyJs  from 'pretty-js'

// Need to load with require because it has no corresponding type declarations
const prettyJs = require("pretty-js");
import { getDeep } from './../function/getDeep'
import { setDeep } from './../function/setDeep'
import { LineReader } from './lineReader'
import { Variable } from './variable'
import { Function } from './functions'
import { stringOperator } from "./operator"

const lineReader = new LineReader()
const variable = new Variable()
const functionOperator = new Function()

export const bridge = async (code: string, data: any) => {

  code = code.replace(/[\r\n\s]+{/g,'{')
    .replace(/if[\r\n\s]+[(]/g, 'if(')
    .replace(/"/g, `'`)

  // operators [\w\.]+\s[=]{2}\s[\w\."]+
  code = prettyJs(code)

  const lines = code.split(/[\r\n]/g).filter((e:string, index: number)=> e != '')

  let indentation = 0;


  const readline = async (lineNum: number): Promise<any> => {

    let line = lines[lineNum]
    if(line) {
      let Tline = line.replace(/^\s*/gm,'')

      if(typeof lines[lineNum] === 'undefined') {}
      else if(line.slice(indentation, indentation+1) == ' '){}
      else if(line.endsWith(') {}')){}
      else if(line.startsWith(" ".repeat(indentation))) {


        if(lineReader.isConditionalStatements(line) ) {

          if(lineReader.runConditionalStatements(data)) {
            // console.log (line, true)
            indentation =+ indentation + 4
            // console.log(line, true, indentation)
          } else {
            // console.log(line, false, indentation)
          }

        } else if(lineReader.isVariableStatements(Tline)) {
          const variableName = lineReader.variableName
          let variableValue = lineReader.variableValue

          if(lineReader.valueToSetIsFunction(Tline, data)) {

            const functionAsync = lineReader.functionAsync

            let result;

            if(functionAsync) {
              result  = await functionOperator.run(Tline, lineReader, data)
              result = await variable.parseValue(result, data)
            } else {
              result = await stringOperator(variableValue, data)
            }

            await setDeep(data ,variableName, result)

          } else {

            const value: any = await stringOperator(variableValue, data)
            await setDeep(data ,variableName, value)

          }

        } else if( lineReader.isCallingFunction(Tline, data) ) {

          const functionAsync = lineReader.functionAsync

          if(functionAsync) {
            await functionOperator.run(Tline, lineReader, data)
          } else {
            stringOperator(Tline, data)
            // functionOperator.run(Tline, lineReader, data)
          }

        }
        else if(line.endsWith("}")) {

          indentation = line.indexOf('}')
          //console.log('close!!!', indentation)
        }
        else {
          // console.log('bug!!!', line)
        }

      }
      else if(line.startsWith(" ".repeat(indentation-4))) {

        indentation = line.indexOf('}')
        //console.log(line, 'close!!', indentation)
        // console.log(line, indentation, 'less2')
      }

      return await readline(lineNum+1)
    }

  }


  return await readline(0)
}
