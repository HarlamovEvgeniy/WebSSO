import Checkbox from '../src/components/Checkbox';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { QRCode as QRCodeLogo } from 'react-qrcode-logo';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Grid } from  'react-loader-spinner';
import {useRouter} from "next/router";

export default function QRCode({ session }) {
  const router = useRouter();
  const [loader, setLoader] = useState(true);
  const [timer, setTimer] = useState(299);

  setTimeout(() => {
    setLoader(false);
  }, 500);

  useEffect(() => {
    if(session?.auth) {
      router.push('/request');
    }
  }, []);

  useEffect(() => {
    const i = setInterval(function (){
      if(timer > 0) {
        setTimer(timer - 1)
      }
    }, 1000)

    return () => clearInterval(i)
  }, [timer]);

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
                      <Image alt="" width={"28"} height={"28"} src={"/google.svg"}></Image>
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
                      <Image alt="" width={"28"} height={"28"} src={"/apple.svg"}></Image>
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
                    value={''}
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
                    <Image alt="" width={26} height={26} src={'/view.svg'}/>
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


// export async function getServerSideProps(ctx) {
//   try {
//     if(ctx?.req && ctx?.res) {
//       const session = await getSession(ctx?.req, ctx?.res);
//       return {
//         props: {
//           session: session,
//         }
//       }

//     } else {
//       return false;
//     }
//   } catch (err) {
//     console.log(err);
//     return false;
//   }
// }

