'use client'

import { FormEvent, useState } from "react";
import style from "./style.module.css";
import { TbLayoutBottombarCollapseFilled } from "react-icons/tb";
import CollapseActions from "./CollapseActions";

export default function SearchBar() {

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    console.log(event);
  } // TODO: should be implemented

  const [ collapseIsOpen, setCollapseIsOpen ] = useState<boolean>(false);

  return (
    <header className={style.formWrapper}>
      <form onSubmit={onSubmit} className={style.form}>
        <input className={`${style.input} ${style.formElements}`} placeholder="Search board by id..."></input>
        <div className={style.buttonsWrapper}>
          <button type="submit" className={`${style.formElements} ${style.submitButton}`}>Search</button>
          <TbLayoutBottombarCollapseFilled className={style.collapseDownIcon} onClick={() => setCollapseIsOpen(prev => !prev)} />
        </div>
      </form>
      <CollapseActions isOpened={collapseIsOpen} />
    </header>
  )
}