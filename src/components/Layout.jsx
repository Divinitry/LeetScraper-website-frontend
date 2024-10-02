import Header from '../components/Header';

const Layout = ({ children, isLoggedIn }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header isLoggedIn={isLoggedIn} />
      
      <main className="flex-grow p-6">
        {children}
      </main>
    </div>
  );
};

export default Layout;
