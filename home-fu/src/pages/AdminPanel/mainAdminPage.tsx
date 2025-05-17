import { useState } from 'react';
import style from './mainAdminPage.module.scss'; 
import { Categories } from './Categories/categories';
import { Locations } from './Locations/locations';
import { CardsForCategories } from './CardsForCategories/cardsForCategories';
import { HeaderSite } from '../../components/Header/HeaderSite/headerSite';

export const AdminPanel = () => {
    const [activeView, setActiveView] = useState<'location' | 'category' | 'cards'>('location');

    return (
        <>
            <HeaderSite/>
            <div className={style.contentWrapper}>
                <div className={style.asideWrapper}>
                    <aside className={style.sidebar}>
                        <nav className={style.nav}>
                            <button
                                onClick={() => setActiveView('location')}
                                className={style.link}
                            >
                                Локации
                            </button>
                            <button
                                onClick={() => setActiveView('category')}
                                className={style.link}
                            >
                                Категории
                            </button>
                            <button
                                onClick={() => setActiveView('cards')}
                                className={style.link}
                            >
                                Карточки для категорий
                            </button>
                        </nav>
                    </aside>
                </div>
                <div className={style.viewContent}>
                    {activeView === 'location' && <Locations/>}
                    {activeView === 'category' && <Categories/>}
                    {activeView === 'cards' && <CardsForCategories/>}
                </div>
            </div>
        </>
    );
};

