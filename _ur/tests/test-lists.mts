/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  TESTER for DATA

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { expect, test } from 'vitest';
import { Dataset } from '../common/class-data-dataset.ts';
import type { UR_NewItem } from '../_types/dataset.ts';

/// TESTS /////////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const dummyDSID = 'org:schema/bucket/group:vars`';
const DATA = new Dataset(dummyDSID);

test('instantiation', () => {
  expect(DATA).toBeDefined();
  expect(DATA).toBeInstanceOf(Dataset);
});

test('list creation', () => {
  // there should be no lists
  const list = DATA.createItemList('mylist', { idPrefix: 'li' });
  expect(list.get()).toMatchObject([]);
});

test('list item by-ref or value', () => {
  const items: UR_NewItem[] = [
    { name: 'item1' }, //
    { name: 'item2' }
  ];
  const list = DATA.createItemList('refList', { idPrefix: 'li' });
  expect(list.read()).toMatchObject({ items: [] });
  expect(list.add(items)).toMatchObject({ added: [...items] });
  const refListItems = list.read();
  expect(refListItems).not.toBe(items);
});

test('list add,read', () => {
  // undefined list should throw an error
  expect(() => DATA.getItemList('anotherlist')).toThrowError();
  const items = [
    { name: 'item1' }, //
    { name: 'item2' }
  ];
  // listAdd will add items to the list and return the list
  const list = DATA.getItemList('mylist');
  const { added } = list.add(items);
  expect(items).not.toMatchObject(added); // checks that added objects are subset of items
  // listRead will return the list
  const { items: results } = list.read();
  expect(added).toMatchObject(results);
  // listRead by custom order
  const { items: results2 } = list.read(['li002', 'li001']);
  expect(results2).toMatchObject([
    { _id: 'li002', name: 'item2' },
    { _id: 'li001', name: 'item1' }
  ]);
});

test('list update', () => {
  // empty items means nothing for update
  const list = DATA.getItemList('mylist');
  let result = list.update([]);
  expect(result.updated).toBeUndefined();
  expect(result.error).toBeDefined();
  // items that aren't in mylist should throw an error
  result = list.update([
    { _id: 'li003', name: 'item3' },
    { _id: 'li001', name: 'item1' }
  ]);
  expect(result.updated).toBeUndefined();
  expect(result.error).toBeDefined();
  // // updating the list shoudld return the updated list
  expect(
    list.update([
      { _id: 'li001', name: 'item1-changed' },
      { _id: 'li002', name: 'item2-changed' }
    ])
  ).toMatchObject({
    updated: [
      { _id: 'li001', name: 'item1-changed' },
      { _id: 'li002', name: 'item2-changed' }
    ]
  });
  // reading the list should return the updated list
  expect(list.read()).toMatchObject({
    items: [
      { _id: 'li001', name: 'item1-changed' },
      { _id: 'li002', name: 'item2-changed' }
    ]
  });
  // // adding an item to the list
  const updated = list.update([{ _id: 'li001', mood: 'happy' }]);
  expect(updated).toMatchObject({
    updated: [
      { _id: 'li001', name: 'item1-changed', mood: 'happy' },
      { _id: 'li002', name: 'item2-changed' }
    ]
  });
});

test('list replace', () => {
  const list = DATA.getItemList('mylist');
  const { items: origItems } = list.read();
  const newItems = [
    {
      _id: 'li001',
      animal: 'dog',
      color: 'brown'
    },
    {
      _id: 'li002',
      animal: 'cat',
      color: 'black'
    },
    {
      _id: 'li012',
      animal: 'bird',
      color: 'yellow'
    }
  ];
  // if an id doesn't exist, it should throw an error
  expect(list.replace(newItems)).toMatchObject({
    error: 'replace: 1 items not found in mylist'
  });
  // even though an error was thrown, the list will have been
  // partially updated, so we can check that
  newItems.splice(2, 1); // remove the item that doesn't exist
  expect(list.read()).toMatchObject({ items: newItems });
  // replace the list with origItems items
  const { replaced } = list.replace(origItems);
  // the list should be replaced completed
  expect(replaced).not.toMatchObject(origItems);
  expect(replaced[0].animal).toBe('dog');
  expect(list.read().items[0].animal).not.toBe('dog');
  expect(list.read().items[1].name).toBe('item2-changed');
  // the list should be back to the original items
});

test('list delete', () => {
  // test delete
  const list = DATA.getItemList('mylist');
  const { items: startingList } = list.read();
  const ids_to_delete = ['li001', 'li002'];
  const { deleted } = list.deleteIDs(ids_to_delete);
  const { items: endingList } = list.read();
  // console.log('deleted', deleted);
  // console.log('startingList', startingList);
  // console.log('endingList', endingList);
  expect(deleted).toMatchObject(startingList);
  expect(endingList).toMatchObject([]);
  const listInstance = DATA.getItemList('mylist');
  expect(DATA.getItemList('mylist')).toBe(listInstance);
});
