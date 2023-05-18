import Card from "../Card"

import classes from "./UseGnoBanner.module.css"

const UseGNOBanner = () => {
  return (
    <a href="#" className={classes.cardLink}>
      <Card className={classes.card}>
        <img src="https://socialbureau.finance/images/farms/JUTC.svg" alt="an imagined solarpunk future" />
        <h2>Why lock your JUTC?</h2>
        <p>
          Click here to explore all the valuable uses of JUTC in various SocialBureau&apos;s dApps
        </p>
      </Card>
    </a>
  )
}

export default UseGNOBanner
