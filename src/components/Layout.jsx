import Header from '../components/Header';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow p-6">
        {children}
      </main>
    </div>
  );
};

export default Layout;