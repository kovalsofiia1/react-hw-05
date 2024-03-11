import css from './SearchForm.module.css'

export default function SearchForm({ onSubmit }) {

  return (
    <div>
          <form onSubmit={(e)=> onSubmit(e)} className={css.form}>
        <input type="text" placeholder='Search movies' id="search" className={ css.input} />
            <button className={css.btn}>Search</button>
        </form>
    </div>
  )
}
