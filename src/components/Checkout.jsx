import React, { useState } from 'react';
import axios from 'axios';
import {
  Elements,
  CardNumberElement,
  useStripe,
  useElements,
  CardCvcElement,
  CardExpiryElement,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import styles from '../components/checkout/css/estilos.module.css';
import img from '../components/checkout/chip-tarjeta.png';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { resetCart } from '../Redux/actions';
import { AiFillCreditCard } from 'react-icons/ai';
import style from '../components/assets/Cards/loading.module.css';
import { SERVER_URL } from '../domain/serverConfig';

const stripePromise = loadStripe(
  'pk_test_51M9WmxAbUauCYI6I9Hz0llhbtG4PPPvvxlbTpc1nFuh7OzbiYpETElQtZiLsyffSiqWeVFPDWLPzabt7IFIYwJ8500x3f0qHBo'
);

//componente de checkout del formulario
const CheckoutForm = ({ payment, setPaymet, children, totalPrice }) => {
  const stripe = useStripe();
  const elements = useElements();
  const cart = useSelector((state) => state.cart);
  const userFirebase = useSelector((state) => state.firebaseUser);
  const [errorM, setErrorM] = useState('');
  const [messSuccess, setMessSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  let description = cart.map((e) => e.canonicalTitle).toString();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const hanleSubmit = async (e) => {
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(
        CardNumberElement,
        CardCvcElement,
        CardExpiryElement
      ),
    });

    if (!error) {
      //   console.log(paymentMethod.card.brand); //que tarjeta es
      const { id } = paymentMethod;
      const { data } = await axios.post(`${SERVER_URL}/checkout`, {
        id,
        amount: Math.round(totalPrice * 100),
        description: description,
        cart: cart,
      });

      console.log(totalPrice);
      console.log(totalPrice * 100);
      console.log((totalPrice * 100).toFixed(2));
      let userId = userFirebase.uid;

      if (data.error) {
        setTimeout(() => {
          setLoading(!loading).fadeOut(2000);
        }, 500);

        setTimeout(() => {
          setLoading(false);
          setErrorM(data.error.raw.message);
        }, 2500);
        const order = await axios.post(`${SERVER_URL}/order/user/${userId}`, {
          items: cart.map((item) => {
            return {
              mangaMangaid: item.mangaid,
              quantity: item.quantity,
              price: Number(item.price),
            };
          }),
          total: totalPrice.toFixed(2),
          status: 'rejected',
        });
      }

      if (data.mess) {
        setMessSuccess('succesfull payment');
        dispatch(resetCart());
        const order = await axios.post(`${SERVER_URL}/order/user/${userId}`, {
          items: cart.map((item) => {
            return {
              mangaMangaid: item.mangaid,
              mangaPosterImage: item.posterImage.small.url,
              mangaTitle: item.canonicalTitle,
              quantity: item.quantity,
              price: Number(item.price),
            };
          }),
          total: totalPrice.toFixed(2),
          status: 'completed',
        });
        swal(
          'Your payment was made successfully. During the first 24 hours, the logistics area will be contacted for the delivery of your purchase.',
          {
            button: {
              className:
                'bg-purple-500 p-3 mt-8 text-white hover:bg-white hover:text-purple-700 uppercase font-bold rounded-xl',
            },
          }
        );
        navigate('/home');
      }
    }

    if (error) {
      setTimeout(() => {
        setLoading(!loading).fadeOut(2000);
      }, 500);

      setTimeout(() => {
        setLoading(false);
        setErrorM(error.message);
      }, 2500);
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

  function buy() {
    setTimeout(() => {
      setLoading(!loading).fadeOut(2000);
    }, 500);

    setLoading(false);
  }

  return (
    <div className="w-screen h-full flex justify-center  top-0 left-0 bg-black/70 fixed">
      <div className=" w-5/6  h-full  p-2 text-white absolute">
        <form
          onSubmit={hanleSubmit}
          className="w-full bg-white  absolute h-full  relative flex flex-col justify-center self-center rounded-md p-20"
        >
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
            <div
              className={
                styles.delantera
              } /*modal1={modal1} setModal1={setModal1}*/
            >
              <img src={img} alt="img" className={styles.chip} />
              <div className={styles.datos}>
                <div className={styles.grupo} id="numero">
                  <p className={styles.label}>Número Tarjeta</p>
                  <CardNumberElement options={cardStyle} />
                  <p className="p-2"></p>
                  <CardExpiryElement options={expyStyle} />
                </div>
                <div className={styles.grupoCvv} id="ccv">
                  <p className={styles.label}>CCV</p>
                  <p className={styles.ccv}>
                    {' '}
                    <CardCvcElement options={cvcStyle} />
                  </p>
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
            <h3 className="text-2xl self-center p-5 flex text-black">
              Total Pay :{' '}
              <p className="text-green-600">U$D{totalPrice.toFixed(2)}</p>
            </h3>
            <p className="text-red-600 self-center p-2">{errorM}</p>

            <button className={styles.btn} onClick={buy}>
              <div className={styles.icon}>
                <AiFillCreditCard />
              </div>
              <span>BUY</span>
            </button>
            {loading && (
              <div
                value={loading}
                className="w-screen h-full flex justify-center self-center top-0  absolute  bg-black/70 "
              >
                <div className="w-5/6 h-full top-0 fixed bg-black/75 p-2 text-white mt-8">
                  <div className="w-full   mr-80 h-3 mt-80 flex flex-col justify-center self-center rounded-md p-20 ">
                    <span className={style.loader}></span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

//componente de Checkout

const Checkout = ({ payment, setPaymet, children, cart, totalPrice }) => {
  return (
    <Elements stripe={stripePromise}>
      {payment && (
        <div className="container p-4 ">
          <div className="row">
            <div className="col-md-4 offset-md-4 overflow-y-none">
              <CheckoutForm setPaymet={setPaymet} totalPrice={totalPrice}>
                {children}
              </CheckoutForm>
            </div>
          </div>
        </div>
      )}
    </Elements>
  );
};

export default Checkout;
const cardStyle = {
  style: {
    base: {
      color: '#fff',
      fontFamily: 'Arial, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '30px',
      '::placeholder': {
        color: '#fff',
      },
    },
    invalid: {
      fontFamily: 'Arial, sans-serif',
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
};

const cvcStyle = {
  style: {
    base: {
      color: '#fff',
      width: '800px',
      fontFamily: 'Arial, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '20px',
      '::placeholder': {
        color: '#fff',
      },
    },
    invalid: {
      fontFamily: 'Arial, sans-serif',
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
};

const expyStyle = {
  style: {
    base: {
      color: '#fff',
      fontFamily: 'Arial, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '30px',
      '::placeholder': {
        color: '#fff',
      },
    },
    invalid: {
      fontFamily: 'Arial, sans-serif',
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
};
