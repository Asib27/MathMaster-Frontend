import RankViewer from './rankViewer'

export default function SideBySideRankViewer ({
  topName,
  list1Name,
  list2Name,
  data,
  countPrefix,
  linkPrefix
}) {
  return (
    <div className='px-10'>
      <h1 className='text-2xl border-b-4 border-blue-600 pb-3'>{topName}</h1>
      <div className='flex gap-5'>
        <RankViewer
          data={data.top5}
          name={list1Name}
          countPrefix={countPrefix}
          linkPrefix={linkPrefix}
        />

        <RankViewer
          data={data.least5}
          name={list2Name}
          countPrefix={countPrefix}
          linkPrefix={linkPrefix}
        />
      </div>
    </div>
  )
}
