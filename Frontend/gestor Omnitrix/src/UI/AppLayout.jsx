import { Outlet, useNavigation } from "react-router-dom";
import Header from "./Header";
import Loader from "./Loader";
import styles from "./AppLayout.module.css";

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <div className="grid h-screen grid-rows-[auto_1fr]">
      {isLoading && <Loader />}
      <Header />
      <div className={styles.omnitrixbg}>
        <main className="mx-auto mt-20 max-w-3xl">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
