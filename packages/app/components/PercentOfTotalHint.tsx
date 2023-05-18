import { BigNumber } from "ethers"
import { formatToken } from "./stats/formatToken"
import cls from "./PercentOfTotal.module.css"
import useTokenLockConfig from "./useTokenLockConfig"
import useTotalLocked from "./useTotalLocked"

const SUPPLY_OF_COW = 50000000

const formatAmount = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    maximumSignificantDigits: 6,
  }).format(amount)

const PercentOfTotalHint: React.FC<{ balance?: BigNumber }> = ({ balance }) => {
  const [totalLocked] = useTotalLocked()

  const percent =
    balance && totalLocked && totalLocked.gt(0)
      ? balance.mul(100).mul(1e4).div(totalLocked).toNumber() / 1e4 // precision to 4 decimal places
      : 0

  if (percent === 0) return null

  return (
    <div className={cls.container}>
      {percent}% of total
      <div className={cls.infoBubble}>
        <img src="/info.svg" alt="Learn more" />
        <div className={cls.dropdown}>
          <p>
            Your current share of the total locked JUTC would give you a grant to be an Inspector or Data seller depends on SocialBureau&apos;s dApp you are participating. <br/> 
{/*            <strong>
              ~{formatAmount((percent / 100) * SUPPLY_OF_COW)} $COW.
            </strong>{" "} */}
            This value will go down as more people lock their JUTC.
          </p>
          <p>
            A total of 50M $JUTCv2 allocation are distributed to people committing to hold
            their JUTC long-term.
          </p>
        </div>
      </div>
    </div>
  )
}

export default PercentOfTotalHint
