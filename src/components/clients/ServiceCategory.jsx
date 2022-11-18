import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { httpGetAllService } from "../../api/services";
import useService from "../../hooks/use-service";
const ServiceCategory = () => {
  const [service, setService] = React.useState([]);

  useEffect(() => {
    const service = async () => {
      const res = await httpGetAllService();
      setService(res.filter((item) => item.status !== 2));
    };
    service();
  }, []);
  return (
    <>
      <div className="grid grid-cols-[190px_190px_190px] ml-16">
        {service?.map((item) => (
          <div key={item?._id}>
            <Link to={`/detail-booking/${item?.slug}`}>
              <a>
                <img
                  src="https://beautyspa4.shostweb.com/wp-content/uploads/2021/11/f2-small-dv1.jpg"
                  alt=""
                />
                <div className="text-center py-[10px]">
                  <button>{item?.name}</button>
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
