import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useService from "../../hooks/use-service";
const ServiceCategory = () => {
  const { data, error } = useService();
  const [service, setService] = React.useState([]);

  if (!data) return <div>Loading...</div>;
  if (error) return <div>Something went wrong</div>;
  useEffect(() => {
    setService(data.filter((item) => item.status !== 2));
  }, []);
  return (
    <>
      <div className="grid grid-cols-[190px_190px_190px] ml-16">
        {service.map((item) => (
          <div key={item._id}>
            <Link to={`/detail-booking/${item.slug}`}>
              <a>
                <img
                  src="https://beautyspa4.shostweb.com/wp-content/uploads/2021/11/f2-small-dv1.jpg"
                  alt=""
                />
                <div className="text-center py-[10px]">
                  <button>{item.name}</button>
                </div>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default ServiceCategory;
