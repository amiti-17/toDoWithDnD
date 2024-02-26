'use client'

import { FormEvent, useState } from "react";
import style from "./style.module.css";
import CollapseActions from "./CollapseActions";
import ButtonsGroup from "./ButtonsGroup";

export default function SearchBar() {

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    console.log(event);
  } // TODO: should be implemented
  
  const [ collapseIsOpen, setCollapseIsOpen ] = useState<boolean>(false);

  return (
    <header className={style.formWrapper}>
      <form onSubmit={onSubmit} className={style.form}>
        <input className={`${style.input} ${style.formElements}`} placeholder="Search board by id..."></input>
        <ButtonsGroup setCollapseIsOpen={setCollapseIsOpen} styleFromElements={style.formElements} />
      </form>
      <CollapseActions isOpened={collapseIsOpen} />
    </header>
  )
}