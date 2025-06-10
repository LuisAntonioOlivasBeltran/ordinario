import React, { useState } from 'react';
import AddRecipe from './components/AddRecipe';
import RecipeList from './components/RecipeList';
import './styles.css'; // Asegúrate de importar el CSS

function App() {
  const [reload, setReload] = useState(false);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Recetario - Gestión de Recetas</h1>
      </header>
      <main className="app-main">
        <section className="add-recipe-section">
          <h2>Agregar Nueva Receta</h2>
          <AddRecipe onRecipeAdded={() => setReload(!reload)} />
        </section>
        <section className="recipe-list-section">
          <h2>Lista de Recetas</h2>
          <RecipeList key={reload} />
        </section>
      </main>
    </div>
  );
}

export default App;
