import Header from '../components/Header';
import Footer from '../components/Footer';

export const Layout = ({ children }) => {
  return (
    <>
      <Header></Header>
      <main className={'app wrapper'}>{ children }</main>
      <Footer></Footer>
    </>
  )
}

export default Layout;