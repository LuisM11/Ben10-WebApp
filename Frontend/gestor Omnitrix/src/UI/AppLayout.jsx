import {Outlet, useNavigation} from "react-router-dom";
import Header from "./Header";
import Loader from "./Loader";
import styles from "./AppLayout.module.css";

function AppLayout() {
    const navigation = useNavigation();
    const isLoading = navigation.state === "loading";
    return (
        <div className="grid h-screen grid-rows-[auto_1fr]">
            {isLoading && <Loader/>}
            <Header/> {/* Header solo en /app y /favorites */}
            <div className={styles.omnitrixbg}>
                <main className="mx-auto max-w-3xl">
                    <Outlet/> {/* Aquí se renderiza AppContent o Favorites */}
                </main>
            </div>
        </div>
    );
}

export default AppLayout;