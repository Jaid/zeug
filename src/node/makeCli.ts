import type {CommandModule, ParserConfigurationOptions} from 'yargs'

import * as lodash from 'lodash-es'
import yargs from 'yargs'
import {hideBin} from 'yargs/helpers'

export type YargsOptions = Parameters<ReturnType<typeof yargs>['options']>[0]

export type SimpleCommandModule = ((args: any) => Promise<void>) | ((args: any) => void)

type Options = {
  command: Array<CommandModule> | CommandModule | SimpleCommandModule
  helpWidth: number
  modify: (cli: typeof yargs) => typeof yargs
  options: YargsOptions
  parserOptions: ParserConfigurationOptions
  strict: boolean
}

export const makeCli = (options: Partial<Options> | SimpleCommandModule) => {
  if (lodash.isFunction(options)) {
    options = {command: options}
  }
  if (options.strict === undefined) {
    options.strict = true
  }
  const cli = yargs([])
  cli.detectLocale(false)
  if (options.strict) {
    cli.strict()
  }
  cli.parserConfiguration({
    'strip-aliased': true,
    'strip-dashed': true,
    ...options.parserOptions,
  })
  cli.scriptName(process.env.npm_package_name!)
  cli.version(process.env.npm_package_version!)
  cli.completion()
  if (options.options !== undefined) {
    cli.options(options.options)
  }
  const addCommand = (command: CommandModule | SimpleCommandModule) => {
    if (lodash.isFunction(command)) {
      cli.command(`$0`, ``, {}, command)
    } else {
      cli.command(command)
    }
  }
  if (options.command !== undefined) {
    if (Array.isArray(options.command)) {
      for (const command of options.command) {
        addCommand(command)
      }
    } else {
      addCommand(options.command)
    }
    if (options.strict) {
      cli.demandCommand()
    }
  }
  cli.help()
  cli.showHelpOnFail(false)
  const helpWidth = options.helpWidth ?? 100
  cli.wrap(Math.min(helpWidth, cli.terminalWidth()))
  if (options.modify !== undefined) {
    options.modify(cli)
  }
  return async (args?: Array<string> | string) => {
    const chosenArgs = args ?? hideBin(process.argv)
    return cli.parseAsync(chosenArgs)
  }
}

export const runSimpleCli = async (handler: SimpleCommandModule, args?: Array<string> | string) => {
  const runCli = makeCli({
    command: handler,
    strict: false,
  })
  return runCli(args)
}
