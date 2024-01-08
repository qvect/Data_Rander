const MESSAGING = {
  FETCH_REFRESH_DATA: 'FETCH_REFRESH_DATA',
  START_DATA_COLLECTION: 'START_DATA_COLLECTION',
  COLLECT_ALL_PAGES_DATA: 'COLLECT_ALL_PAGES_DATA',
  COLLECT_CURRENT_PAGE_DATA: 'COLLECT_CURRENT_PAGE_DATA',
}


const SCRAPING_STATUS = {
  IDLE: 'IDLE',
  COLLECTING: 'COLLECTING',
  READY_FOR_DOWNLOAD: 'READY_FOR_DOWNLOAD',
}

const FIREBASE_INIT = {
  apiKey: 'AIzaSyA9N_8DZNynJg7k9GhMzsDJPzPgFkByRgc',
  authDomain: 'linkedin-scrapper-38341.firebaseapp.com',
  projectId: 'linkedin-scrapper-38341',
  storageBucket: 'linkedin-scrapper-38341.appspot.com',
  messagingSenderId: '759247881103',
  appId: '1:759247881103:web:d524993bdfb1bc5c81c1fa',
  measurementId: 'G-K30RK7RRJ5',
}

const EXPORT_HEADERS = [
  'Property URL',
  'Bedrooms',
  'Bathrooms',
  'Property price (USD)',
  'Zestimate',
  'Estimated monthly cost',
  'Rent zestimate',
  'Total monthly income',
  'Total annual income',
  'Cash on cash',
  'Living area',
  'Days on zillow',
  'Lot size',
  'Last tax year',
  'Last year tax',
]
const EXPORT_HEADERS_NEW = [
  "zillowId",
  "homeStatus",
  "price",
  "taxAssessedValue",
  "zestimate",
  "rentZestimate",
  "estMonthlyCost",
  "monthlyIncome",
  "annualIncome",
  "cashOnCash",
  "livingArea",
  "lotAreaValue",
  "lotAreaUnit",
  "bathrooms",
  "bedrooms",
  "isZillowOwned",
  "country",
  "state",
  "city",
  "zipcode",
  "streetAddress",
  "latitude",
  "longitude",
  "address",
  "brokerName",
  "imgSrc",
  "detailUrl",
  "carouselPhotos"
]


export { MESSAGING, FIREBASE_INIT, SCRAPING_STATUS, EXPORT_HEADERS, EXPORT_HEADERS_NEW }
