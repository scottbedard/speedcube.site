import { identity } from 'lodash-es';

/**
 * Solution nodes
 */
type SolutionNode = {
  timestamp: number,
  type: 'event' | 'turn',
  value: string,
}

/**
 * Solution
 */
export class Solution {
  nodes: SolutionNode[] = [];

  /**
   * Constructor
   */
  constructor(solution?: string) {
    if (solution) {
      this.apply(solution)
    }
  }
  
  /**
   * Add an event
   */
  addEvent(value: string, timestamp: number) {
    const type = 'event'

    this.nodes.push({ timestamp, type, value })
  }

  /**
   * Add a turn
   */
  addTurn(value: string, timestamp: number) {
    const type = 'turn'

    this.nodes.push({ timestamp, type, value })
  }

  /**
   * Apply state from a string
   */
  apply(str: string) {
    this.nodes = str.split(' ')
      .map(str => str.trim())
      .filter(identity)
      .map(str => {
        // event
        if (str.includes('#')) {
          const [timestamp, value] = str.split('#')

          return {
            timestamp: Number(timestamp),
            type: 'event',
            value,
          }
        }

        // turn
        if (str.includes(':')) {
          const [timestamp, value] = str.split(':')

          return {
            timestamp: Number(timestamp),
            type: 'turn',
            value,
          }
        }

        throw `Invalid node: ${str}`
      })
  }

  /**
   * Clear the solution
   */
  reset() {
    this.nodes.length = 0
  }

  /**
   * Stringify the solution
   */
  toString() {
    return this.nodes.map(node => {
      if (node.type === 'event') {
        return `${node.timestamp}#${node.value}`
      }

      if (node.type === 'turn') {
        return `${node.timestamp}:${node.value}`
      }

      return ''
    }).join(' ')
  }
}