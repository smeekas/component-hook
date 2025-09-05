import { useLayoutEffect } from 'react';
import { attach } from '../components/Tooltip/vanillaTooltip';
import '../components/Tooltip/tooltip.css';
export const TooltipPage = () => {
  useLayoutEffect(() => {
    attach();
  }, []);

  return (
    <div>
      <button data-tooltip data-tooltip-value='click to go' data-follow-cursor>
        hello there hello there hello there hello there
      </button>
      <div data-tooltip data-tooltip-value='dummy text'>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda, et.
      </div>

      <div
        className='h-10 overflow-scroll bg-blue-100'
        data-tooltip
        data-tooltip-value='tool'
        data-follow-cursor
      >
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti
        numquam laudantium porro nam illo illum unde voluptatem quis! Nulla
        beatae corporis, pariatur minima cumque distinctio ipsam quod aperiam
        deserunt amet iusto vel veritatis? Quae cum modi at perferendis ipsam
        possimus in a ab, accusantium, doloribus itaque fuga earum assumenda
        quisquam quo facilis commodi odit ea perspiciatis eum corporis quam
        nobis quia. Pariatur possimus in expedita accusantium placeat alias
        natus laborum! Possimus in fugit odit ea veniam consectetur iusto
        aliquid eaque obcaecati! Dolores exercitationem ipsam, autem quibusdam
        porro quas quae, deserunt aperiam eaque natus cupiditate vitae modi cum
        molestias eum unde?
      </div>
    </div>
  );
};
