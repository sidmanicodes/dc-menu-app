"use client";
import React, { useEffect, useState } from "react";
import FoodItem from "../api/foodItemSchema";
import supabase from "../api/supabase";
import FoodItemCard from "./FoodItemCard";
import FoodItemModal from "./FoodItemModal";
import NoFoodItems from "./NoFoodItems";
import SkeletonCard from "./SkeletonCard";

interface Props {
  dc: string;
  day: number;
  meal: string;
}

const FoodItemDisplay = ({ dc, day, meal }: Props) => {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [sections, setSections] = useState([""]);
  const [isLoading, setIsLoading] = useState(false);
  const loadingSkeletons = [1, 2, 3];

  useEffect(() => {
    const abortController = new AbortController();
    const fetchFoodItems = async () => {
		const specifications = { dc: "Segundo", date: "6", meal: "Dinner"};
      // try {
      //   // Make call to supabase client
      //   setIsLoading(true);
      //   const { data, error } = await supabase
      //     .from("food_items")
      //     .select("*")
      //     .match({ dc: dc, date: day, meal: meal });

      //   if (error) {
      //     throw new Error(error.message);
      //   }

      //   // Get food items from response json
      //   const items = data as FoodItem[];

      //   setFoodItems(items);

      //   // Get unique sections
      //   const uniqueSections = Array.from(
      //     new Set(items.map((item) => item.section))
      //   );

      //   setSections(uniqueSections);

      //   setIsLoading(false);
      // } catch (error: any) {
      //   console.log("Something went wrong when retrieving the data: ", error);
      //   setIsLoading(false); // Set loading to false even if the fetch fails
      // }
	   fetch('http://localhost:3000/api/routes', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(specifications),
		})
			.then(response => {
    // Check if the response is successful
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
    // Parse the JSON response
				return response.json();
			})
			.then(data => {
    // Process the retrieved data
				console.log('Data:', data);
				//const items = data as FoodItem[]
				setSections(data);
			})
			.catch(error => {
    // Handle errors
				console.error('Error:', error);
			});
		}


    // Call function every time dc, day, or meal changes
    fetchFoodItems();

    // Cleanup function
    return () => {
      // Save filters for current session
      if (typeof window !== undefined) {
        sessionStorage.setItem("filters", JSON.stringify({ dc, day, meal }));
      }

      abortController.abort();
    };
  }, [dc, day, meal]);

  return (
    <>
      {sections.length !== 0 &&
        sections.map((section, index) => (
			<div key = {index} className="flex flex-col sm:px-32 px-12">
				{section.name}
			</div>
          /*<div key={index} className="flex flex-col sm:px-32 px-12">
            <h1>
              {section}
            </h1>
            {isLoading && (
              <div className="flex flex-row pt-9 gap-5 overflow-x-scroll">
                {loadingSkeletons.map((item) => (
                  <SkeletonCard key={item} />
                ))}
              </div>
            )}
            <div className="flex flex-row pt-9 gap-5 overflow-x-scroll">
              {foodItems
                .filter((foodItem) => foodItem.section === section)
                .map((foodItem, index) => (
                  <div key={foodItem.id}>
                    {/* Food card / modal to open button }
                    <label htmlFor={`food_item_${section}_${index}`}>
                      <FoodItemCard foodItem={foodItem} />
                    </label>

                    {/* Modal }
                    <FoodItemModal
                      foodItem={foodItem}
                      section={section}
                      index={index}
                    />
                  </div>
                ))}
            </div>
          </div>*/
        ))}
      {/* Render No Food screen if there are no items at the given time */}
      {sections.length === 0 && <NoFoodItems dc={dc} />}
    </>
  );
};

export default FoodItemDisplay;
