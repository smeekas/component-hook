import { NestedCheckboxes } from "../components/NestedCheckboxes/NestedCheckboxes";
import { CheckboxList } from "../components/NestedCheckboxes/NestedCheckboxes.types";

export function NestedChekboxesPage() {
  const defaultCheckboxes: CheckboxList = [
    {
      id: 1,
      name: "electronics",
      children: [
        {
          id: 2,
          name: "mobiles",
          children: [
            {
              id: 4,
              name: "android",
              children: [
                {
                  id: 10,
                  name: "samsung",
                },
                {
                  id: 11,
                  name: "google",
                },
              ],
            },
            {
              id: 5,
              name: "apple",
            },
          ],
        },
        {
          id: 3,
          name: "laptops",
        },
      ],
    },
    {
      id: 6,
      name: "Books",
      children: [{ id: 7, name: "Fiction" }],
    },
    {
      id: 8,
      name: "Toys",
    },
  ];
  return <NestedCheckboxes checkboxes={defaultCheckboxes} />;
}
