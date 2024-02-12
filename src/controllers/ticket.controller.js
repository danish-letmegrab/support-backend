const { generateRandomTicketNumber } = require("../../utils/helper.js");
const db = require("../models/index.js");
const { io } = require("../server.js");
const { ApiResponse } = require("../utils/ApiResponse.js");
const { asyncHandler } = require("../utils/asyncHandler.js");

const Ticket = db.ticket;
const TicketConversation = db.ticket_conversation;

const createTicket = asyncHandler(async (req, res) => {
  const ticket_number = generateRandomTicketNumber();
  const { subject, description, attachment, user_type } = req.body;

  console.log("subject", req.body);

  // user_type 0 = user 1 = seller 2 = users

  try {
    // Create or update the ticket

    const [ticket, created] = await Ticket.findOrCreate({
      where: { subject }, // Update existing ticket with same subject
      defaults: { subject, description, user_type, ticket_number }, // Create new ticket if not found
    });

    let ticketConversation;

    if (created) {
      ticketConversation = await TicketConversation.create({
        ticket_id: ticket.ticket_id,
        message: description,
        user_type: user_type,
        image_attachment: attachment,
      });
    }

    return res
      .status(200)
      .json(new ApiResponse(200, ticket, "Users retrieve successfully."));
    // res.json({ success: true, message: "Ticket raised successfully!" });
  } catch (error) {
    throw new ApiError(409, "create while creating images", error.message);
  }
});

const getAllTickets = asyncHandler(async (req, res) => {
  try {
    const allTickets = await Ticket.findAll();
    return res
      .status(200)
      .json(new ApiResponse(200, allTickets, "tickets retrieve successfully."));
  } catch (error) {
    throw new ApiError(409, "while getting tickets ", error.message);
  }
});

const getTicketConversation = asyncHandler(async (req, res) => {
  const ticket_id = req.params.ticket_id;

  try {
    const ticketConversation = await TicketConversation.findAll({
      where: { ticket_id },
    });

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          ticketConversation || [],
          "Users retrieve successfully."
        )
      );
  } catch (error) {}
});

const replyToTicketConversation = asyncHandler(async (req, res) => {
  try {
    const ticket_id = req.params.ticket_id;
    const { message, image_attachment, user_type } = req.body; // Assuming the message is sent in the request body

    const newConversation = await TicketConversation.create({
      ticket_id,
      message,
      image_attachment,
      user_type,
    });

    // You can add more fields to the response if needed

    return res
      .status(200)
      .json(new ApiResponse(200, newConversation, "Reply added successfully."));
  } catch (error) {
    console.error("Error replying to ticket conversation:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

module.exports = {
  createTicket,
  getTicketConversation,
  replyToTicketConversation,
  getAllTickets,
};
