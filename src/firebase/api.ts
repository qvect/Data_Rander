import axios from 'axios'

import { addADoc, getADoc, getUserData, updateUserData } from './firestoreMethods'

const setUsersData = async (id: string, data: any) => {
  return await addADoc('users', id, data)
}

const getUsersData = async (id: string) => {
  const respo = await getADoc('users', id)
  return respo.data
}



const setUserQuota = async (tokenId: string, prevQuota: number) => {
  let newQuota = prevQuota - 1
  if (newQuota <= 0) {
    newQuota = 0
  }

  return await updateUserData('token', tokenId, { quota: newQuota })
}



const initQuota = async (email: string) => await setUsersData(email, { quota: 10 })

const getUserQuota = async (id: string) => {
  const resp: any = await getUsersData(id)
  return resp.quota
}

const verifyEmail = async (email: string) => {
  try {
    const resp = await axios.get(
      `https://api.bouncify.io/v1/verify?apikey=xnz009olzeagfaolq7xuzgcs5bzd0f3c&email=${email}`,
    )
    return resp.data.result == 'deliverable'
  } catch {
    return false
  }
}

const setEmailData = async (linkedinAccount: string, email: string) => {
  return await addADoc('emails', linkedinAccount, { email })
}

const getEmailData = async (linkedinAccount: string) => {
  const respo = await getADoc('emails', linkedinAccount)
  return respo.data
}

const verifyPaypalSubscription = async (subscriptionId: string) => {
  const resp = await axios.get(
    `https://api-m.sandbox.paypal.com/v1/billing/subscriptions/${subscriptionId}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      auth: {
        username:
          'Abz3mjZatyTYoc2Q9FrAqcP8IxFqZeNUjnM3RZg78HUKPM0htUC8PSFctofg_kdhRuzXAGHzCqhmDCB3',
        password:
          'EOztXEyo8w4Z86CWc-YakKJ4L-4gYJ4HyUFyFD-g3LLbb6M-QDElmYzQHkjuddMLyFLBJqfok2b-Br5n',
      },
    },
  )
  return resp
}

export {
  verifyEmail,
  setUsersData,
  getUsersData,
  setUserQuota,
  getUserQuota,
  initQuota,
  getUserData,
  verifyPaypalSubscription,
  setEmailData,
  getEmailData
}
