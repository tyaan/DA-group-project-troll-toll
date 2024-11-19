import Bridges from "./Bridges";
import Header from "./Header";
import MainContent from "./MainContent";

export default function Main (){
  return <main>
    <Header>
      <div className="header-left">
        <h2 className="font-bold text-2xl">Heading that explains what this app is about</h2>
      </div>
      <div className="header-right">
        <img src="/images/Light-Troll-Logo.png" alt="Logo"/>
      </div>
    </Header>
    <MainContent>
      <Bridges/>
    </MainContent>
  </main>
}