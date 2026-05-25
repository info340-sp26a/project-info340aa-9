import { useState } from "react";

function NutritionForm({ addLog }) {

  const [foodName, setFoodName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [calories, setCalories] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    addLog({
      type: "food",
      foodName,
      quantity,
      calories
    });
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
            onChange={(event) => setFoodName(event.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="food-quantity">Quantity</label>

          <input
            type="text"
            id="food-quantity"
            placeholder="e.g., 1 bowl"
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="food-calories">Estimated Calories</label>

          <input
            type="number"
            id="food-calories"
            placeholder="e.g., 450"
            value={calories}
            onChange={(event) => setCalories(event.target.value)}
          />
        </div>
        <button type="submit">Add Food</button>
      </form>
    </section>
  );
}
}

export default NutritionForm;