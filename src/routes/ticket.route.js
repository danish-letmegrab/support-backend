const express = require("express");
const userRegisterValidator = require("../validators/user.validators.js");
const validate = require("../validators/validators.js");
const {
  createTicket,
  getTicketConversation,
  replyToTicketConversation,
  getAllTickets,
} = require("../controllers/ticket.controller.js");

const router = express.Router();

router.route("/ticket").post(createTicket);
router.route("/tickets").get(getAllTickets);
router.route("/ticket/:ticket_id").get(getTicketConversation);
router.route("/conversation/:ticket_id").post(replyToTicketConversation);

module.exports = router;
