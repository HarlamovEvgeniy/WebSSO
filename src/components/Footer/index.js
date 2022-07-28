import Link from "next/link";

export const Footer = () => {
  return (
    <div className={'footer'}>
      <div className={'container'}>
        <div className="footer__divider"></div>
        <nav className="footer__menu">
          <Link className="footer__menu--link" href={"/about"}>
            How it work?
          </Link>
          <Link className="footer__menu--link" href={"/partners"}>
            For partners
          </Link>
          <Link className="footer__menu--link" href={"/for-developers"}>
            For developers
          </Link>
        </nav>

        <div className="footer__link">
          <Link href={"/"}>Consent to the processing of personal data</Link>
        </div>
        <div className="footer__link">
          <Link href={"/"}>Information about partners</Link>
        </div>

        <div className="footer__logo">
          <Link href={"/"}>Radianceteam.com</Link>
        </div>

        <div className="footer__copyright">
          © 2020—2022 by RadianceTeam.com, operated by FOX GAMES.
        </div>
      </div>
    </div>
  )
}

export default Footer;