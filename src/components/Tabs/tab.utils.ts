export function getTabPanelId(id: string, componentId: string) {
  return `${componentId}tabpanel-${id}`.replace(':', '');
}
export function getTabBtnId(id: string, componentId: string) {
  return `${componentId}tab-button-${id}`.replace(':', '');
}
