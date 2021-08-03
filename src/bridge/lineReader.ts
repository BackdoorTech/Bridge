import { getDeep } from "../function/getDeep"
import { stringOperator } from "./operator"
import { Variable } from './variable'

const variable = new Variable()

export class LineReader {

  variableName: string = ''
  variableValue: any = ''
  condition: string = ''
  variablePrefix: string = ''
  creatingVariable: boolean = false

  functionName: string = ''
  functionArgs: any = []
  functionHasArg: boolean = false
  function: Function | undefined
  functionAsync: boolean = false

  isVariableStatements(line: any): boolean {

    const setPathname = line.match(/([.]*\w*[\\s*'"]*)*\s=/)

    if(!setPathname) return false

    const result =  [
      setPathname.index == 0 || setPathname.index == 4
    ].includes(!false)

    if(!result) return false

    if(result) {
      this.variableName = setPathname[0].replace(' =', '')
      let variableValue: any = line.match(/=\s([.]*\w*[\\s*'"]*)*/)
      if(variableValue) this.variableValue = variableValue[0].replace('= ', '');
    }

    // creating variables
    const prefix = line.includes('let')
    if(prefix) {
      this.creatingVariable = true
    }

    return result

  }

  isConditionalStatements(line: string): boolean {

    this.condition = line

    return [
      line.includes('if (') && line.endsWith(') {'),
    ].includes(!false)


  }

  runConditionalStatements(data: any) : boolean {
    const Linecondition = this.condition.replace('if (', '').replace(') {', '').replace('&&','and')

    const result: any = stringOperator(Linecondition, data)

    return   result
  }

  isCallingFunction(line:string, data: any): boolean {

    const LineCondition = line.match(/([.]*\w*[\\s*'"]*)+\s?[(]/)

    if(!LineCondition) return false

    const conditionResult =[
      LineCondition.index == 0 && line.endsWith(');')
    ].includes(!false)

    this.functionName = LineCondition[0].replace('(','')

    let functionleName: any =  line.match(/([.]*\w*[\\s*'"]*)+\s?[(]/)
    if(functionleName) functionleName = functionleName[0].replace('(','')

    var args: any = /\(\s*([^)]+?)\s*\)/.exec(line);
    if(args) {
      if (args[1]) {
        args = args[1].split(/\s*,\s*/);
      }

      let newArgs: any[] = []

      args.forEach((arg: any)=> {

        let a = variable.parseValue(arg, data)
        newArgs.push(a)

      })

      this.functionArgs = newArgs
      this.function = getDeep(data, functionleName)
      this.functionName = functionleName
      this.functionHasArg = true


    }  else {
      this.functionHasArg = false
    }


    return conditionResult
  }

  valueToSetIsFunction(line: string, data: any): boolean {

    const LineCondition: any = line.match(/(= await ([.]*\w*[\\s*'"]*)+\s?[(]|=\s([.]*\w*[\\s*'"]*)+\s?[(])/)

    if(!LineCondition) return false

    const result = [
      LineCondition.index >= 3
    ].includes(!false)


    this.functionName = LineCondition[0].replace('(','')

    let functionleName: any =  line.match(/([.]*\w*[\\s*'"]*)+\s?[(]/)
    if(functionleName) functionleName = functionleName[0].replace('(','')

    var args: any = /\(\s*([^)]+?)\s*\)/.exec(line);
    if(args) {
      if (args[1]) {
        args = args[1].split(/\s*,\s*/);
      }

      let newArgs: any[] = []

      args.forEach((arg: any)=> {
        try {
          let a = variable.parseValue(arg, data)
          newArgs.push(a)
        } catch (error) {

          newArgs.push(getDeep(data, arg))
        }
      })

      this.functionArgs = newArgs
      this.function = getDeep(data, functionleName)
      this.functionName = functionleName
      this.functionHasArg = true


    }  else {
      this.functionHasArg = false
    }

    const isAync = line.match(/= await ([.]*\w*[\\s*'"]*)+\s?[(]/)
    if(isAync) this.functionAsync = true
    else this.functionAsync = false

    return result
  }

}
