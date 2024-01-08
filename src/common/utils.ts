import * as xlsx from 'xlsx'

function downloadExcel(sheetName: string, sheetHeader: string[], sheetData: any) {
  // Create a workbook with a single worksheet
  const workbook = xlsx.utils.book_new()
  const worksheet = xlsx.utils.aoa_to_sheet([sheetHeader, ...sheetData])
  xlsx.utils.book_append_sheet(workbook, worksheet, sheetName)

  const wbout = xlsx.write(workbook, { type: 'binary', bookType: 'xlsx' })
  const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${sheetName}.xlsx`
  a.click()
  URL.revokeObjectURL(url)
}

function s2ab(s: string) {
  const buf = new ArrayBuffer(s.length)
  const view = new Uint8Array(buf)
  for (let i = 0; i < s.length; i++) {
    view[i] = s.charCodeAt(i) & 0xff
  }
  return buf
}

function asyncSleep(sec: any) {
  return new Promise((resolve) => setTimeout(resolve, sec * 1000))
}

function downloadCSV(sheetName: string, sheetHeader: string[], sheetData: any) {
  const workbook = xlsx.utils.book_new();
  const worksheet = xlsx.utils.aoa_to_sheet([sheetHeader, ...sheetData]);
  xlsx.utils.book_append_sheet(workbook, worksheet, sheetName);
  const csv = xlsx.utils.sheet_to_csv(worksheet);

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${sheetName}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

export function csvJSON(csv: any) {
  const lines = csv.split('\n')
  const result = []
  const headers = lines[0].split(',')

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i]) continue
    const obj: any = {}
    const currentline = lines[i].split(',')

    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j]
    }
    result.push(obj)
  }
  return result
}


const getNumber = (string: any) => Number(string?.replace(/(,|\$|\/mo)/gim, ''))

const mappedData = (data: any) => {
  return data?.map((el: any) => {
    const monthlyIncome = el.rentZestimate - el.estMonthlyCost
    const annualIncome = monthlyIncome * 12
    const cashOnCash = annualIncome / el.propertyPrice
    const estimates = el.rentZestimate == 0 || el.estMonthlyCost == 0 ? false : true
    return [
      el.propertyUrl,
      el.beds != 0 ? el.beds : '',
      el.baths != 0 ? el.baths : '',
      el.propertyPrice != 0 ? el.propertyPrice : '',
      el.zestimate != 0 ? el.zestimate : '',
      el.estMonthlyCost != 0 ? el.estMonthlyCost : '',
      el.rentZestimate != 0 ? el.rentZestimate : '',
      estimates ? monthlyIncome : '',
      estimates ? annualIncome : '',
      estimates ? cashOnCash : '',
      el.livingArea != 0 ? el.livingArea : '',
      el.daysOnZillow,
      el.lotSize,
      el.lastTaxYear,
      el.lastYearTax,
    ]
  }) || []
}

const mappedDataNew = (data: any) => {
  return data?.map((el: any) => {
    const monthlyIncome = el.rentZestimate - el.estMonthlyCost
    const annualIncome = monthlyIncome * 12
    const cashOnCash = annualIncome / el.propertyPrice
    const estimates = el.rentZestimate == 0 || el.estMonthlyCost == 0 ? false : true
    return [
      el.zillowId,
      el.homeStatus,
      el.price,
      el.taxAssessedValue,
      el.zestimate,
      el.rentZestimate,
      el.estMonthlyCost,
      monthlyIncome,
      annualIncome,
      cashOnCash,
      el.livingArea,
      el.lotAreaValue,
      el.lotAreaUnit,
      el.bathrooms,
      el.bedrooms,
      el.isZillowOwned,
      el.country,
      el.state,
      el.city,
      el.zipcode,
      el.streetAddress,
      el.latitude,
      el.longitude,
      el.address,
      el.brokerName,
      el.imgSrc,
      el.detailUrl,
      el.carouselPhotos
    ]
  }) || []
}
export { downloadExcel, downloadCSV, asyncSleep, getNumber, mappedData, mappedDataNew }
