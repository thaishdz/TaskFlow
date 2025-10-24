import { Emoji } from "../Emoji"


export const Card = () => {
    return(
        <div className="flex w-1/2 mx-auto border rounded-lg bg-amber-100 m-6 p-4">
            <div className="flex justify-center items-center w-10 h-10 mr-4 bg-gray-50 rounded-xl border">
                <Emoji name="gym" className="text-2xl" />
            </div>
            <h2 className="text-xl font-bold">GYM</h2>
        </div>
    )
}