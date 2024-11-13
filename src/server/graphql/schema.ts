import pokemon from './schema/pokemon'

export const schema = sequence(pokemon).toSchema()

function sequence(...handlers: (typeof builderFn)[]): Builder {
  return handlers.reduce((prev, current) => current(prev), builder)
}
