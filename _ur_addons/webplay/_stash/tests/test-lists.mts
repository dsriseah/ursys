/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  TESTER for LISTS

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { expect, test } from 'vitest';
import * as SVC from '../srv-comments.mts';

/// TESTS /////////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
test('list creation', () => {
  // module initialized
  expect(SVC).toBeDefined();
  // there should be no lists
  expect(SVC.GetListInstances()).toMatchObject([]);
  // list doesn't exist
  expect(() => SVC.ListRead('mylist')).toThrowError();
  // create a list is empty
  expect(SVC.CreateListInstance('mylist')).toMatchObject([]);
});

test('list item by-ref or value', () => {
  const items = [
    { _id: '1', name: 'item1' }, //
    { _id: '2', name: 'item2' }
  ];
  expect(SVC.CreateListInstance('refList')).toMatchObject([]);
  expect(SVC.ListAdd('refList', items)).toMatchObject(items);
  const refListItems = SVC.ListRead('refList');
  expect(refListItems).not.toBe(items);
});

test('list add,read', () => {
  // undefined list should throw an error
  expect(() => SVC.ListRead('anotherlist')).toThrowError();
  const items = [
    { _id: '1', name: 'item1' }, //
    { _id: '2', name: 'item2' }
  ];
  // ListAdd will add items to the list and return the list
  expect(SVC.ListAdd('mylist', items)).toMatchObject(items);
  // ListRead will return the list
  const results = SVC.ListRead('mylist');
  expect(results).toMatchObject(items);
});

test('list update', () => {
  // empty items means nothing for update
  expect(() => SVC.ListUpdate('mylist', [])).toThrowError();
  // items that aren't in mylist should throw an error
  expect(() =>
    SVC.ListUpdate('mylist', [
      { _id: '3', name: 'item3' },
      { _id: '1', name: 'item1' }
    ])
  ).toThrowError();
  // updating the list shoudld return the updated list
  expect(
    SVC.ListUpdate('mylist', [
      { _id: '1', name: 'item1-changed' },
      { _id: '2', name: 'item2-changed' }
    ])
  ).toMatchObject([
    { _id: '1', name: 'item1-changed' },
    { _id: '2', name: 'item2-changed' }
  ]);
  // reading the list should return the updated list
  expect(SVC.ListRead('mylist')).toMatchObject([
    { _id: '1', name: 'item1-changed' },
    { _id: '2', name: 'item2-changed' }
  ]);
  // adding an item to the list
  const updated = SVC.ListUpdate('mylist', [{ _id: '1', mood: 'happy' }]);
  expect(updated).toMatchObject([
    { _id: '1', name: 'item1-changed', mood: 'happy' },
    { _id: '2', name: 'item2-changed' }
  ]);
});

test('list replace', () => {
  const origItems = SVC.ListRead('mylist');
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
  expect(() => SVC.ListReplace('mylist', newItems)).toThrowError();
  // even though an error was thrown, the list will have been
  // partially updated, so we can check that
  newItems.splice(2, 1); // remove the item that doesn't exist
  expect(SVC.ListRead('mylist')).toMatchObject(newItems);
  // replace the list with origItems items
  const replaced = SVC.ListReplace('mylist', origItems);
  // the list should be replaced completed
  expect(replaced).not.toMatchObject(origItems);
  expect(replaced[0].animal).toBe('dog');
  expect(SVC.ListRead('mylist')[0].animal).not.toBe('dog');
  expect(SVC.ListRead('mylist')[1].name).toBe('item2-changed');
  // the list should be back to the original items
});

test('list delete', () => {
  // test delete
  const startingList = SVC.ListRead('mylist');
  const listInstance = SVC.GetListInstance('mylist');
  const ids_to_delete = ['1', '2'];
  const deleted = SVC.ListDelete('mylist', ids_to_delete);
  const endingList = SVC.ListRead('mylist');
  expect(deleted).toMatchObject(startingList);
  expect(endingList).toMatchObject([]);
  expect(SVC.GetListInstance('mylist')).toBe(listInstance);
});
