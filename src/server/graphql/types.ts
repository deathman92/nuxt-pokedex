import type { H3Event } from 'h3'

export interface Context {
  event: H3Event
}

export interface Species {
  id: number
  name: string
  flavor_text: string
  base_stats: Record<string, unknown>
  evo_chain: number[]
  types: Type[]
  sprites: SpeciesSprites
  moves: SpeciesMove[]
}

export interface SpeciesSprites {
  front: string
  back: string
}

export interface SpeciesMove {
  learned_at: number
  method: string
  name: string
}

export interface Move {
  name: string
  power: number | null
  accuracy: number | null
  pp: number
  type: Type
}

export type Type =
  | 'grass'
  | 'poison'
  | 'fire'
  | 'flying'
  | 'water'
  | 'bug'
  | 'normal'
  | 'electric'
  | 'ground'
  | 'fairy'
  | 'fighting'
  | 'psychic'
  | 'rock'
  | 'steel'
  | 'ice'
  | 'ghost'
  | 'dragon'
  | 'dark'
