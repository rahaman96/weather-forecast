import React from 'react'
import Wind from './Components/Icons/Wind'
import Feels from './Components/Icons/Feels'
import Humidity from './Components/Icons/Humidity'
import Visibility from './Components/Icons/Visibility'
import Pressure from './Components/Icons/Presure'
import Pop from './Components/Icons/Pop'



type Props = {
    icon: 'wind' | 'feels' | 'humidity' | 'visibility' | 'pressure' | 'pop'
    title: string
    info: string | JSX.Element
    description: string
}

const icons = {
    wind: Wind,
    feels: Feels,
    humidity: Humidity,
    visibility: Visibility,
    pressure: Pressure,
    pop: Pop,
}
const Title = ({ icon,
    title,
    info,
    description
}: Props): JSX.Element => {
    const Icon = icons[icon]
    return (
        <article className='w-[140px] h-[130px] to-zinc-700 bg-white/20
        backdrop-blur-lg rounded drop-shadow-lg p-2 mb-5 flex flex-col justify-between'>
            <div className="flex items-center text-sm font-bold">
            <Icon /> <h4 className='ml-1'>{title}</h4>
            </div>
            <h3 className='mt-2 text-lg'>
{info}
            </h3>
            <p className='text-xs font-bold'>{description}</p>
        </article>
    )
}

export default Title