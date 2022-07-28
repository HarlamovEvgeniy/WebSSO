import Checkbox from '../src/components/Checkbox';
import Input from '../src/components/Input';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { useState } from 'react';

export default function SignUp() {
  return(
    <div className="content">
      <div className="content__header">
        <h2>Sign Up</h2>
        <p className="description description--gray">Create your account</p>
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
          <li>
            <Link href={"/sign-up"}>
              <a>
                Can't sign in
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
            <Link href="/" >
              <a className="btn btn--image btn--white">
                <img alt="" width={28} height={28} src={'/code.svg'}/>
                Login By QR-code
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}