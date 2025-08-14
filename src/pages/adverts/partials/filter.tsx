import { type ChangeEvent } from "react";
import type { FilterByAdverts, FiltersKey, FiltersTypeValues } from "../types";
import TagsSelected from "../../../components/tags/tags-selected";

interface FilterProps {
  filters: FilterByAdverts;  
  showByCategory: string;
  onChange:(key:FiltersKey,value:FiltersTypeValues,toRemove?:boolean)=>void;  
}
const Filter = ({
  filters,  
  showByCategory,
  onChange  
}: FilterProps) => {  

  const typesAdvert = ['compra','venta','todos']

  // const [sale,setSale] = useState<boolean|undefined>()
  const { sale } = filters

  const saleSelected = sale === true 
  ? 'venta' 
  : sale === false ? 'compra' : 'todos'

  const { tags } = filters
  
  function handleChangeTags(tag:string) {      
    onChange('tags',tag) 
  }  
  function handleRemoveTagSelected(tag:string) {       
    onChange('tags',tag,true)    
  }
  function handleChangeType(e: ChangeEvent<HTMLInputElement>) {    
    const [compra,venta] = typesAdvert
    switch (e.target.value) {
      case compra:        
        onChange('sale',false)
        break;
      case venta:
        onChange('sale',true)        
        break;
      default:
        onChange('sale',undefined)        
        break;
    }

  }
  function handleChangeName(e: ChangeEvent<HTMLInputElement>) {    
    onChange('name',e.target.value)
  }
  return (
    <div className="flex flex-col gap-5 p-3 md:sticky md:top-[var(--h-header-md)] md:left-0 md:self-start [&>div]:flex [&>div]:flex-col">
      <h3 className="font-sans text-2xl font-medium tracking-widest text-emerald-900">
        Filtros
      </h3>
      <div>
        <label
          htmlFor=""
          className="text-lg font-medium tracking-wider text-emerald-700"
        >
          Nombre
        </label>
        <input
          value={filters.name}
          onChange={handleChangeName}
          type="text"
          className="rounded-lg border border-emerald-500 px-3 py-1 focus:outline-emerald-700"
        />
      </div>
      <div>
        <h3 className="text-lg font-medium tracking-wider text-emerald-700">
          Tipo de Anuncio
        </h3>
        <div className="flex flex-col gap-2 [&>label]:cursor-pointer [&>label]:text-emerald-600 [&>label]:transition-colors [&>label]:duration-300 [&>label]:has-checked:font-medium [&>label]:has-checked:text-emerald-800 [&>label>input]:cursor-pointer">
          { typesAdvert.map(typeAdvert => (
            <label 
            key={typeAdvert}
            className="grid grid-cols-[40px_1fr]" 
            htmlFor={typeAdvert}>
            <input
              checked={typeAdvert === saleSelected}
              onChange={handleChangeType}
              type="radio"
              name="sale"
              value={typeAdvert}
              id={typeAdvert}
            />
            <span>{`${typeAdvert.slice(0,1).toUpperCase()}${typeAdvert.slice(1)}`}</span>
          </label>
          )) }          
        </div>
      </div>
      {!showByCategory && (        
        <TagsSelected 
        onChangeTags={handleChangeTags}
        onDeleteTagSelected={handleRemoveTagSelected}   
        tagsSelected={tags}     
        />
      )}
    </div>
  );
};

export default Filter;
