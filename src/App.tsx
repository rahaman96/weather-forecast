
import Search from './Components/Search'
import useForecast from './hooks/useForecast'
import Forecast from './Components/Forecast'
const App = (): JSX.Element => {
  const {
    term,
    options,
    forecast,
    isLoading,
    onInputChange,
    onOptionSelect,
    onSubmit
  } = useForecast()
  return (
    <main className='flex justify-center items-center bg-gradient-to-br from-sky-400 via-rose-400 to-lime-400 h-[100vh] w-full overflow-auto'>
      {forecast ? (
        <Forecast data={forecast} />
      ) : (
        <Search
          term={term}
          options={options}
          onInputChange={onInputChange}
          onOptionSelect={onOptionSelect}
          onSubmit={onSubmit}
          isLoading={isLoading}
        />
      )}
    </main>
  )
}

export default App