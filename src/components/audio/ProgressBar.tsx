
const ProgressBar = () => {
  return (
    <div className="w-full flex flex-col gap-[5px]">
      <input 
        type="range"
        min="1"
        max="100"
        value={50}
        step="0.25"
        className="slider"
      />
      <div className="flex w-full justify-between">
        <span className="text-xs">0:00</span>
        <span className="text-xs">3:00</span>
      </div>
    </div>
  )
}

export default ProgressBar