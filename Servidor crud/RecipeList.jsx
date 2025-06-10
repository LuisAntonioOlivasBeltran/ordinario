import React, { useEffect, useState } from 'react';
import EditRecipe from './EditRecipe';

function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [editingRecipe, setEditingRecipe] = useState(null);

  const fetchRecipes = () => {
    fetch('http://localhost:3001/recipes')
      .then(res => res.json())
      .then(data => setRecipes(data));
  };

  useEffect(() => fetchRecipes(), []);

  const deleteRecipe = (id) => {
    fetch(`http://localhost:3001/recipes/${id}`, { method: 'DELETE' })
      .then(() => fetchRecipes());
  };

  return (
    <div className="recipe-list">
      {editingRecipe && (
        <EditRecipe recipe={editingRecipe} onUpdated={() => {
          setEditingRecipe(null);
          fetchRecipes();
        }} onCancel={() => setEditingRecipe(null)} />
      )}
      <h2>Lista de Recetas</h2>
      <div className="recipe-cards">
        {recipes.map(recipe => (
          <div key={recipe.id} className="recipe-card">
            <h3>{recipe.title}</h3>
            <p><strong>Ingredientes:</strong> {recipe.ingredients}</p>
            <p><strong>Instrucciones:</strong> {recipe.instructions}</p>
            <p><strong>Tiempo de Cocción:</strong> {recipe.cookingTime} minutos</p>
            <div className="buttons">
              <button onClick={() => setEditingRecipe(recipe)}>Editar</button>
              <button onClick={() => deleteRecipe(recipe.id)} className="delete">Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecipeList;
