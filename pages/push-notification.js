import Link from 'next/link';
import {useEffect, useState} from "react";
import { useRouter } from 'next/router';

export default function PushNotification() {
  const [timer, setTimer] = useState(299);
  const router = useRouter();

  useEffect(() => {
    const i = setInterval(function (){
      if(timer > 0) {
        setTimer(timer - 1)
      }
    }, 1000)

    return () => clearInterval(i)
  }, [timer]);

  useEffect(() => {
    const checkIsAccepted = async () => {
      try {
        const isAccepted = await fetch('/api/request/auth', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          mode: "cors",
        });
        const request = await isAccepted.json();


        
        if(request?.isAuth) {
          router.push({
            pathname: '/sucess',
            query: { url: request.url }
          });
        }
      } catch (err) {}
    }

    checkIsAccepted();
  });

  return(
    <div className="content">
      <div className="content__header">
        <h2>Open push notifications</h2>
      </div>

      <div className="content__push">
        <div className="content__push-left">
          <p className="description">
            Sent a push notification to your device. If there is no notification, open
            the <a target={"_blank"} href="https://play.google.com/store/games?hl=ru&gl=US" rel="noreferrer">Defispace App</a>
          </p>

          <p>After {
            Math.floor(timer / 60) + ':' +
            ((Math.floor(timer - Math.floor(timer / 60) * 60) < 10) ?
              ('0' + Math.floor(timer - Math.floor(timer / 60) * 60)) :
              (Math.floor(timer - Math.floor(timer / 60) * 60)))
          } minutes you can request again
          </p>
        </div>
        <div className="content__push-right">
          <div className="content__push--logo">
            <img alt="" width={"50px"} height="50px" src={"/LogoIcon.svg"}/>
          </div>
        </div>
      </div>

      <div className="content__btns">
        <Link href="/request">
          <a className="btn btn--image btn--white">
            No Defispace App
            <img alt="" width={20} height={20} src={'/information.svg'}/>
          </a>
        </Link>
      </div>

      <div className="markets markets--line">
        <div className="markets__item">
          <a target={"_blank"} href="https://play.google.com/store/games?hl=ru&gl=US" rel="noreferrer">
            <div className="markets__item-image">
              <img alt="" width={"28"} height={"28"} src={"/google.svg"}/>
            </div>
            <div className="markets__item-content">
              <span>Free download</span>
              <h5>Google Play</h5>
            </div>
          </a>
        </div>
        <div className="markets__item">
          <a target={"_blank"} href="https://www.apple.com/ru/app-store/" rel="noreferrer">
            <div className="markets__item-image">
              <img alt="" width={"28"} height={"28"} src={"/apple.svg"}/>
            </div>
            <div className="markets__item-content">
              <span>Free download</span>
              <h5>App Store</h5>
            </div>
          </a>
        </div>
      </div>

      <div className="content__links">
        <ul>
          <li>
            <Link href={"/sign-up"}>
              <a>
                Push notification not coming
              </a>
            </Link>
          </li>
          <li>
            <Link href={"/sign-up"}>
              <a>
                Sign Up
              </a>
            </Link>
          </li>
          <li>
            <Link href={"/sign-up"} as={ process.env.BACKEND_URL + "/sign-up" }>
              <a>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                Can't sign in
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}