import css from './Controls.module.css'
export default function Controls({onPrev, onNext, isFirst, isLast}) {
  return (
    <div className={css.container}>
          <button onClick={onPrev} disabled={isFirst} className={css.btn}>Prev</button>
          <button onClick={onNext} disabled={isLast} className={css.btn}>Next</button>
    </div>
  )
}
