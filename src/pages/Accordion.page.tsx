import Accordion from '../components/Accordion/Accordion';

function AccordionPage() {
  return (
    <Accordion defaultOpen='a-2'>
      <Accordion.Item value='a-1'>
        <Accordion.Control>accordion 1</Accordion.Control>
        <Accordion.Panel>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
          quaerat dicta commodi hic quod quos omnis necessitatibus? Rem, eaque
          inventore!
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item disabled value='a-2'>
        <Accordion.Control>accordion 2</Accordion.Control>
        <Accordion.Panel>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet non,
          autem accusantium veniam quo voluptates perferendis incidunt
          voluptatum eius amet esse maiores. Natus, fuga similique culpa
          deserunt accusamus modi distinctio.
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value='a-3'>
        <Accordion.Control>accordion 3</Accordion.Control>
        <Accordion.Panel>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
          laborum libero nam sit accusamus suscipit commodi quia corrupti optio
          exercitationem iure ducimus asperiores cupiditate nesciunt aperiam vel
          perspiciatis neque, esse maxime, itaque eum nemo ea natus dolor?
          Fugiat aperiam optio commodi explicabo. Delectus reprehenderit saepe
          libero cumque suscipit molestiae eaque perferendis tempore sapiente
          provident natus, ratione repudiandae error! Iste nostrum voluptatum
          doloremque quasi ullam magni, rerum eaque, qui nemo voluptates, unde
          rem in aut nihil. Praesentium corporis perferendis eligendi adipisci
          in veniam. Molestiae sed qui quod in labore veritatis fuga alias
          ratione deleniti quidem ipsa, nostrum possimus dolore fugit impedit!
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}

export default AccordionPage;
