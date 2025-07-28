
import { useSelector } from "react-redux";
import { CiUser } from "react-icons/ci";
const MyProfile = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <div className="account_components">
      <p style={{color:"blue",display:"flex",alignItems:"center"}}>  <CiUser style={{ height: 22 }} /> My Profile</p>
      <div>
        <label>Full Name :</label>
        <input
          type="text"
          disabled
          value={user && user.name}
          onChange={(e) => e.target.value}
        />
      </div>
      <div>
        <label>Email Address :</label>
        <input
          type="email"
          disabled
          value={user && user.email}
          onChange={(e) => e.target.value}
        />
      </div>
      {user && user.role === "Job Seeker" && (
        <div>
          <label>My Preferred Job Niches :</label>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}
          >
            <input
              type="text"
              disabled
              value={user && user.niches.firstNiche}
              onChange={(e) => e.target.value}
            />
            <input
              type="text"
              disabled
              value={user && user.niches.secondNiche}
              onChange={(e) => e.target.value}
            />
            <input
              type="text"
              disabled
              value={user && user.niches.thirdNiche}
              onChange={(e) => e.target.value}
            />
          </div>
        </div>
      )}
      <div>
        <label>Phone Number :</label>
        <input
          type="number"
          disabled
          value={user && user.phone}
          onChange={(e) => e.target.value}
        />
      </div>
      <div>
        <label>Address :</label>
        <input
          type="text"
          disabled
          value={user && user?.address[0]?.toUpperCase()+user?.address?.slice(1)}
          onChange={(e) => e.target.value}
        />
      </div>
      <div>
        <label>Role :</label>
        <input
          type="text"
          disabled
          value={user && user.role}
          onChange={(e) => e.target.value}
        />
      </div>
      <div>
        <label>Joined On :</label>
        <input
          type="text"
          disabled
          value={user && user.createdAt?.slice(0,10)}
          onChange={(e) => e.target.value}
        />
      </div>
    </div>
  );
};

export default MyProfile;