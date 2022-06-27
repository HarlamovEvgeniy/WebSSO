import Checkbox from '../src/components/Checkbox';
import Input from '../src/components/Input';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { useState } from 'react';

export default function AccountLogin() {
  const router = useRouter();
  const [form, setForm] = useState(null);
  const [error, setError] = useState(false);

  const handleOnChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
    console.log(form)
  }

  const handleSignIn = (e) => {
    e.preventDefault();

    if(form?.phone.toString().slice(-1) !== '_' && form?.phone && form?.phone == '999-999-999') {
      setError(false)
      router.push('/request')
    } else {
      setError(true)
    }
  }

  return(
    <div className="content">
      <div className="content__header">
        <h2>Login by Account</h2>
        <p className="description description--gray">With your account ID</p>
      </div>

      <div className="content__form">
        <Input
          error={error} onChange={(e) => handleOnChange(e)}
          value={form?.phone} type={'phone'}
          name="phone" label={'Enter Your ID'}
          placeholder={"000-000-000"}
        />
        <Link href="/push-notification">
          <a onClick={(e) => handleSignIn(e)}
             className='btn btn--image btn--orange mt-10'
          >
            <Image alt="" width={28} height={28} src={'/sign-in.svg'}/>
            Sign In
          </a>
        </Link>

        <Checkbox id="remember-me" label="Remember me"/>
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
                {/* eslint-disable-next-line react/no-unescaped-entities */}
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
                <Image alt="" width={28} height={28} src={'/code.svg'}/>
                By QR-code
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}