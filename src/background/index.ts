import Browser from 'webextension-polyfill'
import { MessagingMethods, activeTabData, setLocalStorage } from '../common/browserMethods'
import { MESSAGING, SCRAPING_STATUS } from '../common/constants'
import {
  changeStatus
} from '../common/services'

const { tabMesageWithId, runTimeMessage } = new MessagingMethods()


const startDataCollection = async () => {
  const activeTab = await activeTabData()
  const tabId = activeTab.id
  await tabMesageWithId(tabId || 0, {
    message: MESSAGING.COLLECT_ALL_PAGES_DATA,
  })

  await changeStatus(SCRAPING_STATUS.READY_FOR_DOWNLOAD)
  await runTimeMessage({ message: MESSAGING.FETCH_REFRESH_DATA })
}

Browser.runtime.onMessage.addListener(async (request, tabInfo) => {
  const { message } = request
  if (message == MESSAGING.START_DATA_COLLECTION) {
    await startDataCollection()
  }
})

Browser.runtime.onInstalled.addListener(async () => {
  await setLocalStorage({ status: SCRAPING_STATUS.IDLE, props: [] })
})

Browser.runtime.onMessage.addListener(async (request, tabInfo) => {
  const { message, data } = request
  const { tab } = tabInfo
  const tabId = tab?.id || 0
  return true
})