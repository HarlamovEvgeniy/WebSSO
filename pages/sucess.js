import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Sucess() {
  const router = useRouter();
  const handleButton = (e) => {
    e.preventDefault();
    redirect();
  }

  const redirect = () => {
    window.open(router?.query?.url, '_self');
  }

  useEffect(() => {
    setTimeout(() => {
      redirect();
    }, 3000);
  })

  return(
    <div className="content">
      <div className="content__header">
        <img alt="" width="82px" height="82px" src={'/StartupLanding.svg'}/>
        <h1 className={'mt-20'}>Startup Landing <br/><span className={'orange'}>Request accepted</span></h1>
      </div>

      <div className="list mt-20 mb-20">
        <span>List of requested data</span>
        <p>Did Document</p>
      </div>

      <div className="information">
        <h5>You acepted a service request</h5>
        <p>In 3 seconds you will be redirected back</p>
      </div>

      <div className="content__btns">
        <a onClick={(e) => { handleButton(e) }} rel={'noreferrer'} className="btn btn--image btn--white mt-10">
          <img alt="" width={26} height={26} src={'/back.svg'}/>
          Close and back
        </a>
      </div>
    </div>
  )
}