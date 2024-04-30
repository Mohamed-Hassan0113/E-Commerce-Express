const stripe = require("stripe")(process.env.STRIPE_SK);

const Transaction = require("../models/Transaction");
const Cart = require("../models/Cart");

exports.initiatePayment = async (req, res) => {
   try {

      const userID = req.userID;
      
      const cart = await Cart.findOne({ userID }).populate("products").exec();
      const totalPrice = cart.totalPrice;
      const lineItems = cart.products.map((product) => {
         return {
            price_data: {
               currency: "usd",
               product_data: {
                  name: product.productName,
               },
               unit_amount: product.price * 100,
            },
            quantity: 1,
         };
      });

      const session = await stripe.checkout.sessions.create({
         payment_method_types: ["card"],
         line_items: lineItems,
         mode: "payment",
         success_url: "https://localhost:3000/success",
         cancel_url: "https://localhost:3000/cancel",
      });
      Transaction.create({
         userID,
         sessionID: session.id,
         amount: totalPrice,
         currency: "usd",
      });
      
      res.json({ url: session.url });
   } catch (error) {
      console.error(error);
      res.status(400).json({ status: error.status, message: error.message });
   }
};

exports.webHook = async (req, res) => {
   const sig = req.headers["stripe-signature"];
   
   const endpointSecret = process.env.WEBHOOK_SK;
   let event;
   try {
   
      event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);

      switch (event.type) {
         case "checkout.session.completed":
            const session = event.data.object;
            const transaction = await Transaction.findOne({ sessionID: session.id });
            transaction.status = session.payment_status === "paid"? "succeeded" : "denied";
            await transaction.save();
            const cart = await Cart.findOne({ userID: transaction.userID })
            cart.products = [];
            cart.totalPrice = 0;
            await cart.save();
            break;

         default:
            console.log(`Unhandled event type ${event.type}`);
      }
      res.status(200).json({ message: "payment successful" });
   } catch (error) {
      console.error(error);
      res.status(400).json({ status: error.status, message: error.message });
   }
};
