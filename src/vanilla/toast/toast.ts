type ToastType = 'success' | 'error';
type Vertical = 'top' | 'bottom';
type Horizontal = 'left' | 'right';
type Position = `${Vertical}-${Horizontal}`;
type ToastOptions = {
  type: ToastType;
  title: string;
  desc: string;
  duration: number;
  position?: Position;
};
type ToastData = {
  options: ToastOptions;
  timerId: number | null;
  id: string;
  ele: HTMLElement;
};
class ToastManager {
  toastMap: Map<string, ToastData>;
  containers: Partial<Record<Position, HTMLElement>>;
  constructor() {
    this.toastMap = new Map<string, ToastData>();
    // const container = document.createElement('div');
    // container.id = 'toast-container';
    this.containers = {};
    // document.body.appendChild(container);
  }
  initializeContainer(position: Position = 'top-right') {
    this.containers[position] = document.createElement('div');
    this.containers[position].classList.add('toast-container');
    this.containers[position].classList.add(position);
    document.body.appendChild(this.containers[position]);
  }
  createToast(options: ToastOptions) {
    const toastPosition = options.position || 'top-right';
    if (!this.containers[toastPosition]) {
      this.initializeContainer(toastPosition);
    }
    const toastId = `toast-${Date.now()}`;
    const toast: ToastData = {
      options: { ...options, position: toastPosition },
      timerId: null,
      id: toastId,
      ele: this.createDOM({ ...options, position: toastPosition }, toastId),
    };

    this.containers[toastPosition]?.appendChild(toast.ele);

    this.toastMap.set(toastId, toast);
    toast.timerId = setTimeout(() => {
      this.removeToast(toastId);
    }, options.duration);
    return toastId;
  }

  removeToast(id: string) {
    const toastItem = this.toastMap.get(id);
    if (toastItem) {
      toastItem.ele.addEventListener('animationend', (e) => {
        if (e.target === toastItem.ele) {
          toastItem.ele.remove();
        }
      });
      toastItem.ele.style.animationName = `leave-${toastItem.options.position}`;
      if (toastItem.timerId) clearTimeout(toastItem.timerId);
      this.toastMap.delete(id);
    }
  }
  createDOM(toast: Required<ToastOptions>, id: string) {
    const toastContainer = document.createElement('div');

    if (toast.type === 'error') {
      toastContainer.setAttribute('role', 'alert');
      toastContainer.setAttribute('aria-live', 'assertive');
    } else {
      toastContainer.setAttribute('role', 'status');
      toastContainer.setAttribute('aria-live', 'polite');
    }
    toastContainer.setAttribute('aria-atomic', 'true');
    toastContainer.classList.add('toast');
    toastContainer.classList.add(toast.type);
    toastContainer.style.animationName = toast.position;

    const removeBtnId = `${id}-remove-icon`;
    toastContainer.innerHTML = `
      <div class="title"></div>
      <div class="desc"></div>
      <div class="progress">
       
      </div>
      <button id="${removeBtnId}" aria-label="close toast" class="remove-icon">X</button>
    `;
    const title = toastContainer.querySelector<HTMLDivElement>('.title');
    const desc = toastContainer.querySelector<HTMLDivElement>('.desc');
    const progress = toastContainer.querySelector<HTMLDivElement>('.progress');
    if (title) title.innerText = toast.title;
    if (desc) desc.innerText = toast.desc;
    if (progress)
      progress.style.animationDuration = `${Math.round(toast.duration / 1000)}s`;
    toastContainer
      .querySelector(`#${removeBtnId}`)
      ?.addEventListener('click', () => {
        this.removeToast(id);
      });

    return toastContainer;
  }
}

const toastManager = new ToastManager();

export function toast(options: ToastOptions) {
  return toastManager.createToast(options);
}
toast.success = (options: Omit<ToastOptions, 'type'>) =>
  toastManager.createToast({ ...options, type: 'success' });

toast.error = (options: Omit<ToastOptions, 'type'>) =>
  toastManager.createToast({ ...options, type: 'error' });
toast.dismiss = (id: string) => toastManager.removeToast(id);
