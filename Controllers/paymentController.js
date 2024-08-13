const stripe = require("../Config/stripe");

exports.handlePayment = async (req,res) => {
    try {
        const {amount} = req.body;

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "usd"
        });

        res.json({ clientSecret: paymentIntent.client_secret });
    }
    catch(error){
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}