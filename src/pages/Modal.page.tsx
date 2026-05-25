import { useState } from 'react';
import Modal from '../components/Modal/Modal';

export function ModalPage() {
  const [open, setOpen] = useState(false);
  const [dynamicBtn, setDynamicBtn] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>open modal</button>
      <Modal open={open} onClose={() => setOpen(false)} title='Are you sure?'>
        <button onClick={() => setDynamicBtn((prev) => !prev)}>
          click to get
        </button>
        {dynamicBtn ? <input placeholder='dynamic' /> : null}
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem
          laborum nam beatae mollitia, voluptates eum molestias unde dignissimos
          rem nemo quas numquam inventore adipisci, laboriosam odio blanditiis
          dicta harum, odit consequatur modi! Magnam voluptatibus voluptates
          minus ullam magni esse aperiam molestiae quas, nulla labore beatae
          suscipit error hic fugit culpa tempore numquam? Quae commodi ipsum
          corrupti fugiat molestias, vitae odio illo ab, eius laboriosam culpa
          ut dolores maiores similique explicabo veniam, quod cum nam vel eum
          nisi. Impedit temporibus, quae omnis vero mollitia voluptatem quo odio
          amet culpa, dicta fugit eum nisi animi numquam dolores, sunt corrupti
          doloremque adipisci magni.
        </p>
        <input placeholder='your name' />
        <div className='flex flex-row-reverse w-full'>
          <button tabIndex={-1}>cancel</button>
          <button>save</button>
        </div>
      </Modal>
    </>
  );
}
