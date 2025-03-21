import Header from "../components/Header/header";
import Footer from "../components/Footer/footer";
import FilterBar from "./CategoryBar/FilterBar/filterbar";
import FilterButton from "./CategoryBar/FilterButton/filterbutton";
import SumButton from "./CategoryBar/SumButton/sumbutton";
import style from "./home.module.scss";

const Home = () => {
    return (
        <>
            <Header />
            <main className={style.main}>
                <div className={style.categoryBar}>
                    <FilterBar />
                    <FilterButton />
                    <SumButton />

                </div>
            </main>
            <Footer />
        </>
    );
};

export default Home;
