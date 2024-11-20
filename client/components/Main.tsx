import Bridges from './Bridges'
import Header from './Header'
import MainContent from './MainContent'

export default function Main() {
  return (
    <main>
      <Header>
        <div className="header-left">
          <h2 className="header-title">The troll toll calculator</h2>
          <p className="container-text">
            The troll toll calculator is here to help friendly Auckland trolls
            with their bridge toll needs. You can check out Auckland bridges or
            sign up to our platform to save your favourites or make bridges your
            own!
          </p>
        </div>
        <div className="header-right">
          <img
            src="/images/troll-under-bridge.jpg"
            alt="Troll under a bridge"
          />
        </div>
      </Header>
      <MainContent>
        <Bridges />
      </MainContent>
    </main>
  )
}
