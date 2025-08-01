import { BsDatabaseUp } from "react-icons/bs";
import { MdOutlineAddToHomeScreen } from "react-icons/md";
import { RiFlipVerticalLine } from "react-icons/ri";
import ban1 from "../assets/ban1.png"
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
    <section
      style={{
        backgroundImage: `url(${ban1})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
          opacity: 0.9, 
      
      }}

      className="services">
      <h3 style={{color:"white"}}>Top Niches!</h3>
      <div className="grid">
        {services.map(({ id, service, description, icon: Icon }) => (
          <div className="card" style={{ boxShadow: "rgba(72, 57, 236, 0.16) 0px 3px 6px, rgba(17, 72, 189, 0.23) 0px 3px 6px" }} key={id}>

            <h4>{service}    {Icon && <Icon className="text-3xl text-blue-600 mb-2" />} </h4>
            <p>{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopNiches;