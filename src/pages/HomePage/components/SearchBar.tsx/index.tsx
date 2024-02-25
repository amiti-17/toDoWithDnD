'use client'

import { FormEvent } from "react";
import style from "./style.module.css";

export default function SearchBar() {

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    console.log(event);
  } // TODO: should be implemented

  return (
    <div className={style.formWrapper}>
      <form onSubmit={onSubmit} className={style.form}>
        <input className={style.input} placeholder="Search board by id..."></input>
        <button type="submit" className={style.submitButton}>Search</button>
      </form>
    </div>
  )
}