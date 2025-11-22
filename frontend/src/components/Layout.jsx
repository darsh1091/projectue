import NavBar from './NavBar.jsx';
import Footer from './Footer.jsx';

const Layout = ({ children }) => (
  <div className="min-h-screen bg-slate-50">
    <NavBar />
    <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
    <Footer />
  </div>
);

export default Layout;
