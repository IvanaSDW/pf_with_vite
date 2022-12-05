import React, { useState } from "react";
import axios from "axios";
import {
  Elements,
  CardNumberElement,
  useStripe,
  useElements,
  CardCvcElement,
  CardExpiryElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import styles from "../components/checkout/css/estilos.module.css";
import img from "../components/checkout/chip-tarjeta.png";
import { useSelector } from "react-redux";

const stripePromise = loadStripe(
  "pk_test_51M9WmxAbUauCYI6I9Hz0llhbtG4PPPvvxlbTpc1nFuh7OzbiYpETElQtZiLsyffSiqWeVFPDWLPzabt7IFIYwJ8500x3f0qHBo"
);

//componente de checkout del formulario
const CheckoutForm = ({ payment, setPaymet,children,  totalPrice} ) => {
  const stripe = useStripe();
  const elements = useElements();
  const cart = useSelector((state) => state.cart);
  const [errorM, setErrorM] = useState("");
  const [/*messSuccess*/, setMessSuccess] = useState('')

  let description = cart.map(e=> e.canonicalTitle).toString()

  const hanleSubmit = async (e) => {
    e.preventDefault();

    console.log(totalPrice)


    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(
        CardNumberElement,
        CardCvcElement,
        CardExpiryElement
      ),
    });
    // console.log(paymentMethod);
    if (!error) {
    //   console.log(paymentMethod.card.brand); //que tarjeta es
      const { id } = paymentMethod;
      const { data } = await axios.post("https://backend-production-1a11.up.railway.app/checkout", {
        id,
        amount: totalPrice * 100,
       description : description,
        cart : cart
      });
      if (data.error) {
        setErrorM(data.error.raw.message);
      }
      if(data.mess){
          setMessSuccess("succesfull payment")
      }
    }

    if (error) {
      setErrorM(error.message);
    }
  };

  // const [modal1, setModal1] = useState(true);
  // const [modal2, setModal2] = useState(false);

  // function Back(){
  //   setModal1(false)
  //   setModal2(true)
  // }
  // function Front(){
  //   setModal2(false)
  //   setModal1(true)
  // }

  return (
    <div className="w-screen h-full flex justify-center  top-0 left-0 bg-black/90 fixed">
        <div className=" w-5/6  h-full  p-2 text-white absolute"> 
      
    <form onSubmit={hanleSubmit} className="w-full bg-white  absolute h-full  relative flex flex-col justify-center self-center rounded-md p-20">
        {/* <div className="flex mt-3 p-5 mr-20 justify-around">
              <button className=" self-center w-40 h-10  mt-2 pt-1 p-2 text-2xl bg-purple-600 hover:bg-purple-400 rounded-md text-white " onClick={Front}>
                Front-Card
              </button>
        <button className=" self-center w-40 h-10  mt-2 pt-1 p-2 text-2xl bg-purple-600 hover:bg-purple-400 rounded-md text-white " onClick={Back}>
                Back-Card
              </button>
              </div> */}
      {children}  
      <section class={styles.tarjeta} id="tarjeta">
      {/* {modal1 && */}
      <div className={styles.delantera} /*modal1={modal1} setModal1={setModal1}*/>
      <img src={img} alt="img" className={styles.chip} />
      <div className={styles.datos}>
      <div className={styles.grupo} id="numero">
      <p className={styles.label}>Número Tarjeta</p>
        <CardNumberElement options={cardStyle}  />
        <p className="p-2"></p>
        <CardExpiryElement options={expyStyle} />
					</div>
      <div className={styles.grupoCvv} id="ccv">
        
      <p className={styles.label}>CCV</p>
      <p className={styles.ccv}>  <CardCvcElement options={cvcStyle}/></p>
      </div>
        {/* cuando mandamos campos vacios */}
      
      </div>
      </div>
      {/* } */}
      {/* {modal2 &&
      <div className={styles.trasera} modal2={modal2} setModal2={setModal2}>
				<div className={styles.barra}></div>
				<div className={styles.datos}>
					<div className={styles.grupo} id="firma">
						
					</div>
					<div className={styles.grupoCvv} id="ccv">
        
					</div>
				</div>
				<p className={styles.leyenda}>Lorem ipsum dolor sit amet consectetur</p><p> adipisicing elit. Accusamus exercitationem, voluptates illo.</p>
				<span className={styles.link_banco}>www.tubanco.com</span>
			</div>
      } */}
		</section>

    <div className="flex justify-center mr-30 flex-col m-3">
      <h3 className="text-2xl self-center p-5 flex text-black">Total Pay : <p className="text-green-600">U$D{totalPrice.toFixed(2)}</p></h3>
        <p className="text-red-600 self-center p-2">{errorM}</p>
      <button className="bg-purple-600 p-2 w-40 rounded-md hover:bg-purple-800  text-3xl self-center">BUY</button>
      </div>
    </form>
    </div>
    </div>
  );
};

//componente de Checkout

const Checkout = ( {payment, setPaymet, children, cart,totalPrice}) => {
  return (
    <Elements stripe={stripePromise}>
  {payment && 
      <div className="container p-4 ">
        <div className="row">
          <div className="col-md-4 offset-md-4 overflow-y-none">
            <CheckoutForm setPaymet={setPaymet} totalPrice={totalPrice}>{children}</CheckoutForm>
          </div>
        </div>
      </div>
}
    </Elements>
  );
};

export default Checkout;
const cardStyle = {
  style: {
    base: {
      color: "#fff",
      fontFamily: 'Arial, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "30px",
      "::placeholder": {
        color: "#fff"
      }
    },
    invalid: {
      fontFamily: 'Arial, sans-serif',
      color: "#fa755a",
      iconColor: "#fa755a"
    }
  }
};

const cvcStyle = {
  style: {
    base: {
      color: "#fff",
      width:"800px",
      fontFamily: 'Arial, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "20px",
      "::placeholder": {
        color: "#fff"
      }
    },
    invalid: {
      fontFamily: 'Arial, sans-serif',
      color: "#fa755a",
      iconColor: "#fa755a"
    }
  }
};


const expyStyle = {
  style: {
    base: {
      color: "#fff",
      fontFamily: 'Arial, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "30px",
      "::placeholder": {
        color: "#fff"
      }
    },
    invalid: {
      fontFamily: 'Arial, sans-serif',
      color: "#fa755a",
      iconColor: "#fa755a"
    }
  }
};