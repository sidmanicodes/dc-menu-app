"use client";
import NavBar from "./menu/NavBar";
import Selections from "./menu/Selections";
import FoodItemDisplay from "./menu/FoodItemDisplay";
import { useEffect, useState } from "react";
import Footer from "./menu/Footer";
import styles from "./index.module.css";
//import "./globals.css";

interface Filters {
  dc: string;
  day: number;
  meal: string;
}

const Menu = () => {
  let today = new Date();
  let dayNum = today.getDay() - 1 === -1 ? 6 : today.getDay() - 1; // Accounts for difference in counting days between Python and JS
  let time = today.getHours();
  let meal = "Breakfast";

  // Set default meal time
  if (time >= 0 && time < 12) {
    meal = "Breakfast";
  } else if (time >= 12 && time < 17) {
    meal = "Lunch";
  } else {
    meal = "Dinner";
  }

  let savedFilters: Filters;

  // Retrieves saved filters (if they exist)
  if (typeof window !== "undefined") {
    const filtersFromStorage = sessionStorage.getItem("filters");
    if (filtersFromStorage) {
      savedFilters = JSON.parse(filtersFromStorage);
    } else {
      savedFilters = { dc: "Segundo", day: dayNum, meal: meal };
    }
  } else {
    savedFilters = { dc: "Segundo", day: dayNum, meal: meal };
  }

  const [selectedDC, setSelectedDC] = useState(savedFilters.dc);
  const [selectedDay, setSelectedDay] = useState(savedFilters.day);
  const [selectedMeal, setSelectedMeal] = useState(savedFilters.meal);

  return (
    <div className="space-y-10 bg-red">
      <NavBar />
      {/* <Selections /> */}
      <Selections
        selectedDC={selectedDC}
        setSelectedDC={setSelectedDC}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        selectedMeal={selectedMeal}
        setSelectedMeal={setSelectedMeal}
      />
      <FoodItemDisplay dc={selectedDC} day={selectedDay} meal={selectedMeal} />
      <Footer />
    </div>
  );
};

export default Menu;

