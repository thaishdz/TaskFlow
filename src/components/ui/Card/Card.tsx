import { Emoji } from "../Emoji"


export const Card = () => {
    return(
        <>
            <div className="flex w-1/2 mx-auto rounded-xl bg-yellow-200 m-6 p-4 shadow-lg">
                <div className="flex items-center">
                    <div className="flex justify-center items-center w-10 h-10 mr-4 bg-gray-50 rounded-xl p-6 shadow-lg">
                        <Emoji name="chores" className="text-2xl" />
                    </div>
                    <h2 className="text-xl font-bold">Chores</h2>
                </div>
            </div>
        </>
    )
}