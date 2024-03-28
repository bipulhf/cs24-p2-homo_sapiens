"use client";

import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { baseURL } from "../../../../../../files";

interface Props {
  query: string;
  type: string;
}

export default function ReportTable({ query, type }: Props) {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [index, setIndex] = useState(1);

  useEffect(() => {
    if (query) {
      fetch(`${baseURL}/report?pageNo=${index}&query=${query}&type=${type}`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          setItems(data.data);
          setHasMore(!data.isLast);
          setIndex(index + 1);
        });
    } else {
      fetch(`${baseURL}/report?pageNo=${index}`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          setItems(data.data);
          setHasMore(!data.isLast);
          setIndex(index + 1);
        });
    }
  }, []);

  const fetchMoreData = async () => {
    let data: any;
    if (query) {
      data = await (
        await fetch(
          `${baseURL}/report?pageNo=${index}&query=${query}&type=${type}`,
          {
            credentials: "include",
          }
        )
      ).json();
    } else {
      data = await (
        await fetch(`${baseURL}/report?pageNo=${index}`, {
          credentials: "include",
        })
      ).json();
    }
    // @ts-ignore
    setItems((prevItems) => [...prevItems, ...data.data]);
    setHasMore(!data.isLast);
    setIndex((prevIndex) => prevIndex + 1);
  };
  return (
    <InfiniteScroll
      dataLength={items.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<p>Loading...</p>}
    >
      <table className="text-center w-full text-xl">
        <thead>
          <tr className="border-b-2 border-admin">
            <th className="py-4">SL</th>
            <th className="py-4">STS ID</th>
            <th className="py-4">Vehicle Number</th>
            <th className="py-4">STS Arrival Time</th>
            <th className="py-4">STS Departure Time</th>
            <th className="py-4">Landfill Arrival Time</th>
            <th className="py-4">Landfill Departure Time</th>
            <th className="py-4">Vehicle Capacity</th>
            <th className="py-4">Volume of Waste</th>
            <th className="py-4">Cost</th>
            <th className="py-4"></th>
          </tr>
        </thead>
        <tbody>
          {items &&
            items.map((item: any, index: any) => (
              <tr key={item.id} className="border-b-2 border-admin">
                <td className="py-4">{index + 1}</td>
                <td className="py-4">{item.sts_id}</td>
                <td className="py-4">{item.vehicle.vehicle_number}</td>
                <td className="py-4">
                  {item.arrival_time
                    ? new Date(item.arrival_time).toLocaleString()
                    : "Not Arrived"}
                </td>
                <td className="py-4">
                  {item.departure_time
                    ? new Date(item.departure_time).toLocaleString()
                    : "In STS"}
                </td>
                <td className="py-4">
                  {item.Landfill_Vehicle
                    ? item.Landfill_Vehicle.arrival_time
                      ? new Date(
                          item.Landfill_Vehicle.arrival_time
                        ).toLocaleString()
                      : "Not Arrived"
                    : "Not Arrived"}
                </td>
                <td className="py-4">
                  {item.Landfill_Vehicle
                    ? item.Landfill_Vehicle.departure_time
                      ? new Date(
                          item.Landfill_Vehicle.departure_time
                        ).toLocaleString()
                      : "In Landfill"
                    : "Not Arrived"}
                </td>
                <td className="py-4">{item.vehicle.capacity}</td>
                <td className="py-4">{item.waste_volume}</td>
                <td className="py-4 font-bold text-landfill">65</td>
                <td className="py-4">
                  <button className="p-3 bg-admin rounded-lg hover:underline text-white">
                    Create Bill
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </InfiniteScroll>
  );
}