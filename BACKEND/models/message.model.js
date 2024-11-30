import mongoose from  'mongoose';

const messageSchema = new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    },

receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    },

    message:{
        type: String,
        required: true
    },
           //createdAt,updatedAt
},{timestamps: true})




const Message = mongoose.model("Message",messageSchema);
export default Message

























// Here’s an **in-depth explanation** of the `messageSchema` in your code:

// ---

// ### **1. What is Mongoose?**
// - **Mongoose** is an **ODM (Object Data Modeling) library** for MongoDB and Node.js.
// - It provides a schema-based solution to model your MongoDB data, making it easy to validate, query, and manipulate data.
// - In this case, you are using Mongoose to define a schema for a `Message` model in a messaging application.

// ---

// ### **2. Schema Breakdown**

// #### **What is a Schema?**
// - A **Schema** in Mongoose is a blueprint for how your data will look in MongoDB.
// - It defines the structure of the document, default values, validation, and other configurations.

// #### **Your Schema Definition**
// ```javascript
// const messageSchema = new mongoose.Schema({
//     senderId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//         required: true
//     },

//     receiverId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//         required: true
//     },

//     message: {
//         type: String,
//         required: true
//     }
// }, {timestamps: true});
// ```

// Here’s a detailed breakdown:

// ---

// #### **Field: `senderId`**
// ```javascript
// senderId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true
// }
// ```
// 1. **`senderId` Field Purpose**:
//    - This field stores the **unique identifier** (ObjectId) of the sender of the message.
//    - The `ObjectId` refers to the `_id` field of a document in the `User` collection.

// 2. **Key Properties**:
//    - **`type: mongoose.Schema.Types.ObjectId`**:
//      - Indicates that this field will store an ObjectId, which is MongoDB's default way of uniquely identifying documents in a collection.
//    - **`ref: "User"`**:
//      - This establishes a relationship with the `User` collection.
//      - This is used for **population**, meaning that when you query this schema, you can populate the `senderId` with the full `User` document instead of just the ObjectId.
//    - **`required: true`**:
//      - Ensures that the `senderId` must always be provided when creating a new message document.

// ---

// #### **Field: `receiverId`**
// ```javascript
// receiverId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true
// }
// ```
// 1. **`receiverId` Field Purpose**:
//    - This field stores the **unique identifier** (ObjectId) of the user who will receive the message.
//    - It works similarly to `senderId` and references the `User` collection.

// 2. **Key Properties**:
//    - **`type: mongoose.Schema.Types.ObjectId`**:
//      - Stores the unique ObjectId of the recipient.
//    - **`ref: "User"`**:
//      - Links the `receiverId` to the `User` collection for later population.
//    - **`required: true`**:
//      - Ensures that a `receiverId` is mandatory when saving a message document.

// ---

// #### **Field: `message`**
// ```javascript
// message: {
//     type: String,
//     required: true
// }
// ```
// 1. **`message` Field Purpose**:
//    - This field stores the actual text of the message being sent.

// 2. **Key Properties**:
//    - **`type: String`**:
//      - Indicates that this field will contain text data.
//    - **`required: true`**:
//      - Ensures that a `message` must be provided when saving a document.

// ---

// ### **3. Schema Options: `{timestamps: true}`**
// ```javascript
// {timestamps: true}
// ```

// #### **What It Does**:
// - **`timestamps: true`** automatically adds two fields to the schema:
//   1. **`createdAt`**:
//      - Records the exact timestamp when the document was created.
//   2. **`updatedAt`**:
//      - Records the exact timestamp when the document was last updated.

// #### **How It Works**:
// - Whenever a document is created, Mongoose automatically sets `createdAt` to the current time.
// - If the document is updated later, `updatedAt` will automatically be updated to the current time.

// #### **Why It’s Useful**:
// - These timestamps are extremely helpful for tracking the lifecycle of a document, such as:
//   - When the message was sent.
//   - If and when it was edited or updated.

// ---

// ### **4. Relationships and Population**

// #### **Relationships in Mongoose**:
// - The `senderId` and `receiverId` fields use **ObjectId** with a reference to the `User` collection.
// - This establishes a **relationship** between the `Message` collection and the `User` collection.

// #### **Population**:
// - With the `ref` field, you can use the `.populate()` method in Mongoose to fetch the complete `User` documents for `senderId` and `receiverId` instead of just their ObjectIds.

// #### **Example**:
// ```javascript
// Message.find()
//     .populate('senderId')
//     .populate('receiverId')
//     .then(messages => {
//         console.log(messages);
//     });
// ```
// - In the above query:
//   - The `senderId` and `receiverId` fields will be replaced with the full user documents from the `User` collection.

// ---

// ### **5. How It Maps to MongoDB**

// When you save a document using this schema, it will look something like this in MongoDB:

// #### **Example Document in MongoDB**:
// ```json
// {
//     "_id": "648cb8a934edc5b9b873e8c4", // Unique ObjectId for this message
//     "senderId": "648cb7d234edc5b9b873e8b2", // ObjectId of the sender
//     "receiverId": "648cb8c734edc5b9b873e8c5", // ObjectId of the receiver
//     "message": "Hello, how are you?", // Text of the message
//     "createdAt": "2024-11-28T10:30:00.000Z", // Timestamp when created
//     "updatedAt": "2024-11-28T10:30:00.000Z"  // Timestamp when last updated
// }
// ```

// ---

// ### **6. Use Cases**

// 1. **Message Sending**:
//    - When a user sends a message, a new document will be created with the `senderId`, `receiverId`, and `message`.

// 2. **Fetching Conversations**:
//    - You can query the database to fetch messages between two users:
//      ```javascript
//      Message.find({
//          $or: [
//              { senderId: user1Id, receiverId: user2Id },
//              { senderId: user2Id, receiverId: user1Id }
//          ]
//      }).populate('senderId receiverId');
//      ```

// 3. **Tracking Conversations Over Time**:
//    - Use `createdAt` to sort messages chronologically and display them in the correct order.

// ---

// ### **7. Schema Benefits**

// 1. **Validation**:
//    - The `required` property ensures that all necessary fields are provided before saving a document.

// 2. **Scalability**:
//    - Using `ObjectId` references keeps the database normalized, making it easy to fetch related data without duplicating information.

// 3. **Ease of Use**:
//    - Mongoose simplifies creating, updating, and querying documents with its schema-based approach.

// ---

// This schema is robust and ideal for messaging systems, allowing for scalability and efficient data handling. Let me know if you'd like further clarification or additional examples!