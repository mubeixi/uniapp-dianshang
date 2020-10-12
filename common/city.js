import T from '@/common/langue/i18n' 
import { area } from './area'
import { array_change } from './util'

const areaData = area[0]

export class City {
  // 直接返回
  static getProvinceList () {
    const rt = areaData['0']
    return array_change(rt)
  }

  static getCityList (pIdx) {
    const rt = areaData[('0,' + pIdx)]
    return array_change(rt)
  }

  static getAreaList (pIdx, cIdx) {
    const rt = areaData[`0,${pIdx},${cIdx}`]
    return array_change(rt)
  }
}
