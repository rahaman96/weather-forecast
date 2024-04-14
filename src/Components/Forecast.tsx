import React from 'react'
import { forecastType } from '../types'
import Sunrise from './Sunrise'
import Sunset from './Sunset'
import { getHumidityValue, getPop, getSunTime, getVisibilityValue, getWindDirection } from '../helpers'
import Title from '../Title'
type Props = {
    data: forecastType
}

const Degree = ({ temp }: { temp: number }): JSX.Element => (
    <span>
        {temp} <sup>o</sup>
    </span>
)


const Forecast = ({ data }: Props): JSX.Element => {
    const today = data.list[0]
    return (
        <div className='w-full md:max-w-[500px] py-4 md:py-4 md:px-10 lg:px-24 h-full  
          lg:h-auto bg-white bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg'>
            <div className="mx-auto w-[300px] mt-2 md:mt-2 lg:mt-56">
                <section className='text-center'>
                    <h2 className='text-2xl font-black'>
                        {data.name} <span className='font-thin'>{data.country}</span>
                    </h2>
                    <h1 className='text-4xl font-extrabold'>
                        <Degree temp={Math.round(today.main.temp)} />
                    </h1>
                    <p className='text-sm'>
                        {today.weather[0].main} {today.weather[0].description}

                    </p>
                    <p className='text-sm'>
                        H:<Degree temp={Math.ceil(today.main.temp_max)} />
                        L:{''}<Degree temp={Math.floor(today.main.temp_min)} />
                    </p>
                </section>
                <section className='flex overflow-x-scroll'>
                    {data.list.map((item, i) => (
                        <div
                            className='inline-block text-center w-[50px] flex-shrink-0'
                            key={i}
                        >
                            <p className='text-sm'>{i === 0 ? 'Now' : new Date(item.dt * 1000).getHours()}</p>
                            <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt={`weather-icon-${item.weather[0].description}`} />
                            <p className='text-sm font-bold'> <Degree temp={Math.round(today.main.temp)} /></p>
                        </div>
                    ))}
                </section>
                <section className='flex flex-wrap justify-between text-zinc-700 mt-5 h-full'>
                    <div className='w-[140px] text-xs font-bold flex flex-col items-center bg-white/20 
                    backdrop-blur-lg rounded drop-shadow-lg py-4 mb-5 '>
                        <Sunrise />
                        <span className='mt-2'>{getSunTime(data.sunrise)}</span>
                    </div>
                    <div className='w-[140px] text-xs font-bold flex flex-col items-center bg-white/20 
                    backdrop-blur-lg rounded drop-shadow-lg py-4 mb-5 '>
                        <Sunset />
                        <span className='mt-2'>{getSunTime(data.sunset)}</span>
                    </div>

                    <Title
                        icon='wind'
                        title='wind'
                        info={`${Math.round(today.wind.speed)}km/h`}
                        description={`${getWindDirection(Math.round(today.wind.deg)
                        )},gusts${today.wind.gust.toFixed(1)} km/h `}

                    />

                    <Title
                        icon='feels'
                        title='Feels like'
                        info={<Degree temp={Math.round(today.main.feels_like)} />}
                        description={`Feels ${Math.round(today.main.feels_like) < Math.round(today.main.temp) ? 'colder' : 'weather'

                            }`}
                    />

                    <Title
                        icon='humidity'
                        title='Humidity'
                        info={`${today.main.humidity}%`}
                        description={getHumidityValue(today.main.humidity)}
                    />
                    <Title
                        icon='pop'
                        title='Precipitation'
                        info={`${Math.round(today.pop * 1000)}%`}
                        description={`${getPop(today.pop)}, clouds at ${today.clouds.all}%`}
                    />
                    <Title
                        icon="pressure"
                        title="Pressure"
                        info={`${today.main.pressure}hPa`}

                        description={` ${Math.round(today.main.pressure) < 1013 ? 'Lower' : 'Higher'
                            } than standard`}
                    />
                    <Title
                        icon="visibility"
                        title="Visibility"
                        info={`${(today.visibility / 1000).toFixed()} km`}
                        description={getVisibilityValue(today.visibility)}
                    />
                  
                </section>


            </div>
        </div>
    )
}

export default Forecast