// import Area from './tool/area.js'
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
    //const citys = []

    const rt = areaData[('0,' + pIdx)]
    return array_change(rt)
    // for(var province of Area){
    //     if(province.name === pName){
    //         citys = province.city
    //     }
    // }
    //
    // let rt = citys.map(city=>{
    //     return city.name
    // })
    // return rt
  }

  static getAreaList (pIdx, cIdx) {
    // let citys = []
    // for(var province of Area){
    //     if(province.name === pName){
    //         citys = province.city
    //     }
    // }
    //
    // let cityInfo = null
    // for(var city of citys){
    //     if(city.name === cName){
    //         cityInfo = city
    //     }
    // }

    const rt = areaData[`0,${pIdx},${cIdx}`]

    return array_change(rt)
  }
}
