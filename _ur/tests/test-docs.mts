/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  TESTER for DOCUMENTS

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { expect, test } from 'vitest';
import { ItemDict } from '../common/class-data-itemdict-old.ts';
import type { UR_Doc } from '../_types/dataset.js';

/// TESTS /////////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const DOCS = new ItemDict();

test('instantiation', () => {
  expect(DOCS).toBeDefined();
  expect(DOCS).toBeInstanceOf(ItemDict);
});

test('document creation', () => {
  // there should be no folders
  expect(DOCS.docFoldersGetAll()).toMatchObject([]);
  // doc doesn't exist
  expect(() => DOCS.docsRead('myfolder')).toThrowError();
  // create a doc is empty
  expect(DOCS.createDocFolder('myfolder')).toMatchObject({});
});

test('document item by-ref or value', () => {
  const doc: UR_Doc = { _id: '1', name: 'doc1' };
  expect(DOCS.createDocFolder('ref_folder')).toMatchObject({});
  expect(DOCS.docAdd('ref_folder', doc)).toMatchObject(doc);
  const refDoc = DOCS.docRead('ref_folder', '1');
  expect(refDoc).not.toBe(doc); // not a reference
  expect(refDoc).toMatchObject(doc); //
});

test('document add,read', () => {
  // undefined doc should throw an error
  expect(() => DOCS.docsRead('anotherFolder')).toThrowError();
  const docs: UR_Doc[] = [
    { _id: 'settings', background: 'black' },
    { _id: 'strings', title: 'the best' },
    { _id: '1', name: 'item1' },
    { _id: '2', name: 'item2' }
  ];
  // docAdd will add items to the doc and return the doc
  expect(DOCS.docsAdd('myfolder', docs)).toMatchObject(docs);
  // docRead will return the doc
  const results = DOCS.docRead('myfolder', 'strings');
  expect(results).toMatchObject(docs[1]);
  // docRead by custom order
  expect(DOCS.docsRead('myfolder', ['2', '1'])).toMatchObject([
    { _id: '2', name: 'item2' },
    { _id: '1', name: 'item1' }
  ]);
});

test('document update', () => {
  // empty items means nothing for update
  // @ts-expect-error
  expect(() => DOCS.docUpdate('myfolder')).toThrowError();
  expect(() => DOCS.docUpdate('myfolder', '3')).toThrowError();
  expect(() => DOCS.docUpdate('myfolder', {})).toThrowError();
  // items that aren't in myfolder should throw an error
  expect(() =>
    DOCS.docUpdate('myfolder', { _id: '3', name: 'item3' })
  ).toThrowError();
  // docUpdate has different args that docsUpdate
  expect(() =>
    DOCS.docUpdate('myfolder', [
      { _id: '1', name: 'item1-changed' },
      { _id: '2', name: 'item2-changed' }
    ])
  ).toThrowError();
  // updating the doc shoudld return the updated doc
  expect(
    DOCS.docsUpdate('myfolder', [
      { _id: '1', name: 'item1-changed' },
      { _id: '2', name: 'item2-changed' }
    ])
  ).toMatchObject([
    { _id: '1', name: 'item1-changed' },
    { _id: '2', name: 'item2-changed' }
  ]);
  // reading the doc should return the updated doc
  // note that this order is dependent on how items
  // were added and removed, so don't count on this
  expect(DOCS.docsRead('myfolder')).toMatchObject([
    { _id: '1', name: 'item1-changed' },
    { _id: '2', name: 'item2-changed' },
    { _id: 'settings', background: 'black' },
    { _id: 'strings', title: 'the best' }
  ]);
  // adding an item to the doc
  const updated = DOCS.docUpdate('myfolder', { _id: '1', mood: 'happy' });
  expect(updated).toMatchObject({ _id: '1', name: 'item1-changed', mood: 'happy' });
});

test('document replace', () => {
  const origItems = DOCS.docsRead('myfolder');
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
  expect(() => DOCS.docsReplace('myfolder', newItems)).toThrowError();
  // even though an error was thrown, the doc will have been
  // partially updated, so we can check that
  newItems.splice(2, 1); // remove item 12
  expect(DOCS.docsRead('myfolder')).toMatchObject([
    { animal: 'dog', color: 'brown', _id: '1' },
    { animal: 'cat', color: 'black', _id: '2' },
    { background: 'black', _id: 'settings' },
    { title: 'the best', _id: 'strings' }
  ]);
  // replace the doc with origItems items
  const replaced = DOCS.docsReplace('myfolder', origItems);
  // the doc should be replaced completed
  expect(replaced).not.toMatchObject(origItems);
  expect(replaced[0].animal).toBe('dog');
  expect(DOCS.docsRead('myfolder')[0].animal).not.toBe('dog');
  expect(DOCS.docsRead('myfolder')[1].name).toBe('item2-changed');
  // the doc should be back to the original items
});

// test('document delete', () => {
//   // test delete
//   const startingList = DOCS.docRead('myfolder');
//   const listInstance = DOCS.getDoc('myfolder');
//   const ids_to_delete = ['1', '2'];
//   const deleted = DOCS.docDelete('myfolder', ids_to_delete);
//   const endingList = DOCS.docRead('myfolder');
//   expect(deleted).toMatchObject(startingList);
//   expect(endingList).toMatchObject([]);
//   expect(DOCS.getDoc('myfolder')).toBe(listInstance);
// });
