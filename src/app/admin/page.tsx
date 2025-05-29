import { MdDashboard, MdArticle, MdCampaign, MdPeople } from "react-icons/md";


export default function Dashboard() {
    return (
        <div className="grid grid-cols-2 grid-rows-2 w-full h-full  ">
            <div className="col-span-1 row-span-1 flex items-center justify-center border-gray-300 cursor-pointer  text-secondary border-b-4 border-r-4 group hover:bg-secondary/30 ">
                <MdPeople className="size-24"/>
            </div>
            <div className="col-span-1 row-span-1 flex items-center justify-center border-gray-300  cursor-pointer text-secondary border-b-4 group hover:bg-secondary/30">
                <MdCampaign className="size-24"/>
            </div>
            <div className="col-span-1 row-span-1 flex items-center justify-center border-gray-300  cursor-pointer text-secondary border-r-4 group hover:bg-secondary/30">
                <MdArticle className="size-24"/>
            </div>
            <div className="col-span-1 row-span-1 flex items-center justify-center border-gray-300 cursor-pointer text-secondary  group hover:bg-secondary/30">
                <MdDashboard className="size-24"/>
            </div>
           
        </div>
    )
}