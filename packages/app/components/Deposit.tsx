import { BigNumber } from "ethers"
import { useEffect, useMemo, useState } from "react"
import { useAccount, useWaitForTransaction } from "wagmi"
import { CONTRACT_ADDRESSES } from "../config"
import Balance from "./Balance"
import Button from "./Button"
import Card from "./Card"
import AmountInput from "./AmountInput"
import Spinner from "./Spinner"
import { useTokenContractRead, useTokenContractWrite } from "./tokenContract"
import { useTokenLockContractWrite } from "./tokenLockContract"
import useChainId from "./useChainId"
import useTokenLockConfig from "./useTokenLockConfig"
import utility from "../styles/utility.module.css"
import Notice from "./Notice"

import clsx from "clsx"
import Field from "./Field"
// import cls from "./Field.module.css"
import cls from "./Packages.module.css"
import { formatUnits } from "ethers/lib/utils"

const Deposit: React.FC = () => {
  const [amount, setAmount] = useState<BigNumber | undefined>(undefined)

  const [dismissedErrors, setDismissedErrors] = useState<Error[]>([])

  const chainId = useChainId()
  const { decimals, tokenSymbol } = useTokenLockConfig()
  const [{ data: accountData }] = useAccount()
  const [{ data: balanceOf }] = useTokenContractRead("balanceOf", {
    args: accountData?.address,
    skip: !accountData?.address,
    watch: true,
  })

  const balance = balanceOf as undefined | BigNumber

  const contractAddress = CONTRACT_ADDRESSES[chainId]
  const allowanceArgs = useMemo(
    () => [accountData?.address, contractAddress],
    [accountData?.address, contractAddress]
  )
  const [{ data: allowance }] = useTokenContractRead("allowance", {
    args: allowanceArgs,
    skip: !accountData?.address,
    watch: true,
  })

  const [approveStatus, approve] = useTokenContractWrite("approve")
  const [approveWait] = useWaitForTransaction({
    hash: approveStatus.data?.hash,
  })
  const [depositStatus, deposit] = useTokenLockContractWrite("deposit")
  const [depositWait] = useWaitForTransaction({
    hash: depositStatus.data?.hash,
  })

  const needsAllowance =
    amount && amount.gt(0) && allowance && allowance.lt(amount)

  const approvePending = approveStatus.loading || approveWait.loading
  const depositPending = depositStatus.loading || depositWait.loading

  const error =
    approveStatus.error ||
    approveWait.error ||
    depositStatus.error ||
    depositWait.error

  // clear input after successful deposit
  const depositedBlock = depositWait.data?.blockHash
  useEffect(() => {
    if (depositedBlock) {
      setAmount(undefined)
    }
  }, [depositedBlock])

  const label = "Select a package"
  const meta = ""

  const tokenPrice = 0.0125;

  const balance10InUsd = BigNumber.from("800000000000000000000");
  const balance100InUsd = BigNumber.from("8000000000000000000000");;
  const balance500InUsd = BigNumber.from("45000000000000000000000");


  return (
    <Card>
     
      <Balance label="Balance" />

      <label className={clsx("", cls.container)}>
        <div className={cls.header}>
          {label && <span className={cls.label}>{label}</span>}
          {meta && <span className={cls.meta}>{meta}</span>}
        </div>
      </label>
      <dl className={`${cls.container}`}>
        <div className={`${cls.item}`}>
          <Button
              primary
              onClick={() => {
              if (balance) {
                setAmount(balance10InUsd)
              }}}>
              $10
          </Button>
        </div>
        <div className={`${cls.item}`}>
          <Button
                primary
                onClick={() => {
                if (balance) {
                  setAmount(balance100InUsd)
                }}}>
                $100
          </Button>
        </div>
        <div className={`${cls.item}`}>
          <Button
              primary
              onClick={() => {
              if (balance) {
                setAmount(balance500InUsd)
              }}}>
              $500
          </Button>
        </div>
      </dl>
      <AmountInput
        name="depositAmount"
        unit="JUTC"
        className={utility.mt4}
        value={amount}
        max={balance}
        decimals={decimals}
        onChange={setAmount}
        disabled={approvePending || depositPending}
        meta={
          <Button
            link
            disabled={
              !balance || balance.isZero() || approvePending || depositPending
            }
            onClick={() => {
              if (balance) {
                setAmount(balance)
              }
            }}
          >
            Lock Max
          </Button>
        }
      />
      {needsAllowance ? (
        <Button
          primary
          disabled={
            amount.isZero() || (balance && amount.gt(balance)) || approvePending
          }
          onClick={() =>
            approve({
              args: [contractAddress, amount],
            })
          }
        >
          Allow locking contract to use your {tokenSymbol}
          {approvePending && <Spinner />}
        </Button>
      ) : (
        <Button
          primary
          disabled={
            !amount ||
            amount.isZero() ||
            (balance && amount.gt(balance)) ||
            depositPending
          }
          onClick={async () =>
            deposit({
              args: [amount],
            })
          }
        >
          Lock {tokenSymbol}
          {depositPending && <Spinner />}
        </Button>
      )}

      <Balance className={utility.mt8} lockToken label="Locked Balance" />

      {error && !dismissedErrors.includes(error) && (
        <Notice
          onDismiss={() => {
            setDismissedErrors([...dismissedErrors, error])
          }}
        >
          {error.message}
        </Notice>
      )}
    </Card>
  )
}

export default Deposit
