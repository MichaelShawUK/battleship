import Ship from './ship.js';

test('Returns correct end-point when initialised vertically', () => {
  expect(Ship(4, [5, 4], 'vertical').end).toEqual([5, 7]);
})

test('Returns correct end-point when initialised horizontally', () => {
  expect(Ship(4, [5, 4], 'horizontal').end).toEqual([8, 4]);
})

test('Increments hits property when hit method called', () => {
  const destroyer = Ship(3, [4, 4], 'vertical');
  destroyer.hit();
  expect(destroyer.hits).toBe(1);
})

test('Determines whether ship has sunk', () => {
  const patrolBoat = Ship(2, [1, 5], 'horizontal');
  patrolBoat.hit();
  patrolBoat.hit();
  expect(patrolBoat.isSunk()).toBe(true);
})