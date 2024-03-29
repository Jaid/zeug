import {strict as assert, AssertionError} from 'node:assert'

function greaterThan(givenValue: BigInt | number | string, expectedValue: number): asserts givenValue is number {
  let number: number
  try {
    number = Number(givenValue)
  } catch (error) {
    throw new AssertionError({
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      message: `Given value is not a number: ${givenValue}`,
    })
  }
  if (number <= expectedValue) {
    throw new AssertionError({
      message: `Given number ${number} should be greater than ${expectedValue}`,
    })
  }
}
function greaterThanOrEqual(givenValue: BigInt | number | string, expectedValue: number): asserts givenValue is number {
  let number: number
  try {
    number = Number(givenValue)
  } catch (error) {
    throw new AssertionError({
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      message: `Given value is not a number: ${givenValue}`,
    })
  }
  if (number < expectedValue) {
    throw new AssertionError({
      message: `Given number ${number} should be at least ${expectedValue}`,
    })
  }
}
function lessThan(givenValue: BigInt | number | string, expectedValue: number): asserts givenValue is number {
  let number: number
  try {
    number = Number(givenValue)
  } catch (error) {
    throw new AssertionError({
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      message: `Given value is not a number: ${givenValue}`,
    })
  }
  if (number >= expectedValue) {
    throw new AssertionError({
      message: `Given number ${number} should be less than ${expectedValue}`,
    })
  }
}
function lessThanOrEqual(givenValue: BigInt | number | string, expectedValue: number): asserts givenValue is number {
  let number: number
  try {
    number = Number(givenValue)
  } catch (error) {
    throw new AssertionError({
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      message: `Given value is not a number: ${givenValue}`,
    })
  }
  if (number > expectedValue) {
    throw new AssertionError({
      message: `Given number ${number} should be at most ${expectedValue}`,
    })
  }
}
function numberBetween(givenValue: BigInt | number | string, floorInclusive: number, ceilInclusive: number): asserts givenValue is number {
  let number: number
  try {
    number = Number(givenValue)
  } catch (error) {
    throw new AssertionError({
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      message: `Given value is not a number: ${givenValue}`,
    })
  }
  if (number < floorInclusive || number > ceilInclusive) {
    throw new AssertionError({
      message: `Given number ${number} should be between ${floorInclusive} and ${ceilInclusive}`,
    })
  }
}
function notInteger(givenValue: number | string): asserts givenValue is number {
  let number: number
  try {
    number = Number(givenValue)
  } catch (error) {
    throw new AssertionError({
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      message: `Given value is not a number: ${givenValue}`,
    })
  }
  if (number % 1 === 0) {
    throw new AssertionError({
      message: `Given number ${number} should not be an integer`,
    })
  }
}
const assertExtended = {
  ...assert,
  greaterThan,
  greaterThanOrEqual,
  lessThan,
  lessThanOrEqual,
  numberBetween,
  notInteger,
} as const

export {assertExtended as assert}
