import Browser from 'webextension-polyfill'
import { MessagingMethods } from '../common/browserMethods'
import { MESSAGING, SCRAPING_STATUS } from '../common/constants'
import { addProps, changeStatus, initializeDataBase } from '../common/services'
import { asyncSleep, getNumber } from '../common/utils'
import { getAllData } from '../common/services'

const { runTimeMessage } = new MessagingMethods()

const refreshPopupData = async () => await runTimeMessage({ message: MESSAGING.FETCH_REFRESH_DATA })


// window.__NEXT_DATA__.props.pageProps.searchPageState.cat1.searchResults.listResults
// full data in redux searchResults> mapResults

const propDetails = () => {
  const propertyUrl = window.location.href
  const priceRef = document.querySelector("[data-testid='price']") as HTMLElement
  const propertyPrice = getNumber(priceRef?.innerText) || 0

  const zestimateRef = document.querySelector(
    '[data-testid="zestimate-text"] span span',
  ) as HTMLElement
  const zestimate = getNumber(zestimateRef?.innerText) || 0
  const rentZestimateRef = document.querySelector('#ds-rental-home-values span') as HTMLElement
  const rentZestimate = getNumber(rentZestimateRef?.innerText) || 0
  const estMonthlyCostRef = Array.from(document.querySelectorAll('span')) as HTMLElement[]
  const estMonthlyCost =
    estMonthlyCostRef
      ?.find((el) => el?.innerText?.includes('Est. payment'))
      ?.parentElement?.querySelector('span:nth-child(2)')?.innerHTML || ''

  const daysRef = Array.from(
    document.querySelectorAll('.data-view-container strong'),
  ) as HTMLElement[]
  const daysOnZillow = getNumber(
    daysRef?.find((el) => el?.innerText?.includes('days'))?.innerText?.replace(/\s?days/, ''),
  )

  const lotRef = Array.from(document.querySelectorAll("li[class*='ListItem']")) as HTMLElement[]

  const lotSize = lotRef
    ?.find((el) => el?.innerText?.includes('Lot size'))
    ?.innerText?.replace(/\s?Lot size:\s?/, '')

  const lastTaxYearRef = document.querySelector(
    '[aria-label="Table of tax history"] tbody tr th span',
  ) as HTMLElement

  const lastTaxYear = lastTaxYearRef?.innerText || ''
  const lastYearTaxRef = document.querySelector(
    '[aria-label="Table of tax history"] tbody tr td span',
  ) as HTMLElement
  const lastYearTax = getNumber(lastYearTaxRef?.innerText) || ''
  let data: any = {
    propertyUrl,
    propertyPrice,
    zestimate,
    estMonthlyCost: getNumber(estMonthlyCost) || 0,
    rentZestimate,
    daysOnZillow,
    lotSize,
    lastTaxYear,
    lastYearTax,
  }

  const bedBathRef = Array.from(
    document.querySelectorAll('[data-testid="bed-bath-item"]'),
  ) as HTMLElement[]

  if (bedBathRef.length) {
    const beds = bedBathRef
      ?.find((el) => el?.innerText.includes('bd'))
      ?.querySelector('strong')?.innerText

    const baths = bedBathRef
      ?.find((el) => el?.innerText.includes('ba'))
      ?.querySelector('strong')?.innerText

    const livingArea = bedBathRef
      ?.find((el) => el?.innerText.includes('sqft'))
      ?.querySelector('strong')?.innerText
    data = {
      ...data,
      beds: getNumber(beds) || 0,
      baths: getNumber(baths) || 0,
      livingArea: getNumber(livingArea) || 0,
    }
  }
  return data
}

const collectData = async (currentPage = false, fastScrap = false) => {
  await initializeDataBase()
  await changeStatus(SCRAPING_STATUS.COLLECTING)
  await refreshPopupData()
  const element = document.querySelector('.search-page-list-container') as HTMLElement

  await asyncSleep(3)
  const pagesRef = document.querySelector('[class="result-count"]') as HTMLElement
  let pages =
    Math.ceil(Number(pagesRef?.innerText.replace(/\s?(result|results|,)s?/gim, '')) / 40) || 1
  if (currentPage) pages = 1

  for (let page = 1; page <= pages; page++) {
    const data = await getAllData()

    if (data.status == SCRAPING_STATUS.IDLE) break
    if (fastScrap) {
      const props = []
      const win: any = window
      const data = JSON.parse(win.__NEXT_DATA__.innerText)?.props?.pageProps?.searchPageState?.cat1?.searchResults?.listResults
      debugger
      for (let propItem of data) {
        const {
          hdpData,
          address,
          brokerName,
          imgSrc,
          detailUrl,
          carouselPhotos,
        } = propItem
        const {
          zpid: zillowId,
          homeStatus,
          price,
          taxAssessedValue,
          zestimate,
          rentZestimate,
          livingArea,
          lotAreaValue,
          lotAreaUnit,
          bathrooms,
          bedrooms,
          isZillowOwned,
          country,
          state,
          city,
          zipcode,
          streetAddress,
          latitude,
          longitude
        } = hdpData.homeInfo
        const estMonthlyCost = price * 1.17
        const collectedProp = {
          zillowId,
          homeStatus,
          price,
          taxAssessedValue,
          zestimate,
          rentZestimate,
          estMonthlyCost,
          livingArea,
          lotAreaValue,
          lotAreaUnit,
          bathrooms,
          bedrooms,
          isZillowOwned,
          country,
          state,
          city,
          zipcode,
          streetAddress,
          latitude,
          longitude,
          address,
          brokerName,
          imgSrc,
          detailUrl,
          carouselPhotos: carouselPhotos.map((el: any) => el.url).join(","),
        }
        props.push(collectedProp)
      }
      await addProps(props)
      await refreshPopupData()
    } else {
      const allPropsRef = document.querySelectorAll(
        '[class*="ListItem"]:not([data-test="search-list-first-ad"],.nav-ad-empty)',
      )
      const allProps = Array.from(allPropsRef) as HTMLElement[]
      for (const prop of allProps) {
        element.scroll({
          top: prop.offsetTop,
          behavior: 'smooth',
        })

        const findElement = async () => {
          await asyncSleep(0.5)
          const itemRef = prop.querySelector(
            "[class^='StyledPropertyCardDataWrapper']",
          ) as HTMLElement
          if (!itemRef) findElement()
        }

        await findElement()

        const itemRef = prop.querySelector("[class^='StyledPropertyCardDataWrapper']") as HTMLElement
        itemRef.click()
        await asyncSleep(5)

        const collectedProp = propDetails()
        await addProps(collectedProp)
        await refreshPopupData()
        const closeButtonRef = document.querySelector('.hc-back-to-list') as HTMLElement
        closeButtonRef.click()
        await asyncSleep(3)
      }
    }
    const disableRef = document.querySelector("[title='Next page']") as HTMLElement
    const noMorePages = disableRef.hasAttribute('disabled')
    debugger
    if (noMorePages) break
    if (page !== pages) {
      const paginationRef = document.querySelectorAll('[aria-label="Pagination"] ul li')
      const paginations = Array.from(paginationRef) as HTMLElement[]
      const pagItemRef = paginations[paginations.length - 1].querySelector('a') as HTMLElement
      pagItemRef.click()
      await asyncSleep(7)
    }
  }
}

const entry = () => {
  Browser.runtime.onMessage.addListener(async function (request, tabInfo) {
    const { message } = request

    if (message === MESSAGING.COLLECT_ALL_PAGES_DATA) {
      await collectData(false, true)
    } else if (message === MESSAGING.COLLECT_CURRENT_PAGE_DATA) {
      await collectData(true)
    }
  })
}

entry()
