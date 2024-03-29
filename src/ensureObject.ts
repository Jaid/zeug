export const ensureObject = <DefaultValueType, DefaultKeyType extends number | string | symbol>(defaultKey: DefaultKeyType, value: {[key in DefaultKeyType]: DefaultValueType} | DefaultValueType): {[key in DefaultKeyType]: DefaultValueType} => {
  if (typeof value === `object` && value !== null) {
    return value as {[key in DefaultKeyType]: DefaultValueType}
  }
  return {
    [defaultKey]: value,
  } as {[key in DefaultKeyType]: DefaultValueType}
}
