import { BsDatabaseUp } from "react-icons/bs";
import { MdOutlineAddToHomeScreen } from "react-icons/md";
import { RiFlipVerticalLine } from "react-icons/ri";
const TopNiches = () => {
  const services = [
    {
      id: 1,
      service: "Frontend Development",
      icon: MdOutlineAddToHomeScreen,

      description:
        "Hire skilled frontend developers to build responsive, high-performance, and visually stunning web interfaces tailored to your business needs.",
    },
    {
      id: 2,
      service: "Backend Development",
      icon: BsDatabaseUp,
      description:
        "Get experienced backend developers to build secure, scalable, and high-performance server-side applications tailored to your business needs.",
    },
    {
      id: 3,
      service: "Full-Stack",
      icon: RiFlipVerticalLine,

      description:
        "Find full-stack developers who seamlessly handle both frontend and backend development—delivering complete, scalable, and high-performance web solutions.",
    },

  ];

  return (
    <section className="services">
      <h3>Top Niches</h3>
      <div className="grid">
        {services.map(({ id, service, description, icon: Icon }) => (
          <div className="card" key={id}>

            <h4>{service}    {Icon && <Icon className="text-3xl text-blue-600 mb-2" />} </h4>
            <p>{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopNiches;