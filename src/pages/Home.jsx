function Home() {
  return (
    <div className="home-page">
      <h1>Welcome to Rickny's Crewmates App!</h1>
      <p>Build your dream team by creating custom crewmates.</p>
      <div className="home-buttons">
        <a href="/create" className="button">
          Create a Crewmate
        </a>
        <a href="/gallery" className="button">
          View Your Crew
        </a>
      </div>
    </div>
  );
}

export default Home;
