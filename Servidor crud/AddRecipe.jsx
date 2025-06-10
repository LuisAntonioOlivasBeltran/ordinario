import React, { useState } from 'react';

function AddRecipe({ onRecipeAdded }) {
  const [form, setForm] = useState({ title: '', ingredients: '', instructions: '', cookingTime: '' });
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    fetch('http://localhost:3001/recipes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    }).then(() => {
      setForm({ title: '', ingredients: '', instructions: '', cookingTime: '' });
      setSuccessMessage('Receta guardada con éxito!');
      onRecipeAdded();
      setTimeout(() => setSuccessMessage(''), 3000);
    });
  };

  return (
    <form className="recipe-form" onSubmit={handleSubmit}>
      {successMessage && <p style={{ color: 'green', textAlign: 'center' }}>{successMessage}</p>}
      <input name="title" placeholder="Título de la Receta" value={form.title} onChange={handleChange} required />
      <textarea name="ingredients" placeholder="Ingredientes" value={form.ingredients} onChange={handleChange} required />
      <textarea name="instructions" placeholder="Instrucciones" value={form.instructions} onChange={handleChange} required />
      <input name="cookingTime" type="number" placeholder="Tiempo de Cocción (min)" value={form.cookingTime} onChange={handleChange} required />
      <button type="submit">Guardar Receta</button>
    </form>
  );
}

export default AddRecipe;
