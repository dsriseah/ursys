/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  TESTER for QUERY

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { expect, test } from 'vitest';
import { Find } from '../lib/util-query.ts';
import { m_SetCriteria, m_EnforceFlags, m_GetCriteria } from '../lib/util-query.ts';
import type { SearchOptions } from '../../../../_ur/_types/dataset.d.ts';

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const items: any = [
  { _id: '1', name: 'item1', age: 10 }, //
  { _id: '2', name: 'item2', age: 20 }
];

/// TESTS /////////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
test('no mutate items', () => {
  let found;
  // test default cloning
  found = Find(items, { hasFields: ['_id'], _cloneItems: true });
  expect(found).not.toBe(items); // always a new array
  found.forEach((item, index) => {
    expect(item).not.toBe(items[index]); // Ensure different references
    expect(item).toEqual(items[index]); // Ensure matching values
  });
  // disable cloning (which is the default)
  found = Find(items, { hasFields: ['_id'], _cloneItems: false });
  expect(found).not.toBe(items); // always a new array
  found.forEach((f, index) => {
    expect(f).toBe(items[index]); // Ensure different references
    expect(f).toEqual(items[index]); // Ensure matching values
  });
});

test('simple query', () => {
  expect(items).toBeDefined();
  let found;
  found = Find(items);
  expect(found).toMatchObject([]); // no criteria, match nothing
  found = Find(items, { hasFields: ['name'] });
  expect(found).toMatchObject(items); // all items have name field
  found = Find(items, { hasFields: ['name'], matchCount: 1 });
  expect(found).toMatchObject([items[0]]); // only one item has name field
  found = Find(items, { matchExact: { name: 'item1', age: 10 } });
  expect(found).toMatchObject([items[0]]); // only one item has name 'item1'
  found = Find(items, { matchExact: { name: 'item1', age: 20 } });
  expect(found).toMatchObject([]); // no item has name 'item1' and age 20
  found = Find(items, { matchRange: { age: 'gt 10' } });
  expect(found).toMatchObject([items[1]]); // only one item has age greater than 10
  found = Find(items, { matchRange: { age: 'between 11 20' } });
  expect(found).toMatchObject([items[1]]); // only one item has age between 11 and 20
  found = Find(items, {
    matchExact: { age: 20 },
    preFilter: items => items.filter(item => Number(item.age) < 10)
  });
  // expect(found).toMatchObject([]); // no item has age 20 and less than 10
});

test('compound query', () => {
  items.push({ _id: '3', name: 'item3', age: 5, color: 'blue' });

  let found;
  found = Find(items, { missingFields: ['color'] });
  expect(found.length).toBe(2); // two items are missing color field
  found = Find(items, { hasFields: ['age'], matchExact: { name: 'item1' } });
  expect(found).toMatchObject([items[0]]); // only one item has age field and name 'item1'
});

test('forced value utility', () => {
  let item = { _id: '1', NAmE: 'item1', Age: 10, color: undefined };
  let criteria: SearchOptions = {
    _forceValue: 'number',
    _lowercaseProps: true,
    _forceNull: true,
    _cloneItems: false
  };
  m_SetCriteria(criteria);
  let clone = m_EnforceFlags(item);
  expect(clone).toMatchObject({ _id: '1', name: 'item1', age: '10', color: null });
  expect(clone).toBe(item);
  criteria._cloneItems = true;
  m_SetCriteria(criteria);
  clone = m_EnforceFlags(item);
  expect(clone).not.toBe(item);
  expect(clone).toMatchObject({ _id: '1', name: 'item1', age: '10', color: null });
});
