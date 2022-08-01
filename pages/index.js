import React from "react";
import Checkbox from '../src/components/Checkbox';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { QRCode as QRCodeLogo } from 'react-qrcode-logo';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Grid } from  'react-loader-spinner';
import { useRouter } from 'next/router';

export default function QRCode({ message, sessionID }) {
  console.log('Session ID Index: ', sessionID);
  const router = useRouter();
  const [loader, setLoader] = useState(true);
  const [timer, setTimer] = useState(299);

  //Set Loader
  setTimeout(() => {
    setLoader(false);
  }, 500);

  //Timer
  useEffect(() => {
    const i = setInterval(function (){
      if(timer > 0) {
        setTimer(timer - 1)
      }
    }, 1000)

    return () => clearInterval(i)
  }, [timer]);

  useEffect(() => {
    const checkIsScanned = async () => {
      try {
        const isScanned = await fetch('/api/request/mobile', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          mode: "cors",
        });
        var body = await isScanned.json()
        if(body?.isMobile) {
          router.push({
            pathname: '/push-notification',
            query: { message: message.auth }
          })
        }
      } catch (err) {}
    }

    checkIsScanned();
  })

  return(
    <>
    {
      !loader ?
        <div className="content">
          <div className="content__header">
            <h2>Login by QR-Code</h2>
            <p className="description description--gray">With Defispace App</p>
          </div>
          <div className="content__code">
            <div className="content__code-left">
              <p className="description">
                Scan the QR code in the <a target={"_blank"} href="https://play.google.com/store/games?hl=ru&gl=US" rel="noreferrer">Defispace App</a>
              </p>

              <Checkbox id="remember-me" label="Remember me"/>
              <p>Code expiration date: {
                Math.floor(timer / 60) + ':' +
                ((Math.floor(timer - Math.floor(timer / 60) * 60) < 10) ?
                  ('0' + Math.floor(timer - Math.floor(timer / 60) * 60)) :
                  (Math.floor(timer - Math.floor(timer / 60) * 60)))
              }
              </p>


              <div className="markets">
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
            </div>
            <div className="content__code-right">
              {
                timer > 0 ?
                  <QRCodeLogo
                    value={message?.auth ?? ''}
                    eyeRadius={14}
                    qrStyle={"squares"}
                    size={265}
                    fgColor={'#28303F'}
                    logoImage={'/QRCodeLogo.svg'}
                    logoWidth={100}
                    logoHeight={100}
                  />
                : <></>
              }
            </div>
          </div>
          <div className="content__links">
            <ul>
              <li>
                <Link href={"/sign-up"}>
                  <a>
                    Sign Up
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="content__footer">
            <div className="content__footer-divider">
              <span>or</span>
            </div>
            <div className="content__footer-btns">
              <div className="content__footer-btn">
                <Link href="/account-login">
                  <a className="btn btn--image btn--white">
                    <img alt="" width={26} height={26} src={'/view.svg'}/>
                    Login with account
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      : <div className="loader">
          <Grid
            color="#F1704A"
            height={120}
            width={90}
          />
      </div>
    }
    </>
  );
}

export async function getServerSideProps(context) {

  return {
    props: {
      sessionID: context?.req?.sessionID ?? null,
      message: context?.query ?? null,
    },
  }
}