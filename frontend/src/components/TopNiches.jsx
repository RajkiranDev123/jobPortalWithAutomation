
const TopNiches = () => {
  const services = [
    {
      id: 1,
      service: "Frontend Development",
      description:
        "Hire skilled frontend developers to build responsive, high-performance, and visually stunning web interfaces tailored to your business needs.",
    },
    {
      id: 2,
      service: "Backend Development",
      description:
        "Get experienced backend developers to build secure, scalable, and high-performance server-side applications tailored to your business needs.",
    },
    {
      id: 3,
      service: "Full-Stack",
      description:
        "Find full-stack developers who seamlessly handle both frontend and backend development—delivering complete, scalable, and high-performance web solutions.",
    },
  
  ];

  return (
    <section className="services">
      <h3>Top Niches</h3>
      <div className="grid">
        {services.map((element) => {
          return (
            <div className="card" key={element.id}>
              <h4>{element.service}</h4>
              <p>{element.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TopNiches;