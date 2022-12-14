import Player from "./player.js";

test("Player can set computer as opponent", () => {
  const player1 = Player("Player One");
  const cpu = Player("Computer");
  player1.setOpponent(cpu);
  expect(player1.opponent.name).toBe("Computer");
})

test("Player can attack enemy's gameboard", () => {
  const player1 = Player("Player One");
  const cpu = Player("Computer");
  player1.setOpponent(cpu);
  const coordinate = [4, 7];
  player1.attack(coordinate);
  expect(cpu.position.board[coordinate]).toBe("clicked");
})

test("Computer randomly selects square on player's board", () => {
  
})