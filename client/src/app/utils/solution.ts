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