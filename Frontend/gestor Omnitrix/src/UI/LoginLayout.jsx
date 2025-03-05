import Header from "./Header";

function LoginLayout({ children }) {
  return (
    <div>
      <Header />
      <main className="mt-25">{children}</main>
    </div>
  );
}

export default LoginLayout;
