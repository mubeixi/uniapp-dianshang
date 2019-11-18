// import Area from './tool/area.js'
import {area} from './area';
const areaData = area[0];
console.log(areaData)
import {array_change} from "./util";

export class City {

    //直接返回
    static getProvinceList = ()=>{
        let rt = areaData[`0`]
        return array_change(rt)
    }

    static getCityList = (pIdx)=>{
        let citys = []
        console.log('0,'+pIdx)
        let rt = areaData[('0,'+pIdx)]
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

    static getAreaList = (pIdx,cIdx)=>{

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
        // console.log(cityInfo)

        let rt = areaData[`0,${pIdx},${cIdx}`]
        console.log(rt)

        return array_change(rt)
    }

}
