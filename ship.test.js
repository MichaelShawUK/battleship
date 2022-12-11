import Ship from "./ship.js";

test("Ship occupies correct squares when initialised vertically", () => {
  expect(Ship(4, [5, 4], "vertical").squares).toEqual([
    [5, 4],
    [5, 5],
    [5, 6],
    [5, 7],
  ]);
});

test("Ship occupies correct squares when initialised horizontally", () => {
  expect(Ship(5, [3, 2], "horizontal").squares).toEqual([
    [3, 2],
    [4, 2],
    [5, 2],
    [6, 2],
    [7, 2],
  ]);
});

test("Increments hits property when hit method called", () => {
  const destroyer = Ship(3, [4, 4], "vertical");
  destroyer.hit();
  expect(destroyer.hits).toBe(1);
});

test("Determines whether ship has sunk", () => {
  const patrolBoat = Ship(2, [1, 5], "horizontal");
  patrolBoat.hit();
  patrolBoat.hit();
  expect(patrolBoat.isSunk()).toBe(true);
});
