import Header from "../components/Header/header";
import Footer from "../components/Footer/footer";
import FilterButton from "./CategoryBar/FilterButton/filterbutton";
import SumButton from "./CategoryBar/SumButton/sumbutton";
import style from "./home.module.scss";
import Register from "../features/Auth/Register/registerForm";
const Home = () => {

    return (<>
        <Header></Header>
        <main className = {style.main}>
            <div className= {style.categoryBar}>
                <FilterButton></FilterButton>
                <SumButton></SumButton>
            </div>
            <Register></Register>
        </main>
        <Footer></Footer>
    </>)
}

export default Home;