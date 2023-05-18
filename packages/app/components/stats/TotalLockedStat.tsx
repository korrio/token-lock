import { formatToken } from "./formatToken"
import cls from "./Stats.module.css"
import useTokenLockConfig from "../useTokenLockConfig"
import useTotalLocked from "../useTotalLocked"
import TotalLockedBreakdown from "./TotalLockedBreakdown"

const TotalLockedStat: React.FC = () => {
  const config = useTokenLockConfig()
  const [totalLocked] = useTotalLocked()

  console.log("totalLocked",totalLocked);

  return (
    <div className={`${cls.item} ${cls.fullWidth}`}>
      <dt>
        <div className={cls.label}>Total JUTC Locked</div>
        <TotalLockedBreakdown />
      </dt>

      <dd>{totalLocked ? formatToken(totalLocked, config.decimals) : "…"}</dd>
    </div>
  )
}

export default TotalLockedStat
