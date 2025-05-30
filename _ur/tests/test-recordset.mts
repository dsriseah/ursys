/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  TESTER for RECORDSET

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { expect, test } from 'vitest';
import { RecordSet } from '../lib/class-data-recordset.js';

/// TYPE IMPORTS & DEFINITIONS ////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import type { UR_Item } from '../_types/dataset.js';

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const items: UR_Item[] = [
  { _id: '1', name: 'Zack', age: 10 }, //
  { _id: '2', name: 'Mildred', age: 30 },
  { _id: '3', name: 'Alice', age: 20 },
  { _id: '4', name: 'Bob', age: 40 }
];

/// TESTS /////////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
test('initialize', () => {
  const rs = new RecordSet(items);
  // check that the values match the original
  expect(rs.getItems()).toEqual(items);
  expect(rs.getSrcItems()).toEqual(items);
  // check that items is a copy of the original, not reference
  expect(rs.getItems()).not.toBe(items);
  // check that items() always returns a new copy
  expect(rs.getItems()).not.toBe(rs.getItems());
  // check that all UR_Item in the recordset is a copy of the original, not reference
  rs.getItems().forEach((item, index) => {
    expect(item).not.toBe(items[index]);
  });
});

test('sort', () => {
  const rs = new RecordSet(items);
  rs.sort({ sortBy: { name: 'sort_asc' } });
  expect(rs.getItems()).toMatchObject([
    { _id: '3', name: 'Alice', age: 20 },
    { _id: '4', name: 'Bob', age: 40 },
    { _id: '2', name: 'Mildred', age: 30 },
    { _id: '1', name: 'Zack', age: 10 }
  ]);
  rs.sort({ sortBy: { name: 'sort_desc' } });
  expect(rs.getItems()).toMatchObject([
    { _id: '1', name: 'Zack', age: 10 },
    { _id: '2', name: 'Mildred', age: 30 },
    { _id: '4', name: 'Bob', age: 40 },
    { _id: '3', name: 'Alice', age: 20 }
  ]);
  rs.sort({ sortBy: { age: 'sort_desc' } });
  expect(rs.getItems()).toMatchObject([
    { _id: '4', name: 'Bob', age: 40 },
    { _id: '2', name: 'Mildred', age: 30 },
    { _id: '3', name: 'Alice', age: 20 },
    { _id: '1', name: 'Zack', age: 10 }
  ]);
});

test('derived format and fields', () => {
  const rs = new RecordSet(items);
  rs.format({
    includeFields: ['name'],
    transformBy: { name: item => (item.name = item.name.toUpperCase()) }
  });
  expect(rs.getItems()).toMatchObject([
    { name: 'ZACK' },
    { name: 'MILDRED' },
    { name: 'ALICE' },
    { name: 'BOB' }
  ]);
});

test('stat summaries', () => {
  const rs = new RecordSet(items);
  rs.analyze({
    groupBy: {
      'gen-z': items => items.filter(item => item.age < 21),
      'xenniels': items => items.filter(item => item.age >= 21 && item.age < 41),
      'gen-x': items => items.filter(item => item.age > 39)
    },
    statTests: {
      'count': items => items.length,
      'avg-age': items =>
        items.reduce((acc, item) => acc + item.age, 0) / items.length
    }
  });
  // check stats against a subset of matches
  expect(rs.getStats('count')).toBe(4);
  expect(rs.getStats('avg-age')).toBe(25);
  expect(rs.getStats('gen-z')).toMatchObject([
    { _id: '1', name: 'Zack', age: 10 },
    { _id: '3', name: 'Alice', age: 20 }
  ]);
  expect(rs.getStats('xenniels')).toMatchObject([
    { _id: '2', name: 'Mildred', age: 30 },
    { _id: '4', name: 'Bob', age: 40 }
  ]);
});

test('paginate', () => {
  const rs = new RecordSet(items);
  // set up pages of 3 items each
  expect(rs.paginate(3)).instanceOf(RecordSet);
  // check first page
  expect(rs.getPage()).toMatchObject([
    { _id: '1', name: 'Zack', age: 10 },
    { _id: '2', name: 'Mildred', age: 30 },
    { _id: '3', name: 'Alice', age: 20 }
  ]);
  expect(rs.getPageIndex()).toBe(1);
  // check the next page
  expect(rs.nextPage().getPage()).toMatchObject([{ _id: '4', name: 'Bob', age: 40 }]);
  // check the previous page
  expect(rs.prevPage().getPage()).toMatchObject([
    { _id: '1', name: 'Zack', age: 10 },
    { _id: '2', name: 'Mildred', age: 30 },
    { _id: '3', name: 'Alice', age: 20 }
  ]);
  // repaginate
  expect(rs.paginate(2).getPage()).toMatchObject([
    { _id: '1', name: 'Zack', age: 10 },
    { _id: '2', name: 'Mildred', age: 30 }
  ]);
  // repaginate to 1, then check page 3
  expect(rs.paginate(1).goPage(3).getPage()).toMatchObject([
    { _id: '3', name: 'Alice', age: 20 }
  ]);
  // check the last page (4 pages total)
  expect(rs.goPage(3).nextPage().getPage()).toMatchObject([
    { _id: '4', name: 'Bob', age: 40 }
  ]);
  expect(rs.getPageIndex()).toBe(4);
  expect(rs.getPageCount()).toBe(4);
  expect(rs.paginate(2).getPageCount()).toBe(2);
});
