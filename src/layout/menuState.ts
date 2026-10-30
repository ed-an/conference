export type MenuAction = 'toggle' | 'navigate' | 'escape'

export function menuOpenReducer(menuOpen: boolean, action: MenuAction) {
  return action === 'toggle' ? !menuOpen : false
}
