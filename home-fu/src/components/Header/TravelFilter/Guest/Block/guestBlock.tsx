"use client"

import style from "./guestBlock.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { faMinus } from "@fortawesome/free-solid-svg-icons"
import { useDispatch, useSelector } from "react-redux"
import { increment } from "../../../../../redux/TravelFilter/GuestSlices/countersSlice"
import { decrement } from "../../../../../redux/TravelFilter/GuestSlices/countersSlice"
import { useState } from "react"
import { AnimalsModal } from "..//..//Animals//animals" 

type category = {
  id: number
  title: string
  subtitle: string
}

const categorys: category[] = [
  { id: 1, title: "Дорослі", subtitle: "Вік: від 13 р." },
  { id: 2, title: "Діти", subtitle: "Вік: 2-12" },
  { id: 3, title: "Немовлята", subtitle: "До 2" },
  // { id:4, title: "Домашні тварини", subtitle: "Подорожуєте із твариною-помічником?" }
]

export const GuestBlock = () => {
  const counterValue = useSelector((state) => state.counters.counter)
  const dispath = useDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false)

  // console.log("FirstCounter" + counterValue[0])
  // console.log("SecondCounter" + counterValue[1])

  return (
    <>
      <div className={style.wrapperGuestBlock}>
        {categorys.map((category, index) => (
          <div className={style.itemBlock} key={category.id}>
            <div className={style.itemDescription}>
              <h5 className={style.title}>{category.title}</h5>
              <span className={style.subtitle}>{category.subtitle}</span>
            </div>
            <div className={style.counterBlock}>
              <button
                className={counterValue[index] == 0 ? style.button_no_drop : style.buttonDecrement}
                onClick={() => {
                  dispath(decrement(index))
                }}
              >
                <FontAwesomeIcon icon={faMinus} />
              </button>
              <span>{counterValue[index]}</span>
              <button
                className={style.buttonIncrement}
                onClick={() => {
                  dispath(increment(index))
                }}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          </div>
        ))}
        <div className={style.itemBlock}>
          <div className={style.itemDescription}>
            <h5 className={style.title}>Домашні тварини</h5>
            <span className={style.travelWithAnimal} onClick={() => setIsModalOpen(true)}>
              Подорожуєте із твариною-помічником?
            </span>
          </div>
          <div className={style.counterBlock}>
            <button
              className={counterValue[3] == 0 ? style.button_no_drop : style.buttonDecrement}
              onClick={() => {
                dispath(decrement(3))
              }}
            >
              <FontAwesomeIcon icon={faMinus} />
            </button>
            <span>{counterValue[3]}</span>
            <button
              className={style.buttonIncrement}
              onClick={() => {
                dispath(increment(3))
              }}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>
      </div>

      <AnimalsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
