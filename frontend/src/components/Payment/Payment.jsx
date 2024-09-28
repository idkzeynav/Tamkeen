import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import {
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";


const Payment = () => {
    const [orderData, setOrderData] = useState([]);
    const [open, setOpen] = useState(false);
    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        const orderData = JSON.parse(localStorage.getItem("latestOrder"));
        setOrderData(orderData);
    }, []);

    const order = {
        cart: orderData?.cart,
        shippingAddress: orderData?.shippingAddress,
        user: user && user,
        totalPrice: orderData?.totalPrice,
    };

    const paymentData = {
        amount: Math.round(orderData?.totalPrice * 100),
    }

    const paymentHandler = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const { data } = await axios.post(
                `${server}/payment/process`,
                paymentData,
                config
            );

            const client_secret = data.client_secret;

            if (!stripe || !elements) return;
            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                },
            });

            if (result.error) {
                toast.error(result.error.message);
            } else {
                if (result.paymentIntent.status === "succeeded") {
                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status,
                        type: "Credit Card",
                    };

                    await axios
                        .post(`${server}/order/create-order`, order, config)
                        .then((res) => {
                            setOpen(false);
                            navigate("/order/success");
                            toast.success("Order successful!");
                            localStorage.setItem("cartItems", JSON.stringify([]));
                            localStorage.setItem("latestOrder", JSON.stringify([]));
                            window.location.reload();
                        });
                }
            }
        } catch (error) {
            toast.error(error);
        }
        
    };
    


    //  Cash on Delevery Handler (COD)
    const cashOnDeliveryHandler = async (e) => {
        e.preventDefault();

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        order.paymentInfo = {
            type: "Cash On Delivery",
        };

        await axios
            .post(`${server}/order/create-order`, order, config)
            .then((res) => {
                setOpen(false);
                navigate("/order/success");
                toast.success("Order successful!");
                localStorage.setItem("cartItems", JSON.stringify([]));
                localStorage.setItem("latestOrder", JSON.stringify([]));
                window.location.reload();
            });
    }


    return (
        <div className="w-full flex flex-col items-center py-8">
            <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
                <div className="w-full 800px:w-[65%]">
                    <PaymentInfo
                        user={user}
                        open={open}
                        setOpen={setOpen}
                        paymentHandler={paymentHandler}
                        cashOnDeliveryHandler={cashOnDeliveryHandler}

                    />
                </div>
                <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
                    <CartData
                        orderData={orderData}
                    />
                </div>
            </div>
        </div>
    );
};

const PaymentInfo = ({
    user,
    open,
    setOpen,
    paymentHandler,
    cashOnDeliveryHandler,
}) => {
    const [select, setSelect] = useState(1);



    return (
        <div className="w-full 800px:w-[95%] bg-[#fff] rounded-md p-5 pb-8">
            {/* select buttons */}
            <div>
                <div className="flex w-full pb-5 border-b mb-2">
                    <div
                        className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
                        onClick={() => setSelect(1)}
                    >
                        {select === 1 ? (
                            <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
                        ) : null}
                    </div>
                    <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
                        Pay with Debit/credit card
                    </h4>
                </div>

                {/* pay with card */}
                {select === 1 ? (
                    <div className="w-full flex border-b">
                    <form className="w-full" onSubmit={paymentHandler}>
                        <div className="w-full flex pb-3">
                            <div className="w-[50%]">
                                <label className="block pb-2">Name on Card</label>
                                <input
                                    required
                                    defaultValue={user && user.name} // Now editable
                                    className={`${styles.input} !w-[95%]`}
                                />
                            </div>
                                <div className="w-[50%]">
                                    <label className="block pb-2">Exp Date</label>
                                    <CardExpiryElement
                                        className={`${styles.input}`}
                                        options={{
                                            style: {
                                                base: {
                                                    fontSize: "19px",
                                                    lineHeight: 1.5,
                                                    color: "#444",
                                                },
                                                empty: {
                                                    color: "#3a120a",
                                                    backgroundColor: "transparent",
                                                    "::placeholder": {
                                                        color: "#444",
                                                    },
                                                },
                                            },
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="w-full flex pb-3">
                                <div className="w-[50%]">
                                    <label className="block pb-2">Card Number</label>
                                    <CardNumberElement
                                        className={`${styles.input} !h-[35px] !w-[95%]`}
                                        options={{
                                            style: {
                                                base: {
                                                    fontSize: "19px",
                                                    lineHeight: 1.5,
                                                    color: "#444",
                                                },
                                                empty: {
                                                    color: "#3a120a",
                                                    backgroundColor: "transparent",
                                                    "::placeholder": {
                                                        color: "#444",
                                                    },
                                                },
                                            },
                                        }}
                                    />
                                </div>
                                <div className="w-[50%]">
                                    <label className="block pb-2">CVV</label>
                                    <CardCvcElement
                                        className={`${styles.input} !h-[35px]`}
                                        options={{
                                            style: {
                                                base: {
                                                    fontSize: "19px",
                                                    lineHeight: 1.5,
                                                    color: "#444",
                                                },
                                                empty: {
                                                    color: "#3a120a",
                                                    backgroundColor: "transparent",
                                                    "::placeholder": {
                                                        color: "#444",
                                                    },
                                                },
                                            },
                                        }}
                                    />
                                </div>
                            </div>
                            <input
                                type="submit"
                                value="Submit"
                                className={`${styles.button} !bg-[#f63b60] text-[#fff] h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
                            />
                        </form>
                    </div>
                ) : null}
            </div>

            <br /><br />
            {/* cash on delivery */}
            <div>
                <div className="flex w-full pb-5 border-b mb-2">
                    <div
                        className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
                        onClick={() => setSelect(3)}
                    >
                        {select === 3 ? (
                            <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
                        ) : null}
                    </div>
                    <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
                        Cash on Delivery
                    </h4>
                </div>


                {/* cash on delivery */}
                {select === 3 ? (
                    <div className="w-full flex">
                        <form className="w-full" onSubmit={cashOnDeliveryHandler}>
                            <input
                                type="submit"
                                value="Confirm"
                                className={`${styles.button} !bg-[#f63b60] text-[#fff] h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
                            />
                        </form>
                    </div>
                ) : null}
            </div>

        </div>
    );
};




const CartData = ({ orderData }) => {
    const shipping = orderData?.shipping?.toFixed(2);
    return (
        <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
            <div className="flex justify-between">
                <h3 className="text-[16px] font-[400] text-[#000000a4]">subtotal:</h3>
                <h5 className="text-[18px] font-[600]">Rs{orderData?.subTotalPrice}</h5>
            </div>
            <br />
            <div className="flex justify-between">
                <h3 className="text-[16px] font-[400] text-[#000000a4]">shipping:</h3>
                <h5 className="text-[18px] font-[600]">Rs{shipping}</h5>
            </div>
            <br />
            <div className="flex justify-between border-b pb-3">
                <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
                <h5 className="text-[18px] font-[600]">{orderData?.discountPrice ? "Rs" + orderData.discountPrice : "-"}
                </h5>
            </div>
            <h5 className="text-[18px] font-[600] text-end pt-3">
                ${orderData?.totalPrice}
            </h5>
            <br />

        </div>
    );
};

export default Payment;

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import styles from "../../styles/styles";
// import {
//     CardNumberElement,
//     CardCvcElement,
//     CardExpiryElement,
//     useStripe,
//     useElements,
// } from "@stripe/react-stripe-js";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import { server } from "../../server";
// import { toast } from "react-toastify";

// const Payment = () => {
//     const [orderData, setOrderData] = useState(null); // Start with null to ensure correct state checking
//     const [open, setOpen] = useState(false);
//     const { user } = useSelector((state) => state.user);
//     const navigate = useNavigate();
//     const stripe = useStripe();
//     const elements = useElements();

//     // Fetch order data from localStorage
//     useEffect(() => {
//         const storedOrderData = localStorage.getItem("latestOrder");
//         if (storedOrderData) {
//             try {
//                 setOrderData(JSON.parse(storedOrderData));
//             } catch (error) {
//                 console.error("Error parsing order data from localStorage", error);
//                 toast.error("Failed to load order data.");
//             }
//         }
//     }, []);

//     // Ensure order data exists before proceeding
//     const order = {
//         cart: orderData?.cart || [], // Default to empty array if undefined
//         shippingAddress: orderData?.shippingAddress || {},
//         user: user || null, // Use null if user is not available
//         totalPrice: orderData?.totalPrice || 0, // Default to 0 if undefined
//     };

//     // Prepare payment data
//     const paymentData = {
//         amount: Math.round(orderData?.totalPrice * 100) || 0, // Convert to cents and handle undefined prices
//     };

//     // Handle the payment process
//     const paymentHandler = async (e) => {
//         e.preventDefault();

//         // Ensure stripe and elements are loaded before proceeding
//         if (!stripe || !elements) {
//             console.error("Stripe or Elements not loaded");
//             toast.error("Payment system is not ready. Please try again.");
//             return;
//         }

//         try {
//             const config = {
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//             };

//             // Step 1: Create Payment Intent on the backend
//             const { data } = await axios.post(`${server}/payment/process`, paymentData, config);
//             const client_secret = data.client_secret;

//             if (!client_secret) {
//                 throw new Error("No client_secret returned from the server");
//             }

//             // Step 2: Confirm payment with Stripe
//             const result = await stripe.confirmCardPayment(client_secret, {
//                 payment_method: {
//                     card: elements.getElement(CardNumberElement),
//                 },
//             });

//             if (result.error) {
//                 // If there is an error with the payment
//                 console.error("Stripe payment error:", result.error.message);
//                 toast.error(result.error.message);
//             } else if (result.paymentIntent.status === "succeeded") {
//                 // Step 3: Create the order after successful payment
//                 order.paymentInfo = {
//                     id: result.paymentIntent.id,
//                     status: result.paymentIntent.status,
//                     type: "Credit Card",
//                 };

//                 await axios.post(`${server}/order/create-order`, order, config)
//                     .then((res) => {
//                         setOpen(false);
//                         navigate("/order/success"); // Redirect on success
//                         toast.success("Order successful!");
//                         localStorage.setItem("cartItems", JSON.stringify([]));
//                         localStorage.setItem("latestOrder", JSON.stringify([]));
//                         window.location.reload(); // Optional: reload to reset the state
//                     })
//                     .catch((error) => {
//                         console.error("Order creation error:", error);
//                         toast.error("Failed to create order.");
//                     });
//             }
//         } catch (error) {
//             console.error("Payment process error:", error);
//             toast.error("Payment failed. Please try again.");
//         }
//     };

//     return (
//         <div className="w-full flex flex-col items-center py-8">
//             <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
//                 <div className="w-full 800px:w-[65%]">
//                     <PaymentInfo
//                         user={user}
//                         open={open}
//                         setOpen={setOpen}
//                         paymentHandler={paymentHandler}
//                     />
//                 </div>
//                 <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
//                     <CartData orderData={orderData} />
//                 </div>
//             </div>
//         </div>
//     );
// };

// // Component for Payment Info (Form)
// const PaymentInfo = ({ user, paymentHandler }) => {
//     const [select, setSelect] = useState(1); // Default to card payment

//     return (
//         <div className="w-full 800px:w-[95%] bg-[#fff] rounded-md p-5 pb-8">
//             {/* Payment method selection */}
//             <div>
//                 <div className="flex w-full pb-5 border-b mb-2">
//                     <div
//                         className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
//                         onClick={() => setSelect(1)}
//                     >
//                         {select === 1 ? (
//                             <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
//                         ) : null}
//                     </div>
//                     <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
//                         Pay with Debit/Credit card
//                     </h4>
//                 </div>

//                 {/* Card Payment Form */}
//                 {select === 1 ? (
//                     <div className="w-full flex border-b">
//                         <form className="w-full" onSubmit={paymentHandler}>
//                             <div className="w-full flex pb-3">
//                                 <div className="w-[50%]">
//                                     <label className="block pb-2">Name on Card</label>
//                                     <input
//                                         required
//                                         defaultValue={user && user.name}
//                                         className={`${styles.input} !w-[95%]`}
//                                     />
//                                 </div>
//                                 <div className="w-[50%]">
//                                     <label className="block pb-2">Exp Date</label>
//                                     <CardExpiryElement
//                                         className={`${styles.input}`}
//                                         options={{
//                                             style: {
//                                                 base: {
//                                                     fontSize: "19px",
//                                                     lineHeight: 1.5,
//                                                     color: "#444",
//                                                 },
//                                             },
//                                         }}
//                                     />
//                                 </div>
//                             </div>

//                             <div className="w-full flex pb-3">
//                                 <div className="w-[50%]">
//                                     <label className="block pb-2">Card Number</label>
//                                     <CardNumberElement
//                                         className={`${styles.input} !h-[35px] !w-[95%]`}
//                                         options={{
//                                             style: {
//                                                 base: {
//                                                     fontSize: "19px",
//                                                     lineHeight: 1.5,
//                                                     color: "#444",
//                                                 },
//                                             },
//                                         }}
//                                     />
//                                 </div>
//                                 <div className="w-[50%]">
//                                     <label className="block pb-2">CVV</label>
//                                     <CardCvcElement
//                                         className={`${styles.input} !h-[35px]`}
//                                         options={{
//                                             style: {
//                                                 base: {
//                                                     fontSize: "19px",
//                                                     lineHeight: 1.5,
//                                                     color: "#444",
//                                                 },
//                                             },
//                                         }}
//                                     />
//                                 </div>
//                             </div>
//                             <input
//                                 type="submit"
//                                 value="Submit"
//                                 className={`${styles.button} !bg-[#f63b60] text-[#fff] h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
//                             />
//                         </form>
//                     </div>
//                 ) : null}
//             </div>
//         </div>
//     );
// };

// // Component for displaying cart data
// const CartData = ({ orderData }) => {
//     const shipping = orderData?.shipping?.toFixed(2);
//     return (
//         <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
//             <div className="flex justify-between">
//                 <h3 className="text-[16px] font-[400] text-[#000000a4]">Subtotal:</h3>
//                 <h5 className="text-[18px] font-[600]">${orderData?.subTotalPrice}</h5>
//             </div>
//             <div className="flex justify-between">
//                 <h3 className="text-[16px] font-[400] text-[#000000a4]">Shipping:</h3>
//                 <h5 className="text-[18px] font-[600]">${shipping}</h5>
//             </div>
//             <div className="flex justify-between border-b pb-3">
//                 <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
//                 <h5 className="text-[18px] font-[600]">
//                     {orderData?.discountPrice ? `$${orderData.discountPrice}` : "-"}
//                 </h5>
//             </div>
//             <div className="flex justify-between pt-3">
//                 <h3 className="text-[16px] font-[400] text-[#000000a4]">Total:</h3>
//                 <h5 className="text-[18px] font-[600]">${orderData?.totalPrice}</h5>
//             </div>
//         </div>
//     );
// };

// export default Payment;
