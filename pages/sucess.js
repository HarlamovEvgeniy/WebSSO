import Image from 'next/image';
import Link from 'next/link';

export default function Sucess() {
  return(
    <div className="content">
      <div className="content__header">
        <Image alt="" width="82px" height="82px" src={'/Okko.svg'}></Image>
        <h1 className={'mt-20'}>Okko <span className={'orange'}>Request accepted</span></h1>
      </div>

      <div className="list mt-20 mb-20">
        <span>List of requested data</span>
        <p>FIO, Birthday</p>
      </div>

      <div className="information">
        <h5>You declined a service request</h5>
        <p>In 3 seconds you will be redirected back</p>
      </div>

      <div className="content__btns">
        <Link href="/">
          <a className="btn btn--image btn--white mt-30">
            <Image alt="" width={26} height={26} src={'/back.svg'}/>
            Close and back
          </a>
        </Link>
      </div>
    </div>
  )
}