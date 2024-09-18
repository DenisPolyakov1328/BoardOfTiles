const RestartButton = ({ onReset }) => {
  return (
    <button
      className="mt-4 px-5 py-3 bg-fuchsia-600 hover:bg-fuchsia-800 text-white rounded-lg shadow-lg"
      onClick={onReset}
    >
      RESTART
    </button>
  )
}

export default RestartButton
