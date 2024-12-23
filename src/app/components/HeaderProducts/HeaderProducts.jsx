import React from "react";

function HeaderProducts() {
  return (
    <section className="w-full pt-28 px-16">
      <figure className="w-full h-[300px] bg-red-500 rounded-lg overflow-hidden">
        <img
          src="https://i0.wp.com/scooterscolombia.com/wp-content/uploads/2024/10/factors-to-consider-when-buying-an-electric-scooter-1.png?resize=1536%2C865&ssl=1"
          alt=""
          className="w-full h-full"
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </figure>
    </section>
  );
}

export default HeaderProducts;
