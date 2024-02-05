export default function StatViewer ({ nameMap, setChartData, stat }) {
  return (
    <div className='flex grow h-24 gap-2 items-center bg-zinc-300 rounded-3xl justify-around'>
      {Object.keys(nameMap).map((key, idx) => {
        return (
          <div
            key={idx} className='text-center cursor-pointer'
            onClick={() => setChartData({
              chartName: key,
              chartTitle: nameMap[key]
            })}
          >
            <p>{nameMap[key]}</p>
            <p>{`${stat[key].count}`}</p>
          </div>
        )
      })}
    </div>
  )
}
