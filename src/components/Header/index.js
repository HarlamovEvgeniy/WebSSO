import Link from 'next/link'

export const Header = () => {
  return (
    <div className={'header'}>
      <div className="container">
        <div className="header__wrapper">
          <Link href={'/'}>
            <a className="header__logo">
              <img alt="" src={"/Logo.svg"} width={180} height={32}/>
            </a>
          </Link>
          <Link href={'/'}>
            <a className="btn btn--outline btn--outline--gray btn--arrow">How it work?</a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Header;