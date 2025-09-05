export function attach() {
  document.querySelectorAll('*[data-tooltip="true"]').forEach((ele) => {
    if (!(ele instanceof HTMLElement)) return;
    const tooltipValue = ele.dataset['tooltipValue'] || '';
    const shouldFollow = !!ele.dataset['followCursor'] || false;

    showTooltip(ele, tooltipValue, shouldFollow);
  });
}

function showTooltip(ele: HTMLElement, value: string, shouldFollow: boolean) {
  let mouseEntered = false;
  let tooltipEle: null | HTMLElement = null;
  function mouseEnterHandler(e: MouseEvent) {
    const { target } = e;
    mouseEntered = true;
    if (!(target instanceof HTMLElement)) return;

    tooltipEle = createTooltip(value);
    const { left, height, y, width } = target.getBoundingClientRect();
    if (ele.querySelector('.tooltip')) return; // if tooltip already exists then ignore it
    ele.appendChild(tooltipEle); //append first to get it's dimension
    const { width: ww } = tooltipEle.getBoundingClientRect();
    /**
     * left => left most boundary
     * left + width/2 => start from middle of target element
     * left + width/2 - ww/2 => pull tooltip 50% left side to make it aligned in center
     */
    tooltipEle.style.setProperty('left', `${left + width / 2 - ww / 2}px`);

    /**
     * y => top of target
     * y + height => bottom of target
     */
    tooltipEle.style.setProperty('top', `${y + height}px`);
  }
  function mouseLeaveHandler() {
    mouseEntered = false;
    ele.querySelector('.tooltip')?.remove();
  }
  function mouseMoveHandler(e: MouseEvent) {
    if (mouseEntered) {
      // if we have entered the mouse
      const { pageX, pageY } = e;
      if (tooltipEle) {
        const { width: ww, height } = tooltipEle.getBoundingClientRect();
        /**
         * pageX => cursor's x
         * pageX - ww/2=> align tooltip in center horizontally
         */
        tooltipEle?.style.setProperty('left', `${pageX - ww / 2}px`);
        /**
         * pageY=> cursor's Y
         * pageY + height => show tooptip below cursor
         */
        tooltipEle?.style.setProperty('top', `${pageY + height}px`);
      }
    }
  }
  ele.addEventListener('mouseenter', mouseEnterHandler);
  if (shouldFollow) {
    ele.addEventListener('mousemove', mouseMoveHandler);
  }
  ele.addEventListener('mouseleave', mouseLeaveHandler);
}

function createTooltip(value: string) {
  const tooltipNode = document.createElement('div');
  tooltipNode.classList.add('tooltip');
  tooltipNode.innerText = value;
  return tooltipNode;
}
