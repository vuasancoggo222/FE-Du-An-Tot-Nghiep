import React from "react";
import { Link } from "react-router-dom";
import useService from "../../hooks/use-service";
const ServiceCategory = () => {
  const { data, error } = useService();
  if (!data) return <div>Loading...</div>;
  if (error) return <div>Something went wrong</div>;

  return (
    <>
      <div className="grid grid-cols-[190px_190px_190px] ml-16">
        {data &&
          data.map((item) => (
            <div key={item._id}>
              <Link to={`/detail-booking/${item._id}`}>
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

        {/* <div>
          <img
            src="https://beautyspa4.shostweb.com/wp-content/uploads/2021/11/f2-small-dv2.jpg"
            alt=""
          />
          <div className="text-center py-[10px]">
            <a href="">
              <button>Nâng mũi</button>
            </a>
          </div>
        </div>
        <div>
          <img
            src="https://beautyspa4.shostweb.com/wp-content/uploads/2021/11/f2-small-dv4.jpg"
            alt=""
          />
          <div className="text-center py-[10px]">
            <a href="">
              <button>Nâng mũi</button>
            </a>
          </div>
        </div>
        <div>
          <img
            src="https://beautyspa4.shostweb.com/wp-content/uploads/2021/11/f2-small-dv3.jpg"
            alt=""
          />
          <div className="text-center py-[10px]">
            <a href="">
              <button>Nâng mũi</button>
            </a>
          </div>
        </div>
        <div>
          <img
            src="https://beautyspa4.shostweb.com/wp-content/uploads/2021/11/f2-small-dv5.jpg"
            alt=""
          />
          <div className="text-center py-[10px]">
            <a href="">
              <button>Nâng mũi</button>
            </a>
          </div>
        </div>
        <div>
          <img
            src="https://beautyspa4.shostweb.com/wp-content/uploads/2021/11/f2-small-dv7.jpg"
            alt=""
          />
          <div className="text-center py-[10px]">
            <a href="">
              <button>Nâng mũi</button>
            </a>
          </div>
        </div>
        <div>
          <img
            src="https://beautyspa4.shostweb.com/wp-content/uploads/2021/11/f2-small-dv8.jpg"
            alt=""
          />
          <div className="text-center py-[10px]">
            <a href="">
              <button>Nâng mũi</button>
            </a>
          </div>
        </div>
        <div>
          <img
            src="https://beautyspa4.shostweb.com/wp-content/uploads/2021/11/f2-small-dv9.jpg"
            alt=""
          />
          <div className="text-center py-[10px]">
            <a href="">
              <button>Nâng mũi</button>
            </a>
          </div>
        </div>
        <div>
          <img
            src="https://beautyspa4.shostweb.com/wp-content/uploads/2021/11/f2-small-dv2.jpg"
            alt=""
          />
          <div className="text-center py-[10px]">
            <a href="">
              <button>Nâng mũi</button>
            </a>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default ServiceCategory;
