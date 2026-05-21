import { useState } from "react";

function NutritionForm() {

  const [foodName, setFoodName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [calories, setCalories] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    console.log({
      foodName,
      quantity,
      calories
    });
  }
}

export default NutritionForm;