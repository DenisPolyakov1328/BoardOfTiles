import preloader from './../../../assets/preloader.gif'

const Preloader = () => {
  return (
    <div className="flex justify-center items-center">
      <img src={preloader} alt="preloader" />
    </div>
  )
}

export default Preloader
