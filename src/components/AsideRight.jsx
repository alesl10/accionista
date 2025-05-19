import MyCalendar from "./Calendar.jsx";
import CardLey from "./CardLey.jsx";
import { MdOutlineCloudDownload } from "react-icons/md";

const AsideRight = () => {
  return (
    <aside className="flex flex-col gap-6">
    <MyCalendar />

    <div
      className=" flex gap-2  text-red-800 p-2 rounded-xl m-auto shadow-lg shadow-gray-600 items-center font-semibold relative  border-t-[12px] border-red-800 hover:bg-red-700/10 cursor-pointer"
    >
      <MdOutlineCloudDownload className="size-12" />
      <div className="text-md">Descargue este Diario en PDF</div>
      
    </div>
       <CardLey numeroLey="19.550" descripcion="Sociedades Comerciales" />
    <CardLey
      numeroLey="22.315"
      descripcion="Ley orgánica de Inspeccion General de Justicia"
    />
    </aside>
  )
}

export default AsideRight