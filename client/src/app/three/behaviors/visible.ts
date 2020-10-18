interface Hideable {
  visible: boolean
}

/**
 * Visible
 */
export function useVisible(obj: Hideable, visible: () => boolean) {
  obj.visible = visible()
}
