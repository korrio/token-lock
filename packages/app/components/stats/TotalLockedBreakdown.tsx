import { BigNumber } from "ethers"
import cls from "./TotalLockedBreakdown.module.css"
import useTokenLockConfig from "../useTokenLockConfig"
import useTotalLocked from "../useTotalLocked"
import { formatToken } from "./formatToken"

const TotalLockedBreakdown: React.FC<{ balance?: BigNumber }> = () => {
  const config = useTokenLockConfig()
  const [totalLocked, breakdown] = useTotalLocked()

  return (
    <div className={cls.infoBubble}>
      <img src="/info.svg" alt="Show details" title="Show details" />
      <div className={cls.dropdown}>
        <dl className={cls.breakdown}>
{/*          <div>
            <dt>JUTC locked on BNB Smartchain:</dt>
            <dd>
              {breakdown.bsc
                ? formatToken(breakdown.bsc, config.decimals)
                : "…"}
            </dd>
          </div> */}
          <div>
            <dt>JUTC locked on Goerli Chain:</dt>
            <dd>
              {breakdown.goerli
                ? formatToken(breakdown.goerli, config.decimals)
                : "…"}
            </dd>
          </div>
         {/* <div>
            <dt>GNO staked by Gnosis Beacon Chain validators:</dt>
            <dd>
              {breakdown.staked
                ? formatToken(breakdown.staked, config.decimals)
                : "…"}
            </dd>
          </div>*/}
          <div className={cls.total}>
            <dt>Total locked JUTC:</dt>
            <dd>
              {totalLocked ? formatToken(totalLocked, config.decimals) : "…"}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}

export default TotalLockedBreakdown
