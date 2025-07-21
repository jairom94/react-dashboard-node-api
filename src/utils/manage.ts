import type { Advert, FilterByAdverts } from "../pages/adverts/types";

export default {
    filterAdverts(adverts:Advert[],rawFilters:FilterByAdverts){
        // console.log(rawFilters);
        
        return adverts.filter((advert)=>{
            const testFilters = []
            if (rawFilters.name) {
                testFilters.push(advert.name.toLowerCase().startsWith(rawFilters.name))
            }
            if(rawFilters.type){
                if(rawFilters.type === 'venta' || rawFilters.type === 'compra'){
                    const sale = rawFilters.type === 'venta'
                    testFilters.push(advert.sale === sale)
                }
                // const sale = rawFilters.type === 'venta' ? true :
                // rawFilters.type === 'compra' ? false : 'todos'
                // if(typeof sale === 'boolean'){
                //     testFilters.push(advert.sale === sale)
                // }
            }
            if(rawFilters.tags.length > 0){
                testFilters.push(rawFilters.tags.some(tag => advert.tags.includes(tag)))
            }
            return testFilters.every(value=>value)
        })
    }
}