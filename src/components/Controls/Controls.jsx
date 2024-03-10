
export default function Controls({onPrev, onNext, isFirst, isLast}) {
  return (
    <div>
          <button onClick={onPrev} disabled={isFirst}>Prev</button>
          <button onClick={onNext} disabled={isLast} >Next</button>
    </div>
  )
}
