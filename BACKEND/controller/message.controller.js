import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
export const sendMessage = async (req, res) => {

  try {
    console.log("Request Body:", req.body);
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
      console.log("New conversation created:", conversation);
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    // await newMessage.save();
   if(newMessage){ 
    conversation.messages.push(newMessage._id)
   };
    // await conversation.save();
await Promise.all([conversation.save(),newMessage.save()]); //THIS WILL RUN IN PARALLEL
    console.log("Message sent successfully:", newMessage);
    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error in sendMessage controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}


export const getMessages = async(req,res)=>{
  try{
const{id: userToChatId}= req.params;
const senderId = req.user._id;

const conversation = await Conversation.findOne({
  participants:{$all:[senderId,userToChatId]},

}).populate("messages");


if(!conversation){
  return res.status(200).json([])


}


const message = conversation.messages;
res.status(200).json(conversation.messages);

  }catch(error){
console.log("error in getMessages controller:",error.message);
res.status(500).json({error:"Internal server error"});
  }
}