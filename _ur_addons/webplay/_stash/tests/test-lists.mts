/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  TESTER for LISTS

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { expect, test } from 'vitest';
import type { UR_Item } from '~ur/types/ursys.d.ts';
import { ListManager, GetItemLists } from '../lib/class-data-itemlist.ts';

/// TESTS /////////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const LISTS = new ListManager();

test('instantiation', () => {
  expect(LISTS).toBeDefined();
  expect(LISTS).toBeInstanceOf(ListManager);
});

test('list creation', () => {
  // there should be no lists
  expect(GetItemLists()).toMatchObject([]);
  // list doesn't exist
  expect(() => LISTS.listRead('mylist')).toThrowError();
  // create a list is empty
  expect(LISTS.createItemList('mylist')).toMatchObject([]);
});

test('list item by-ref or value', () => {
  const items: UR_Item[] = [
    { _id: '1', name: 'item1' }, //
    { _id: '2', name: 'item2' }
  ];
  expect(LISTS.createItemList('refList')).toMatchObject([]);
  expect(LISTS.listAdd('refList', items)).toMatchObject(items);
  const refListItems = LISTS.listRead('refList');
  expect(refListItems).not.toBe(items);
});

test('list add,read', () => {
  // undefined list should throw an error
  expect(() => LISTS.listRead('anotherlist')).toThrowError();
  const items = [
    { _id: '1', name: 'item1' }, //
    { _id: '2', name: 'item2' }
  ];
  // listAdd will add items to the list and return the list
  expect(LISTS.listAdd('mylist', items)).toMatchObject(items);
  // listRead will return the list
  const results = LISTS.listRead('mylist');
  expect(results).toMatchObject(items);
  // listRead by custom order
  expect(LISTS.listRead('mylist', ['2', '1'])).toMatchObject([
    { _id: '2', name: 'item2' },
    { _id: '1', name: 'item1' }
  ]);
});

test('list update', () => {
  // empty items means nothing for update
  expect(() => LISTS.listUpdate('mylist', [])).toThrowError();
  // items that aren't in mylist should throw an error
  expect(() =>
    LISTS.listUpdate('mylist', [
      { _id: '3', name: 'item3' },
      { _id: '1', name: 'item1' }
    ])
  ).toThrowError();
  // updating the list shoudld return the updated list
  expect(
    LISTS.listUpdate('mylist', [
      { _id: '1', name: 'item1-changed' },
      { _id: '2', name: 'item2-changed' }
    ])
  ).toMatchObject([
    { _id: '1', name: 'item1-changed' },
    { _id: '2', name: 'item2-changed' }
  ]);
  // reading the list should return the updated list
  expect(LISTS.listRead('mylist')).toMatchObject([
    { _id: '1', name: 'item1-changed' },
    { _id: '2', name: 'item2-changed' }
  ]);
  // adding an item to the list
  const updated = LISTS.listUpdate('mylist', [{ _id: '1', mood: 'happy' }]);
  expect(updated).toMatchObject([
    { _id: '1', name: 'item1-changed', mood: 'happy' },
    { _id: '2', name: 'item2-changed' }
  ]);
});

test('list replace', () => {
  const origItems = LISTS.listRead('mylist');
  const newItems = [
    {
      _id: '1',
      animal: 'dog',
      color: 'brown'
    },
    {
      _id: '2',
      animal: 'cat',
      color: 'black'
    },
    {
      _id: '12',
      animal: 'bird',
      color: 'yellow'
    }
  ];
  // if an id doesn't exist, it should throw an error
  expect(() => LISTS.listReplace('mylist', newItems)).toThrowError();
  // even though an error was thrown, the list will have been
  // partially updated, so we can check that
  newItems.splice(2, 1); // remove the item that doesn't exist
  expect(LISTS.listRead('mylist')).toMatchObject(newItems);
  // replace the list with origItems items
  const replaced = LISTS.listReplace('mylist', origItems);
  // the list should be replaced completed
  expect(replaced).not.toMatchObject(origItems);
  expect(replaced[0].animal).toBe('dog');
  expect(LISTS.listRead('mylist')[0].animal).not.toBe('dog');
  expect(LISTS.listRead('mylist')[1].name).toBe('item2-changed');
  // the list should be back to the original items
});

test('list delete', () => {
  // test delete
  const startingList = LISTS.listRead('mylist');
  const listInstance = LISTS.getItemList('mylist');
  const ids_to_delete = ['1', '2'];
  const deleted = LISTS.listDelete('mylist', ids_to_delete);
  const endingList = LISTS.listRead('mylist');
  expect(deleted).toMatchObject(startingList);
  expect(endingList).toMatchObject([]);
  expect(LISTS.getItemList('mylist')).toBe(listInstance);
});
