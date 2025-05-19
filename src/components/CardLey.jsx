import { GoLaw } from "react-icons/go";

const CardLey = ({numeroLey, descripcion}) => {
  return (
  <div
  className="flex  gap-2  text-blue-950 p-2 rounded-xl m-auto shadow-lg shadow-gray-600 items-center font-semibold relative  border-t-[12px] border-blue-950 w-full hover:border-gray-500 cursor-pointer"

  // style={{background:'linear-gradient(to bottom right, #213867 50%, #83c1f7 100%)' }}
  >
  
< GoLaw className="size-8 shrink-0"/>

  <div className="flex flex-col items-center text-center">
    <div className="text-md font-bold tracking-wide">LEY N° {numeroLey}</div>
    <div className="text-sm border-t border-blue-950 ">
    {descripcion}
    </div>
  </div>

</div>
  )
}

export default CardLey