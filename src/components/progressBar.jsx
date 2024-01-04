export default function ProgressBar ({ complete, className }) {
  if (complete < 1) {
    complete *= 100
  }

  return (
    <div className={'w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 ' + className}>
      <div className='bg-green-500 h-2.5 rounded-full' style={{ width: `${complete}%` }} />
    </div>
  )
}
