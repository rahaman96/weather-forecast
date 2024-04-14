import { ChangeEvent } from "react"
import { optionType } from "../types"
type Props = {
    term: string
    options: [],
    isLoading:boolean,
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void
    onOptionSelect: (option: optionType) => void
    onSubmit: () => void
}

const Search = ({
    term,
    options,
    isLoading,
    onInputChange,
    onOptionSelect,
    onSubmit
}: Props): JSX.Element => {

    return (
        <main className='flex justify-center items-center bg-gradient-to-br from-sky-400 via-rose-400 to-lime-400 h-[100vh] w-full'>
            <section className='w-full md:max-w-[500px] p-4 flex flex-col text-center items-center justify-center
     md:px-10 lg:p-24 h-full lg:h-[500px] bg-white bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg text-zinc-700'>
                <h1 className='text-4xl font-thin'> Weather <span className='font-black'>Forecast</span></h1>

                <div className="relative flex mt-10 md:mt-4">
                    <input
                        type="text"
                        value={term}
                        onChange={onInputChange}
                        className='px-2 py-1 rounded-l-md border-2 border-white'
                    />
                  {  options.length !==0 &&  <ul className="absolute top-9 bg-white ml-1 rounded-b-md overflow-y-scroll h-[150px] w-[200px] mt-5">
                        {
                          options.map((option: any, index: number) => (
                                <>

                                <li key={option.name + '-' + index}>

                                    <button
                                        onClick={() => onOptionSelect(option)}
                                        className='text-left text-sm w-full hover:bg-zinc-700 
                                    hover:text-white px-2 py-1 cursor-pointer'

                                    >
                                       {`${option.name} (${option.country_code})`}
                                    </button>
                                </li>
                                 {isLoading && <div>Loading...</div>}
                                 </>
                            ))}
                    </ul>}

                    <button className='rounded-r-md border-2 bg-zinc-100  hover:bg-zinc-500 hover:to-zinc-500 to-zinc-1 px-2 py-1 cursor-pointer' onClick={onSubmit}>search</button>
                </div>
            </section>
        </main>
    )
}

export default Search