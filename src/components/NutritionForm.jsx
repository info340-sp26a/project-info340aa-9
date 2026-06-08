import { useState } from "react";

function NutritionForm({ addLog }) {

  const [foodName, setFoodName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [calories, setCalories] = useState("");

  function handleFoodNameChange(event) {
    setFoodName(event.target.value);
  }

  function handleQuantityChange(event) {
    setQuantity(event.target.value);
  }

  function handleCaloriesChange(event) {
    setCalories(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    addLog({
      type: "food",
      foodName,
      quantity,
      calories
    });

    setFoodName("");
    setQuantity("");
    setCalories("");
  }

  return (
    <section className="card">
      <h2>Nutrition Form</h2>
      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <label htmlFor="food-name">Food Name</label>

          <input
            type="text"
            id="food-name"
            placeholder="e.g., Chicken salad"
            value={foodName}
            onChange={handleFoodNameChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="food-quantity">Quantity</label>

          <input
            type="text"
            id="food-quantity"
            placeholder="e.g., 1 bowl"
            value={quantity}
            onChange={handleQuantityChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="food-calories">Estimated Calories</label>

          <input
            type="number"
            id="food-calories"
            placeholder="e.g., 450"
            value={calories}
            onChange={handleCaloriesChange}
          />
        </div>
        <button type="submit">Add Food</button>
      </form>
    </section>
  );
}

export default NutritionForm;