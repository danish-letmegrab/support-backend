function generateRandomTicketNumber() {
  const min = 10000000;
  const max = 99999999;
  const ticketNumber = "#" + Math.floor(Math.random() * (max - min + 1)) + min;
  return ticketNumber;
}

module.exports = { generateRandomTicketNumber };
