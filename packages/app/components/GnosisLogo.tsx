import cls from "./GnosisLogo.module.css"

const GnosisLogo: React.FC = () => (
  <div className={cls.container}>
    <img
      className={cls.logo}
      src="https://socialbureau.finance/images/farms/JUTC.svg"
      alt="Jandra Token Logo"
      height={36}
      width={36}
    />
  </div>
)

export default GnosisLogo
