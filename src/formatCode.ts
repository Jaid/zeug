import prettier from '@prettier/sync'

export const formatCode = (code: string) => {
  const codeCompressed = code.replaceAll(/^\s*[\n\r]/gm, ``)
  const codeFormatted = prettier.format(codeCompressed, {
    parser: `typescript`,
    arrowParens: `avoid`,
    bracketSameLine: true,
    bracketSpacing: false,
    embeddedLanguageFormatting: `off`,
    jsxSingleQuote: true,
    printWidth: 80,
    quoteProps: `as-needed`,
    requirePragma: false,
    semi: false,
    singleQuote: true,
    tabWidth: 2,
    trailingComma: `none`,
  })
  const codeTrimmed = codeFormatted.trim()
  return codeTrimmed
}
