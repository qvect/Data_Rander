import {
  getLocalStorage,
  setLocalStorage
} from './browserMethods'
import { SCRAPING_STATUS } from './constants'

const addProps = async (prop: any) => {
  const localData = await getLocalStorage()
  const updatedData = { ...localData, props: [...localData.props, ...prop] }
  await setLocalStorage(updatedData)
}

const getAllData = async () => await getLocalStorage()

const initializeDataBase = async () => {
  await updateLocalData({ status: SCRAPING_STATUS.IDLE, props: [] })
}

const changeStatus = async (status: string) => {
  await updateLocalData({ status: status })
}

const updateLocalData = async (data: any) => {
  const allData = await getAllData()
  await setLocalStorage({ ...allData, ...data })
}


export {
  addProps,
  changeStatus,
  getAllData,
  initializeDataBase,
  updateLocalData
}

