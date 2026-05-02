import { useState } from 'react';
import Tooltip from '../components/Tooltip/Tooltip';

export function ReactTooltipPage() {
  const [state, setState] = useState(false);

  return (
    <>
      <Tooltip title='toggle now' open position='left-start'>
        <button onClick={() => setState((prev) => !prev)}>
          toggle element
        </button>
      </Tooltip>
      {state && (
        <Tooltip
          title={
            <>
              <div>hello there!</div>
              <h5>awesome!</h5>
            </>
          }
          follow
        >
          <div data-tooltip data-tooltip-value='hello'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea fugiat
            molestias esse sequi aspernatur magnam alias dignissimos beatae,
            accusantium expedita impedit nihil deleniti eum unde, est ex,
            facilis eveniet necessitatibus.
          </div>
        </Tooltip>
      )}
      <br />
      <Tooltip title='nice content huh' position='left-center'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo ipsam
        corrupti facere! Reiciendis autem dolores voluptatum expedita dolorum
        neque ipsam, fuga sed quas eaque quaerat. Molestiae amet odio totam
        repellendus necessitatibus sint voluptatum nostrum expedita incidunt
        ipsum mollitia possimus minus dicta optio reprehenderit reiciendis
        praesentium repellat, itaque quis a perspiciatis. Sunt velit nam, autem
        perferendis nisi quia eum alias dolorum inventore, consequuntur
        similique perspiciatis blanditiis aliquid cumque suscipit, sit voluptate
        nemo eius! Temporibus commodi, mollitia non aliquam odio blanditiis
        doloremque voluptates quis, fugit corrupti id nesciunt in alias deserunt
        nisi esse placeat iure accusamus amet architecto, perspiciatis enim.
        Impedit, eaque?
      </Tooltip>
    </>
  );
}
